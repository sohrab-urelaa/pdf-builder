import InputError from "../InputError";
import InputLabel from "../InputLabel";
import TextInput from "../TextInput";
import { useEffect, useState } from "react";
import PrimaryButton from "../PrimaryButton";
import Modal from "../utill/Modal";
import { createCertificate, updateCertificate } from "../../api/userApi";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const initialData = {
    name: "",
    certificate: null,
    is_active: false,
    password: "",
};

const CreateNewSignature = ({
    open,
    setOpen,
    onSuccess,
    userType = "user",
    edit = false,
    certificate = {},
}) => {
    const [data, setData] = useState(initialData);
    const [errors, setErrors] = useState(initialData);
    const [processing, setProcessing] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        if (certificate?.id) {
            const isActive = certificate?.is_active === 1;
            setData({ ...certificate, is_active: isActive });
        }
    }, [certificate, edit]);

    const submit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!data.name?.trim()) {
            newErrors.name = "Please enter certifiacet name";
        }

        if (!data.certificate && !edit) {
            newErrors.certificate = "Please choose your ssl certificate";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors(initialData);
        setProcessing(true);

        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("is_active", data.is_active);
            if (data?.certificate?.name) {
                formData.append("certificate", data.certificate);
            }
            formData.append("password", data.password);
            formData.append("user_type", userType);
            let result;
            if (edit) {
                result = await updateCertificate(certificate?.id, formData);
            } else {
                result = await createCertificate(formData);
            }
            if (result?.errors) {
                const updatedErrors = {};
                const newErrors = result.errors;
                Object.keys(newErrors).forEach((key) => {
                    updatedErrors[key] = newErrors[key][0];
                });
                setErrors(updatedErrors);
            }
            if (result?.success) {
                toast.success(result?.message);
            } else {
                toast.error(result?.message);
            }
            setErrors(initialData);
            setData(initialData);
            setOpen(false);
            onSuccess();
        } catch (err) {
        } finally {
            setProcessing(false);
        }
    };
    return (
        <Modal
            open={open}
            setOpen={setOpen}
            title={edit ? t("edit_certificate") : t("create_new_certificate")}
        >
            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value={t("name")} />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                name: e.target.value,
                            }))
                        }
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>
                <div className="mt-1">
                    <InputLabel htmlFor="password" value={t("password")} />

                    <TextInput
                        id="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="password"
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                password: e.target.value,
                            }))
                        }
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center gap-3 mt-4">
                    <label className="btn btn-secondary">
                        <input
                            type="file"
                            onChange={(e) =>
                                setData((prev) => ({
                                    ...prev,
                                    certificate: e.target.files[0],
                                }))
                            }
                            className="hidden"
                        />
                        {t("choose_certificate")}
                    </label>
                    {data?.certificate && (
                        <div>
                            <h1 className="text-base-content text-xl text-bold">
                                {data.certificate?.name}
                            </h1>
                        </div>
                    )}
                </div>
                <InputError message={errors.certificate} className="mt-2" />

                <div className="mt-4 flex items-center">
                    <input
                        id="isActiveCert"
                        type="checkbox"
                        checked={data.is_active}
                        value={data.is_active}
                        className="checkbox"
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                is_active: e.target.checked,
                            }))
                        }
                    />
                    <label className="ml-2" htmlFor="isActiveCert">
                        {t("active")}
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        {edit ? t("edit") : t("create")}
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
};

export default CreateNewSignature;
