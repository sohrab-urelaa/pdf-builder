import { useRef, useState } from "react";
import { Designer } from "../../pdf-ui/src/index";
import { getFontsData, getPlugins, readFile } from "../../lib/pdf-helper";
import Navbar from "./Navbar";
import { cloneDeep } from "../../pdf-ui/src/helper";
import { router } from "@inertiajs/react";
import UploadedDocuments from "./LeftSidebar";
const headerHeight = 65;

const PDFDesigner = ({ template: dbTemplate }) => {
    const designerRef = useRef(null);
    const [basePdf, setBasePdf] = useState(null);
    const [prevDesignerRef, setPrevDesignerRef] = useState(null);
    const designer = useRef(null);
    const buildForm = () => {
        const template_string = dbTemplate?.template_json;
        let template = JSON.parse(template_string);
        setBasePdf(template?.basePdf);
        if (template) {
            getFontsData().then((font) => {
                if (designerRef.current) {
                    designer.current = new Designer({
                        domContainer: designerRef.current,
                        template,
                        options: {
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
                template={dbTemplate}
                onChangePdf={onChangeBasePDF}
                onSaveTemplate={onSaveTemplate}
            />
            <main className="mt-3 flex w-full gap-3">
                <aside className="w-[18%]">
                    <UploadedDocuments
                        onChangePdf={onChangeBasePDF}
                        base64Pdf={basePdf}
                    />
                </aside>
                <div className="w-[80%]">
                    <div className="w-full">
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
