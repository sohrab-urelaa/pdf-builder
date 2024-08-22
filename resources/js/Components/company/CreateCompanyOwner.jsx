import InputError from "../InputError";
import InputLabel from "../InputLabel";
import TextInput from "../TextInput";
import { useEffect, useState } from "react";
import PrimaryButton from "../PrimaryButton";
import Modal from "../utill/Modal";
import { assignOwnerIntoCompany } from "../../api/companyApi";
import { toast } from "react-toastify";
import useLocatioin from "../../hooks/useLocation";
import { useTranslation } from "react-i18next";
import { Select } from "../Select";

const initialData = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    company_id: "",
    country: "",
    timezone: "",
};

const CreateCompanyOwner = ({ open, setOpen, company, onSuccess }) => {
    const { t } = useTranslation();
    const [data, setData] = useState(initialData);
    const [errors, setErrors] = useState(initialData);
    const [processing, setProcessing] = useState(false);
    const { countryList, timeZoneList } = useLocatioin();

    useEffect(() => {
        setData((prev) => ({
            ...prev,
            company_id: company?.id,
        }));
    }, [company]);

    useEffect(() => {
        return () => {
            setData(initialData);
        };
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!data.name?.trim()) {
            newErrors.name = `Please enter name`;
        }

        if (!data.email?.trim()) {
            newErrors.email = "Please enter email";
        }

        if (!data.password?.trim()) {
            newErrors.password = "Please enter password";
        }
        if (!data.password_confirmation?.trim()) {
            newErrors.password_confirmation = "Please confirm the password";
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors(initialData);
        setProcessing(true);

        try {
            const formData = new FormData();
            Object.keys(data).forEach((dataKey) => {
                formData.append(dataKey, data[dataKey]);
            });

            let result = await assignOwnerIntoCompany(formData);
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
                setErrors(initialData);
                setData(initialData);
                setOpen(false);
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
        <Modal open={open} setOpen={setOpen} title="Create Company Owner">
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
                    <InputLabel htmlFor="country" value={t("country")} />
                    <Select
                        id="country"
                        name="country"
                        value={data.country}
                        className="mt-1 block w-full"
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                country: e.target.value,
                            }))
                        }
                    >
                        {countryList?.map((country) => (
                            <option key={country} value={country}>
                                {country}
                            </option>
                        ))}
                    </Select>

                    <InputError message={errors.country} className="mt-2" />
                </div>
                {data.country && (
                    <div className="mt-4">
                        <InputLabel htmlFor="timezone" value={t("timezone")} />
                        <Select
                            id="timezone"
                            name="timezone"
                            value={data.timezone}
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData((prev) => ({
                                    ...prev,
                                    timezone: e.target.value,
                                }))
                            }
                        >
                            <option value={""}>Select Timezone</option>
                            {timeZoneList[data.country]?.timeZones?.map(
                                (timezone) => (
                                    <option key={timezone} value={timezone}>
                                        {timezone}
                                    </option>
                                )
                            )}
                        </Select>

                        <InputError
                            message={errors.timezone}
                            className="mt-2"
                        />
                    </div>
                )}

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

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
                        value="Confirm Password"
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
                        Create Company Owner
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
};

export default CreateCompanyOwner;
