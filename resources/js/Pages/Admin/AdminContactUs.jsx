import AdminLayout from "../../Layouts/AdminLayout";
import Pagination from "../../Components/utill/Pagination";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { router } from "@inertiajs/react";
import { deleteContactUs } from "../../api/contactApi";
import { toast } from "react-toastify";
import ActionModal from "../../Components/utill/ActionModal";

const AdminUsers = ({ auth, data }) => {
    const { t } = useTranslation();
    const [selectedContact, setSelectedContact] = useState(null);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const handleSuccess = () => {
        setSelectedContact(null);
        router.reload();
    };
    const handleDelete = async () => {
        try {
            setDeleteLoading(true);
            const res = await deleteContactUs(selectedContact?.id);
            if (res?.success) {
                toast.success(res?.message);
                setOpenDeleteModal(false);
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
        <AdminLayout title={"Company"} user={auth?.user}>
            <div className="max-w-7xl mx-auto sm:px-2">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                    <p className="text-4xl font-bold">
                        {t("contact_us")} ({data?.total})
                    </p>
                </div>
                <div class="overflow-x-auto mt-4">
                    <table class="table w-full table-lg rounded-b-none overflow-hidden">
                        <thead class="bg-base-200">
                            <tr class="text-base-content uppercase">
                                <th>{t("firstName")}</th>
                                <th>{t("lastName")}</th>
                                <th>{t("email")}</th>
                                <th>{t("message")}</th>
                                <th class="text-right" width="1px"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.data?.map((contact) => (
                                <tr key={contact.id} scope="row">
                                    <td>{contact?.firstName}</td>
                                    <td>{contact?.lastName}</td>
                                    <td>{contact?.email}</td>
                                    <td>{contact?.message}</td>
                                    <td class="flex items-center space-x-2 justify-end">
                                        <button
                                            onClick={() => {
                                                setSelectedContact(contact);
                                                setOpenDeleteModal(true);
                                            }}
                                            class="btn btn-outline btn-xs"
                                        >
                                            {t("delete")}
                                        </button>{" "}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <br />
                <Pagination links={data?.links} />
            </div>
            <ActionModal
                open={openDeleteModal}
                setOpen={setOpenDeleteModal}
                onAction={handleDelete}
                onCancel={() => setOpenDeleteModal(false)}
                title={"Delete Contact Us"}
                description={`Are you sure you want to delete this Contact Us?(${selectedContact?.firstName})`}
            />
            <br />
        </AdminLayout>
    );
};

export default AdminUsers;
