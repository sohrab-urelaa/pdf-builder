import UserSettingsLayout from "../../Layouts/UserSettingsLayout";
import CreateUserModal from "../../Components/user/CreateUserModal";
import { useState } from "react";
import Pagination from "../../Components/utill/Pagination";
import { useTranslation } from "react-i18next";
const UserListSettings = ({ auth, users }) => {
    const { t } = useTranslation();
    const [createUserModal, setCreateUserModal] = useState(false);
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
            <div class="overflow-x-auto">
                <table class="table w-full table-lg rounded-b-none overflow-hidden">
                    <thead class="bg-base-200">
                        <tr class="text-base-content uppercase">
                            <th>{t("name")}</th>
                            <th>{t("email")}</th>
                            <th>{t("role")}</th>
                            <th class="text-right" width="1px"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.data?.map((user) => (
                            <tr key={user.id} scope="row">
                                <td>{user?.name}</td>
                                <td>{user?.email}</td>
                                <td>
                                    <span class="badge badge-info badge-outline">
                                        {user?.role}
                                    </span>
                                </td>
                                <td class="flex items-center space-x-2 justify-end">
                                    <button class="btn btn-outline btn-xs">
                                        {t("edit")}
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
            />
        </UserSettingsLayout>
    );
};

export default UserListSettings;
