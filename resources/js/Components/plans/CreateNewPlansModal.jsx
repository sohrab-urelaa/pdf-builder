import InputError from "../InputError";
import InputLabel from "../InputLabel";
import TextInput from "../TextInput";
import { useEffect, useState } from "react";
import PrimaryButton from "../PrimaryButton";
import { Select } from "../Select";
import Modal from "../utill/Modal";
import currency_lists from "../../lib/currency_list.json";
import { useTranslation } from "react-i18next";
import { createNewPlan, editPlan } from "../../api/planApi";
import { toast } from "react-toastify";
const initialData = {
    title: "",
    description: "",
    number_of_document: "",
    monthly_price: "",
    yearly_price: "",
    currency: "",
    currency_symbol: "",
    isDefault: false,
    currency_id: "",
    template_creation_limit: "",
    template_submission_limit_per_template: "",
    user_creation_limit: "",
    can_upload_certificate: false,
    can_config_email_template: false,
};

const CreateNewPlansModal = ({
    open,
    setOpen,
    edit = false,
    plan = {},
    onSuccess,
}) => {
    const { t } = useTranslation();
    const [currency_list, setCurrencyList] = useState(currency_lists);

    const [data, setData] = useState(initialData);
    const [errors, setErrors] = useState(initialData);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        if (edit && plan) {
            setData({
                ...plan,
                isDefault: Boolean(plan.isDefault),
                can_upload_certificate: Boolean(plan.can_upload_certificate),
                can_config_email_template: Boolean(
                    plan.can_config_email_template
                ),
            });
        }
    }, [plan]);

    const submit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        try {
            const formData = new FormData();
            Object.keys(data).forEach((dataKey) => {
                formData.append(dataKey, data[dataKey]);
            });
            let result;
            if (edit) {
                result = await editPlan(plan?.id, data);
            } else {
                result = await createNewPlan(data);
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

    const handleCurrencyChange = (value) => {
        const currency_item = currency_list.find((item) => item.id == value);
        setData((prev) => ({
            ...prev,
            currency_id: value,
            currency: currency_item?.currency_name,
            currency_symbol: currency_item?.currency_symbol,
        }));
    };
    return (
        <Modal
            open={open}
            setOpen={setOpen}
            title={edit ? t("update_plan") : t("create_new_plan")}
        >
            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="title" value={t("title")} />

                    <TextInput
                        id="title"
                        name="title"
                        type="text"
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

                    <InputError message={errors.title} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="description"
                        value={t("description")}
                    />
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
                    <InputError message={errors.description} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="yearly_price"
                        value={t("yearly_price")}
                    />

                    <TextInput
                        id="yearly_price"
                        type="number"
                        name="yearly_price"
                        value={data.yearly_price}
                        className="mt-1 block w-full"
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                yearly_price: e.target.value,
                            }))
                        }
                    />

                    <InputError
                        message={errors.yearly_price}
                        className="mt-2"
                    />
                </div>
                <div className="mt-4">
                    <InputLabel
                        htmlFor="monthly_price"
                        value={t("monthly_price")}
                    />

                    <TextInput
                        id="monthly_price"
                        type="number"
                        name="monthly_price"
                        value={data.monthly_price}
                        className="mt-1 block w-full"
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                monthly_price: e.target.value,
                            }))
                        }
                    />

                    <InputError
                        message={errors.monthly_price}
                        className="mt-2"
                    />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="currency" value={t("currency")} />
                    <Select
                        id="currency"
                        name="currency"
                        value={data.currency_id}
                        className="mt-1 block w-full"
                        onChange={(e) => handleCurrencyChange(e.target.value)}
                    >
                        {currency_list?.map((currency_item) => (
                            <option
                                key={currency_item.id}
                                value={currency_item.id}
                            >
                                {currency_item.currency_symbol}{" "}
                                {currency_item.currency_name}
                            </option>
                        ))}
                    </Select>

                    <InputError message={errors.currency} className="mt-2" />
                </div>
                <div className="mt-4">
                    <InputLabel
                        htmlFor="number_of_document"
                        value={t("template_creation_limit")}
                    />

                    <TextInput
                        id="number_of_document"
                        type="number"
                        name="number_of_document"
                        value={data.number_of_document}
                        className="mt-1 block w-full"
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                number_of_document: e.target.value,
                                template_creation_limit: e.target.value,
                            }))
                        }
                    />

                    <InputError
                        message={errors.number_of_document}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="template_submission_limit_per_template"
                        value={t("template_submission_limit_per_template")}
                    />

                    <TextInput
                        id="template_submission_limit_per_template"
                        type="number"
                        name="template_submission_limit_per_template"
                        value={data.template_submission_limit_per_template}
                        className="mt-1 block w-full"
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                template_submission_limit_per_template:
                                    e.target.value,
                            }))
                        }
                    />

                    <InputError
                        message={errors.template_submission_limit_per_template}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="user_creation_limit"
                        value={t("user_creation_limit")}
                    />

                    <TextInput
                        id="user_creation_limit"
                        type="number"
                        name="user_creation_limit"
                        value={data.user_creation_limit}
                        className="mt-1 block w-full"
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                user_creation_limit: e.target.value,
                            }))
                        }
                    />

                    <InputError
                        message={errors.user_creation_limit}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4 flex items-center">
                    <input
                        id="can_upload_certificate"
                        type="checkbox"
                        value={data.can_upload_certificate}
                        className="checkbox"
                        checked={data.can_upload_certificate}
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                can_upload_certificate: e.target.checked,
                            }))
                        }
                    />
                    <label className="ml-2" htmlFor="can_upload_certificate">
                        {t("can_upload_certificate")}
                    </label>
                </div>

                <div className="mt-4 flex items-center">
                    <input
                        id="can_config_email_template"
                        type="checkbox"
                        value={data.can_config_email_template}
                        className="checkbox"
                        checked={data.can_config_email_template}
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                can_config_email_template: e.target.checked,
                            }))
                        }
                    />
                    <label className="ml-2" htmlFor="can_config_email_template">
                        {t("can_config_email_template")}
                    </label>
                </div>
                <div className="mt-4 flex items-center">
                    <input
                        id="isDefaultPlan"
                        type="checkbox"
                        value={data.isDefault}
                        checked={data.isDefault}
                        className="checkbox"
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                isDefault: e.target.checked,
                            }))
                        }
                    />
                    <label className="ml-2" htmlFor="isDefaultPlan">
                        {t("default")}
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        {edit ? t("update") : t("create_plan")}
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
};

export default CreateNewPlansModal;
