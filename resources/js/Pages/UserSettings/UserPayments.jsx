import AdminLayout from "../../Layouts/AdminLayout";
import Pagination from "../../Components/utill/Pagination";
import UserSettingsLayout from "../../Layouts/UserSettingsLayout";
import { useTranslation } from "react-i18next";

const UserPayments = ({ auth, data }) => {
    const { t } = useTranslation();
    return (
        <UserSettingsLayout title={"Payments"} user={auth?.user}>
            <div className="max-w-7xl mx-auto sm:px-2">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                    <p className="text-4xl font-bold">
                        {t("payments")} ({data?.total})
                    </p>
                </div>
                <div class="overflow-x-auto mt-4">
                    <table class="table w-full table-lg rounded-b-none overflow-hidden">
                        <thead class="bg-base-200">
                            <tr class="text-base-content uppercase">
                                <th>{t("plan")}</th>
                                <th>{t("billing_cycle")}</th>
                                <th>{t("start_date")}</th>
                                <th>{t("end_date")}</th>
                                <th>{t("amount")}</th>
                                <th>{t("payment_method")}</th>
                                <th>{t("payment_status")}</th>
                                <th>{t("subscription_status")}</th>
                                <th class="text-right" width="1px"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.data?.map((item) => (
                                <tr key={item.id} scope="row">
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
                                            {item?.is_active
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
        </UserSettingsLayout>
    );
};

export default UserPayments;
