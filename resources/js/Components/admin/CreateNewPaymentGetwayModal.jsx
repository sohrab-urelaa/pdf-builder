import InputError from "../InputError";
import InputLabel from "../InputLabel";
import TextInput from "../TextInput";
import { useEffect, useState } from "react";
import PrimaryButton from "../PrimaryButton";
import Modal from "../utill/Modal";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { IoMdClose } from "react-icons/io";

import { Select } from "../Select";
import { getCountryList } from "../../api/countryApi";
import {
    createPaymentGetway,
    editPaymentGetway,
} from "../../api/paymentGetwayApi";
const initialData = {
    country_name: "",
    getway_list: [],
};

const availableGetwayList = ["My Fatoorah", "Paypal"];

const CreateNewPaymentGetwayModal = ({
    open,
    setOpen,
    onSuccess,
    edit = false,
    editData = {},
}) => {
    const [data, setData] = useState(initialData);
    const [errors, setErrors] = useState(initialData);
    const [processing, setProcessing] = useState(false);
    const [countryList, setCountryList] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        if (editData?.id) {
            setData(editData);
        }
    }, [editData, edit]);

    useEffect(() => {
        const fetchCountryList = async () => {
            try {
                const res = await getCountryList();
                setCountryList(res?.data || []);
            } catch (err) {
                console.log("Error to fetch country list");
            }
        };
        fetchCountryList();
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!data.country_name?.trim()) {
            newErrors.country_name = "Please enter country name";
        }
        if (data.getway_list.length === 0) {
            newErrors.getway_list = "Please select some payment getway";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors(initialData);
        setProcessing(true);

        try {
            let result;
            if (edit) {
                result = await editPaymentGetway(editData?.id, data);
            } else {
                result = await createPaymentGetway(data);
            }
            if (result?.errors) {
                const updatedErrors = {};
                const newErrors = result.errors;
                Object.keys(newErrors).forEach((key) => {
                    updatedErrors[key] = newErrors[key][0];
                });
                console.log("Errors", result.errors, updatedErrors);
                setErrors(updatedErrors);
            }
            if (result?.success) {
                toast.success(result?.message);
            } else {
                toast.message(result?.message);
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
            open={open}
            setOpen={setOpen}
            title={
                edit ? t("edit_payment_getway") : t("create_new_payment_getway")
            }
        >
            <form onSubmit={submit}>
                <div className="mt-4 mb-3">
                    <InputLabel
                        htmlFor="country_name"
                        value={t("country_name")}
                    />
                    <Select
                        id="country_name"
                        name="country_name"
                        value={data.country_name}
                        className="mt-1 block w-full"
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                country_name: e.target.value,
                            }))
                        }
                    >
                        <option disabled value={""}>
                            {t("choose_country")}
                        </option>
                        {countryList.map((country) => (
                            <option
                                key={country.id}
                                value={country?.country_name}
                            >
                                {country?.country_name}
                            </option>
                        ))}
                    </Select>

                    <InputError
                        message={errors.country_name}
                        className="mt-2"
                    />
                </div>
                <p className="mt-4 mb-3">Selected Getway</p>
                <div className="flex items-center gap-3 flex-wrap mt-2">
                    {data.getway_list?.map((item) => (
                        <div className="flex items-center gap-2 bg-base-200 rounded-md px-3 py-2">
                            <div>{item}</div>
                            <button
                                onClick={() => {
                                    setData((prev) => {
                                        return {
                                            ...prev,
                                            getway_list:
                                                prev.getway_list.filter(
                                                    (getway) => getway !== item
                                                ),
                                        };
                                    });
                                }}
                                className="btn btn-circle btn-sm"
                            >
                                <IoMdClose />
                            </button>
                        </div>
                    ))}
                </div>
                <InputError message={errors.getway_list} className="my-2" />
                <hr />

                <p className="mt-4 mb-3">Available Getway</p>
                <div className="mt-4 max-h-[120px] overflow-y-auto flex flex-col gap-2">
                    {availableGetwayList
                        .filter((get) => {
                            if (data.getway_list.includes(get)) {
                                return false;
                            }
                            return true;
                        })
                        .map((item) => (
                            <div className="flex items-center justify-between  bg-base-200 rounded-md px-3 py-2">
                                <div>{item}</div>
                                <button
                                    onClick={() => {
                                        setData((prev) => {
                                            return {
                                                ...prev,
                                                getway_list: [
                                                    ...prev.getway_list,
                                                    item,
                                                ],
                                            };
                                        });
                                    }}
                                    className="btn btn-md"
                                >
                                    Add
                                </button>
                            </div>
                        ))}
                </div>
                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        {edit ? t("edit") : t("create")}
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
};

export default CreateNewPaymentGetwayModal;
