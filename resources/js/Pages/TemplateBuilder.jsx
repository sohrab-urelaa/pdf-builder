import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import PDFDesigner from "../Components/home/PdfDesigner";
import { PdfTemplateContextProvider } from "../context/PdfTemplateContext";

const TemplateBuilder = ({ user }) => {
    return (
        <AuthenticatedLayout user={user}>
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="max-w-1xl mx-auto sm:px-6 lg:px-8">
                    <PdfTemplateContextProvider>
                        <PDFDesigner />
                    </PdfTemplateContextProvider>

                    <br />
                    <hr />
                    <br />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default TemplateBuilder;
