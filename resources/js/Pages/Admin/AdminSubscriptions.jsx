import AdminLayout from "../../Layouts/AdminLayout";
import Pagination from "../../Components/utill/Pagination";

const AdminSubscriptions = ({ auth, data }) => {
    return (
        <AdminLayout title={"Company"} user={auth?.user}>
            <div className="max-w-7xl mx-auto sm:px-2">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                    <p className="text-4xl font-bold">
                        Subscriptions ({data?.total})
                    </p>
                </div>
                <div class="overflow-x-auto mt-4">
                    <table class="table w-full table-lg rounded-b-none overflow-hidden">
                        <thead class="bg-base-200">
                            <tr class="text-base-content uppercase">
                                <th>User</th>
                                <th>Company</th>
                                <th>Plan</th>
                                <th>Billing Cycle</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Amount</th>
                                <th>Payment Method</th>
                                <th>Payment Status</th>
                                <th>Subscription Status</th>
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
                                                ? "Active"
                                                : "Inactive"}
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