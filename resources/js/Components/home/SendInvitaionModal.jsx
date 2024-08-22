import InputError from "../InputError";
import InputLabel from "../InputLabel";
import { useState } from "react";
import Modal from "../utill/Modal";
import { useTranslation } from "react-i18next";
import TextArea from "../TextArea";
import { toast } from "react-toastify";
import { sendTemplateInvitaions } from "../../api/templateApi";

const initialData = {
    receivers: "",
    modified_receivers: [],
};
const SendInvitaionModal = ({
    open,
    setOpen,
    onSuccess,
    isLoading = false,
    templateId,
}) => {
    const { t } = useTranslation();
    const [data, setData] = useState(initialData);
    const [errors, setErrors] = useState(initialData);
    const [loading, setLoading] = useState(false);

    const handleSubmitTemplate = async (e) => {
        e.preventDefault();
        let newErrors = {};

        const receivers = data.receivers.split(",").filter((item) => {
            if (item.trim()) {
                return true;
            }
            return false;
        });

        if (!receivers.length) {
            newErrors.receivers = "Atleast one receivers required";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        console.log("Success and let's try");

        try {
            setErrors(initialData);
            setLoading(true);
            const res = await sendTemplateInvitaions(templateId, data);
            if (res.success) {
                toast.success(res?.message);
                setData({
                    receivers: "",
                    modified_receivers: [],
                });
            } else {
                toast.error(res?.message);
                if (res.errors) {
                    const dbErrors = res.errors;
                    const updatedErrors = {};
                    Object.keys(dbErrors).forEach((key) => {
                        updatedErrors[key] = dbErrors[key][0];
                    });
                    setErrors(updatedErrors);
                }
            }
        } catch (e) {
        } finally {
            setLoading(false);
        }
    };

    const handleCheck = () => {
        const receivers = data.receivers.split(",").filter((item) => {
            if (item.trim()) {
                return true;
            }
            return false;
        });
        setData((prev) => ({
            ...prev,
            modified_receivers: receivers,
        }));

        if (!receivers?.length) {
            toast.error("No receiver added yet!");
        } else {
            toast.success(`${receivers.length} Receivers found!`);
        }
    };

    return (
        <Modal open={open} setOpen={setOpen} title={t("send_invitaion")}>
            <form
                className="mt-4 card shadow-md p-4 rounded-md flex flex-col gap-4"
                onSubmit={handleSubmitTemplate}
            >
                <div>
                    <InputLabel
                        htmlFor="receivers"
                        value={t("email_receivers")}
                    />
                    <TextArea
                        id="receivers"
                        type="text"
                        name="receivers"
                        value={data.receivers}
                        className="mt-1 block w-full"
                        isFocused={true}
                        rows={2}
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                receivers: e.target.value,
                            }))
                        }
                    />

                    <InputError message={errors?.receivers} className="mt-2" />
                </div>
                <div className="my-4">
                    <div onClick={handleCheck} className="btn btn-sm">
                        {t("check")}
                    </div>

                    <div className="mt-2 flex items-center gap-3 flex-wrap">
                        {data.modified_receivers?.map((receiver) => (
                            <div className="bg-base-200 rounded-md px-3 py-2">
                                {receiver}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <button
                        disabled={loading}
                        type="submit"
                        className="btn btn-neutral"
                    >
                        {t("send_mail")}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default SendInvitaionModal;
