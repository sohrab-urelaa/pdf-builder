import { useEffect, useState } from "react";
import AdminLayout from "../../../Layouts/AdminLayout";
import InputLabel from "../../../Components/InputLabel";
import TextInput from "../../../Components/TextInput";
import InputError from "../../../Components/InputError";
import { saveGeneralSettings } from "../../../api/adminApi";
import { Select } from "../../../Components/Select";
import { Trans, useTranslation } from "react-i18next";
import TextArea from "../../../Components/TextArea";
import { toast } from "react-toastify";

const themes = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "nord",
    "sunset",
];
const labels = {
    site_name: "Site Name",
    site_description: "Site Description",
    default_language: "Default Language",
    time_zone: "Time Zone",
    contact_email: "Contact Email",
};
const initialData = {
    site_name: "",
    site_description: "",
    default_language: "",
    time_zone: "",
    contact_email: "",
    theme: "",
    home_page: "",
};

const GeneralSettings = ({ auth, settings }) => {
    const [files, setFiles] = useState({
        site_logo: null,
        favicon: null,
    });
    const [data, setData] = useState(initialData);
    const [errors, setErrors] = useState(initialData);
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        const newSetting = { ...settings };
        delete newSetting.site_logo;
        delete newSetting.favicon;
        delete newSetting.created_at;
        delete newSetting.updated_at;
        delete newSetting.id;

        const fetchedData = {};
        Object.keys(initialData).map((key) => {
            fetchedData[key] = settings[key];
        });

        setData(fetchedData);
        setFiles({
            site_logo: settings?.site_logo || null,
            favicon: settings?.favicon || null,
        });
    }, [settings]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!data.contact_email.trim()) {
            newErrors.contact_email = "Please enter contact email";
        }
        if (!data.default_language.trim()) {
            newErrors.default_language = "Please enter default language";
        }

        if (!data.site_description.trim()) {
            newErrors.site_description = "Please enter site description";
        }

        if (!data.site_name.trim()) {
            newErrors.site_name = "Please enter site name";
        }

        if (!data.time_zone.trim()) {
            newErrors.time_zone = "Please enter timezone";
        }
        if (!data.theme.trim()) {
            newErrors.time_zone = "Please select theme";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors(initialData);
        setLoading(true);
        try {
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            });

            if (files.favicon?.name) {
                formData.append("favicon", files.favicon);
            }
            if (files.site_logo?.name) {
                formData.append("site_logo", files.site_logo);
            }
            const result = await saveGeneralSettings(formData);

            if (result?.errors) {
                const updatedErrors = {};
                const newErrors = result.errors;
                Object.keys(newErrors).forEach((key) => {
                    updatedErrors[key] = newErrors[key][0];
                });
                setErrors(updatedErrors);
            } else {
                toast.success("Settings updated");
            }
        } catch (err) {
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout user={auth?.user} title={"Footer Settings"}>
            <div className="w-full lg:w-[80%] lg:mx-auto">
                <div className="flex items-center justify-between">
                    <p className="text-4xl font-bold">
                        {t("general_settings")}
                    </p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex items-center gap-3">
                        <label className="btn btn-secondary">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setFiles((files) => ({
                                        ...files,
                                        site_logo: e.target.files[0],
                                    }))
                                }
                                className="hidden"
                            />
                            {t("choose_site_logo")}
                        </label>
                        {files?.site_logo && (
                            <div className="flex flex-col gap-2">
                                <img
                                    className="h-[70px] w-[70px] rounded-md object-cover"
                                    src={
                                        files?.site_logo?.name
                                            ? URL.createObjectURL(
                                                  files.site_logo
                                              )
                                            : files.site_logo
                                    }
                                />
                                <h1>{files.site_logo?.name}</h1>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-3 mt-4">
                        <label className="btn btn-secondary">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setFiles((files) => ({
                                        ...files,
                                        favicon: e.target.files[0],
                                    }))
                                }
                                className="hidden"
                            />
                            {t("choose_favicon")}
                        </label>
                        {files?.favicon && (
                            <div className="flex flex-col gap-2">
                                <img
                                    className="h-[70px] w-[70px] rounded-md object-cover"
                                    src={
                                        files.favicon?.name
                                            ? URL.createObjectURL(files.favicon)
                                            : files.favicon
                                    }
                                />
                                <h1>{files.favicon?.name}</h1>
                            </div>
                        )}
                    </div>
                    {Object.keys(data).map((key) => {
                        if (key === "theme" || key === "home_page") {
                            return null;
                        }
                        const inputItem = data[key];
                        const label = <Trans t={t}>{labels[key]}</Trans>;

                        return (
                            <div className="mt-4">
                                <InputLabel htmlFor={key} value={label} />

                                <TextInput
                                    id={key}
                                    type="text"
                                    name={key}
                                    value={inputItem}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData((prev) => ({
                                            ...prev,
                                            [key]: e.target.value,
                                        }))
                                    }
                                />

                                <InputError
                                    message={errors[key] || ""}
                                    className="mt-2"
                                />
                            </div>
                        );
                    })}
                    <div className="mt-4">
                        <InputLabel htmlFor={"theme"} value={"Theme"} />

                        <Select
                            id={"theme"}
                            name={"theme"}
                            value={data.theme}
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData((prev) => ({
                                    ...prev,
                                    theme: e.target.value,
                                }))
                            }
                        >
                            {themes?.map((themeItem) => (
                                <option key={themeItem} value={themeItem}>
                                    {themeItem}
                                </option>
                            ))}
                        </Select>

                        <InputError
                            message={errors["theme"] || ""}
                            className="mt-2"
                        />
                    </div>
                    <div className="mt-4">
                        <InputLabel htmlFor={"home_page"} value={"Home Page"} />

                        <TextArea
                            id={"home_page"}
                            name={"home_page"}
                            value={data.home_page}
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData((prev) => ({
                                    ...prev,
                                    home_page: e.target.value,
                                }))
                            }
                            rows={5}
                        />

                        <InputError
                            message={errors["home_page"] || ""}
                            className="mt-2"
                        />
                    </div>
                    <br />
                    <br />
                    <button
                        onClick={handleSubmit}
                        type="submit"
                        className="btn btn-neutral w-[200px] text-xl"
                        disabled={loading}
                    >
                        {loading ? t("saving") : t("save")}
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
};

export default GeneralSettings;
