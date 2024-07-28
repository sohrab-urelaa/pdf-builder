import { useState } from "react";
import AdminLayout from "../../../Layouts/AdminLayout";
import TextInput from "../../../Components/TextInput";
import InputLabel from "../../../Components/InputLabel";
import InputError from "../../../Components/InputError";
import TextArea from "../../../Components/TextArea";
import { sendBulkEmail } from "../../../api/email-template";
import { toast } from "react-toastify";
import { router } from "@inertiajs/react";
const BulkEmailing = ({ auth, email_template, markers }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        receivers: "",
        body: "",
        subject: "",
    });
    const [errors, setErrors] = useState({
        receivers: "",
        body: "",
        subject: "",
    });

    const handleSubmitTemplate = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const res = await sendBulkEmail(data);

            if (res.success) {
                toast.success(res?.message);
                setData({
                    receivers: "",
                    body: "",
                    subject: "",
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

    return (
        <AdminLayout title={"Bulk Emailing"} user={auth?.user}>
            <div className="max-w-7xl mx-auto sm:px-2">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                    <p className="text-4xl font-bold">Bulk Emailing</p>
                </div>
                <form
                    className="mt-4 card shadow-md p-4 rounded-md flex flex-col gap-4"
                    onSubmit={handleSubmitTemplate}
                >
                    <div>
                        <InputLabel htmlFor="subject" value="Email Subject" />
                        <TextInput
                            id="subject"
                            type="text"
                            name="subject"
                            value={data.subject}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={(e) =>
                                setData((prev) => ({
                                    ...prev,
                                    subject: e.target.value,
                                }))
                            }
                        />

                        <InputError
                            message={errors?.subject}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <InputLabel
                            htmlFor="receivers"
                            value="Email Receivers"
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

                        <InputError
                            message={errors?.receivers}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="body" value="Email Body" />
                        <TextArea
                            id="body"
                            type="text"
                            name="body"
                            value={data.body}
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData((prev) => ({
                                    ...prev,
                                    body: e.target.value,
                                }))
                            }
                            rows={5}
                        />
                        <InputError message={errors?.body} className="mt-2" />
                    </div>
                    <div className="mt-4 flex items-center justify-end">
                        <button
                            disabled={loading}
                            type="submit"
                            className="btn btn-neutral"
                        >
                            Send Mail
                        </button>
                    </div>
                </form>
            </div>

            <br />
            <br />
        </AdminLayout>
    );
};

export default BulkEmailing;
