import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import { useTransition } from "react";
import useLocatioin from "../../../hooks/useLocation";
import { Select } from "../../../Components/Select";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;
    const { t } = useTranslation();
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            country: user.country,
            timezone: user.timezone,
        });
    const { countryList, timeZoneList } = useLocatioin();

    const submit = (e) => {
        e.preventDefault();

        patch(route("profile.update"));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-base-content">
                    {t("profile_information")}
                </h2>

                <p className="mt-1 text-sm text-base-content">
                    {t("profile_information_message")}
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value={t("name")} />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value={t("email")} />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                        autoComplete="username"
                        readOnly={true}
                    />

                    <InputError className="mt-2" message={errors.email} />
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

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            {t("email_address_unverified_message")}
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                {t("click_to_resend_verification_mail")}
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 font-medium text-sm text-success">
                                {t("new_verification_link_sent_message")}
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>
                        {t("save")}
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">{t("saved")}</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
