import InputError from "../InputError";
import InputLabel from "../InputLabel";
import TextInput from "../TextInput";
import { useEffect, useState } from "react";
import PrimaryButton from "../PrimaryButton";
import Modal from "../utill/Modal";
import { toast } from "react-toastify";
import { createNewContactUs } from "../../api/contactApi";
import { useTranslation } from "react-i18next";
import TextArea from "../TextArea";
const initialData = {
    firstName: "",
    lastName: "",
    email: "",
    message: "",
};
const ContactUsForm = ({}) => {
    const { t } = useTranslation();
    const [data, setData] = useState(initialData);
    const [errors, setErrors] = useState(initialData);
    const [processing, setProcessing] = useState(false);

    const submit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!data.firstName?.trim()) {
            newErrors.firstName = "Please enter first name!";
        }

        if (!data.lastName?.trim()) {
            newErrors.lastName = "Please enter last name";
        }
        if (!data.email?.trim()) {
            newErrors.email = "Please enter email";
        }

        if (!data.message?.trim()) {
            newErrors.message = "Please enter message";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors(initialData);
        setProcessing(true);
        try {
            let result = await createNewContactUs(data);

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
                setData(initialData);
                setErrors(initialData);
            } else {
                toast.error(result?.message);
            }
        } catch (err) {
        } finally {
            setProcessing(false);
        }
    };
    return (
        <form onSubmit={submit}>
            <div>
                <InputLabel htmlFor="firstName" value={t("first_name")} />

                <TextInput
                    id="firstName"
                    name="firstName"
                    value={data.firstName}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) =>
                        setData((prev) => ({
                            ...prev,
                            firstName: e.target.value,
                        }))
                    }
                />

                <InputError message={errors?.firstName} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="lastName" value={t("last_name")} />

                <TextInput
                    id="lastName"
                    type="text"
                    name="lastName"
                    value={data.lastName}
                    className="mt-1 block w-full"
                    autoComplete="lastName"
                    onChange={(e) =>
                        setData((prev) => ({
                            ...prev,
                            lastName: e.target.value,
                        }))
                    }
                />

                <InputError message={errors?.lastName} className="mt-2" />
            </div>
            <div className="mt-4">
                <InputLabel htmlFor="email" value={t("email")} />

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
                <InputLabel htmlFor="message" value={t("message")} />

                <TextArea
                    id="message"
                    name="message"
                    value={data.message}
                    className="mt-1 block w-full"
                    rows={4}
                    onChange={(e) =>
                        setData((prev) => ({
                            ...prev,
                            message: e.target.value,
                        }))
                    }
                />

                <InputError message={errors?.message} className="mt-2" />
            </div>
            <div className="flex items-center justify-end mt-4">
                <PrimaryButton className="ms-4" disabled={processing}>
                    Submit
                </PrimaryButton>
            </div>
        </form>
    );
};

export default ContactUsForm;
