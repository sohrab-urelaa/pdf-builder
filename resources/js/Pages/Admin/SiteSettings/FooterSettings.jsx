import { useState } from "react";
import AdminLayout from "../../../Layouts/AdminLayout";
import CreateNewFooterModal from "../../../Components/footer/CreateNewFooterModal";
import { router } from "@inertiajs/react";
import ActionModal from "../../../Components/utill/ActionModal";
import { deleteChildFooters } from "../../../api/adminApi";

const FooterSettings = ({ auth, footers }) => {
    const [createFooterModal, setCreateFooterModal] = useState(false);
    const [parentFooter, setParentFooter] = useState(null);
    const [deleteFooterItemModal, setDeleteFooterItemModal] = useState(false);
    const [deleteFooterItem, setDeleteFooterItem] = useState(null);

    const handleFooterModalOpen = (parent = null) => {
        setCreateFooterModal(true);
        setParentFooter(parent);
    };

    const handleFooterModalClose = (open) => {
        setCreateFooterModal(open);
        setParentFooter(null);
    };

    const onSuccess = () => {
        router.reload();
    };
    const handleCloseDeleteModal = (open = false) => {
        setDeleteFooterItemModal(false);
        setDeleteFooterItem(null);
    };
    const handleOpenDeleteModal = (footer) => {
        setDeleteFooterItemModal(true);
        setDeleteFooterItem(footer);
    };

    const handleDelete = async () => {
        try {
            const result = await deleteChildFooters(deleteFooterItem?.id);
            if (result?.success) {
                onSuccess();
                handleCloseDeleteModal();
            }
        } catch (err) {}
    };

    return (
        <AdminLayout user={auth?.user} title={"Footer Settings"}>
            <div className="w-full lg:w-[80%] lg:mx-auto">
                <div className="flex items-center justify-between">
                    <p className="text-4xl font-bold">Footers</p>

                    <button
                        onClick={() => setCreateFooterModal(true)}
                        className="btn btn-neutral"
                    >
                        Create new footer
                    </button>
                </div>
                <div className="flex items-center flex-wrap gap-3 mt-3">
                    {footers.map((footer, index) => (
                        <div
                            key={footer.id}
                            className="bg-base-200 basis-[350px] grow rounded-md p-4"
                        >
                            <div className="flex items-center gap-5 justify-between">
                                <div className="text-xl font-medium">
                                    {footer.title}
                                </div>
                                <button
                                    onClick={() =>
                                        handleFooterModalOpen(footer)
                                    }
                                    className="btn btn-neutral btn-sm"
                                >
                                    Add
                                </button>
                            </div>
                            <div className="ml-4 flex flex-col mt-3 gap-4">
                                {footer?.sub_navs?.map((subFooter) => (
                                    <div
                                        key={subFooter.id}
                                        className="flex flex-col gap-2 bg-base-100 p-2 rounded-md"
                                    >
                                        <div className="">
                                            <h1 className="font-bold">
                                                {subFooter.title}
                                            </h1>
                                            <p>{subFooter.link}</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={() =>
                                                    handleOpenDeleteModal(
                                                        subFooter
                                                    )
                                                }
                                                className="btn btn-secondary btn-sm"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <CreateNewFooterModal
                open={createFooterModal}
                setOpen={handleFooterModalClose}
                parentFooter={parentFooter}
                onSuccess={onSuccess}
            />
            <ActionModal
                open={deleteFooterItemModal}
                setOpen={handleCloseDeleteModal}
                title={`Delete Footer Item`}
                onAction={handleDelete}
                onCancel={handleCloseDeleteModal}
                description={"Are you sure you want to delete this footer?"}
            />
        </AdminLayout>
    );
};

export default FooterSettings;
