import { useTranslation } from "react-i18next";
import AdminLayout from "../../Layouts/AdminLayout";
import { useState } from "react";
import { router } from "@inertiajs/react";
import ActionModal from "../../Components/utill/ActionModal";
import { toast } from "react-toastify";
import { deleteCountry } from "../../api/countryApi";
import CreatenewCountryModal from "../../Components/admin/CreateNewCountryModal";
const AdminCountrySettings = ({ auth, data }) => {
    const [t] = useTranslation();
    const [createCountryModal, setCreateCountryModal] = useState(false);
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
            const res = await deleteCountry(selectedData?.id);
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
        <AdminLayout user={auth?.user} title={t("contry_settings")}>
            <div className="w-full ">
                <div className="flex items-center justify-between">
                    <p className="text-4xl font-bold">{t("countries")}</p>
                    <button
                        onClick={() => setCreateCountryModal(true)}
                        className="btn btn-neutral"
                    >
                        {t("create_new_country")}
                    </button>
                </div>
                <div class="overflow-x-auto mt-4">
                    <table class="table w-full table-lg rounded-b-none overflow-hidden">
                        <thead class="bg-base-200">
                            <tr class="text-base-content uppercase">
                                <th>{t("name")}</th>
                                <th>{t("active")}</th>
                                <th class="text-right" width="1px"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.data?.map((country) => (
                                <tr key={country.id} scope="row">
                                    <td>{country?.country_name}</td>
                                    <td>
                                        <span class="badge badge-info badge-outline">
                                            {country?.is_active === 0
                                                ? t("inactive")
                                                : t("active")}
                                        </span>
                                    </td>

                                    <td class="flex items-center space-x-2 justify-end">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedData(country);
                                                    setDeleteModal(true);
                                                }}
                                                className="btn btn-sm btn-outline"
                                            >
                                                {t("delete")}
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedData(country);
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
            <CreatenewCountryModal
                open={createCountryModal}
                setOpen={setCreateCountryModal}
                onSuccess={handleSuccess}
            />
            <CreatenewCountryModal
                key={"edit_country"}
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
                title={t("delete_country")}
                description={`${t("delete_country_message")} (${
                    selectedData?.country_name
                })`}
            />
        </AdminLayout>
    );
};

export default AdminCountrySettings;
