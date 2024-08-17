import { useTranslation } from "react-i18next";
import AdminLayout from "../../../Layouts/AdminLayout";
import { useState } from "react";
import { router } from "@inertiajs/react";
import ActionModal from "../../../Components/utill/ActionModal";
import { toast } from "react-toastify";
import { deletePaymentGetway } from "../../../api/paymentGetwayApi";
import CreateNewPaymentGetwayModal from "../../../Components/admin/CreateNewPaymentGetwayModal";

const AdminPaymentGetway = ({ auth, data }) => {
    const [t] = useTranslation();
    const [createGetwayModal, setCreateGetwayModal] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const handleSuccess = () => {
        setSelectedData(null);
        router.reload();
    };
    const handleDelete = async () => {
        try {
            setDeleteLoading(true);
            const res = await deletePaymentGetway(selectedData?.id);
            if (res?.success) {
                toast.success(res?.message);
                setDeleteModal(false);
                handleSuccess();
            } else {
                toast.error(res?.message);
            }
        } catch (err) {
            toast.error("Soemthing went' wrong please try again later!");
        } finally {
            setDeleteLoading(false);
        }
    };

    return (
        <AdminLayout user={auth?.user} title={t("payment_getway_settings")}>
            <div className="w-full ">
                <div className="flex items-center justify-between">
                    <p className="text-4xl font-bold">{t("payment_getway")}</p>
                    <button
                        onClick={() => setCreateGetwayModal(true)}
                        className="btn btn-neutral"
                    >
                        {t("create_new_payment_getway")}
                    </button>
                </div>
                <div class="overflow-x-auto mt-4">
                    <table class="table w-full table-lg rounded-b-none overflow-hidden">
                        <thead class="bg-base-200">
                            <tr class="text-base-content uppercase">
                                <th>{t("country_name")}</th>
                                <th>{t("active_getway")}</th>
                                <th class="text-right" width="1px"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.data?.map((getway) => (
                                <tr key={getway.id} scope="row">
                                    <td>{getway?.country_name}</td>
                                    <td>
                                        <div className="flex items-center gap-3 flex-wrap mt-2">
                                            {getway?.getway_list?.map(
                                                (item) => (
                                                    <div className="bg-base-200 rounded-md px-3 py-2">
                                                        <div>{item}</div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </td>
                                    <td class="flex items-center space-x-2 justify-end">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedData(getway);
                                                    setDeleteModal(true);
                                                }}
                                                className="btn btn-sm btn-outline"
                                            >
                                                {t("delete")}
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedData(getway);
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
                </div>
            </div>
            <CreateNewPaymentGetwayModal
                open={createGetwayModal}
                setOpen={setCreateGetwayModal}
                onSuccess={handleSuccess}
            />
            <CreateNewPaymentGetwayModal
                key={"edit_getway"}
                open={editModal}
                setOpen={setEditModal}
                onSuccess={handleSuccess}
                edit={true}
                editData={selectedData}
            />
            <ActionModal
                open={deleteModal}
                setOpen={setDeleteModal}
                onAction={handleDelete}
                onCancel={() => {
                    setDeleteModal(false);
                    selectedData(null);
                }}
                title={t("delete_payment_getway")}
                description={`${t("delete_payment_getway_message")} (${
                    selectedData?.country_name
                })`}
            />
        </AdminLayout>
    );
};

export default AdminPaymentGetway;
