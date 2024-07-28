import InputError from "../InputError";
import InputLabel from "../InputLabel";
import TextInput from "../TextInput";
import { useEffect, useState } from "react";
import PrimaryButton from "../PrimaryButton";
import Modal from "../utill/Modal";

const initialData = {
    name: "",
    email: "",
    location: "",
};

const SubmitTemplateModal = ({
    open,
    setOpen,
    onSuccess,
    isLoading = false,
}) => {
    const [data, setData] = useState(initialData);
    const [errors, setErrors] = useState(initialData);
    const submit = (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!data.name?.trim()) {
            newErrors.name = "Please enter your name!";
        }

        if (!data.email?.trim()) {
            newErrors.email = "Please enter your email";
        }
        if (!data.location?.trim()) {
            newErrors.location = "Please enter your location";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors(initialData);
        onSuccess(data);
    };
    return (
        <Modal open={open} setOpen={setOpen} title="Submit Template">
            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Name" />

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

                    <InputError message={errors?.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="email"
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                email: e.target.value,
                            }))
                        }
                    />

                    <InputError message={errors?.email} className="mt-2" />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="location" value="Location" />

                    <TextInput
                        id="location"
                        type="text"
                        name="location"
                        value={data.location}
                        className="mt-1 block w-full"
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                location: e.target.value,
                            }))
                        }
                    />

                    <InputError message={errors?.location} className="mt-2" />
                </div>
                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4" disabled={isLoading}>
                        Submit
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
};

export default SubmitTemplateModal;
