import { useState } from "react";
import { Link, router } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import UserSettingsLayout from "../../Layouts/UserSettingsLayout";
import { toast } from "react-toastify";
import ActionModal from "../../Components/utill/ActionModal";
import { deleteUserEmailTemplate } from "../../api/email-template";
import FeatureSupportAlert from "../../Components/user/FeatureSupportAlert";

const UserEmailTemplates = ({ auth, email_templates: emailTemplates }) => {
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const { t } = useTranslation();

    const handleSuccess = () => {
        router.reload();
    };
    const handleDeleteTemplate = async () => {
        try {
            setDeleteLoading(true);
            const res = await deleteUserEmailTemplate(selectedTemplate?.id);
            if (res?.success) {
                toast.success(res?.message);
                setDeleteModal(false);
                setSelectedTemplate(null);
                handleSuccess();
            } else {
                toast.error(res?.message);
            }
        } catch (err) {
            toast.error("Soemthing went' wrong please try again later!");
        } finally {
            setDeleteLoading(false);
        }
    };

    return (
        <UserSettingsLayout title={t("email_templates")} user={auth?.user}>
            <div className="max-w-7xl mx-auto sm:px-2">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                    <p className="text-4xl font-bold">{t("email_templates")}</p>
                </div>
            </div>
            <FeatureSupportAlert check_for="email" />
            <div class="overflow-x-auto mt-4">
                <table class="table w-full table-lg rounded-b-none overflow-hidden">
                    <thead class="bg-base-200">
                        <tr class="text-base-content uppercase">
                            <th>{t("name")}</th>
                            <th>{t("subject")}</th>
                            <th>{t("Status")}</th>
                            <th>{t("owner")}</th>
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
                                <td>
                                    <span class="badge badge-info badge-outline">
                                        {template?.owner === "admin"
                                            ? "default"
                                            : "customized"}
                                    </span>
                                </td>
                                <td>{template?.body}</td>
                                <td>
                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={`/settings/edit-templates/${template.id}`}
                                        >
                                            <button className="btn btn-sm btn-outline">
                                                {t("edit")}
                                            </button>
                                        </Link>

                                        {template?.owner !== "admin" && (
                                            <button
                                                onClick={() => {
                                                    setSelectedTemplate(
                                                        template
                                                    );
                                                    setDeleteModal(true);
                                                }}
                                                className="btn btn-sm btn-outline"
                                            >
                                                {t("delete")}
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ActionModal
                key={"delete_user_email_template"}
                open={deleteModal}
                setOpen={setDeleteModal}
                onAction={handleDeleteTemplate}
                onCancel={() => {
                    setSelectedTemplate(null);
                    setDeleteModal(false);
                }}
                title={t("delete_email_template")}
                description={`${t("delete_email_template_message")} (${
                    selectedTemplate?.name
                })`}
            />
            <br />
            <br />
        </UserSettingsLayout>
    );
};

export default UserEmailTemplates;
