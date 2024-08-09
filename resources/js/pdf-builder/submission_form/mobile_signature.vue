<template>
    <div dir="auto" class="max-w-md mx-auto">
        <div
            class="flex justify-between items-center w-full"
            :class="{ 'mb-2': !field.description }"
        >
            <label
                class="label text-3xl font-bold text-base-content text-center"
            >
                <MarkdownContent v-if="field.title" :string="field.title" />
                <template v-else>
                    {{ field.name ? field.name : "Draw Signature" }}
                </template>
            </label>
            <div class="space-x-2 flex">
                <a
                    v-if="modelValue || computedPreviousValue"
                    href="#"
                    class="btn btn-outline btn-sm font-medium"
                    @click.prevent="remove"
                >
                    <IconReload :width="16" />
                    Redraw
                </a>
            </div>
        </div>
        <div v-if="field.description" dir="auto" class="mb-3 px-1">
            <MarkdownContent :string="field.description" />
        </div>
        <AppearsOn :field="field" />
        <input
            :value="modelValue || computedPreviousValue"
            type="hidden"
            :name="`values[${field.uuid}]`"
        />
        <img
            v-if="modelValue || computedPreviousValue"
            :src="attachmentsIndex[modelValue || computedPreviousValue].url"
            class="mx-auto bg-white border border-base-300 rounded max-h-44"
        />
        <div class="relative">
            <div
                v-if="
                    !modelValue && !computedPreviousValue && isSignatureStarted
                "
                class="absolute top-0.5 right-0.5"
            >
                <a
                    href="#"
                    class="btn btn-ghost font-medium btn-xs md:btn-sm"
                    @click.prevent="[clear(), hideQr()]"
                >
                    <IconReload :width="16" />
                    Clear
                </a>
            </div>
            <canvas
                v-show="!modelValue && !computedPreviousValue"
                ref="canvas"
                style="padding: 1px; 0"
                class="bg-white border border-base-300 rounded-2xl w-full"
            />
        </div>
        <button @click="submitQR" class="mt-4 btn btn-neutral w-full">
            Submit
        </button>
    </div>
</template>

<script>
import {
    IconReload,
    IconTextSize,
    IconArrowsDiagonalMinimize2,
    IconQrcode,
    IconX,
} from "@tabler/icons-vue";
import { cropCanvasAndExportToPNG } from "./crop_canvas";
import SignaturePad from "signature_pad";
import AppearsOn from "./appears_on.vue";
import MarkdownContent from "./markdown_content.vue";
import socket from "./socket.js";
const scale = 3;

export default {
    name: "SignatureStep",
    components: {
        AppearsOn,
        IconReload,
        IconQrcode,
        MarkdownContent,
        IconX,
        IconTextSize,
        IconArrowsDiagonalMinimize2,
    },
    props: {
        field: Object,
    },
    data() {
        return {
            isSignatureStarted: !!this.previousValue,
            isUsePreviousValue: true,
            uploadImageInputKey: Math.random().toString(),
        };
    },
    computed: {
        submitterSlug() {
            return this.submitter.slug;
        },
        computedPreviousValue() {
            if (this.isUsePreviousValue) {
                return this.previousValue;
            } else {
                return null;
            }
        },
    },
    async mounted() {
        this.registerSocketEvent();
        this.$nextTick(() => {
            if (this.$refs.canvas) {
                this.$refs.canvas.width =
                    this.$refs.canvas.parentNode.clientWidth * scale;
                this.$refs.canvas.height =
                    (this.$refs.canvas.parentNode.clientWidth * scale) / 3;

                this.$refs.canvas.getContext("2d").scale(scale, scale);
            }
        });

        if (this.$refs.canvas) {
            this.pad = new SignaturePad(this.$refs.canvas);

            this.pad.addEventListener("endStroke", () => {
                this.isSignatureStarted = true;

                this.$emit("start");
            });

            this.intersectionObserver = new IntersectionObserver(
                (entries, observer) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            this.$refs.canvas.width =
                                this.$refs.canvas.parentNode.clientWidth *
                                scale;
                            this.$refs.canvas.height =
                                (this.$refs.canvas.parentNode.clientWidth *
                                    scale) /
                                3;

                            this.$refs.canvas
                                .getContext("2d")
                                .scale(scale, scale);

                            this.intersectionObserver?.disconnect();
                        }
                    });
                }
            );

            this.intersectionObserver.observe(this.$refs.canvas);
        }
    },

    beforeUnmount() {
        this.intersectionObserver?.disconnect();
        this.stopCheckSignature();
    },
    methods: {
        async submitQR() {
            try {
                const result = await this.submit();
                socket.emit("signed_data", {
                    data: result,
                });
            } catch (err) {
                console.log("Error", err.message);
            }
        },
        registerSocketEvent() {},
        remove() {
            this.$emit("update:model-value", "");

            this.isUsePreviousValue = false;
            this.isSignatureStarted = false;
        },

        startCheckSignature() {
            const after = JSON.stringify(new Date());

            this.checkSignatureInterval = setInterval(() => {
                this.checkSignature({ after });
            }, 2000);
        },
        stopCheckSignature() {
            if (this.checkSignatureInterval) {
                clearInterval(this.checkSignatureInterval);
            }
        },
        checkSignature(params = {}) {
            console.log("Checking signature");
        },
        clear() {
            this.pad.clear();

            this.isSignatureStarted = false;

            if (this.$refs.textInput) {
                this.$refs.textInput.value = "";
                this.$refs.textInput.focus();
            }
        },
        drawImage(event) {
            this.remove();
            this.isSignatureStarted = true;

            const file = event.target.files[0];

            if (file && file.type.match("image.*")) {
                const reader = new FileReader();

                reader.onload = (event) => {
                    const img = new Image();

                    img.src = event.target.result;

                    img.onload = () => {
                        const canvas = this.$refs.canvas;
                        const context = canvas.getContext("2d");

                        const aspectRatio = img.width / img.height;
                        const canvasWidth = canvas.width / scale;
                        const canvasHeight = canvas.height / scale;

                        let targetWidth = canvasWidth;
                        let targetHeight = canvasHeight;

                        if (canvasWidth / canvasHeight > aspectRatio) {
                            targetWidth = canvasHeight * aspectRatio;
                        } else {
                            targetHeight = canvasWidth / aspectRatio;
                        }

                        if (targetHeight > targetWidth) {
                            const scale = targetHeight / targetWidth;
                            targetWidth = targetWidth * scale;
                            targetHeight = targetHeight * scale;
                        }

                        const x = (canvasWidth - targetWidth) / 2;
                        const y = (canvasHeight - targetHeight) / 2;

                        setTimeout(() => {
                            context.clearRect(0, 0, canvasWidth, canvasHeight);
                            context.drawImage(
                                img,
                                x,
                                y,
                                targetWidth,
                                targetHeight
                            );

                            this.$emit("start");
                        }, 50);
                    };
                };

                reader.readAsDataURL(file);

                this.uploadImageInputKey = Math.random().toString();
            }
        },
        async submit() {
            if (this.modelValue || this.computedPreviousValue) {
                if (this.computedPreviousValue) {
                    this.$emit(
                        "update:model-value",
                        this.computedPreviousValue
                    );
                }

                return Promise.resolve({});
            }

            return new Promise((resolve, reject) => {
                cropCanvasAndExportToPNG(this.$refs.canvas, {
                    errorOnTooSmall: true,
                })
                    .then(async (blob) => {
                        const params = new Proxy(
                            new URLSearchParams(window.location.search),
                            {
                                get: (searchParams, prop) =>
                                    searchParams.get(prop),
                            }
                        );

                        const file = new File([blob], "signature.png", {
                            type: "image/png",
                        });
                        const reader = new FileReader();

                        reader.readAsDataURL(file);

                        reader.onloadend = () => {
                            const url = reader.result;
                            const attachment = {
                                url: url,
                                base64: url.split(",")[1],
                                uuid: Math.random().toString(),
                                fielduuid: params?.fielduuid,
                            };

                            this.$emit("attached", attachment);
                            this.$emit("update:model-value", attachment.uuid);

                            resolve(attachment);
                        };
                    })
                    .catch((error) => {
                        if (
                            error.message === "Image too small" &&
                            this.field.required === false
                        ) {
                            return reject({ message: error.message });
                        } else {
                            return reject(error);
                        }
                    });
            });
        },
    },
};
</script>
