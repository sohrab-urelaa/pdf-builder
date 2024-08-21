import React, { useEffect, useRef, useState } from "react";
import { router } from "@inertiajs/react";
import { updatePdfTemplate } from "../../api/templateApi";
import { toast } from "react-toastify";
export const defaultTemplate = {
    acceptFileTypes: "application/pdf",
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
    const apiRef = useRef(null);
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
        const handleCustomEvent = ({ detail }) => {
            if (detail.type === "ON_DOCUMENT_RECEIVE") {
                if (detail?.data) {
                    const jsonData = JSON.stringify(detail.data);
                    onSaveTemplate(jsonData);
                }
            }
        };
        document.addEventListener("DOCUMENT_SAVE_RECEIVED", handleCustomEvent);

        return () => {
            document.removeEventListener(
                "DOCUMENT_SAVE_RECEIVED",
                handleCustomEvent
            );
        };
    }, []);

    const onSaveTemplate = async (templateStr) => {
        if (templateStr) {
            if (apiRef.current) {
                clearTimeout(apiRef.current);
            }

            apiRef.current = setTimeout(() => {
                updateTemplate(templateStr);
            }, 200);
        }
    };
    const updateTemplate = async (templateStr) => {
        const data = {
            template_json: templateStr,
            title: dbTemplate?.title,
            description: dbTemplate?.description,
            templated_pdf_link: dbTemplate?.templated_pdf_link,
            id: dbTemplate?.id,
        };
        const result = await updatePdfTemplate(dbTemplate?.id, data);
        if (result?.success) {
            toast.success(result?.message);
            router.replace("/dashboard");
        } else {
            toast.error(result?.message);
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
