import { useEffect, useState } from "react";
import { getSubscriptionEmailTemplate } from "../../api/email-template";
import Modal from "./Modal";
import { useTranslation } from "react-i18next";
import React, { useRef } from "react";

const SubscriptionDownloadModal = ({ subscriptionId, open, setOpen }) => {
    // const { data, setData, post, processing, errors, reset } = useForm();
    const contentRef = useRef();

    const { t } = useTranslation();
    const [template, setTemplate] = useState(null);

    const getInvoiceTemplate = async () => {
        try {
            const data = await getSubscriptionEmailTemplate(subscriptionId);
            setTemplate(data?.template?.body);
        } catch (err) {
            toast.error(err?.message);
        }
    };

    useEffect(() => {
        getInvoiceTemplate();
    }, [subscriptionId]);

    const handleDownloadInvoice = async () => {
        try {
            const element = contentRef.current;

            // Use html2pdf to convert the content and download the file
            html2canvas(element).then(function (canvas) {
                console.log("Canvas", canvas);
            });
        } catch (err) {
            toast.error(err?.message);
        }
    };

    return (
        <Modal open={open} setOpen={setOpen} title={t("Invoice")}>
            <div className="w-full max-h-md overflow-y-auto">
                {template && (
                    <div className="flex justify-center items-center">
                        <div
                            ref={contentRef}
                            dangerouslySetInnerHTML={{ __html: template }}
                        />
                    </div>
                )}
            </div>
            <button className="btn mt-2" onClick={handleDownloadInvoice}>
                Download Invoice
            </button>
        </Modal>
    );
};

export default SubscriptionDownloadModal;
