import { useState } from "react";
import CreateNewPlansModal from "./CreateNewPlansModal";
import ActionModal from "../utill/ActionModal";
import { router } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import { deletePlan } from "../../api/planApi";
import { toast } from "react-toastify";

const PlanItem = ({ plan }) => {
    const { t } = useTranslation();
    const [editPlanModal, setEditPlanModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const handleDelete = async () => {
        try {
            const result = await deletePlan(plan?.id);
            setDeleteModal(false);
            if (result?.success) {
                toast.success(result?.message);
                router.reload();
            } else {
                toast.error(result?.message);
            }
        } catch (err) {
            toast.error("Something wen't wrong!");
        }
    };

    return (
        <div className="card bg-base-200/60 border-2 border-secondary-focus grow basis-[400px]">
            <div className="card-body">
                <div className="flex justify-between flex-col md:flex-row md:mb-0">
                    <div className="flex items-center">
                        <div className="">
                            <span className="text-secondary mb-4 block text-5xl font-extrabold">
                                {plan?.title}
                            </span>
                            <p className="text-dark mb-4 font-bold"></p>
                            <div className="font-bold">
                                <span className="text-3xl">
                                    {plan?.currency_symbol}
                                    {""}
                                    {plan?.monthly_price} {plan?.currency}
                                </span>{" "}
                                / {t("month")}
                            </div>
                            <div className="text-sm mt-1 text-neutral-600">
                                {t("annual_license_billed")}{" "}
                                {plan?.currency_symbol}
                                {""}
                                {plan?.yearly_price} {plan?.currency}
                            </div>
                            <p></p>
                        </div>
                    </div>
                    <ul className="mr-4">
                        <li className="flex items-center space-x-2">
                            <span className="text-body-color text-base leading-loose">
                                {plan?.description}
                            </span>
                        </li>
                    </ul>
                </div>
                <div className="flex justify-center mt-6 gap-4">
                    <button
                        onClick={() => setEditPlanModal(true)}
                        className="btn btn-outline text-xl"
                    >
                        {t("edit")}
                    </button>
                    <button
                        onClick={() => setDeleteModal(true)}
                        className="btn btn-warning text-xl"
                    >
                        {t("delete")}
                    </button>
                </div>
            </div>
            <CreateNewPlansModal
                open={editPlanModal}
                setOpen={setEditPlanModal}
                edit={true}
                plan={plan}
                onSuccess={() => {
                    router.reload();
                }}
            />
            <ActionModal
                open={deleteModal}
                setOpen={setDeleteModal}
                onAction={handleDelete}
                onCancel={() => setDeleteModal(false)}
                title={"Delete Plan"}
                description={`Are you sure you want to delete this plan?`}
            />
        </div>
    );
};

export default PlanItem;
