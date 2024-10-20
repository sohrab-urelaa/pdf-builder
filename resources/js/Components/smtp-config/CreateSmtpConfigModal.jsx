import InputError from "../InputError";
import InputLabel from "../InputLabel";
import TextInput from "../TextInput";
import { useEffect, useState } from "react";
import PrimaryButton from "../PrimaryButton";
import Modal from "../utill/Modal";
import { createSmtpConfig, updateSmtpConfig } from "../../api/smtp-config";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
const initalData = {
    mail_driver: "",
    mail_host: "",
    mail_port: "",
    mail_username: "",
    mail_password: "",
    mail_encryption: "",
    mail_from_address: "",
    mail_from_name: "",
    status: "",
};
const CreateSmtpConfigModal = ({
    open,
    setOpen,
    edit = false,
    smtpConfig = {},
    onSuccess = () => {},
}) => {
    const { t } = useTranslation();
    const [data, setData] = useState(initalData);
    const [errors, setErrors] = useState(initalData);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        if (edit && smtpConfig) {
            setData(smtpConfig);
        }
    }, [smtpConfig]);

    const submit = async (e) => {
        e.preventDefault();

        const newErrors = {};

        Object.keys(data).forEach((key) => {
            const label = key
                .split("_")
                .map(
                    (splitedKey) =>
                        splitedKey?.charAt(0).toUpperCase() +
                        splitedKey.slice(1)
                )
                .join(" ");
            if (!data[key].toString().trim()) {
                newErrors[key] = `Please enter ${label}`;
            }

            if (key === "status" && data[key]) {
                const status = data[key];
                if (status !== "inactive" && status !== "active") {
                    newErrors[key] =
                        "Status should be active and inactive only";
                }
            }
        });
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            setErrors({});
            setProcessing(true);

            let res;
            if (edit) {
                res = await updateSmtpConfig(data);
            } else {
                res = await createSmtpConfig(data);
            }

            setProcessing(false);

            if (res.success) {
                toast.success(res?.message);
                setOpen(false);
                setData(initalData);
                onSuccess();
                // router.replace("/admin/email-templates");
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
        } catch (err) {
            console.log("Catch", err);
        }
    };

    return (
        <Modal
            open={open}
            setOpen={setOpen}
            title={edit ? t("update_smtp_config") : t("new_smtp_config")}
        >
            <form onSubmit={submit}>
                {Object.keys(initalData).map((inputItemKey) => {
                    if (inputItemKey === "status") {
                        return null;
                    }
                    const value = data[inputItemKey];
                    const error = errors[inputItemKey];
                    // const label = inputItemKey
                    //     .split("_")
                    //     .map(
                    //         (splitedKey) =>
                    //             splitedKey?.charAt(0).toUpperCase() +
                    //             splitedKey.slice(1)
                    //     )
                    //     .join(" ");
                    const label = t(`${inputItemKey}`);
                    const id = inputItemKey;
                    return (
                        <div className="mt-4">
                            <InputLabel htmlFor={id} value={label} />
                            <TextInput
                                id={id}
                                type="text"
                                name={label}
                                value={value}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData((prev) => ({
                                        ...prev,
                                        [inputItemKey]: e.target.value,
                                    }))
                                }
                            />
                            <InputError message={error} className="mt-2" />
                        </div>
                    );
                })}

                <div className="mt-4 flex items-center">
                    <input
                        id="isActiveSmtpConfig"
                        type="checkbox"
                        checked={data.status === "active"}
                        defaultChecked={data.status === "active"}
                        value={data.status === "active" ? true : false}
                        className="checkbox"
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                status: e.target.checked
                                    ? "active"
                                    : "inactive",
                            }))
                        }
                    />
                    <label className="ml-2" htmlFor="isActiveCert">
                        {t("active")}
                    </label>
                </div>
                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        {edit ? t("update_config") : t("create_config")}
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
};

export default CreateSmtpConfigModal;
