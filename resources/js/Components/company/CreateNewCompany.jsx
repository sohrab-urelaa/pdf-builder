import InputError from "../InputError";
import InputLabel from "../InputLabel";
import TextInput from "../TextInput";
import { useEffect, useState } from "react";
import PrimaryButton from "../PrimaryButton";
import Modal from "../utill/Modal";
import { Select } from "../Select";
import { useTranslation } from "react-i18next";
import { createNewCompany, editCompany } from "../../api/companyApi";
import { toast } from "react-toastify";

const initialData = {
    companyName: "",
    description: "",
    planId: "",
};
const CreateNewCompany = ({
    open,
    setOpen,
    edit = false,
    company = {},
    onSuccess,
}) => {
    const [plans, setPlans] = useState([]);
    const { t } = useTranslation();
    const [data, setData] = useState(initialData);
    const [errors, setErrors] = useState(initialData);
    const [processing, setProcessing] = useState(false);
    useEffect(() => {
        if (edit && company) {
            setData({
                companyName: company?.companyName,
                description: company?.description,
                planId: company?.plan?.id,
            });
        }
    }, [company]);

    useEffect(() => {
        const fetchPlans = async () => {
            const res = await fetch("/admin/plans/json");
            const result = await res.json();
            setPlans(result || []);
        };
        fetchPlans();
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!data.companyName?.trim()) {
            newErrors.companyName = `Please enter company name`;
        }

        if (!data.description?.trim()) {
            newErrors.description = "Please enter company description";
        }

        if (!data.planId) {
            newErrors.planId = "Please choose plan";
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors(initialData);
        setProcessing(true);

        try {
            const formData = new FormData();
            formData.append("companyName", data.companyName);
            formData.append("description", data.description);
            formData.append("planId", data.planId);
            let result;
            if (edit) {
                result = await editCompany(company?.id, formData);
            } else {
                result = await createNewCompany(formData);
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
                toast.error(result?.message);
            }
            setErrors(initialData);
            setData(initialData);
            setOpen(false);
            if (onSuccess) {
                onSuccess();
            }
        } catch (err) {
        } finally {
            setProcessing(false);
        }
    };

    return (
        <Modal
            open={open}
            setOpen={setOpen}
            title={edit ? t("update_company") : t("create_new_company")}
        >
            <form onSubmit={submit}>
                <div>
                    <InputLabel
                        htmlFor="companyName"
                        value={t("company_name")}
                    />

                    <TextInput
                        id="companyName"
                        name="companyName"
                        type="text"
                        value={data.companyName}
                        className="mt-1 block w-full"
                        autoComplete="companyName"
                        isFocused={true}
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                companyName: e.target.value,
                            }))
                        }
                    />

                    <InputError
                        message={errors?.companyName}
                        className="mt-2"
                    />
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
                    <InputError
                        message={errors?.description}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="planId" value={t("plan")} />

                    <Select
                        id="planId"
                        name="planId"
                        value={data.planId}
                        className="mt-1 block w-full"
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                planId: e.target.value?.toString(),
                            }))
                        }
                    >
                        <option disabled value={""}>
                            {t("select_plan")}
                        </option>
                        {plans?.map((item) => (
                            <option key={item?.id} value={item?.id?.toString()}>
                                {item?.title}
                            </option>
                        ))}
                    </Select>

                    <InputError message={errors.planId} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        {edit ? t("update") : t("create_company")}
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
};

export default CreateNewCompany;
