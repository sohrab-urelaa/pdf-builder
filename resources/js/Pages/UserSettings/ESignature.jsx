import { useState } from "react";
import UserSettingsLayout from "../../Layouts/UserSettingsLayout";
import CreateNewSignature from "../../Components/user/CreateNewSignature";
import Pagination from "../../Components/utill/Pagination";
import { router } from "@inertiajs/react";
import ActionModal from "../../Components/utill/ActionModal";
import { deleteCertificate } from "../../api/userApi";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import FeatureSupportAlert from "../../Components/user/FeatureSupportAlert";
const ESignature = ({ auth, data }) => {
    const [createSignatureModal, setCreateSignatureModal] = useState(false);
    const [selectedSignature, setSelectedSignature] = useState(null);
    const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);

    const [editModal, setEditModal] = useState(false);
    const { t } = useTranslation();
    const handleSuccess = () => {
        router.reload();
    };

    const handleDelete = async () => {
        try {
            const res = await deleteCertificate(selectedSignature?.id);

            setDeleteConfirmModal(false);
            setSelectedSignature(null);
            if (res?.success) {
                toast.success(res?.message);
                handleSuccess();
            } else {
                toast.error(res?.message);
            }
        } catch (err) {}
    };
    return (
        <UserSettingsLayout user={auth?.user}>
            <div className="flex-grow mx-auto">
                <div className="my-6 flex items-center justify-between gap-3">
                    <p className="text-4xl font-bold">
                        {t("signing_certificates")}
                    </p>
                    <button
                        onClick={() => setCreateSignatureModal(true)}
                        className="btn btn-neutral"
                    >
                        {t("upload_cert")}
                    </button>
                </div>
            </div>
            <FeatureSupportAlert check_for="certificate" />
            <div class="overflow-x-auto">
                <table class="table w-full table-lg rounded-b-none overflow-hidden">
                    <thead class="bg-base-200">
                        <tr class="text-neutral uppercase">
                            <th>{t("name")}</th>
                            <th>{t("valid_to")}</th>
                            <th>{t("Status")}</th>
                            <th>{t("action")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data?.map((item) => (
                            <tr key={item.id} scope="row">
                                <td>{item?.name}</td>
                                <td>{item?.user?.name}</td>
                                <td>
                                    <button className="btn btn-sm btn-outline">
                                        {item?.is_active
                                            ? t("active")
                                            : t("inactive")}
                                    </button>
                                </td>{" "}
                                <td>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => {
                                                setSelectedSignature(item);
                                                setDeleteConfirmModal(true);
                                            }}
                                            className="btn btn-sm btn-outline"
                                        >
                                            {t("delete")}
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedSignature(item);
                                                setEditModal(true);
                                            }}
                                            className="btn btn-sm btn-outline"
                                        >
                                            {t("edit")}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <CreateNewSignature
                    open={createSignatureModal}
                    setOpen={setCreateSignatureModal}
                    onSuccess={handleSuccess}
                />
                <CreateNewSignature
                    key={"edit_signature"}
                    edit={true}
                    certificate={selectedSignature}
                    open={editModal}
                    setOpen={setEditModal}
                    onSuccess={handleSuccess}
                />

                <ActionModal
                    open={deleteConfirmModal}
                    setOpen={setDeleteConfirmModal}
                    onAction={handleDelete}
                    onCancel={() => setDeleteConfirmModal(false)}
                    title={t("delete_certificates")}
                    description={t("delete_certificates_message")}
                />
            </div>
            <br />
            <Pagination links={data.links} />
        </UserSettingsLayout>
    );
};

export default ESignature;
