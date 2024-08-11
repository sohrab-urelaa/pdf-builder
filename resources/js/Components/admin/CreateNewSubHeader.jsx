import { useForm } from "@inertiajs/react";
import InputError from "../InputError";
import InputLabel from "../InputLabel";
import TextInput from "../TextInput";
import { useEffect, useState } from "react";
import PrimaryButton from "../PrimaryButton";
import Modal from "../utill/Modal";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { createNewSubHeader, updateSubHeader } from "../../api/headerApi";
import TextArea from "../TextArea";
const initialData = {
    title: "",
    link: "",
    description: "",
};

const CreateNewSubHeader = ({
    open,
    setOpen,
    onSuccess,
    edit = false,
    headerId,
    subHeader = {},
}) => {
    const [data, setData] = useState(initialData);
    const [errors, setErrors] = useState(initialData);
    const [processing, setProcessing] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        if (subHeader?.id) {
            setData(subHeader);
        }
    }, [subHeader, edit]);

    const submit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!data.title?.trim()) {
            newErrors.title = "Please enter sub header title";
        }

        if (!data.link?.trim()) {
            newErrors.link = "Please enter sub header link";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors(initialData);
        setProcessing(true);

        try {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("link", data.link);
            formData.append("description", data.description || "");
            formData.append("nav_item_id", headerId);
            let result;
            if (edit) {
                result = await updateSubHeader(subHeader?.id, formData);
            } else {
                result = await createNewSubHeader(formData);
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
            title={edit ? t("edit_sub_header") : t("create_sub_header")}
        >
            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="title" value={t("title")} />

                    <TextInput
                        id="title"
                        name="title"
                        value={data.title}
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                title: e.target.value,
                            }))
                        }
                    />

                    <InputError message={errors.title} className="mt-2" />
                </div>
                <div className="mt-1">
                    <InputLabel htmlFor="link" value={t("link")} />

                    <TextInput
                        id="link"
                        name="link"
                        value={data.link}
                        className="mt-1 block w-full"
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                link: e.target.value,
                            }))
                        }
                    />

                    <InputError message={errors.link} className="mt-2" />
                </div>
                <div className="mt-1">
                    <InputLabel
                        htmlFor="description"
                        value={t("description")}
                    />

                    <TextArea
                        id="description"
                        name="description"
                        value={data.description}
                        className="mt-1 block w-full"
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                description: e.target.value,
                            }))
                        }
                        rows={2}
                    />

                    <InputError message={errors.description} className="mt-2" />
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

export default CreateNewSubHeader;
