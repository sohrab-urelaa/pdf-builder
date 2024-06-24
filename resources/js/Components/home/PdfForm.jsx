import { useRef, useState } from "react";
import { Designer, Form } from "../../pdf-ui/src/index";
import { getFontsData, getPlugins, readFile } from "../../lib/pdf-helper";
import { usePdfTemplates } from "../../context/PdfTemplateContext";
import Navbar from "./Navbar";
import UploadedDocuments from "./LeftSidebar";
import { cloneDeep } from "../../pdf-ui/src/helper";
import { useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { generate } from "@pdfme/generator";
const headerHeight = 65;

const PdfForm = ({ template: dbTemplate }) => {
    const designerRef = useRef(null);
    const [prevDesignerRef, setPrevDesignerRef] = useState(null);
    const designer = useRef(null);

    const buildForm = () => {
        const template_string = dbTemplate?.template_json;
        let template = JSON.parse(template_string);
        console.log(template);
        if (template) {
            getFontsData().then(() => {
                const inputs = [{ a: "a1", b: "b1", c: "c1" }];
                if (designerRef.current) {
                    designer.current = new Form({
                        domContainer: designerRef.current,
                        template,
                        options: {
                            theme: {},
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

    const onSaveTemplate = async () => {
        if (designer.current) {
            const template = designer.current.getTemplate();
            const inputs = designer.current.getInputs();
            generate({ template, inputs: inputs }).then((pdf) => {
                const blob = new Blob([pdf.buffer], {
                    type: "application/pdf",
                });
                const formData = new FormData();
                formData.append("file", blob);
                formData.append("template_id", dbTemplate?.id);
                router.post("/upload-template", formData, {
                    onSuccess: (res) => {
                        if (res?.props?.submitted_template?.id) {
                            router.replace("/dashboard");
                        }
                    },
                });
                // window.open(URL.createObjectURL(blob));
            });
        }
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
                onClick={() => onSaveTemplate()}
                className="btn btn-outline btn-sm fixed right-20 bottom-20"
            >
                Submit
            </button>
        </div>
    );
};

export default PdfForm;
