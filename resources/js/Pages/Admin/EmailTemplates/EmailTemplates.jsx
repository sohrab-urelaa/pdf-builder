import { useState } from "react";
import AdminLayout from "../../../Layouts/AdminLayout";
import { Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

const EmailTemplates = ({ auth, email_templates }) => {
    const [emailTemplates, setEmailTemplates] = useState(email_templates);
    const { t } = useTranslation();

    return (
        <AdminLayout title={"Company"} user={auth?.user}>
            <div className="max-w-7xl mx-auto sm:px-2">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                    <p className="text-4xl font-bold">{t("email_templates")}</p>
                </div>
            </div>
            <div class="overflow-x-auto mt-4">
                <table class="table w-full table-lg rounded-b-none overflow-hidden">
                    <thead class="bg-base-200">
                        <tr class="text-base-content uppercase">
                            <th>{t("name")}</th>
                            <th>{t("subject")}</th>
                            <th>{t("Status")}</th>
                            <th>{t("template")}</th>
                            <th class="text-right" width="1px">
                                {t("action")}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {emailTemplates?.map((template) => (
                            <tr key={template.id} scope="row">
                                <td>{template?.name}</td>
                                <td>{template?.subject}</td>
                                <td>
                                    <span class="badge badge-info badge-outline">
                                        {template?.status}
                                    </span>
                                </td>
                                <td>{template?.body}</td>
                                <td>
                                    <Link
                                        href={`/admin/edit-email-templates/${template.id}`}
                                    >
                                        <button className="btn btn-sm btn-outline">
                                            {t("edit")}
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <br />
            <br />
        </AdminLayout>
    );
};

export default EmailTemplates;
