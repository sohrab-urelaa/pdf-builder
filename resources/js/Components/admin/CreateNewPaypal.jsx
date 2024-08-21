import InputError from "../InputError";
import InputLabel from "../InputLabel";
import TextInput from "../TextInput";
import { useEffect, useState } from "react";
import PrimaryButton from "../PrimaryButton";
import Modal from "../utill/Modal";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { createNewPaypal, editPaypal } from "../../api/paypalApi";
import { Select } from "../Select";
const initialData = {
    name: "",
    client_id: "",
    client_secret: "",
    app_id: "",
    payment_action: "",
    locale: "",
    is_active: false,
    test_mode: false,
};

const CreateNewPaypal = ({
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
            setData({
                ...editData,
                is_active: Boolean(editData?.is_active),
                test_mode: Boolean(editData?.test_mode),
            });
        }
    }, [editData, edit]);

    const submit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!data.name?.trim()) {
            newErrors.name = "Please enter config name";
        }

        if (!data.client_id?.trim()) {
            newErrors.client_id = "Please enter paypal client id";
        }

        if (!data.client_secret?.trim()) {
            newErrors.client_secret = "Please enter paypal client secret";
        }

        if (!data.app_id?.trim()) {
            newErrors.app_id = "Please enter app id";
        }

        if (!data.locale?.trim()) {
            newErrors.locale = "Please select locale";
        }

        if (!data.payment_action?.trim()) {
            newErrors.payment_action = "Please select payment action";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors(initialData);
        setProcessing(true);

        try {
            let result;
            if (edit) {
                result = await editPaypal(editData?.id, data);
            } else {
                result = await createNewPaypal(data);
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
            title={edit ? t("edit_paypal") : t("create_paypal")}
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
                    <InputLabel htmlFor="client_id" value={t("client_id")} />

                    <TextInput
                        id="client_id"
                        name="client_id"
                        value={data.client_id}
                        className="mt-1 block w-full"
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                client_id: e.target.value,
                            }))
                        }
                    />
                    <InputError message={errors.client_id} className="mt-2" />
                </div>
                <div className="mt-4">
                    <InputLabel
                        htmlFor="client_secret"
                        value={t("client_secret")}
                    />

                    <TextInput
                        id="client_secret"
                        name="client_secret"
                        value={data.client_secret}
                        className="mt-1 block w-full"
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                client_secret: e.target.value,
                            }))
                        }
                    />
                    <InputError
                        message={errors.client_secret}
                        className="mt-2"
                    />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="app_id" value={t("app_id")} />

                    <TextInput
                        id="app_id"
                        name="app_id"
                        value={data.app_id}
                        className="mt-1 block w-full"
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                app_id: e.target.value,
                            }))
                        }
                    />
                    <InputError message={errors.app_id} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="payment_action"
                        value={t("payment_action")}
                    />
                    <Select
                        id="payment_action"
                        name="payment_action"
                        value={data.payment_action}
                        className="mt-1 block w-full"
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                payment_action: e.target.value,
                            }))
                        }
                    >
                        {["Sale", "Authorization", "Order"]?.map(
                            (optionItem) => (
                                <option key={optionItem} value={optionItem}>
                                    {optionItem}
                                </option>
                            )
                        )}
                    </Select>

                    <InputError
                        message={errors.payment_action}
                        className="mt-2"
                    />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="locale" value={t("locale")} />
                    <Select
                        id="locale"
                        name="locale"
                        value={data.locale}
                        className="mt-1 block w-full"
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                locale: e.target.value,
                            }))
                        }
                    >
                        {["en_US", "it_IT", "es_ES"]?.map((optionItem) => (
                            <option key={optionItem} value={optionItem}>
                                {optionItem}
                            </option>
                        ))}
                    </Select>

                    <InputError message={errors.locale} className="mt-2" />
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

export default CreateNewPaypal;
