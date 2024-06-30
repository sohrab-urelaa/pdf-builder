import { useState } from "react";
import AdminLayout from "../../Layouts/AdminLayout";
import CreateNewPlansModal from "../../Components/plans/CreateNewPlansModal";
import PlanItem from "../../Components/plans/PlanItem";

const AdminPlans = ({ auth, plans }) => {
    const [createNewPlans, setCreateNewPlans] = useState(false);
    return (
        <AdminLayout title={"Plans"} user={auth?.user}>
            <div className="max-w-7xl mx-auto sm:px-2">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                    <h1>Plans</h1>
                    <button
                        onClick={() => setCreateNewPlans(true)}
                        className="btn  btn-outline font-xl"
                    >
                        Create New Plan
                    </button>
                </div>
            </div>
            <div className="flex  gap-4 mt-4 flex-wrap">
                {plans?.map((plan) => (
                    <PlanItem key={plan.id} plan={plan} />
                ))}
            </div>
            <CreateNewPlansModal
                open={createNewPlans}
                setOpen={setCreateNewPlans}
            />
        </AdminLayout>
    );
};

export default AdminPlans;
