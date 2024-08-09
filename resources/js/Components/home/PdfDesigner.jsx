import React, { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
export const defaultTemplate = {
    acceptFileTypes:
        "image/*, application/pdf, .docx, .doc, .xlsx, .xls, .odt, .rtf",
    currencies: "",
    withLogo: true,
    withConditions: false,
    withFormula: false,
    withPayment: true,
    isPaymentConnected: false,
    withPhone: false,
    template: {
        id: 186250,
        name: "Empty Doc",
        schema: [],
        fields: [],
        submitters: [
            {
                name: "First Party",
                uuid: "2c3038bd-82be-4024-beed-f55d246f4c69",
            },
        ],
        created_at: "2024-08-02T13:30:22.594Z",
        updated_at: "2024-08-02T13:30:22.594Z",
        preferences: {},
        documents: [],
    },
};

const Builder = ({ template: dbTemplate }) => {
    const [data, setData] = useState(defaultTemplate.template);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        const template_string = dbTemplate?.template_json;
        if (template_string) {
            const template = JSON.parse(template_string);
            template.id = dbTemplate.id;
            template.name = dbTemplate.title;
            setData(template);
            setIsLoaded(true);
        }
    }, [dbTemplate]);

    useEffect(() => {
        document.addEventListener("DOCUMENT_SAVE_RECEIVED", ({ detail }) => {
            if (detail.type === "ON_DOCUMENT_RECEIVE") {
                if (detail?.data) {
                    const jsonData = JSON.stringify(detail.data);
                    onSaveTemplate(jsonData);
                }
            }
        });
    }, []);

    const onSaveTemplate = async (templateStr) => {
        if (templateStr) {
            const pdf_link = "demo.pdf";
            const data = {
                template_json: templateStr,
                title: dbTemplate?.title,
                description: dbTemplate?.description,
                templated_pdf_link: dbTemplate?.templated_pdf_link,
                id: dbTemplate?.id,
            };
            router.put(`/pdf-templates/${dbTemplate?.id}`, data, {
                onSuccess: (res) => {
                    console.log("Response", res);
                    if (res?.props?.template?.id) {
                        // router.replace("/dashboard");
                    }
                },
            });
        }
    };

    return (
        <>
            <div
                dangerouslySetInnerHTML={{
                    __html: `
                        <template-builder 
                            data-template='${JSON.stringify(data)}'
                        ></template-builder>
                        `,
                }}
            ></div>
        </>
    );
};

export default Builder;
