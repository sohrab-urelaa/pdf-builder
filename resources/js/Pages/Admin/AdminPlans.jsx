import { useState } from "react";
import AdminLayout from "../../Layouts/AdminLayout";
import CreateNewPlansModal from "../../Components/plans/CreateNewPlansModal";
import PlanItem from "../../Components/plans/PlanItem";
import { useTranslation } from "react-i18next";

const AdminPlans = ({ auth, plans }) => {
    const { t } = useTranslation();
    const [createNewPlans, setCreateNewPlans] = useState(false);
    return (
        <AdminLayout title={"Plans"} user={auth?.user}>
            <div className="max-w-7xl mx-auto sm:px-2">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                    <p className="text-4xl font-bold">{t("plans")}</p>
                    <button
                        onClick={() => setCreateNewPlans(true)}
                        className="btn  btn-outline font-xl"
                    >
                        {t("create_new_plan")}
                    </button>
                </div>
                <div className="flex  gap-4 mt-4 flex-wrap">
                    {plans?.map((plan) => (
                        <PlanItem key={plan.id} plan={plan} />
                    ))}
                </div>
            </div>

            <CreateNewPlansModal
                open={createNewPlans}
                setOpen={setCreateNewPlans}
            />
        </AdminLayout>
    );
};

export default AdminPlans;
