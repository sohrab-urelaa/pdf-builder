import { useState } from "react";
import TextInput from "../../Components/TextInput";
import InputLabel from "../../Components/InputLabel";
import InputError from "../../Components/InputError";
import TextArea from "../../Components/TextArea";
import {
    createUserMailTemplate,
    updateEmailTemplate,
} from "../../api/email-template";
import { toast } from "react-toastify";
import { router } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import UserSettingsLayout from "../../Layouts/UserSettingsLayout";
const UserEmailTemplateEditor = ({ auth, email_template, markers }) => {
    const { t } = useTranslation();
    const [data, setData] = useState({
        subject: email_template.subject,
        body: email_template.body,
        status: email_template.status,
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleSubmitTemplate = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!data.subject.trim()) {
            newErrors.subject = "Please enter email subject";
        }
        if (!data.body.trim()) {
            newErrors.body = "Please enter email body";
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors({});
        try {
            setLoading(true);
            const res = await createUserMailTemplate(email_template.id, data);

            if (res.success) {
                toast.success(res?.message);
                router.replace("/settings/email-templates");
            } else {
                toast.error(res?.message);
                if (res.errors) {
                    const dbErrors = res.errors;
                    const updatedErrors = {};
                    Object.keys(dbErrors).forEach((key) => {
                        updatedErrors[key] = dbErrors[key][0];
                    });
                    setErrors(updatedErrors);
                }
            }
        } catch (e) {
        } finally {
            setLoading(false);
        }
    };

    return (
        <UserSettingsLayout title={t("edit_template")} user={auth?.user}>
            <div className="max-w-7xl mx-auto sm:px-2">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                    <p className="text-4xl font-bold">{t("edit_template")}</p>
                </div>
                <form
                    className="mt-4 card shadow-md p-4 rounded-md flex flex-col gap-4"
                    onSubmit={handleSubmitTemplate}
                >
                    <div>
                        <p className="text-2xl font-bold ">
                            {email_template?.name}
                        </p>
                        <p className="text-xl font-bold mt-2">
                            <span className="text-primary-content bg-gray-300 rounded-sm p-1 mr-2">
                                {t("available_markers")}:{" "}
                            </span>{" "}
                            {markers.join(" , ")}
                        </p>
                        <p className="text-xl font-bold mt-2">
                            <span className="text-primary-content bg-gray-300 rounded-sm p-1 mr-2">
                                {t("note")}:
                            </span>{" "}
                            {t("to_add_new_marker")} {`{{ MARKER_NAME }}`}
                        </p>
                    </div>
                    <div>
                        <InputLabel
                            htmlFor="subject"
                            value={t("email_subject")}
                        />
                        <TextInput
                            id="subject"
                            type="text"
                            name="subject"
                            value={data.subject}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={(e) =>
                                setData((prev) => ({
                                    ...prev,
                                    subject: e.target.value,
                                }))
                            }
                        />

                        <InputError
                            message={errors?.subject}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="status" value={t("Status")} />
                        <input
                            type="checkbox"
                            className="toggle toggle-lg"
                            value={data.status === "active"}
                            onChange={(e) => {
                                setData((prev) => ({
                                    ...prev,
                                    status: e.target.checked
                                        ? "active"
                                        : "inactive",
                                }));
                            }}
                            defaultChecked={data.status}
                        />
                        <label className="ml-3">{t(data.status)}</label>
                        <InputError message={errors?.status} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="body" value="Email Body" />
                        <TextArea
                            id="body"
                            type="text"
                            name="body"
                            value={data.body}
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData((prev) => ({
                                    ...prev,
                                    body: e.target.value,
                                }))
                            }
                            rows={5}
                        />
                        <InputError message={errors?.body} className="mt-2" />
                    </div>
                    <div className="mt-4 flex items-center justify-end">
                        <button className="btn btn-ghost">{t("cancel")}</button>
                        <button
                            disabled={loading}
                            type="submit"
                            className="btn btn-neutral"
                        >
                            {t("save_changes")}
                        </button>
                    </div>
                </form>
            </div>

            <br />
            <br />
        </UserSettingsLayout>
    );
};

export default UserEmailTemplateEditor;
