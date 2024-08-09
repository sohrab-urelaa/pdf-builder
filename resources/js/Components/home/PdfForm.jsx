import React, { useEffect, useState } from "react";
import SubmitTemplateModal from "./SubmitTemplateModal";
import { toast } from "react-toastify";
import { uploadTemplate } from "../../api/userApi";
import { defaultTemplate } from "./PdfDesigner";
const PdfForm = ({ template: dbTemplate }) => {
    const [data, setData] = useState(defaultTemplate.template);
    const [isLoaded, setIsLoaded] = useState(false);
    const [openSubmitPdfForm, setSubmitPdfForm] = useState(false);
    const [submitter, setSubmitter] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        if (!submitter) {
            setSubmitPdfForm(true);
        }
    }, []);
    useEffect(() => {
        const template_string = dbTemplate?.template_json;
        if (template_string) {
            const template = JSON.parse(template_string);
            setData(template);
            setIsLoaded(true);
        }
    }, [dbTemplate]);

    useEffect(() => {
        const handleCustomEvent = ({ detail }) => {
            if (detail.type === "ON_FORM_COMPLETED") {
                if (detail?.data) {
                    const pdfBlob = detail.data;
                    handleUploadTemplate(pdfBlob, submitter);
                }
            }
        };
        document.addEventListener("DOCUMENT_FORM_COMPLETED", handleCustomEvent);
        return () => {
            document.removeEventListener(
                "DOCUMENT_FORM_COMPLETED",
                handleCustomEvent
            );
        };
    }, [submitter]);

    const onSubmitterEntered = (data) => {
        setSubmitter(data);
        setSubmitPdfForm(false);
    };

    const handleUploadTemplate = async (pdfBlob, submitter) => {
        const formData = new FormData();
        formData.append("file", pdfBlob);
        formData.append("template_id", dbTemplate?.id);
        formData.append("submitted_user_name", submitter?.name);
        formData.append("submitted_user_email", submitter?.email);
        formData.append("location", submitter?.location);
        setIsProcessing(true);
        const result = await uploadTemplate(formData);
        setIsProcessing(false);
        setSubmitPdfForm(false);
        if (result?.success) {
            toast.success(result?.message);
        } else {
            toast.error(result?.message);
        }
    };

    return (
        <>
            {isLoaded &&
                !openSubmitPdfForm &&
                submitter &&
                React.createElement("submission-form", {
                    "data-template": JSON.stringify(data),
                    "data-submitter": JSON.stringify(data.submitters[0]),
                    "data-fields": JSON.stringify(data.fields),
                    //@ts-ignore
                    "data-values": JSON.stringify(data?.values || {}),
                })}

            <SubmitTemplateModal
                open={openSubmitPdfForm}
                setOpen={setSubmitPdfForm}
                onSuccess={onSubmitterEntered}
                isLoading={isProcessing}
            />
        </>
    );
};

export default PdfForm;
