import { useTranslation } from "react-i18next";
import AdminLayout from "../../../Layouts/AdminLayout";
import { useState } from "react";
import { router } from "@inertiajs/react";
import ActionModal from "../../../Components/utill/ActionModal";
import { toast } from "react-toastify";
import { deleteMyFatoorah } from "../../../api/myFatoorahApi";
import CreateNewMyFatoorah from "../../../Components/admin/CreateNewMyFatoorah";
const AdminMyFatoorahSettings = ({ auth, data }) => {
    const [t] = useTranslation();
    const [createFatoorahModal, setFatoorahModal] = useState(false);
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
            const res = await deleteMyFatoorah(selectedData?.id);
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
        <AdminLayout user={auth?.user} title={t("my_fatoorah_settings")}>
            <div className="w-full ">
                <div className="flex items-center justify-between">
                    <p className="text-4xl font-bold">{t("my_fatoorah")}</p>
                    <button
                        onClick={() => setFatoorahModal(true)}
                        className="btn btn-neutral"
                    >
                        {t("create_new_my_fatoorah_config")}
                    </button>
                </div>
                <div class="overflow-x-auto mt-4">
                    <table class="table w-full table-lg rounded-b-none overflow-hidden">
                        <thead class="bg-base-200">
                            <tr class="text-base-content uppercase">
                                <th>{t("name")}</th>
                                <th>{t("api_key")}</th>
                                <th>{t("test_mode")}</th>
                                <th>{t("active")}</th>
                                <th class="text-right" width="1px"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.data?.map((getway) => (
                                <tr key={getway.id} scope="row">
                                    <td>{getway?.name}</td>
                                    <td>
                                        {getway?.api_key?.length > 10 ? (
                                            <>
                                                {getway?.api_key?.substring(
                                                    0,
                                                    10
                                                )}
                                                ...
                                                {getway?.api_key?.substring(
                                                    getway?.api_key?.length -
                                                        10,
                                                    getway?.api_key?.length
                                                )}
                                            </>
                                        ) : (
                                            getway?.api_key
                                        )}
                                    </td>
                                    <td>
                                        <span class="badge badge-info badge-outline">
                                            {getway?.test_mode === 0
                                                ? t("inactive")
                                                : t("active")}
                                        </span>
                                    </td>
                                    <td>
                                        <span class="badge badge-info badge-outline">
                                            {getway?.is_active === 0
                                                ? t("inactive")
                                                : t("active")}
                                        </span>
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
            <CreateNewMyFatoorah
                open={createFatoorahModal}
                setOpen={setFatoorahModal}
                onSuccess={handleSuccess}
            />
            <CreateNewMyFatoorah
                key={"edit_fatoorah"}
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
                title={t("delete_my_fatoorah")}
                description={`${t("delete_fatoorah_message")} (${
                    selectedData?.name
                })`}
            />
        </AdminLayout>
    );
};

export default AdminMyFatoorahSettings;
