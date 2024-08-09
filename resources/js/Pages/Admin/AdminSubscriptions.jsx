import AdminLayout from "../../Layouts/AdminLayout";
import Pagination from "../../Components/utill/Pagination";
import { useTranslation } from "react-i18next";

const AdminSubscriptions = ({ auth, data }) => {
    const { t } = useTranslation();
    return (
        <AdminLayout title={"Company"} user={auth?.user}>
            <div className="max-w-7xl mx-auto sm:px-2">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                    <p className="text-4xl font-bold">
                        {t("subscriptions")} ({data?.total})
                    </p>
                </div>
                <div class="overflow-x-auto mt-4">
                    <table class="table w-full table-lg rounded-b-none overflow-hidden">
                        <thead class="bg-base-200">
                            <tr class="text-base-content uppercase">
                                <th>{t("user")}</th>
                                <th>{t("company")}</th>
                                <th>{t("plan")}</th>
                                <th>{t("billing_cycle")}</th>
                                <th>{t("start_date")}</th>
                                <th>{t("end_date")}</th>
                                <th>{t("amount")}</th>
                                <th>{t("payment_methhod")}</th>
                                <th>{t("payment_status")}</th>
                                <th>{t("subscription_status")}</th>
                                <th class="text-right" width="1px"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.data?.map((item) => (
                                <tr key={item.id} scope="row">
                                    <td>
                                        <div className="flex flex-col">
                                            <h1 className="font-bold">
                                                {item?.user?.name}
                                            </h1>
                                            <p>{item?.user?.email}</p>
                                        </div>
                                    </td>
                                    <td>{item?.company?.companyName}</td>
                                    <td>{item?.plan?.title}</td>
                                    <td>{item?.billing_cycle}</td>
                                    <td>{item?.start_date}</td>
                                    <td>{item?.end_date}</td>
                                    <td>
                                        {item?.amount}
                                        {item?.currency}
                                    </td>
                                    <td>{item?.payment_method}</td>
                                    <td>
                                        <button class="btn btn-outline btn-xs">
                                            {item?.payment_status}
                                        </button>
                                    </td>
                                    <td>
                                        <button class="btn btn-outline btn-xs">
                                            {item?.active
                                                ? t("active")
                                                : t("inactive")}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <br />
                <Pagination links={data?.links} />
            </div>

            <br />
        </AdminLayout>
    );
};

export default AdminSubscriptions;
