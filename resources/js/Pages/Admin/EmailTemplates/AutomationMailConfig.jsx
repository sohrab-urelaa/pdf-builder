import { useState } from "react";
import AdminLayout from "../../../Layouts/AdminLayout";
import TextInput from "../../../Components/TextInput";
import InputLabel from "../../../Components/InputLabel";
import InputError from "../../../Components/InputError";
import { setMailAutomationConfig } from "../../../api/email-template";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
const AutomationMailConfig = ({ auth, mail_config }) => {
    const { t } = useTranslation();
    const [data, setData] = useState({
        plan_extension_time_interval:
            mail_config?.plan_extension_notifieng_mail_interval || 0,
        plan_upgrade_time_interval:
            mail_config?.free_user_plan_upgrade_notifieng_mail_interval || 0,
        start_alarming_before_expiry_days:
            mail_config?.start_alarming_before_expiry || 0,
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleSubmitTemplate = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!data.plan_extension_time_interval.toString().trim()) {
            newErrors.plan_extension_time_interval =
                "Please Enter Plan Extension Time Intervel";
        }
        if (!data.plan_upgrade_time_interval.toString().trim()) {
            newErrors.plan_upgrade_time_interval =
                "Please Enter Plan Upgrade Time Intervel";
        }
        if (!data.start_alarming_before_expiry_days.toString().trim()) {
            newErrors.start_alarming_before_expiry_days =
                "Please Enter Alarming Days";
        }
        if (!parseInt(data.plan_extension_time_interval)) {
            newErrors.plan_extension_time_interval =
                "Please Enter Valid Plan Extension Time Intervel";
        }
        if (!parseInt(data.plan_upgrade_time_interval)) {
            newErrors.plan_upgrade_time_interval =
                "Please Enter Valid Plan Upgrade Time Intervel";
        }
        if (!parseInt(data.start_alarming_before_expiry_days)) {
            newErrors.start_alarming_before_expiry_days =
                "Please Enter Valid Alarming Time";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors({});
        try {
            setLoading(true);
            const bodyData = {
                plan_extension_time_interval: parseInt(
                    data.plan_extension_time_interval
                ),
                plan_upgrade_time_interval: parseInt(
                    data.plan_upgrade_time_interval
                ),
                start_alarming_before_expiry_days: parseInt(
                    data.start_alarming_before_expiry_days
                ),
            };
            const res = await setMailAutomationConfig(bodyData);

            if (res.success) {
                toast.success(res?.message);
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
        <AdminLayout title={t("mail_automation_config")} user={auth?.user}>
            <div className="max-w-7xl mx-auto sm:px-2">
                <form
                    className="mt-4 card shadow-md p-4 rounded-md flex flex-col gap-4"
                    onSubmit={handleSubmitTemplate}
                >
                    <div>
                        <InputLabel
                            htmlFor="plan_upgrade_time_interval"
                            value={t("plan_upgrade_time_interval")}
                        />
                        <TextInput
                            id="plan_upgrade_time_interval"
                            type="number"
                            name="plan_upgrade_time_interval"
                            value={data.plan_upgrade_time_interval}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={(e) =>
                                setData((prev) => ({
                                    ...prev,
                                    plan_upgrade_time_interval: e.target.value,
                                }))
                            }
                        />

                        <InputError
                            message={errors?.plan_upgrade_time_interval}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <InputLabel
                            htmlFor="plan_extension_time_interval"
                            value={t("plan_extension_time_interval")}
                        />
                        <TextInput
                            id="plan_extension_time_interval"
                            type="number"
                            name="plan_extension_time_interval"
                            value={data.plan_extension_time_interval}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={(e) =>
                                setData((prev) => ({
                                    ...prev,
                                    plan_extension_time_interval:
                                        e.target.value,
                                }))
                            }
                        />

                        <InputError
                            message={errors?.plan_extension_time_interval}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <InputLabel
                            htmlFor="start_alarming_before_expiry_days"
                            value={t("start_alarming_before_expiry_days")}
                        />
                        <TextInput
                            id="start_alarming_before_expiry_days"
                            type="number"
                            name="start_alarming_before_expiry_days"
                            value={data.start_alarming_before_expiry_days}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={(e) =>
                                setData((prev) => ({
                                    ...prev,
                                    start_alarming_before_expiry_days:
                                        e.target.value,
                                }))
                            }
                        />

                        <InputError
                            message={errors?.start_alarming_before_expiry_days}
                            className="mt-2"
                        />
                    </div>
                    <div className="mt-4 flex items-center justify-end">
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
        </AdminLayout>
    );
};

export default AutomationMailConfig;
