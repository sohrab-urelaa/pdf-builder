import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import ContactUsForm from "../Components/home/ContactUsForm";
export default function ContactUs({ auth, templates }) {
    const { t } = useTranslation();

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={t("Contact-Us")} />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <h1 className="text-4xl text-base-content font-extrabold ml-2">
                    {t("contact_us")}
                </h1>
                <ContactUsForm />
            </div>
        </AuthenticatedLayout>
    );
}
