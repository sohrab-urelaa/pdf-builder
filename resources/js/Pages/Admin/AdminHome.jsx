import DashboardState from "../../Components/admin/DashboardState";
import SubscriptionGraph from "../../Components/admin/SubscriptionGraph";
import UserRegistrationGraph from "../../Components/admin/UserRegistrationGraph";
import AdminLayout from "../../Layouts/AdminLayout";
import { useTranslation } from "react-i18next";

const AdminHome = ({ auth, data }) => {
    const { t } = useTranslation();
    return (
        <AdminLayout user={auth?.user} title={"Home"}>
            <div className="max-w-7xl mx-auto sm:px-2">
                <DashboardState data={data} />
                <br />
                <div className="flex flex-wrap gap-10">
                    <div className="flex-[1]">
                        <p className="text-4xl font-bold text-center my-4">
                            {t("user_registration")}
                        </p>

                        <UserRegistrationGraph
                            data={data.userRegistrationGraph}
                        />
                    </div>
                    <div className="flex-[1]">
                        <p className="text-4xl font-bold text-center my-4">
                            {t("user_subscription_amount")}
                        </p>
                        <SubscriptionGraph data={data.subscriptionGraph} />
                    </div>
                </div>
                <div className="flex flex-wrap gap-10">
                    <div className="flex-[1]">
                        <p className="text-4xl font-bold text-center my-4">
                            {t("user_subscription")}
                        </p>
                        <SubscriptionGraph
                            data={data.subscriptionGraph}
                            dataKey="totalSubscriptionsCount"
                        />
                    </div>
                    <div className="flex-[1]">
                        <p className="text-4xl font-bold text-center my-4">
                            {t("template_creation")}
                        </p>
                        <SubscriptionGraph
                            data={data.templateCreationGraph}
                            dataKey="templateCreated"
                        />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminHome;
