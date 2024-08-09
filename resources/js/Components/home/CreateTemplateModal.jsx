import { useForm } from "@inertiajs/react";
import InputError from "../InputError";
import InputLabel from "../InputLabel";
import TextInput from "../TextInput";
import { useEffect, useState } from "react";
import PrimaryButton from "../PrimaryButton";
import Modal from "../utill/Modal";
import { router } from "@inertiajs/react";

import { defaultTemplate } from "./PdfDesigner";

const CreateTemplateModal = ({ open, setOpen }) => {
    const [data, setData] = useState({
        title: "",
        description: "",
    });
    const [errors, setErrors] = useState({
        title: "",
        description: "",
    });
    const [processing, setProcessing] = useState(false);
    const submit = (e) => {
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
        router.post("/pdf-templates", data2, {
            onSuccess: (res) => {
                if (res?.props?.template?.id) {
                    router.replace(
                        `/template-builder/${res?.props?.template?.id}`
                    );
                }
            },
        });
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
