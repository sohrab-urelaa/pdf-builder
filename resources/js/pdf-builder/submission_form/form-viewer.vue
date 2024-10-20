<template>
    <div style="max-height: -webkit-fill-available">
        <div id="scrollbox">
            <div class="mx-auto block pb-72" style="max-width: 1000px">
                <div
                    v-for="schema in template.schema"
                    :key="schema.attachment_uuid"
                >
                    <div
                        v-for="(previewImage, index) in getDocument(
                            schema.attachment_uuid
                        )?.preview_images || []"
                        :key="previewImage.id"
                        class="relative my-4 shadow-md"
                    >
                        <img
                            loading="lazy"
                            :src="previewImage.url"
                            :width="previewImage.metadata.width"
                            :height="previewImage.metadata.height"
                        />
                        <div
                            :id="'page-' + schema.attachment_uuid + '-' + index"
                            class="top-0 bottom-0 left-0 right-0 absolute"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="isContentRendered" class="fixed bottom-0 left-0 w-full h-0 z-20">
        <div class="mx-auto" style="max-width: 1000px">
            <div class="relative md:mx-10">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
import FieldValue from "./field.vue";
export default {
    name: "FormViewer",
    components: {
        FieldValue,
    },
    data() {
        return {
            isContentRendered: false,
        };
    },
    props: {
        template: {
            required: true,
            default: {},
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.isContentRendered = true;
        });
    },

    methods: {
        getDocument(attachment_uuid) {
            return this.template.documents.find((doc) => {
                return doc.uuid === attachment_uuid;
            });
        },
    },
};
</script>
