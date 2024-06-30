import { useState } from "react";
import CreateNewPlansModal from "./CreateNewPlansModal";
import ActionModal from "../utill/ActionModal";
import { router } from "@inertiajs/react";

const PlanItem = ({ plan }) => {
    const [editPlanModal, setEditPlanModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const handleDelete = () => {
        router.delete(`/admin/plans/${plan?.id}`, {
            onSuccess: (res) => {
                if (res?.props?.success) {
                    setDeleteModal(false);
                }
            },
        });
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
                                    {plan?.monthly_price}
                                </span>{" "}
                                / month
                            </div>
                            <div className="text-sm mt-1 text-neutral-600">
                                Annual license billed {plan?.yearly_price}
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
                        EDIT
                    </button>
                    <button
                        onClick={() => setDeleteModal(true)}
                        className="btn btn-warning text-xl"
                    >
                        DELETE
                    </button>
                </div>
            </div>
            <CreateNewPlansModal
                open={editPlanModal}
                setOpen={setEditPlanModal}
                edit={true}
                plan={plan}
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
