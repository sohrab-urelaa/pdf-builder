import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import PdfForm from "../Components/home/PdfForm";
import "../pdf-builder/component-builder";
const TemplateFillup = ({ user, template }) => {
    return (
        <AuthenticatedLayout user={user}>
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="max-w-1xl mx-auto sm:px-6 lg:px-8">
                    {template?.id ? (
                        <PdfForm template={template} />
                    ) : (
                        <h1 className="text-xl font-bold">
                            Template not found!!
                        </h1>
                    )}

                    <br />
                    <hr />
                    <br />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default TemplateFillup;
