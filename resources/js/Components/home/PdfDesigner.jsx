import { useRef, useState } from "react";
import { Designer } from "../../pdf-ui/src/index";
import { getFontsData, getPlugins, readFile } from "../../lib/pdf-helper";
import { usePdfTemplates } from "../../context/PdfTemplateContext";
import Navbar from "./Navbar";
import UploadedDocuments from "./LeftSidebar";
import { cloneDeep } from "../../pdf-ui/src/helper";
import { useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";
const headerHeight = 65;

const PDFDesigner = () => {
    const { data, setData, post, processing, errors, reset, transform } =
        useForm({
            template_json: "",
            templated_pdf_link: "",
        });

    const designerRef = useRef(null);
    const [basePdf, setBasePdf] = useState(null);
    const [prevDesignerRef, setPrevDesignerRef] = useState(null);
    const designer = useRef(null);
    const {
        data: { templates, currentTemplate },
    } = usePdfTemplates();

    const buildForm = () => {
        let template = templates[currentTemplate].template;

        if (template) {
            getFontsData().then(() => {
                if (designerRef.current) {
                    designer.current = new Designer({
                        domContainer: designerRef.current,
                        template,
                        options: {
                            theme: {},
                        },
                        plugins: getPlugins(),
                    });
                }
            });
        } else {
            console.log("No template found.");
        }
    };

    const onChangeBasePDF = (e) => {
        if (e.target && e.target.files) {
            readFile(e.target.files[0], "dataURL").then(async (basePdf) => {
                setBasePdf(basePdf);
                if (designer.current) {
                    designer.current.updateTemplate(
                        Object.assign(
                            cloneDeep(designer.current.getTemplate()),
                            {
                                basePdf,
                            }
                        )
                    );
                }
            });
        }
    };

    const onSaveTemplate = async (title) => {
        if (designer.current) {
            const template_json = JSON.stringify(
                designer.current.getTemplate()
            );
            const pdf_link = "demo.pdf";
            const data = {
                template_json,
                templated_pdf_link: pdf_link,
                title,
            };
            router.post("/pdf-templates", data, {
                onSuccess: (res) => {
                    if (res?.props?.template?.id) {
                        router.replace("/dashboard");
                    }
                },
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
            <Navbar
                onChangePdf={onChangeBasePDF}
                onSaveTemplate={onSaveTemplate}
            />
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
            <aside></aside>
        </div>
    );
};

export default PDFDesigner;
