import { useState } from "react";
import ActionModal from "../utill/ActionModal";
import CreateNewCompany from "./CreateNewCompany";
import { router } from "@inertiajs/react";
import CreateCompanyOwner from "./CreateCompanyOwner";

function getRandomNumber() {
    return Math.floor(Math.random() * 3) + 1;
}

const getPlanButton = () => {
    const num = getRandomNumber();
    if (num === 1) {
        return "btn-primary";
    } else if (num === 2) {
        return "btn-outline";
    } else if (num === 3) {
        return "btn-secondary";
    } else return "btn-ghost";
};

const CompanyItem = ({ company }) => {
    const [editCompanyModal, setEditCompanyModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [createCompanyOwnerModal, setCreateCompanyOwnerModal] =
        useState(false);

    const handleDelete = () => {
        router.delete(`/admin/company/${company?.id}`, {
            onSuccess: (res) => {
                if (res?.props?.success) {
                    setDeleteModal(false);
                }
            },
        });
    };

    return (
        <>
            <tr>
                <th>{company?.id}</th>
                <td>{company?.companyName}</td>
                <td>{company?.description}</td>

                <td>
                    <button className={`btn btn-sm ${getPlanButton()}`}>
                        {company.plan?.title}
                    </button>
                </td>
                <td>
                    {company?.owner ? (
                        <div className="flex flex-col">
                            <h1 className="font-bold">
                                {company?.owner?.name}
                            </h1>
                            <p>{company?.owner?.email}</p>
                        </div>
                    ) : (
                        <p>--</p>
                    )}
                </td>
                <th>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setEditCompanyModal(true)}
                            className="btn btn-outline btn-sm"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => setDeleteModal(true)}
                            className="btn btn-neutral btn-sm"
                        >
                            Delete
                        </button>
                        {!company?.owner && (
                            <button
                                onClick={() => setCreateCompanyOwnerModal(true)}
                                className="btn btn-neutral btn-sm"
                            >
                                Create Company Owner
                            </button>
                        )}
                    </div>
                </th>
            </tr>
            <CreateNewCompany
                open={editCompanyModal}
                setOpen={setEditCompanyModal}
                edit={true}
                company={company}
            />
            <ActionModal
                open={deleteModal}
                setOpen={setDeleteModal}
                onAction={handleDelete}
                onCancel={() => setDeleteModal(false)}
                title={"Delete Company"}
                description={`Are you sure you want to delete this company?`}
            />
            <CreateCompanyOwner
                open={createCompanyOwnerModal}
                setOpen={setCreateCompanyOwnerModal}
                company={company}
            />
        </>
    );
};

export default CompanyItem;
