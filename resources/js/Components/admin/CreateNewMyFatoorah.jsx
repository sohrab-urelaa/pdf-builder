import InputError from "../InputError";
import InputLabel from "../InputLabel";
import TextInput from "../TextInput";
import { useEffect, useState } from "react";
import PrimaryButton from "../PrimaryButton";
import Modal from "../utill/Modal";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { createNewMyFatoorah, editMyFatoorah } from "../../api/myFatoorahApi";
const initialData = {
    name: "",
    api_key: "",
    is_active: false,
    test_mode: false,
};

const CreateNewMyFatoorah = ({
    open,
    setOpen,
    onSuccess,
    edit = false,
    editData = {},
}) => {
    const [data, setData] = useState(initialData);
    const [errors, setErrors] = useState(initialData);
    const [processing, setProcessing] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        if (editData?.id) {
            setData(editData);
        }
    }, [editData, edit]);

    const submit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!data.name?.trim()) {
            newErrors.name = "Please enter config name";
        }

        if (!data.api_key) {
            newErrors.api_key = "Please enter fatoorah api key";
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
            formData.append("api_key", data.api_key);
            formData.append("is_active", data.is_active);
            formData.append("test_mode", data.test_mode);
            let result;
            if (edit) {
                result = await editMyFatoorah(editData?.id, formData);
            } else {
                result = await createNewMyFatoorah(formData);
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
                toast.message(result?.message);
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
            title={edit ? t("edit_my_fatoorah") : t("create_my_fatoorah")}
        >
            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value={t("name")} />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
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
                <div className="mt-4">
                    <InputLabel htmlFor="api_key" value={t("api_key")} />

                    <TextInput
                        id="api_key"
                        name="api_key"
                        value={data.api_key}
                        className="mt-1 block w-full"
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                api_key: e.target.value,
                            }))
                        }
                    />
                    <InputError message={errors.api_key} className="mt-2" />
                </div>

                <div className="mt-4 flex items-center">
                    <input
                        id="isActiveFatoorah"
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
                <div className="mt-4 flex items-center">
                    <input
                        id="isTestMode"
                        type="checkbox"
                        checked={data.test_mode}
                        value={data.test_mode}
                        className="checkbox"
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                test_mode: e.target.checked,
                            }))
                        }
                    />
                    <label className="ml-2" htmlFor="isTestMode">
                        {t("test_mode")}
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

export default CreateNewMyFatoorah;
