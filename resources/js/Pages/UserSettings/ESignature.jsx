import { useState } from "react";
import UserSettingsLayout from "../../Layouts/UserSettingsLayout";
import CreateNewSignature from "../../Components/user/CreateNewSignature";
import Pagination from "../../Components/utill/Pagination";
import { router } from "@inertiajs/react";
import ActionModal from "../../Components/utill/ActionModal";
import { deleteCertificate } from "../../api/userApi";
import { toast } from "react-toastify";
const ESignature = ({ auth, data }) => {
    const [createSignatureModal, setCreateSignatureModal] = useState(false);
    const [selectedSignature, setSelectedSignature] = useState(null);
    const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
    const handleSuccess = () => {
        router.reload();
    };

    const handleDelete = async () => {
        try {
            const res = await deleteCertificate(selectedSignature?.id);

            setDeleteConfirmModal(false);
            setSelectedSignature(null);
            if (res?.success) {
                toast.success(res?.message);
                handleSuccess();
            } else {
                toast.error(res?.message);
            }
        } catch (err) {}
    };
    return (
        <UserSettingsLayout user={auth?.user}>
            <div className="flex-grow mx-auto">
                <div className="my-6 flex items-center justify-between gap-3">
                    <p className="text-4xl font-bold">Signing Certificates</p>
                    <button
                        onClick={() => setCreateSignatureModal(true)}
                        className="btn btn-neutral"
                    >
                        Upload Cert
                    </button>
                </div>
            </div>
            <div class="overflow-x-auto">
                <table class="table w-full table-lg rounded-b-none overflow-hidden">
                    <thead class="bg-base-200">
                        <tr class="text-neutral uppercase">
                            <th>Name</th>
                            <th>Valid To</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data?.map((item) => (
                            <tr key={item.id} scope="row">
                                <td>{item?.name}</td>
                                <td>{item?.user?.name}</td>
                                <td>
                                    <button className="btn btn-sm btn-outline">
                                        {item?.is_active
                                            ? "Active"
                                            : "Inactive"}
                                    </button>
                                </td>{" "}
                                <td>
                                    <button
                                        onClick={() => {
                                            setSelectedSignature(item);
                                            setDeleteConfirmModal(true);
                                        }}
                                        className="btn btn-sm btn-outline"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <CreateNewSignature
                    open={createSignatureModal}
                    setOpen={setCreateSignatureModal}
                    onSuccess={handleSuccess}
                />

                <ActionModal
                    open={deleteConfirmModal}
                    setOpen={setDeleteConfirmModal}
                    onAction={handleDelete}
                    onCancel={() => setDeleteConfirmModal(false)}
                    title={"Delete Certificates"}
                    description={`Are you sure you want to delete this cert?`}
                />
            </div>
            <br />
            <Pagination links={data.links} />
        </UserSettingsLayout>
    );
};

export default ESignature;
