import { router, useForm } from "@inertiajs/react";
import UserSettingsLayout from "../../Layouts/UserSettingsLayout";
import PrimaryButton from "../../Components/PrimaryButton";
import InputError from "../../Components/InputError";
import { Select } from "../../Components/Select";
import InputLabel from "../../Components/InputLabel";
import TextInput from "../../Components/TextInput";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const UserCompany = ({ auth, company }) => {
    const { data, setData, post, processing, errors, reset, put } = useForm({
        companyName: "",
        description: "",
        planId: "",
    });
    const { t } = useTranslation();

    useEffect(() => {
        if (company) {
            setData(company);
        }
    }, [company]);

    const submit = (e) => {
        e.preventDefault();
        router.put(`/admin/company/${company?.id}`, {
            ...data,
            planId: data.planId?.toString(),
        });
    };

    return (
        <UserSettingsLayout user={auth?.user}>
            <div className="flex-grow mx-auto">
                <div className="my-6 flex items-center justify-between gap-3">
                    <p className="text-4xl font-bold">{t("company")}</p>
                </div>
            </div>
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

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        {t("update")}
                    </PrimaryButton>
                </div>
            </form>
        </UserSettingsLayout>
    );
};

export default UserCompany;
