import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import PDFDesigner from "../Components/home/PdfDesigner";

const TemplateBuilder = ({ user, template }) => {
    return (
        <>
            <Head title="Dashboard" />
            <div className="max-w-1xl mx-auto sm:px-6 lg:px-8">
                <PDFDesigner template={template} />

                <br />
                <hr />
                <br />
            </div>
        </>
    );
};

export default TemplateBuilder;
