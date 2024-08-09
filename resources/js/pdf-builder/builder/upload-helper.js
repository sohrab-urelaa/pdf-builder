import * as pdfjsLib from "pdfjs-dist";
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.js";

import { PDFDocument } from "pdf-lib";
function getRandomValue() {
    return Math.floor(Math.random() * 100) + 1;
}
export async function loadPDF(file) {
    return new Promise(async (resolve) => {
        const fileReader = new FileReader();

        fileReader.onload = async () => {
            const typedArray = new Uint8Array(fileReader.result);
            // const pdfDoc = await PDFDocument.load(fileReader.result);
            const pdf = await pdfjsLib.getDocument({ data: typedArray })
                .promise;
            const images = [];
            const fileName = file.name + getRandomValue();
            const file_Id = fileName.split(" ").join("_").toLowerCase();

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d");
                const viewport = page.getViewport({ scale: 2.35 });
                // const viewport = page.getViewport({ scale: 1 });

                canvas.height = viewport.height;
                canvas.width = viewport.width;

                // const libPage = pdfDoc.getPage(i - 1);
                // const { width, height } = libPage.getSize();

                // console.log("LIB_HEIGHT_WIDTH", { height, width });
                // console.log("DOC_HEIGHT_WIDTH", {
                //     height: viewport.height,
                //     width: viewport.width,
                // });

                const renderContext = {
                    canvasContext: context,
                    viewport: viewport,
                };

                await page.render(renderContext).promise;
                const dataURL = canvas.toDataURL("image/png");
                const base64 = dataURL.split(",")[1];

                const documentName = `${fileName}-Page ${i}`;
                const document_id = `${file_Id}_page_${i}_${new Date()
                    .getTime()
                    .toString()}`;

                images.push({
                    dataURL,
                    base64,
                    name: documentName,
                    id: document_id,
                    meta: {
                        height: viewport.height,
                        width: viewport.width,
                    },
                });
            }
            resolve(images);
        };
        fileReader.readAsArrayBuffer(file);
    });
}

export async function createDataFormateFromUploadedFile(
    file,
    images,
    pdfBase64
) {
    return new Promise((resolve, reject) => {
        const attachment_uuid =
            file.name?.split(" ").join("_").toLowerCase() +
            "_" +
            new Date().getTime().toString();
        const attachment_name = file.name;
        const created_date = new Date().getTime().toLocaleString();
        const attachment_images = images.map((pdfImage, index) => {
            return {
                id: pdfImage.id,
                name: pdfImage.name,
                uuid: pdfImage.id,
                created_at: created_date,
                url: pdfImage.dataURL,
                metadata: {
                    width: pdfImage.meta.width,
                    height: pdfImage.meta.height,
                },
                filename: `${index}.png`,
            };
        });
        const uploadSuccessResponse = {
            schema: [
                {
                    attachment_uuid: attachment_uuid,
                    name: attachment_name,
                },
            ],
            fields: null,
            submitters: null,
            documents: [
                {
                    pdfBase64: pdfBase64,
                    name: attachment_name,
                    uuid: attachment_uuid,
                    created_at: created_date,
                    metadata: {
                        identified: true,
                        analyzed: true,
                        pdf: {
                            number_of_pages: images.length,
                            fields: [],
                        },
                    },
                    preview_images: attachment_images,
                },
            ],
        };
        resolve(uploadSuccessResponse);
    });
}
export async function readPDFAsBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
            resolve(btoa(fileReader.result));
        };
        fileReader.onerror = reject;
        fileReader.readAsBinaryString(file);
    });
}
