import { useRef, useState } from "react";
import { Designer, Form } from "../../pdf-ui/src/index";
import { getFontsData, getPlugins, readFile } from "../../lib/pdf-helper";
import { generate } from "@pdfme/generator";
import { uploadTemplate } from "../../api/userApi";
import { toast } from "react-toastify";
import CreateTemplateModal from "./CreateTemplateModal";
import SubmitTemplateModal from "./SubmitTemplateModal";
const headerHeight = 65;

const PdfForm = ({ template: dbTemplate }) => {
    const designerRef = useRef(null);
    const [prevDesignerRef, setPrevDesignerRef] = useState(null);
    const designer = useRef(null);
    const [openSubmitPdfForm, setSubmitPdfForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const buildForm = () => {
        const template_string = dbTemplate?.template_json;
        let template = JSON.parse(template_string);
        if (template) {
            getFontsData().then((font) => {
                const inputs = [{ a: "a1", b: "b1", c: "c1" }];
                if (designerRef.current) {
                    designer.current = new Form({
                        domContainer: designerRef.current,
                        template,
                        options: {
                            font,
                            // lang,
                            // labels: {
                            //     clear: "🗑️", // Add custom labels to consume them in your own plugins
                            // },
                            theme: {
                                // token: {
                                //     colorPrimary: "#25c2a0",
                                // },
                            },
                        },
                        inputs,
                        plugins: getPlugins(),
                    });
                }
            });
        } else {
            console.log("No template found.");
        }
    };

    const onSubmit = () => {
        setSubmitPdfForm(true);
    };

    const onSaveTemplate = async (data) => {
        if (designer.current) {
            const template = designer.current.getTemplate();
            const inputs = designer.current.getInputs();
            generate({ template, inputs: inputs, plugins: getPlugins() }).then(
                (pdf) => {
                    const blob = new Blob([pdf.buffer], {
                        type: "application/pdf",
                    });
                    handleUploadTemplate(blob, data);
                }
            );
        }
    };
    const handleUploadTemplate = async (blob, data) => {
        const formData = new FormData();
        formData.append("file", blob);
        formData.append("template_id", dbTemplate?.id);
        formData.append("submitted_user_name", data?.name);
        formData.append("submitted_user_email", data?.email);
        formData.append("location", data?.location);
        setIsLoading(true);
        const result = await uploadTemplate(formData);
        setIsLoading(false);
        setSubmitPdfForm(false);
        if (result?.success) {
            toast.success(result?.message);
        } else {
            toast.error(result?.message);
        }
        console.log("Result", result);
    };

    //@ts-ignore
    if (designerRef != prevDesignerRef) {
        if (prevDesignerRef && designer.current) {
            designer.current.destroy();
        }
        buildForm();
        //@ts-ignore
        setPrevDesignerRef(designerRef);
    }

    return (
        <div className="px-5 md:px-36 h-screen">
            <main className="mt-3 flex w-full gap-3">
                {/* <aside className=" flex-[2]">
                    <UploadedDocuments
                        onChangePdf={onChangeBasePDF}
                        base64Pdf={basePdf}
                    />
                </aside> */}
                <div className=" flex-[8]">
                    <div>
                        <div
                            ref={designerRef}
                            style={{
                                width: "100%",
                                height: `calc(100vh - ${headerHeight}px)`,
                            }}
                        />
                    </div>
                </div>
            </main>
            <button
                onClick={() => onSubmit()}
                className="btn btn-contained btn-neutral btn-lg fixed right-20 bottom-20 w-[150px]"
            >
                Submit
            </button>
            <SubmitTemplateModal
                open={openSubmitPdfForm}
                setOpen={setSubmitPdfForm}
                onSuccess={onSaveTemplate}
                isLoading={isLoading}
            />
        </div>
    );
};

export default PdfForm;
