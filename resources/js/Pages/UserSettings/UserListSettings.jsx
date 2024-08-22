import UserSettingsLayout from "../../Layouts/UserSettingsLayout";
import CreateUserModal from "../../Components/user/CreateUserModal";
import { useState } from "react";
import Pagination from "../../Components/utill/Pagination";
import { useTranslation } from "react-i18next";
import { deleteUser } from "../../api/userApi";
import { toast } from "react-toastify";
import { router } from "@inertiajs/react";
import ActionModal from "../../Components/utill/ActionModal";
import FeatureSupportAlert from "../../Components/user/FeatureSupportAlert";
const UserListSettings = ({ auth, users }) => {
    const { t } = useTranslation();
    const [createUserModal, setCreateUserModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const handleSuccess = () => {
        router.reload();
    };
    const handleDeleteUser = async () => {
        try {
            setDeleteLoading(true);
            const res = await deleteUser(selectedUser?.id);
            if (res?.success) {
                toast.success(res?.message);
                setDeleteModal(false);
                setSelectedUser(null);
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
        <UserSettingsLayout user={auth?.user}>
            <div className="flex-grow mx-auto">
                <div className="my-3 flex items-center justify-between gap-3">
                    <p className="text-4xl font-bold">{t("users")}</p>
                    <button
                        onClick={() => setCreateUserModal(true)}
                        className="btn btn-neutral"
                    >
                        {t("new_user")}
                    </button>
                </div>
            </div>
            <FeatureSupportAlert check_for="user" />
            <div class="overflow-x-auto">
                <table class="table w-full table-lg rounded-b-none overflow-hidden">
                    <thead class="bg-base-200">
                        <tr class="text-base-content uppercase">
                            <th>{t("name")}</th>
                            <th>{t("email")}</th>
                            <th>{t("country")}</th>
                            <th>{t("timezone")}</th>
                            <th>{t("role")}</th>
                            <th class="text-right" width="1px"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.data?.map((user) => (
                            <tr key={user.id} scope="row">
                                <td>{user?.name}</td>
                                <td>{user?.email}</td>
                                <td>{user?.country}</td>
                                <td>{user?.timezone}</td>
                                <td>
                                    <span class="badge badge-info badge-outline">
                                        {user?.role}
                                    </span>
                                </td>
                                <td class="flex items-center space-x-2 justify-end">
                                    <button
                                        onClick={() => {
                                            setSelectedUser(user);
                                            setEditModal(true);
                                        }}
                                        class="btn btn-outline btn-xs"
                                    >
                                        {t("edit")}
                                    </button>{" "}
                                    <button
                                        onClick={() => {
                                            setSelectedUser(user);
                                            setDeleteModal(true);
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
            <Pagination links={users?.links} />
            <CreateUserModal
                open={createUserModal}
                setOpen={setCreateUserModal}
                onSuccess={handleSuccess}
            />
            <CreateUserModal
                key={"edit_user_modal"}
                open={editModal}
                setOpen={(open) => {
                    setSelectedUser(null);
                    setEditModal(open);
                }}
                onSuccess={handleSuccess}
                edit={true}
                user={selectedUser}
            />

            <ActionModal
                key={"delete_user_modal"}
                open={deleteModal}
                setOpen={setDeleteModal}
                onAction={handleDeleteUser}
                onCancel={() => {
                    setSelectedUser(null);
                    setDeleteModal(false);
                }}
                title={t("delete_user")}
                description={`${t("delete_user_message")} (${
                    selectedUser?.name
                })`}
            />
        </UserSettingsLayout>
    );
};

export default UserListSettings;
