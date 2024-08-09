import AdminLayout from "../../Layouts/AdminLayout";
import Pagination from "../../Components/utill/Pagination";
import { Link, router } from "@inertiajs/react";
import { useState } from "react";
import { deleteLanguage as deleteLanguageData } from "../../api/languageApi";
import { toast } from "react-toastify";
import ActionModal from "../../Components/utill/ActionModal";

const SupportedLanguage = ({ auth, data }) => {
    const [deleteLanguage, setDeleteLanuage] = useState(null);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);

    const handleDelete = async () => {
        try {
            setIsDeleteLoading(true);
            const res = await deleteLanguageData(deleteLanguage?.id);
            if (res?.success) {
                toast.success(res?.message);
                router.reload();
                setIsOpenDeleteModal(false);
                setDeleteLanuage(null);
            } else {
                toast.error("Something wen't wrong!!Please try again later.");
            }
        } catch (err) {
            toast.error("Something wen't wrong!!Please try again later.");
        } finally {
            setIsDeleteLoading(false);
        }
    };
    return (
        <AdminLayout title={"Company"} user={auth?.user}>
            <div className="max-w-7xl mx-auto sm:px-2">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                    <p className="text-4xl font-bold">
                        Supported Language ({data?.total})
                    </p>
                    <Link href="/admin/language/create">
                        <button className="btn btn-neutral btn-md text-lg">
                            Create New
                        </button>
                    </Link>
                </div>
                <div class="overflow-x-auto mt-4">
                    <table class="table w-full table-lg rounded-b-none overflow-hidden">
                        <thead class="bg-base-200">
                            <tr class="text-base-content uppercase">
                                <th>Country</th>
                                <th>Country code</th>
                                <th>Status</th>
                                <th class="text-right" width="1px"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.data?.map((language) => (
                                <tr key={language.id} scope="row">
                                    <td>{language?.country_name}</td>
                                    <td>{language?.country_code}</td>
                                    <td>
                                        <span class="badge badge-info badge-outline">
                                            {language?.is_active === 0
                                                ? "Deactivated"
                                                : "Activated"}
                                        </span>
                                    </td>
                                    <td class="flex items-center space-x-2 justify-end">
                                        <Link
                                            href={`/admin/language/create/${language?.id}`}
                                        >
                                            <button class="btn btn-outline btn-sm">
                                                Edit
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => {
                                                setDeleteLanuage(language);
                                                setIsOpenDeleteModal(true);
                                            }}
                                            class="btn btn-warning btn-outline btn-sm"
                                        >
                                            Delete
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
            <ActionModal
                open={isOpenDeleteModal}
                setOpen={setIsOpenDeleteModal}
                onAction={handleDelete}
                onCancel={() => {
                    setIsOpenDeleteModal(false);
                    setDeleteLanuage(null);
                }}
                title={"Delete Language"}
                description={`Are you sure you want to delete this language? (${deleteLanguage?.country_name})`}
            />
        </AdminLayout>
    );
};

export default SupportedLanguage;
