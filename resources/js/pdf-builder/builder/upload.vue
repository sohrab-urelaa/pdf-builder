<template>
    <div v-if="images.length">
        <img
            v-for="(image, index) in images"
            :src="image.dataURL"
            :key="index"
            :alt="`Page ${index + 1}`"
        />
    </div>
    <div>
        <label
            id="add_document_button"
            :for="inputId"
            class="btn btn-outline w-full"
            :class="{ 'btn-disabled': isLoading || isProcessing }"
        >
            <IconInnerShadowTop
                v-if="isLoading || isProcessing"
                width="20"
                class="animate-spin"
            />
            <IconUpload v-else width="20" />
            <span v-if="isLoading">
                {{ t("uploading_") }}
            </span>
            <span v-else-if="isProcessing">
                {{ t("processing_") }}
            </span>
            <span v-else>
                {{ t("add_document") }}
            </span>
        </label>
        <form ref="form" class="hidden">
            <input
                :id="inputId"
                ref="input"
                name="files[]"
                type="file"
                :accept="acceptFileTypes"
                multiple
                @change="onFileChange"
            />
        </form>
    </div>
</template>

<script>
import { IconUpload, IconInnerShadowTop } from "@tabler/icons-vue";
import * as pdfjsLib from "pdfjs-dist";
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.js";
import {
    createDataFormateFromUploadedFile,
    loadPDF,
    readPDFAsBase64,
} from "./upload-helper";
export default {
    name: "DocumentsUpload",
    components: {
        IconUpload,
        IconInnerShadowTop,
    },
    inject: ["baseFetch", "t"],
    props: {
        templateId: {
            type: [Number, String],
            required: true,
        },
        acceptFileTypes: {
            type: String,
            required: false,
            default: "image/*, application/pdf",
        },
    },
    emits: ["success"],
    data() {
        return {
            isLoading: false,
            isProcessing: false,
            file: null,
            images: [],
            pdfBase64: null,
        };
    },
    computed: {
        inputId() {
            return "el" + Math.random().toString(32).split(".")[1];
        },
    },
    methods: {
        async onFileChange(event) {
            const file = event.target.files[0];
            if (file && file.type === "application/pdf") {
                this.isProcessing = true;
                this.images = [];
                //load the pdf and parse the images from pdf
                const images = await loadPDF(file);
                this.images = images;

                //keep a base64 version of the base pdf
                const base64PDF = await readPDFAsBase64(file);
                this.pdfBase64 = base64PDF;

                //create data formate from the uploaded file
                const response = await createDataFormateFromUploadedFile(
                    file,
                    this.images,
                    this.pdfBase64
                );
                this.isProcessing = false;
                this.$emit("success", response);
            }
        },
        // async readPDFAsBase64(file) {
        //     return new Promise((resolve, reject) => {
        //         const fileReader = new FileReader();
        //         fileReader.onload = () => {
        //             this.pdfBase64 = btoa(fileReader.result);
        //             resolve();
        //         };
        //         fileReader.onerror = reject;
        //         fileReader.readAsBinaryString(file);
        //     });
        // },
        // async loadPDF(file) {
        //     this.images = [];
        //     return new Promise((resolve, reject) => {
        //         const fileReader = new FileReader();
        //         fileReader.onload = async () => {
        //             const typedArray = new Uint8Array(fileReader.result);
        //             const pdf = await pdfjsLib.getDocument({ data: typedArray })
        //                 .promise;
        //             const images = [];
        //             const fileName = file.name;
        //             const file_Id = fileName.split(" ").join("_").toLowerCase();

        //             for (let i = 1; i <= pdf.numPages; i++) {
        //                 const page = await pdf.getPage(i);
        //                 const canvas = document.createElement("canvas");
        //                 const context = canvas.getContext("2d");
        //                 const viewport = page.getViewport({ scale: 1 });

        //                 canvas.height = viewport.height;
        //                 canvas.width = viewport.width;

        //                 const renderContext = {
        //                     canvasContext: context,
        //                     viewport: viewport,
        //                 };

        //                 await page.render(renderContext).promise;
        //                 const dataURL = canvas.toDataURL("image/png");
        //                 const base64 = dataURL.split(",")[1];

        //                 const documentName = `${fileName}-Page ${i}`;
        //                 const document_id = `${file_Id}_page_${i}_${new Date()
        //                     .getTime()
        //                     .toString()}`;

        //                 images.push({
        //                     dataURL,
        //                     base64,
        //                     name: documentName,
        //                     id: document_id,
        //                     meta: {
        //                         height: viewport.height,
        //                         width: viewport.width,
        //                     },
        //                 });
        //             }
        //             resolve(images);
        //         };
        //         fileReader.readAsArrayBuffer(file);
        //     });
        // },
        // async createDataFormate(file) {
        //     return new Promise((resolve, reject) => {
        //         const attachment_uuid =
        //             file.name?.split(" ").join("_").toLowerCase() +
        //             "_" +
        //             new Date().getTime().toString();
        //         const attachment_name = file.name;
        //         const created_date = new Date().getTime().toLocaleString();
        //         const attachment_images = this.images.map((pdfImage, index) => {
        //             return {
        //                 id: pdfImage.id,
        //                 name: pdfImage.name,
        //                 uuid: pdfImage.id,
        //                 created_at: created_date,
        //                 url: pdfImage.dataURL,
        //                 metadata: {
        //                     width: pdfImage.meta.width,
        //                     height: pdfImage.meta.height,
        //                 },
        //                 filename: `${index}.png`,
        //             };
        //         });
        //         const uploadSuccessResponse = {
        //             schema: [
        //                 {
        //                     attachment_uuid: attachment_uuid,
        //                     name: attachment_name,
        //                 },
        //             ],
        //             fields: null,
        //             submitters: null,
        //             documents: [
        //                 {
        //                     name: attachment_name,
        //                     uuid: attachment_uuid,
        //                     created_at: created_date,
        //                     metadata: {
        //                         identified: true,
        //                         analyzed: true,
        //                         pdf: {
        //                             number_of_pages: this.images.length,
        //                             fields: [],
        //                         },
        //                     },
        //                     preview_images: attachment_images,
        //                 },
        //             ],
        //         };
        //         resolve(uploadSuccessResponse);
        //     });
        // },
    },
};
</script>
