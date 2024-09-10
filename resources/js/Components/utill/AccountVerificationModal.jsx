import InputError from "../InputError";
import InputLabel from "../InputLabel";
import TextInput from "../TextInput";
import { useEffect, useRef, useState } from "react";
import PrimaryButton from "../PrimaryButton";
import Modal from "./Modal";
import { useTranslation } from "react-i18next";
import { sendVerificationCode, verifyAccount } from "../../api/userApi";
import { toast } from "react-toastify";
import { router } from "@inertiajs/react";

const initialData = {
    code: "",
};
const AccountVerificationModal = ({ user }) => {
    // const { data, setData, post, processing, errors, reset } = useForm();

    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [data, setData] = useState(initialData);
    const [errors, setErrors] = useState(initialData);
    const [processing, setProcessing] = useState(false);
    const [countDown, setCountDown] = useState(0);
    const countDownRef = useRef();

    useEffect(() => {
        if (user && user.isVerified === 0) {
            setOpen(true);
        }
    }, [user]);

    const handleSuccess = () => {
        router.reload();
    };
    const submit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        try {
            let result = await verifyAccount(data);
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
                setOpen(false);
                setData(initialData);
                setErrors(initialData);
                handleSuccess();
            } else {
                toast.error(result?.message);
            }
        } catch (err) {
        } finally {
            setProcessing(false);
        }
    };
    const startCountDown = () => {
        if (countDownRef.current) {
            clearInterval(countDownRef.current);
        }

        setCountDown(60);

        countDownRef.current = setInterval(() => {
            setCountDown((prev) => {
                if (prev > 0) {
                    return prev - 1;
                } else {
                    if (countDownRef.current) {
                        clearInterval(countDownRef.current);
                    }
                    return 0;
                }
            });
        }, 1000);
    };
    const handleSendCode = async () => {
        try {
            const res = await sendVerificationCode();
            if (res?.success) {
                toast.success(res?.message);
                startCountDown();
            } else {
                toast.error(res?.message);
            }
        } catch (err) {
            toast.error("Someting wen't wrong!");
        }
    };
    return (
        <Modal open={open} setOpen={setOpen} title={t("verify_account")}>
            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="code" value={t("verification_code")} />

                    <TextInput
                        id="code"
                        name="code"
                        value={data.code}
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                code: e.target.value,
                            }))
                        }
                    />
                    <InputError message={errors?.code} className="mt-2" />
                </div>
                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        {t("verify")}
                    </PrimaryButton>
                </div>
            </form>
            <h3>
                Didn't received verification code?{" "}
                <span>
                    {countDown > 0 && `Send Again After ${countDown} s`}
                </span>
            </h3>
            {countDown === 0 && (
                <button className="btn mt-2" onClick={handleSendCode}>
                    Send Verification Code
                </button>
            )}
        </Modal>
    );
};

export default AccountVerificationModal;
