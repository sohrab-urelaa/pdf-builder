import AdminLayout from "../../Layouts/AdminLayout";
import InputLabel from "../../Components/InputLabel";
import TextInput from "../../Components/TextInput";
import InputError from "../../Components/InputError";
import PrimaryButton from "../../Components/PrimaryButton";
import { useEffect, useState } from "react";
import {
    createNewLanguage,
    getLanguageJSON,
    updateLanguage,
} from "../../api/languageApi";
import { toast } from "react-toastify";
import ActionModal from "../../Components/utill/ActionModal";
import { router } from "@inertiajs/react";

const initialData = {
    country_name: "",
    country_code: "",
    is_active: false,
};
const CreateNewLanguage = ({ auth, edit_language }) => {
    const [data, setData] = useState(initialData);
    const [errors, setErrors] = useState(initialData);
    const [isDataSubmitted, setIsDataSubmitted] = useState(false);
    const [getLangLoading, setGetLangLoading] = useState(false);

    const [englishLang, setEnglishLang] = useState({});
    const [newLang, setNewLang] = useState({});
    const [createLoading, setCreateLoading] = useState(false);
    const [localStorageData, setLocalStorageData] = useState([]);
    const [deleteActionModal, setDeleteActionModal] = useState(false);
    const [deleteLang, setDeleteLang] = useState(null);
    const [addNewField, setNewField] = useState(false);
    const [newFieldValue, setNewFieldValue] = useState("");
    const [newFieldKey, setNewFieldKey] = useState("");
    const fetchLocalInfo = () => {
        const localNewLang = localStorage.getItem("LanguageTranslations");
        if (localNewLang) {
            setLocalStorageData(JSON.parse(localNewLang));
        }
    };
    useEffect(() => {
        fetchEnglishLang();
        if (edit_language?.id) {
            setData({
                country_code: edit_language?.country_code,
                country_name: edit_language?.country_name,
                is_active: edit_language?.is_active == "0" ? false : true,
            });
        } else {
            fetchLocalInfo();
        }
    }, [edit_language]);

    const fetchEnglishLang = async () => {
        try {
            setGetLangLoading(true);
            const res = await getLanguageJSON("en-US");
            setEnglishLang(res);
        } catch (e) {
            console.log("", e);
        } finally {
            setGetLangLoading(false);
        }
    };

    const fetchOtherLang = async (lang) => {
        try {
            setGetLangLoading(true);
            const res = await getLanguageJSON(lang);
            setNewLang(res);

            // setIsDataSubmitted(true);
        } catch (e) {
            console.log("", e);
        } finally {
            setGetLangLoading(false);
        }
    };

    const submit = (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!data.country_code?.trim()) {
            newErrors.country_code = "Please enter country code.";
        }

        if (!data.country_name?.trim()) {
            newErrors.country_name = "Please enter country name.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors(initialData);
        setIsDataSubmitted(true);
        const localDataMatched = localStorageData.find(
            (item) => item?.data?.country_name === data.country_name
        );
        if (localDataMatched && !edit_language?.id) {
            setNewLang(localDataMatched?.translations);
        } else if (edit_language?.id) {
            fetchOtherLang(edit_language?.country_code);
        } else {
            setNewLang({});
        }
        // fetchEnglishLang();
    };

    const isFormFullEntered = () => {
        const englishLangKeys = Object.keys(englishLang);
        const newLangKeys = Object.keys(newLang);
        const isAllFilled =
            newLangKeys.filter((itemKey) => !newLang[itemKey]?.trim())
                .length === 0;
        let extraKeys = [];

        if (englishLangKeys.length < newLangKeys.length) {
            extraKeys = newLangKeys.filter(
                (key) => !englishLangKeys.includes(key)
            );
        }
        return {
            isFormValid:
                englishLangKeys.length <= newLangKeys.length && isAllFilled,
            englishLangKeys,
            newLangKeys,
            extraKeysInNew: extraKeys,
        };
    };

    const saveDataInfoLocal = () => {
        const prevTranslations = localStorage.getItem("LanguageTranslations");
        let prevData = [];
        if (prevTranslations) {
            prevData = JSON.parse(prevTranslations);
        }
        const prevDataMatched =
            prevData?.filter(
                (item) => item.data?.country_name === data?.country_name
            ).length > 0;
        let updatedData = prevData;

        if (prevDataMatched) {
            updatedData = prevData?.map((item) => {
                if (item.data?.country_name === data?.country_name) {
                    return {
                        translations: newLang,
                        data: data,
                    };
                } else {
                    return item;
                }
            });
        } else {
            updatedData.push({
                translations: newLang,
                data: data,
            });
        }
        localStorage.setItem(
            "LanguageTranslations",
            JSON.stringify(updatedData)
        );
        toast.success("Data Successfully Saved");
    };

    const handleDeleteLang = () => {
        const updatedData = localStorageData?.filter(
            (item) => item.data?.country_name !== deleteLang?.data?.country_name
        );
        localStorage.setItem(
            "LanguageTranslations",
            JSON.stringify(updatedData)
        );
        fetchLocalInfo();
        setDeleteActionModal(false);
        setDeleteLang(null);
    };

    const handleCreateLanguage = async () => {
        const isFormValid = isFormFullEntered().isFormValid;

        if (!isFormValid) {
            saveDataInfoLocal();
            return;
        }

        setCreateLoading(true);
        try {
            const formData = new FormData();
            const jsonData = JSON.stringify(newLang);
            const jsonBlob = new Blob([jsonData], { type: "application/json" });
            const jsonFile = new File([jsonBlob], `${data.country_code}.json`, {
                type: "application/json",
            });
            formData.append("country_name", data.country_name);
            formData.append("country_code", data.country_code);
            formData.append("is_active", data.is_active ? "true" : "false");
            formData.append("translation_file", jsonFile);
            let res;
            if (!edit_language) {
                res = await createNewLanguage(formData);
            } else {
                formData.append("id", edit_language?.id);
                res = await updateLanguage(formData);
            }

            if (res?.success) {
                toast.success(res?.message);
                const updatedData = localStorageData?.filter(
                    (item) => item.data?.country_name !== data?.country_name
                );
                localStorage.setItem(
                    "LanguageTranslations",
                    JSON.stringify(updatedData)
                );
                fetchLocalInfo();
                router.replace("/admin/language");
            } else {
                toast.error(res?.message);
                displayErrors(res?.errors);
            }
        } catch (err) {
            console.log(err);
            toast.error("Something wen't wrong, please try again later.");
        } finally {
            setCreateLoading(false);
        }
    };

    const displayErrors = (errors) => {
        const errKeys = Object.keys(errors);
        if (errors && errKeys?.length > 0) {
            const firstKey = errKeys[0];
            const message = errors[firstKey][0];
            toast.error(message);
        }
    };

    return (
        <AdminLayout title={"Company"} user={auth?.user}>
            <div className="max-w-7xl mx-auto sm:px-2">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                    <p className="text-4xl font-bold">Create New Language</p>
                </div>
                <br />
                {!isDataSubmitted && (
                    <>
                        <div className="flex items-center gap-4 flex-wrap my-2">
                            {localStorageData.map((localD) => {
                                return (
                                    <div
                                        onClick={() => {
                                            setData(localD.data);
                                            setNewLang(localD?.translations);
                                            setIsDataSubmitted(true);
                                        }}
                                        className="py-2 px-8 border cursor-pointer rounded-lg border-gray-400 text-xl relative"
                                    >
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setDeleteActionModal(true);
                                                setDeleteLang(localD);
                                            }}
                                            className="btn btn-sm btn-circle absolute right-0 top-0"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </button>
                                        Continue with -
                                        <span className="">
                                            {localD?.data?.country_name}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                        <p className="mt-4 mb-2 text-2xl font-bold">
                            Continue with New One
                        </p>
                        <form onSubmit={submit} className="max-w-xl">
                            <div>
                                <InputLabel
                                    htmlFor="country_name"
                                    value="Country Name"
                                />

                                <TextInput
                                    id="country_name"
                                    name="country_name"
                                    value={data.country_name}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData((prev) => ({
                                            ...prev,
                                            country_name: e.target.value,
                                        }))
                                    }
                                />

                                <InputError
                                    message={errors?.country_name}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="country_code"
                                    value="Country Code"
                                />

                                <TextInput
                                    id="country_code"
                                    type="text"
                                    name="country_code"
                                    value={data.country_code}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData((prev) => ({
                                            ...prev,
                                            country_code: e.target.value,
                                        }))
                                    }
                                />

                                <InputError
                                    message={errors?.country_code}
                                    className="mt-2"
                                />
                            </div>
                            <div className="flex items-center justify-end mt-4">
                                <PrimaryButton className="ms-4">
                                    Next
                                </PrimaryButton>
                            </div>
                        </form>
                    </>
                )}

                {isDataSubmitted && getLangLoading && (
                    <div className="my-3 flex items-center justify-center">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                )}

                {isDataSubmitted && !getLangLoading && (
                    <>
                        <div className="my-3 flex flex-col gap-4">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => {
                                        setData(initialData);
                                        setIsDataSubmitted(false);
                                        setNewLang({});
                                        fetchLocalInfo();
                                    }}
                                    className="btn btn-neutral text-xl my-2 max-w-[280px]"
                                >
                                    Create Another Language
                                </button>
                                <button
                                    onClick={() => {
                                        setNewLang({ ...englishLang });
                                    }}
                                    className="btn btn-neutral text-xl my-2 max-w-[280px]"
                                >
                                    Fill With English
                                </button>
                                <div className="form-control">
                                    <label className="label cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="toggle"
                                            checked={data.is_active}
                                            onChange={(e) => {
                                                setData((prev) => {
                                                    return {
                                                        ...prev,
                                                        is_active:
                                                            e.target.checked,
                                                    };
                                                });
                                            }}
                                        />
                                        <span className="label-text ml-2">
                                            {data?.is_active
                                                ? "Active"
                                                : "Deactive"}
                                        </span>
                                    </label>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <h3 className="basis-[300px] font-bold text-xl">
                                    English
                                </h3>
                                <h3 className="font-bold text-xl">
                                    {data.country_name}
                                </h3>
                            </div>
                            {Object.keys(englishLang).map((englishLangKey) => {
                                const englishData = englishLang[englishLangKey];
                                const newLangData =
                                    newLang[englishLangKey] ?? "";
                                return (
                                    <div
                                        className="flex items-center gap-2"
                                        key={englishLangKey}
                                    >
                                        <h3 className="basis-[300px]">
                                            {englishData}
                                        </h3>
                                        <TextInput
                                            value={newLangData}
                                            className="mt-1 block flex-[1]"
                                            onChange={(e) =>
                                                setNewLang((prev) => ({
                                                    ...prev,
                                                    [englishLangKey]:
                                                        e.target.value,
                                                }))
                                            }
                                        />
                                    </div>
                                );
                            })}
                            {isFormFullEntered().extraKeysInNew.map(
                                (extraKey) => {
                                    const englishData = "--";
                                    const newLangData = newLang[extraKey] ?? "";
                                    return (
                                        <div
                                            className="flex items-center gap-2"
                                            key={extraKey}
                                        >
                                            <h3 className="basis-[300px]">
                                                {englishData}
                                            </h3>
                                            <TextInput
                                                value={newLangData}
                                                className="mt-1 block flex-[1]"
                                                onChange={(e) =>
                                                    setNewLang((prev) => ({
                                                        ...prev,
                                                        [extraKey]:
                                                            e.target.value,
                                                    }))
                                                }
                                            />
                                        </div>
                                    );
                                }
                            )}
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-2">
                                    <h3 className="basis-[300px] font-bold text-xl">
                                        New Field
                                    </h3>
                                    <button
                                        className="btn btn-neutral btn-md"
                                        onClick={() => setNewField(true)}
                                    >
                                        Create
                                    </button>
                                </div>
                                <h3 className="font-bold text-xl">
                                    {addNewField && (
                                        <div className="flex items-center gap-2">
                                            <TextInput
                                                placeholder="Enter Field Key"
                                                value={newFieldKey}
                                                className="mt-1 block flex-[1]"
                                                onChange={(e) =>
                                                    setNewFieldKey(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <TextInput
                                                placeholder="Enter Field Value"
                                                value={newFieldValue}
                                                className="mt-1 block flex-[1]"
                                                onChange={(e) =>
                                                    setNewFieldValue(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {newFieldValue?.trim()?.length >
                                                0 &&
                                                newFieldKey?.trim()?.length >
                                                    0 && (
                                                    <button
                                                        onClick={() => {
                                                            setNewLang(
                                                                (prev) => ({
                                                                    ...prev,
                                                                    [newFieldKey]:
                                                                        newFieldValue,
                                                                })
                                                            );
                                                            setNewFieldValue(
                                                                ""
                                                            );
                                                            setNewFieldKey("");
                                                            setNewField(false);
                                                        }}
                                                        className="btn btn-neutral btn-md"
                                                    >
                                                        Add
                                                    </button>
                                                )}
                                        </div>
                                    )}
                                </h3>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <button
                disabled={createLoading}
                onClick={handleCreateLanguage}
                className="fixed right-10 bottom-8 btn btn-neutral text-xl"
            >
                {createLoading && (
                    <span className="loading loading-spinner loading-sm"></span>
                )}
                {isFormFullEntered().isFormValid
                    ? edit_language?.id
                        ? "Update Language"
                        : "Create Language"
                    : "Save Into Local"}
            </button>
            <ActionModal
                open={deleteActionModal}
                setOpen={setDeleteActionModal}
                onAction={handleDeleteLang}
                onCancel={() => {
                    setDeleteActionModal(false);
                    setDeleteLang(null);
                }}
                title={"Delete Language"}
                description={`Are you sure you want to delete this language? (${deleteLang?.data?.country_name})`}
            />
            <br />
        </AdminLayout>
    );
};

export default CreateNewLanguage;
