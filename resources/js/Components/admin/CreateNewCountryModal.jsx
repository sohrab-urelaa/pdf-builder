import InputError from "../InputError";
import InputLabel from "../InputLabel";
import TextInput from "../TextInput";
import { useEffect, useState } from "react";
import PrimaryButton from "../PrimaryButton";
import Modal from "../utill/Modal";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { createNewCountry, editCountry } from "../../api/countryApi";
const initialData = {
    country_name: "",
    is_active: false,
};

const CreatenewCountryModal = ({
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

        if (!data.country_name?.trim()) {
            newErrors.country_name = "Please enter country name";
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors(initialData);
        setProcessing(true);

        try {
            let isActive = data.is_active;
            if (data.is_active == "1" || data.is_active == "0") {
                isActive = data.is_active == "1" ? true : false;
            }
            const formData = new FormData();
            formData.append("country_name", data.country_name);
            formData.append("is_active", isActive);
            let result;
            if (edit) {
                result = await editCountry(editData?.id, formData);
            } else {
                result = await createNewCountry(formData);
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
            title={edit ? t("edit_country") : t("create_new_country")}
        >
            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value={t("name")} />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.country_name}
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                country_name: e.target.value,
                            }))
                        }
                    />

                    <InputError
                        message={errors.country_name}
                        className="mt-2"
                    />
                </div>
                <div className="mt-4 flex items-center">
                    <input
                        id="isActiveCountry"
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
                    <label className="ml-2" htmlFor="isActiveCountry">
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

export default CreatenewCountryModal;
