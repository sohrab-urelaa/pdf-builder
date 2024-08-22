import { useEffect, useState } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import { Select } from "../../Components/Select";
import useLocatioin from "../../hooks/useLocation";

export default function Register() {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        companyName: "",
        description: "",
        country: "",
        timezone: "",
    });
    const { countryList, timeZoneList } = useLocatioin();

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("register"));
    };
    return (
        <GuestLayout>
            <Head title="Register" />

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
                        onChange={(e) => setData("name", e.target.value)}
                    />

                    <InputError message={errors.name} className="mt-2" />
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
                        onChange={(e) => setData("email", e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="companyName" value="Company Name" />

                    <TextInput
                        id="companyName"
                        type="text"
                        name="companyName"
                        value={data.companyName}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("companyName", e.target.value)}
                    />

                    <InputError message={errors.companyName} className="mt-2" />
                </div>
                <div className="mt-4">
                    <InputLabel
                        htmlFor="description"
                        value="Company Description"
                    />

                    <TextInput
                        id="description"
                        type="text"
                        name="description"
                        value={data.description}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("description", e.target.value)}
                    />

                    <InputError message={errors.description} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="country" value={t("country")} />
                    <Select
                        id="country"
                        name="country"
                        value={data.country}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("country", e.target.value)}
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
                                setData("timezone", e.target.value)
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
                        onChange={(e) => setData("password", e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
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
                            setData("password_confirmation", e.target.value)
                        }
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route("login")}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
