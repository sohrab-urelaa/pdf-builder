import AdminLayout from "../../Layouts/AdminLayout";
import Pagination from "../../Components/utill/Pagination";
import { useTranslation } from "react-i18next";

const AdminAdmins = ({ auth, users }) => {
    const { t } = useTranslation();
    return (
        <AdminLayout title={"Company"} user={auth?.user}>
            <div className="max-w-7xl mx-auto sm:px-2">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                    <p className="text-4xl font-bold">
                        {t("admin_lists")} ({users?.total})
                    </p>
                </div>
                <div class="overflow-x-auto mt-4">
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
                            {users.data?.map((user) => (
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
            </div>

            <br />
        </AdminLayout>
    );
};

export default AdminAdmins;
