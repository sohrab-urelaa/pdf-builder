import InputError from "../InputError";
import InputLabel from "../InputLabel";
import TextInput from "../TextInput";
import { useEffect, useState } from "react";
import PrimaryButton from "../PrimaryButton";
import Modal from "../utill/Modal";
import { router } from "@inertiajs/react";

import { defaultTemplate } from "./PdfDesigner";
import { createNewTemplate } from "../../api/templateApi";
import { toast } from "react-toastify";

const initialData = {
    title: "",
    description: "",
};
const CreateTemplateModal = ({ open, setOpen, onSuccess, clonedTemplate }) => {
    const [data, setData] = useState(initialData);
    const [errors, setErrors] = useState({
        title: "",
        description: "",
    });
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        if (clonedTemplate?.id) {
            setData({
                title: clonedTemplate?.title,
                description: clonedTemplate?.description,
            });
        }
    }, [clonedTemplate]);

    const submit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!data.title?.trim()) {
            newErrors.title = "Please enter title!";
        }

        if (!data.description?.trim()) {
            newErrors.description = "Please enter description";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors({ title: "", description: "" });
        setProcessing(true);
        const pdf_link = "demo.pdf";
        const data2 = {
            template_json: JSON.stringify(defaultTemplate.template),
            templated_pdf_link: pdf_link,
            title: data.title,
            description: data.description,
        };

        if (clonedTemplate?.id) {
            data2.clone_template_id = clonedTemplate?.id;
        }

        try {
            let result = await createNewTemplate(data2);

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
                setOpen(false);
                setData(initialData);
                setErrors(initialData);
                if (onSuccess) {
                    onSuccess(result?.data);
                }
            } else {
                toast.error(result?.message);
            }
        } catch (err) {
        } finally {
            setProcessing(false);
        }
    };
    return (
        <Modal open={open} setOpen={setOpen} title="Create New Template">
            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="title" value="Title" />

                    <TextInput
                        id="title"
                        name="title"
                        value={data.title}
                        className="mt-1 block w-full"
                        autoComplete="title"
                        isFocused={true}
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                title: e.target.value,
                            }))
                        }
                    />

                    <InputError message={errors?.title} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="description" value="Description" />

                    <TextInput
                        id="description"
                        type="text"
                        name="description"
                        value={data.description}
                        className="mt-1 block w-full"
                        autoComplete="description"
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                description: e.target.value,
                            }))
                        }
                    />

                    <InputError
                        message={errors?.description}
                        className="mt-2"
                    />
                </div>
                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Create
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
};

export default CreateTemplateModal;
