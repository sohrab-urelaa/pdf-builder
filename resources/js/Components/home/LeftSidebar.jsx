import { useEffect, useRef, useState } from "react";
import { Viewer } from "../../pdf-ui/src";
import { getFontsData } from "../../lib/pdf-helper";

const UploadedDocuments = ({ onChangePdf, base64Pdf }) => {
    const designerRef = useRef(null);
    const [prevDesignerRef, setPrevDesignerRef] = useState(null);
    const designer = useRef(null);
    const buildForm = () => {
        if (base64Pdf) {
            getFontsData().then(() => {
                if (designerRef.current) {
                    designer.current = new Viewer({
                        domContainer: designerRef.current,
                        template: {
                            schemas: [{}],
                            basePdf: base64Pdf,
                        },
                        inputs: [{}],
                    });
                }
            });
        } else {
            console.log("No template found.");
        }
    };

    useEffect(() => {
        buildForm();
        console.log("Base 64 changed");
    }, [base64Pdf]);
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
        <div className="border-r-2 border-slate-200 flex flex-col">
            <div className="h-[400px]">
                <div className="h-full" ref={designerRef} />
            </div>
            <label className="btn btn-primary self-center">
                Add Document
                <input
                    type="file"
                    accept="application/pdf"
                    onChange={onChangePdf}
                    className="hidden"
                />
            </label>
        </div>
    );
};

export default UploadedDocuments;
