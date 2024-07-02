import DashboardState from "../../Components/admin/DashboardState";
import SubscriptionGraph from "../../Components/admin/SubscriptionGraph";
import UserRegistrationGraph from "../../Components/admin/UserRegistrationGraph";
import AdminLayout from "../../Layouts/AdminLayout";

const AdminHome = ({ auth, data }) => {
    console.log("Subscriptions", data.subscriptionGraph);
    return (
        <AdminLayout user={auth?.user} title={"Home"}>
            <div className="max-w-7xl mx-auto sm:px-2">
                <DashboardState data={data} />
                <br />
                <div className="flex flex-wrap gap-10">
                    <div className="flex-[1]">
                        <p className="text-4xl font-bold text-center my-4">
                            User Registration
                        </p>

                        <UserRegistrationGraph
                            data={data.userRegistrationGraph}
                        />
                    </div>
                    <div className="flex-[1]">
                        <p className="text-4xl font-bold text-center my-4">
                            User Subscription Amount
                        </p>
                        <SubscriptionGraph data={data.subscriptionGraph} />
                    </div>
                </div>
                <div className="flex flex-wrap gap-10">
                    <div className="flex-[1]">
                        <p className="text-4xl font-bold text-center my-4">
                            User Subscription
                        </p>
                        <SubscriptionGraph
                            data={data.subscriptionGraph}
                            dataKey="totalSubscriptionsCount"
                        />
                    </div>
                    <div className="flex-[1]">
                        <p className="text-4xl font-bold text-center my-4">
                            Template Creation
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
