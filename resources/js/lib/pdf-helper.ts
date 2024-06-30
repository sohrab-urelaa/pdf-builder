import { Font, Template } from "@pdfme/common";
import { getBlankTemplate } from "./pdf-templates";
import {
    text,
    readOnlyText,
    barcodes,
    image,
    readOnlyImage,
    svg,
    readOnlySvg,
    line,
    tableBeta,
    rectangle,
    ellipse,
} from "@pdfme/schemas";
export const getTemplatePresets = (): {
    key: string;
    label: string;
    template: () => Template;
}[] => [
    // { key: "invoice", label: "Invoice", template: getInvoiceTemplate },
    // {
    //     key: "certificate",
    //     label: "Certificate",
    //     template: getCertificateTemplate,
    // },
    { key: "blank", label: "Blank", template: getBlankTemplate },

    // { key: "custom", label: "Custom", template: getBlankTemplate },
];

export const readFile = (
    file: File | null,
    type: "text" | "dataURL" | "arrayBuffer"
) => {
    return new Promise<string | ArrayBuffer>((r) => {
        const fileReader = new FileReader();
        fileReader.addEventListener("load", (e) => {
            if (e && e.target && e.target.result && file !== null) {
                r(e.target.result);
            }
        });
        if (file !== null) {
            if (type === "text") {
                fileReader.readAsText(file);
            } else if (type === "dataURL") {
                fileReader.readAsDataURL(file);
            } else if (type === "arrayBuffer") {
                fileReader.readAsArrayBuffer(file);
            }
        }
    });
};

export const downloadJsonFile = (json: unknown, title: string) => {
    if (typeof window !== "undefined") {
        const blob = new Blob([JSON.stringify(json)], {
            type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${title}.json`;
        link.click();
        URL.revokeObjectURL(url);
    }
};

export const getTemplateByPreset = (templatePreset: string): Template => {
    const templatePresets = getTemplatePresets();
    const preset = templatePresets.find(
        (preset) => preset.key === templatePreset
    );
    return preset ? preset.template() : templatePresets[0].template();
};

const fontObjList = [
    {
        fallback: true,
        label: "NotoSerifJP-Regular",
        url: "/fonts/NotoSerifJP-Regular.otf",
    },
    {
        fallback: false,
        label: "NotoSansJP-Regular",
        url: "/fonts/NotoSansJP-Regular.otf",
    },
];

export const getFontsData = async () => {
    const fontDataList = await Promise.all(
        fontObjList.map(async (font) => ({
            ...font,
            data: await fetch(font.url).then((res) => res.arrayBuffer()),
        }))
    );

    return fontDataList.reduce(
        (acc, font) => ({ ...acc, [font.label]: font }),
        {} as Font
    );
};

export const getPlugins = () => {
    return {
        Text: text,
        ReadOnlyText: readOnlyText,
        Table: tableBeta,
        Line: line,
        Rectangle: rectangle,
        Ellipse: ellipse,
        Image: image,
        ReadOnlyImage: readOnlyImage,
        SVG: svg,
        ReadOnlySvg: readOnlySvg,
        // QR: barcodes.qrcode,
        qrcode: barcodes.qrcode,
        Code128: barcodes.code128,
        // Signature: plugins.signature,
    };
};
