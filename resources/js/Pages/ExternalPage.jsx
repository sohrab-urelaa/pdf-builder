import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useTranslation } from "react-i18next";
export default function ExternalPage({ auth, menuItem }) {
    const { t } = useTranslation();
    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div
                    dangerouslySetInnerHTML={{ __html: menuItem?.dynamic_html }}
                />
            </div>
        </AuthenticatedLayout>
    );
}
