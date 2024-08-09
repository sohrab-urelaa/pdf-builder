import { router, useForm } from "@inertiajs/react";
import InputError from "../InputError";
import InputLabel from "../InputLabel";
import TextInput from "../TextInput";
import { useEffect, useState } from "react";
import PrimaryButton from "../PrimaryButton";
import Modal from "../utill/Modal";
import { Select } from "../Select";
import { useTranslation } from "react-i18next";

const CreateNewCompany = ({ open, setOpen, edit = false, company = {} }) => {
    const [plans, setPlans] = useState([]);
    const { t } = useTranslation();
    const { data, setData, post, processing, errors, reset, put } = useForm({
        companyName: "",
        description: "",
        planId: "",
    });

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

    const submit = (e) => {
        e.preventDefault();
        if (edit) {
            router.put(
                `/admin/company/${company?.id}`,
                {
                    ...data,
                    planId: data.planId?.toString(),
                },
                {
                    onSuccess: (res) => {
                        if (res?.props?.company?.id) {
                            setOpen(false);
                        }
                    },
                }
            );
        } else {
            post(route("company.create"), {
                onSuccess: (res) => {
                    if (res.props.company) {
                        setOpen(false);
                    }
                },
            });
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
                        onChange={(e) => setData("companyName", e.target.value)}
                    />

                    <InputError message={errors.companyName} className="mt-2" />
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
                        onChange={(e) => setData("description", e.target.value)}
                    />
                    <InputError message={errors.description} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="planId" value={t("plan")} />

                    <Select
                        id="planId"
                        name="planId"
                        value={data.planId}
                        className="mt-1 block w-full"
                        onChange={(e) =>
                            setData("planId", e.target.value?.toString())
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
