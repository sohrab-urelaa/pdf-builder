<template>
    <div class="mx-auto max-w-md flex flex-col" dir="auto">
        <div class="flex items-center justify-center flex-col">
            <template v-if="isProcessing">
                <h1 class="font-bold text-lg">
                    PDF is processing,please wait....
                </h1>
                <IconInnerShadowTop width="50" class="animate-spin" />
            </template>
            <template v-else>
                <h1 class="font-bold text-lg">PDF Successfully processed</h1>
                <iframe id="pdf" class="w-[300px] h-[300px]"></iframe>
            </template>
        </div>
    </div>
</template>

<script>
import {
    IconCircleCheck,
    IconBrandGithub,
    IconMail,
    IconDownload,
    IconInnerShadowTop,
    IconLogin,
} from "@tabler/icons-vue";
import MarkdownContent from "./markdown_content.vue";
import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";

export default {
    name: "FormCompleted",
    components: {
        MarkdownContent,
        IconCircleCheck,
        IconInnerShadowTop,
        IconBrandGithub,
        IconMail,
        IconLogin,
        IconDownload,
    },
    inject: ["baseUrl", "t"],
    props: {
        values: {
            type: Object,
            required: true,
            default: {},
        },
        attachments: {
            type: Array,
            required: true,
            default: [],
        },
        fields: {
            type: Array,
            required: true,
            default: [],
        },
        template: {
            type: Object,
            required: true,
            default: {},
        },
    },
    data() {
        return {
            isLoading: false,
            isProcessing: true,
            isSendingCopy: false,
            isDownloading: false,
            preloadedAssets: {
                radioSelectImg: null,
                radioDeSelectImg: null,
                checkboxDeSelectImg: null,
                checkboxSelectImg: null,
            },
        };
    },
    computed: {
        isWebView() {
            return /webview|wv|ip((?!.*Safari)|(?=.*like Safari))/i.test(
                window.navigator.userAgent
            );
        },
    },
    async mounted() {
        // this.processPDF();
        this.fillupPDF();
        // console.log("Success Page", this.values, this.attachments, this.fields);
        // console.log("Template", this.template);
    },
    methods: {
        async fillupPDF() {
            const { documents } = this.template;
            this.isProcessing = true;
            await this.loadStaticAssets();
            const documentMap = await this.generateDocumentMap(documents);

            const fieldValues = await this.getFieldValuePairs(
                this.fields,
                this.values,
                this.attachments
            );

            await this.drawFieldIntoDoc(documentMap, this.fields, fieldValues);

            const masterPDF = await PDFDocument.create();
            await this.makeMasterPDF(documentMap, masterPDF);
            const pdfBytes = await masterPDF.save();
            const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
            document.dispatchEvent(
                new CustomEvent("DOCUMENT_FORM_COMPLETED", {
                    detail: {
                        type: "ON_FORM_COMPLETED",
                        data: pdfBlob,
                    },
                })
            );
            this.isProcessing = false;
            const { default: confetti } = await import("canvas-confetti");
            confetti({
                particleCount: 50,
                startVelocity: 30,
                spread: 140,
            });

            const pdfDataUri = await masterPDF.saveAsBase64({ dataUri: true });
            document.getElementById("pdf").src = pdfDataUri;
        },
        async generateDocumentMap(documents) {
            const documentMap = new Map();
            const totalDocument = documents.length;
            let currentDocument = 0;
            const appendPdf = async () => {
                const { pdfBase64, uuid } = documents[currentDocument];
                const pdfDoc = await PDFDocument.load(pdfBase64);
                // console.log("Pdf Doc", pdfDoc.getPages());
                documentMap.set(uuid, pdfDoc);

                currentDocument++;
                if (currentDocument < totalDocument) {
                    await appendPdf();
                }
            };
            await appendPdf();
            return documentMap;
        },

        async makeMasterPDF(documentMap, masterPDF) {
            const allCopyPagePromises = [];
            documentMap.forEach((pdfDoc, key) => {
                const pdfPages = pdfDoc.getPageCount();
                const pages = masterPDF.copyPages(
                    pdfDoc,
                    [...new Array(pdfPages)].map((_, i) => i)
                );
                allCopyPagePromises.push(pages);
            });
            const copyPages = await Promise.all(allCopyPagePromises);
            copyPages.forEach((singlePdfPages) => {
                singlePdfPages.forEach((page) => {
                    masterPDF.addPage(page);
                });
            });
        },
        formatDate(date, format) {
            const monthFormats = {
                M: "numeric",
                MM: "2-digit",
                MMM: "short",
                MMMM: "long",
            };

            const dayFormats = {
                D: "numeric",
                DD: "2-digit",
            };

            const yearFormats = {
                YYYY: "numeric",
                YYY: "numeric",
                YY: "2-digit",
            };

            const parts = new Intl.DateTimeFormat([], {
                day: dayFormats[format.match(/D+/)],
                month: monthFormats[format.match(/M+/)],
                year: yearFormats[format.match(/Y+/)],
                timeZone: "UTC",
            }).formatToParts(date);

            return format
                .replace(/D+/, parts.find((p) => p.type === "day").value)
                .replace(/M+/, parts.find((p) => p.type === "month").value)
                .replace(/Y+/, parts.find((p) => p.type === "year").value);
        },
        formattedValue(field, fieldValue) {
            if (field.type === "date") {
                return this.formatDate(
                    new Date(fieldValue),
                    field.preferences?.format ||
                        (this.locale.endsWith("-US")
                            ? "MM/DD/YYYY"
                            : "DD/MM/YYYY")
                );
            } else {
                return fieldValue;
            }
        },
        hexToRgb(hex) {
            hex = hex.replace(/^#/, "");
            let bigint = parseInt(hex, 16);
            let r = (bigint >> 16) & 255;
            let g = (bigint >> 8) & 255;
            let b = bigint & 255;
            return [r / 255, g / 255, b / 255];
        },
        async drawFieldIntoDoc(documentMap, fields, fieldValueMap) {
            let current = 0;
            let currentArea = 0;
            const total = fields.length;
            const DEFAULT_FONT_SIZE = 12;
            const DEFAULT_TEXT_COLOR = "#000000";
            const draw = async () => {
                const field = fields[current];
                const fieldValue = fieldValueMap[field.uuid];
                const fieldArea = field.areas[currentArea];
                const { page, h, w, x, y } = fieldArea;
                const attachmentUUID = fieldArea?.attachment_uuid;

                const pdfDoc = documentMap.get(attachmentUUID);

                const fieldPage = pdfDoc.getPage(page);
                const { height, width } = fieldPage.getSize();
                let absX = x * width;
                let absY = height - y * height - h * height;
                const absWidth = w * width;
                const absHeight = h * height;

                const { font_size, font_color } = field.preferences;
                const fontSize = font_size ? font_size : DEFAULT_FONT_SIZE;
                const [r, g, b] = font_color
                    ? this.hexToRgb(font_color)
                    : this.hexToRgb(DEFAULT_TEXT_COLOR);
                if (
                    [
                        "text",
                        "number",
                        "date",
                        "multiple",
                        "radio",
                        "select",
                        "cells",
                    ].includes(field?.type)
                ) {
                    // const textHeight = Number(fontSize) * 2.5;
                    // const actualHeightLeft = absHeight - textHeight;
                    // // const centerY = absY + absHeight / 2 - textHeight / 2;
                    // let before = absY;
                    // if (actualHeightLeft > 0) {
                    //     absY = absY + absHeight / 2 + textHeight;
                    // } else if (actualHeightLeft < 0) {
                    //     absY = absY + absHeight / 2;
                    // }
                    // console.log("Actual Height Left", {
                    //     actualHeightLeft,
                    //     type: field.type,
                    //     fieldValue,
                    //     absHeight,
                    //     absWidth,
                    //     textHeight,
                    //     // centerY,
                    //     absX,
                    //     absY,
                    //     before,
                    // });

                    // const centerY = absY + absHeight / 2 - textHeight / 2;

                    fieldPage.drawText(fieldValue?.toString() || "", {
                        x: absX,
                        y: absY,
                        scale: 2.5,
                        size: fontSize,
                        color: rgb(r, g, b),
                        maxWidth: absWidth,
                        lineHeight: absHeight / 2,
                    });
                } else if (field?.type === "checkbox") {
                    let imageBytes = null;
                    if (fieldValue) {
                        imageBytes = this.preloadedAssets.checkboxSelectImg;
                    } else {
                        imageBytes = this.preloadedAssets.checkboxDeSelectImg;
                    }
                    console.log("Png Image", imageBytes);

                    if (!imageBytes) {
                        return;
                    } else {
                        const pngImage = await pdfDoc.embedPng(imageBytes);
                        fieldPage.drawImage(pngImage, {
                            x: absX,
                            y: absY,
                            width: absWidth,
                            height: absHeight,
                        });
                    }
                } else if (
                    ["image", "signature", "initials", "stamp"].includes(
                        field?.type
                    )
                ) {
                    const signImageBytes = await fetch(fieldValue).then((res) =>
                        res.arrayBuffer()
                    );
                    const pngImage = await pdfDoc.embedPng(signImageBytes);
                    fieldPage.drawImage(pngImage, {
                        x: absX,
                        y: absY,
                        width: absWidth,
                        height: absHeight,
                    });
                }

                if (current < total) {
                    if (currentArea < field.areas.length - 1) {
                        currentArea++;
                    } else {
                        current++;
                        currentArea = 0;
                    }
                    if (current < total) await draw();
                }
            };

            await draw();
        },
        async getFieldValuePairs(fields, values, attachments) {
            return fields.reduce((acc, field) => {
                const fieldValue = this.getFieldValue(
                    field,
                    values,
                    attachments
                );
                acc[field.uuid] = fieldValue;
                return acc;
            }, {});
        },
        getFieldValue(field, values, attachments) {
            const { uuid, type } = field;
            console.log({
                uuid,
                type,

                a: JSON.parse(JSON.stringify(attachments)),
            });
            console.log("Values", JSON.parse(JSON.stringify(values)));
            if (
                [
                    "number",
                    "text",
                    "date",
                    "checkbox",
                    "radio",
                    "select",
                ].includes(type)
            ) {
                if (type === "date") {
                    return this.formattedValue(field, values[uuid]);
                }
                return values[uuid];
            } else if (type === "multiple") {
                return values[uuid].join(",");
            } else if (type === "cells") {
                return values[uuid].split("").join("  ");
            } else if (["image", "signature", "initials"].includes(type)) {
                const documentKey = values[uuid];
                const attachment = attachments.find(
                    (attachmentItem) => attachmentItem?.uuid === documentKey
                )?.url;

                return attachment;
            }
        },

        async loadStaticAssets() {
            return new Promise((resolve, reject) => {
                const assetLinkMap = {
                    radioSelectImg: "/radio_select.png",
                    radioDeSelectImg: "/radio_deselect.png",
                    checkboxDeSelectImg: "/checkbox_deselect.png",
                    checkboxSelectImg: "/checkbox_select.png",
                };

                const fetchPromises = Object.keys(assetLinkMap).map(
                    (assetKey) => {
                        const link = assetLinkMap[assetKey];
                        return fetch(link).then((res) => res.arrayBuffer());
                    }
                );
                Promise.all(fetchPromises).then((result) => {
                    this.preloadedAssets.radioSelectImg = result[0];
                    this.preloadedAssets.radioDeSelectImg = result[1];
                    this.preloadedAssets.checkboxDeSelectImg = result[2];
                    this.preloadedAssets.checkboxSelectImg = result[3];
                    resolve("Assets loaded");
                });
            });
        },

        async processPDF() {
            const url =
                "https://pdf-lib.js.org/assets/with_update_sections.pdf";
            const existingPdfBytes = await fetch(url).then((res) =>
                res.arrayBuffer()
            );

            const signImageUrl = this.attachments[0].url;

            const pdfDoc = await PDFDocument.load(existingPdfBytes);
            const helveticaFont = await pdfDoc.embedFont(
                StandardFonts.Helvetica
            );

            // const jpgUrl =
            //     "https://pdf-lib.js.org/assets/cat_riding_unicorn.jpg";
            // const pngUrl =
            //     "https://pdf-lib.js.org/assets/minions_banana_alpha.png";

            // const jpgImageBytes = await fetch(jpgUrl).then((res) =>
            //     res.arrayBuffer()
            // );
            // const pngImageBytes = await fetch(pngUrl).then((res) =>
            //     res.arrayBuffer()
            // );
            const signImageBytes = await fetch(signImageUrl).then((res) =>
                res.arrayBuffer()
            );
            // const jpgImage = await pdfDoc.embedJpg(jpgImageBytes);
            // const pngImage = await pdfDoc.embedPng(pngImageBytes);
            const signImage = await pdfDoc.embedPng(signImageBytes);
            // const jpgDims = jpgImage.scale(0.5);
            // const pngDims = pngImage.scale(0.5);
            const signImgDims = signImage.scale(0.5);

            const pages = pdfDoc.getPages();
            const page = pages[0];
            page.drawImage(signImage, {
                x: page.getWidth() / 2 - signImgDims.width / 2 + 75,
                y: page.getHeight() / 2 - signImgDims.height + 250,
                width: signImgDims.width,
                height: signImgDims.height,
            });
            // page.drawImage(jpgImage, {
            //     x: page.getWidth() / 2 - jpgDims.width / 2,
            //     y: page.getHeight() / 2 - jpgDims.height / 2 + 250,
            //     width: jpgDims.width,
            //     height: jpgDims.height,
            // });
            // page.drawImage(pngImage, {
            //     x: page.getWidth() / 2 - pngDims.width / 2 + 75,
            //     y: page.getHeight() / 2 - pngDims.height + 250,
            //     width: pngDims.width,
            //     height: pngDims.height,
            // });

            const form = pdfDoc.getForm();
            const button = form.createButton("some.button.field");

            button.addToPage("Do Stuff", page, {
                x: 50,
                y: 0,
                width: 200,
                height: 100,
                textColor: rgb(1, 0, 0),
                backgroundColor: rgb(0, 1, 0),
                borderColor: rgb(0, 0, 1),
                borderWidth: 2,
                rotate: degrees(90),
                // font: ubuntuFont,
            });

            const checkBox = form.createCheckBox("some.checkBox.field");

            checkBox.addToPage(page, {
                x: 50,
                y: 75,
                width: 25,
                height: 25,
                textColor: rgb(1, 0, 0),
                backgroundColor: rgb(0, 1, 0),
                borderColor: rgb(0, 0, 1),
                borderWidth: 2,
                rotate: degrees(90),
            });

            // await pdfDoc.attach(jpgImageBytes, "cat_riding_unicorn.jpg", {
            //     mimeType: "image/jpeg",
            //     description: "Cool cat riding a unicorn! 🦄🐈🕶️",
            //     creationDate: new Date("2019/12/01"),
            //     modificationDate: new Date("2020/04/19"),
            // });

            const firstPage = pages[0];
            const { width, height } = firstPage.getSize();
            firstPage.drawText("This text was added with JavaScript!", {
                x: 5,
                y: height / 2 + 300,
                size: 50,
                font: helveticaFont,
                color: rgb(0.95, 0.1, 0.1),
                rotate: degrees(-45),
            });
            const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
            document.getElementById("pdf").src = pdfDataUri;
            // const pdfBytes = await pdfDoc.save();

            const textField = form.createTextField("best.gundam");
            textField.setText("Exia");

            textField.addToPage(page, {
                x: 50,
                y: 75,
                width: 200,
                height: 100,
                textColor: rgb(1, 0, 0),
                backgroundColor: rgb(0, 1, 0),
                borderColor: rgb(0, 0, 1),
                borderWidth: 2,
                rotate: degrees(90),
                // font: ubuntuFont,
            });
        },
    },
};
</script>
