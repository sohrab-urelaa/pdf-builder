import InputError from "../InputError";
import InputLabel from "../InputLabel";
import TextInput from "../TextInput";
import { useEffect, useState } from "react";
import PrimaryButton from "../PrimaryButton";
import Modal from "../utill/Modal";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { createNewHeader, updateHeader } from "../../api/headerApi";
import { Select } from "../Select";
import TextArea from "../TextArea";
const initialData = {
    name: "",
    link: "",
    public: "",
    subModules: false,
    has_dynamic_html: false,
    dynamic_html: "",
};

const CreateNewHeader = ({
    open,
    setOpen,
    onSuccess,
    edit = false,
    header = {},
    nav_type = "header",
}) => {
    const isHeader = nav_type === "header";
    const [data, setData] = useState(initialData);
    const [errors, setErrors] = useState(initialData);
    const [processing, setProcessing] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        setData((prev) => {
            return {
                ...prev,
                subModules: nav_type === "footer",
            };
        });
        return () => {
            setData(initialData);
        };
    }, [nav_type]);
    useEffect(() => {
        if (header?.id) {
            const isSubModuele = header?.subModules === 1;
            const hasDynamicHTML = header?.has_dynamic_html === 1;
            setData((prev) => ({
                ...header,
                subModules: isSubModuele,
                has_dynamic_html: hasDynamicHTML,
            }));
        }
    }, [header, edit]);

    const submit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!data.name?.trim()) {
            newErrors.name = `Please enter ${
                isHeader ? "header " : "footer "
            } name`;
        }

        if (!data.public?.trim()) {
            newErrors.public = "Please choose visibility";
        }

        if (!data.link?.trim() && !data.subModules) {
            newErrors.link = `Please enter  ${
                isHeader ? "header " : "footer "
            } link`;
        }
        if (!data.dynamic_html?.trim() && data.dynamic_html) {
            newErrors.dynamic_html = "Please enter HTML for this route";
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors(initialData);
        setProcessing(true);

        try {
            const isSubModules = isHeader ? data.subModules.toString() : "true";
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("link", data.link);
            formData.append("public", data.public);
            formData.append("subModules", isSubModules);
            formData.append(
                "has_dynamic_html",
                data.has_dynamic_html.toString()
            );
            formData.append("dynamic_html", data.dynamic_html);
            formData.append("nav_type", nav_type);
            let result;
            if (edit) {
                result = await updateHeader(header?.id, formData);
            } else {
                result = await createNewHeader(formData);
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
            onSuccess();
        } catch (err) {
        } finally {
            setProcessing(false);
        }
    };
    return (
        <Modal
            onClose={() => {
                setData(initialData);
            }}
            open={open}
            setOpen={setOpen}
            title={
                edit
                    ? isHeader
                        ? t("edit_header")
                        : t("edit_footer")
                    : isHeader
                    ? t("create_header")
                    : t("create_new_footer")
            }
        >
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

                    <InputError message={errors.name} className="mt-2" />
                </div>
                <div className="mt-1">
                    <InputLabel htmlFor="link" value={t("link")} />

                    <TextInput
                        id="link"
                        name="link"
                        value={data.link}
                        className="mt-1 block w-full"
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                link: e.target.value,
                            }))
                        }
                    />

                    <InputError message={errors.link} className="mt-2" />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="public" value={t("visible_for")} />
                    <Select
                        id="public"
                        name="public"
                        value={data.public}
                        className="mt-1 block w-full"
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                public: e.target.value,
                            }))
                        }
                    >
                        <option disabled value={""}>
                            {t("choose_visibility")}
                        </option>
                        {["public", "private", "both"].map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </Select>

                    <InputError message={errors.public} className="mt-2" />
                </div>
                {isHeader && (
                    <div className="mt-4 flex items-center">
                        <input
                            id="isActiveCert"
                            type="checkbox"
                            checked={data.subModules}
                            value={data.subModules}
                            className="checkbox"
                            onChange={(e) => {
                                const checked = e.target.checked;
                                setData((prev) => ({
                                    ...prev,
                                    subModules: e.target.checked,
                                    has_dynamic_html: checked
                                        ? false
                                        : prev.has_dynamic_html,
                                }));
                            }}
                        />
                        <label className="ml-2" htmlFor="isActiveCert">
                            {t("has_sub_modules")}
                        </label>
                    </div>
                )}

                {!data.subModules && isHeader && (
                    <div className="mt-4 flex items-center">
                        <input
                            id="has_dynamic_html"
                            type="checkbox"
                            checked={data.has_dynamic_html}
                            value={data.has_dynamic_html}
                            className="checkbox"
                            onChange={(e) =>
                                setData((prev) => ({
                                    ...prev,
                                    has_dynamic_html: e.target.checked,
                                }))
                            }
                        />
                        <label className="ml-2" htmlFor="has_dynamic_html">
                            {t("has_dynamic_html")}
                        </label>
                    </div>
                )}

                {data.has_dynamic_html && isHeader && (
                    <div className="mt-4">
                        <InputLabel
                            htmlFor="dynamic_html"
                            value={t("html_for_link")}
                        />

                        <TextArea
                            id="dynamic_html"
                            name="dynamic_html"
                            value={data.dynamic_html}
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData((prev) => ({
                                    ...prev,
                                    dynamic_html: e.target.value,
                                }))
                            }
                            rows={5}
                        />

                        <InputError
                            message={errors.dynamic_html}
                            className="mt-2"
                        />
                    </div>
                )}

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        {edit ? t("edit") : t("create")}
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
};

export default CreateNewHeader;
