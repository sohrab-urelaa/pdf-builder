import { useForm } from "@inertiajs/react";
import InputError from "../InputError";
import InputLabel from "../InputLabel";
import TextInput from "../TextInput";
import { useEffect, useState } from "react";
import PrimaryButton from "../PrimaryButton";
import Modal from "../utill/Modal";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { createnewFont, updateFont } from "../../api/fontApi";
const initialData = {
    font_name: "",
    font_family_file: "",
    is_active: false,
    is_public: false,
};

const CreateNewFont = ({
    open,
    setOpen,
    onSuccess,
    edit = false,
    font = {},
}) => {
    const [data, setData] = useState(initialData);
    const [errors, setErrors] = useState(initialData);
    const [processing, setProcessing] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        if (font?.id) {
            setData(font);
        }
    }, [font, edit]);

    const submit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!data.font_name?.trim()) {
            newErrors.font_name = "Please enter font name";
        }

        if (!edit && !data.font_family_file) {
            newErrors.font_family_file = "Please choose your font";
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors(initialData);
        setProcessing(true);

        try {
            const formData = new FormData();
            formData.append("font_name", data.font_name);
            if (data.font_family_file?.name) {
                formData.append("font_family_file", data.font_family_file);
            }
            formData.append("is_active", data.is_active);
            formData.append("is_public", data.is_public);
            let result;
            if (edit) {
                result = await updateFont(font?.id, formData);
            } else {
                result = await createnewFont(formData);
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
            title={edit ? t("edit_font") : t("create_font")}
        >
            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="font_name" value={t("font_name")} />

                    <TextInput
                        id="font_name"
                        name="font_name"
                        value={data.font_name}
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                font_name: e.target.value,
                            }))
                        }
                    />

                    <InputError message={errors.font_name} className="mt-2" />
                </div>
                <div className="flex items-center gap-3 mt-4">
                    <label className="btn btn-secondary">
                        <input
                            type="file"
                            onChange={(e) =>
                                setData((prev) => ({
                                    ...prev,
                                    font_family_file: e.target.files[0],
                                }))
                            }
                            className="hidden"
                        />
                        {t("choose_font")}
                    </label>
                    {data?.font_family_file?.name && (
                        <div>
                            <h1 className="text-base-content text-xl text-bold">
                                {data.font_family_file?.name}
                            </h1>
                        </div>
                    )}
                </div>
                <InputError
                    message={errors.font_family_file}
                    className="mt-2"
                />

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
                <div className="mt-4 flex items-center">
                    <input
                        id="isPublic"
                        type="checkbox"
                        checked={data.is_public}
                        value={data.is_public}
                        className="checkbox"
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                is_public: e.target.checked,
                            }))
                        }
                    />
                    <label className="ml-2" htmlFor="isPublic">
                        {t("public")}
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

export default CreateNewFont;
