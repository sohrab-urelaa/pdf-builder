import InputError from "../InputError";
import InputLabel from "../InputLabel";
import TextInput from "../TextInput";
import { useEffect, useState } from "react";
import PrimaryButton from "../PrimaryButton";
import Modal from "../utill/Modal";
import { useTranslation } from "react-i18next";
import { createNewUser, updateExistingUser } from "../../api/userApi";
import { toast } from "react-toastify";

const initialData = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
};
const CreateUserModal = ({
    open,
    setOpen,
    edit = false,
    user = {},
    onSuccess,
}) => {
    // const { data, setData, post, processing, errors, reset } = useForm();

    const { t } = useTranslation();

    const [data, setData] = useState(initialData);
    const [errors, setErrors] = useState(initialData);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        if (edit && user) {
            setData((prev) => ({
                ...prev,
                email: user.email,
                name: user.name,
            }));
        }
    }, [user]);

    useEffect(() => {
        return () => {
            setData(initialData);
        };
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        try {
            let result;
            if (edit) {
                result = await updateExistingUser(user?.id, data);
            } else {
                result = await createNewUser(data);
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
                setOpen(false);
                setData(initialData);
                setErrors(initialData);
                if (onSuccess) {
                    onSuccess();
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
        <Modal open={open} setOpen={setOpen} title={t("register_new_user")}>
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

                    <InputError message={errors?.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value={t("email")} />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
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
                    <InputLabel htmlFor="password" value={t("password")} />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                password: e.target.value,
                            }))
                        }
                    />

                    <InputError message={errors?.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value={t("confirm_password")}
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                password_confirmation: e.target.value,
                            }))
                        }
                    />

                    <InputError
                        message={errors?.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        {edit ? t("edit") : t("create_user")}
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
};

export default CreateUserModal;
