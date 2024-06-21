import { Template } from "@pdfme/common";

export interface IPdfTemplateContext {
    templates: {
        [key: string]: {
            key: string;
            label: string;
            template: Template;
        };
    };
    currentTemplate: string;
}

export const initialState: IPdfTemplateContext = {
    templates: {
        blank: {
            key: "blank",
            label: "Blank",
            template: {
                schemas: [
                    {
                        name: {
                            type: "text",
                            content: "Pet Name",
                            position: {
                                x: 25.06,
                                y: 24.35,
                            },
                            width: 77.77,
                            height: 18.7,
                            rotate: 0,
                            opacity: 1,
                            fontSize: 36,
                            fontColor: "#14b351",
                            fontName: "NotoSerifJP-Regular",
                        },
                    },
                ],
                basePdf: { width: 210, height: 297, padding: [0, 0, 0, 0] },
            },
        },
    },
    currentTemplate: "blank",
};
