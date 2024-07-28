import { useState } from "react";
import UserSettingsLayout from "../../Layouts/UserSettingsLayout";
import { FileUploader } from "react-drag-drop-files";
import { toast } from "react-toastify";
import { verifyTemplate } from "../../api/userApi";

const VerifySignature = ({ auth }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const handleChange = (file) => {
        setFile(file);
    };

    const handleVerify = async () => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("file", file);
            const res = await verifyTemplate(formData);
            if (res?.result?.result?.signatures?.length > 0) {
                toast.success("Signature found");
                setResult(res?.result?.result);
            } else {
                toast.error("No Signature found on uploaded pdf");
            }
            console.log("Result", result);
        } catch (err) {
            toast.error("Something wen't wrong, please try again later.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <UserSettingsLayout user={auth?.user}>
            <div className="flex-grow mx-auto">
                <div className="my-6 flex items-center justify-between gap-3">
                    <p className="text-4xl font-bold">Verify Certificates</p>
                </div>
                <FileUploader
                    classes="w-full h-[300px]"
                    multiple={false}
                    handleChange={handleChange}
                    name="file"
                    types={["pdf"]}
                />
                {file && (
                    <div className="shadow-md bg-gray-200 rounded-md p-4 mt-4">
                        <p className="text-base-content font-bold text-xl">
                            {file?.name}
                        </p>
                        <button
                            onClick={handleVerify}
                            disabled={loading}
                            className="btn btn-md text-xl btn-neutral mt-4 w-[120px]"
                        >
                            Verify
                        </button>
                        <hr className="my-3" />
                        {result && (
                            <div>
                                {result?.signatures?.map((signature) => {
                                    const meta =
                                        signature?.meta?.signatureMeta || {};
                                    const {
                                        contactInfo,
                                        location,
                                        name,
                                        reason,
                                    } = meta;

                                    const certificates =
                                        signature?.meta?.certs || [];

                                    return (
                                        <div className="flex gap-4">
                                            <div className="flex flex-col gap-5">
                                                <p className="text-2xl font-bold text-base-content mt-2">
                                                    Submitter Info
                                                </p>
                                                <p className="text-xl font-bold text-base-content mt-2">
                                                    Submitter Email:{" "}
                                                    <span className="bg-white rounded-md p-3 ml-3 ">
                                                        {contactInfo}
                                                    </span>
                                                </p>
                                                <p className="text-xl font-bold text-base-content mt-2">
                                                    Submitter Name:{" "}
                                                    <span className="bg-white rounded-md p-3 ml-3">
                                                        {name}
                                                    </span>
                                                </p>
                                                <p className="text-xl font-bold text-base-content mt-2">
                                                    Submitter Location:{" "}
                                                    <span className="bg-white rounded-md p-3 ml-3">
                                                        {location}
                                                    </span>
                                                </p>
                                                <p className="text-xl font-bold text-base-content mt-2">
                                                    Reason:{" "}
                                                    <span className="bg-white rounded-md p-3 ml-3">
                                                        {reason}
                                                    </span>
                                                </p>
                                            </div>
                                            <div className="flex flex-col gap-3">
                                                <p className="text-2xl font-bold text-base-content mt-2">
                                                    Certificats
                                                </p>
                                                <div>
                                                    {certificates?.map(
                                                        (certificate) => {
                                                            const issuedBy =
                                                                certificate?.issuedBy ||
                                                                {};

                                                            const {
                                                                commonName,
                                                                countryName,
                                                                emailAddress,
                                                                localityName,
                                                                organizationName,
                                                                stateOrProvinceName,
                                                            } = issuedBy;
                                                            return (
                                                                <div className="mt-2">
                                                                    <p className="text-xl font-bold text-base-content mt-2">
                                                                        ---Issued
                                                                        By---
                                                                    </p>
                                                                    <hr />
                                                                    <p className="text-xl font-bold text-base-content mt-2">
                                                                        Name:{" "}
                                                                        <span className="bg-white rounded-md p-3 ml-3">
                                                                            {
                                                                                commonName
                                                                            }
                                                                        </span>
                                                                    </p>
                                                                    <p className="text-xl font-bold text-base-content mt-2">
                                                                        Country:{" "}
                                                                        <span className="bg-white rounded-md p-3 ml-3">
                                                                            {
                                                                                countryName
                                                                            }
                                                                        </span>
                                                                    </p>
                                                                    <p className="text-xl font-bold text-base-content mt-2">
                                                                        Organization:{" "}
                                                                        <span className="bg-white rounded-md p-3 ml-3">
                                                                            {
                                                                                organizationName
                                                                            }
                                                                        </span>
                                                                    </p>
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}
            </div>
            <br />
        </UserSettingsLayout>
    );
};

export default VerifySignature;
