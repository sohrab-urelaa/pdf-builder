import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import DashboardSubHeading from "../Layouts/DashboardSubHeading";
import { CiCalendar } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { GrClone } from "react-icons/gr";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import formatDateString from "../lib/date-formate";
import { useTranslation } from "react-i18next";
import CreateTemplateModal from "../Components/home/CreateTemplateModal";
import ActionModal from "../Components/utill/ActionModal";
import { toast } from "react-toastify";
import { deleteTemplate } from "../api/templateApi";
export default function Dashboard({ auth, templates }) {
    const { t } = useTranslation();

    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const [cloneModal, setCloneModal] = useState(false);

    const handleCopyLink = (template) => {
        const link = `${window.origin}/submit-templates/${template.id}`;
        navigator.clipboard
            .writeText(link)
            .then(() => {
                console.log("Text copied to clipboard!");
            })
            .catch((err) => {
                console.error("Failed to copy text: ", err);
            });
    };

    const handleSuccess = (data) => {
        router.replace(`/template-builder/${data?.id}`);
    };

    const handleDelete = async () => {
        try {
            const result = await deleteTemplate(selectedTemplate?.id);
            if (result?.success) {
                toast.success(result?.message);
                router.reload();
            } else {
                toast.error(result?.message);
            }
        } catch (err) {
            toast.error("Something wen't wrong");
        } finally {
            setSelectedTemplate(null);
            setDeleteModal(false);
        }
    };
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={t("dashboard")} />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <DashboardSubHeading title={t("templates")} />

                <div className="flex items-center gap-4 flex-wrap mt-4">
                    {templates.map((item) => (
                        <div className="basis-[300px] grow bg-base-200 p-6 rounded-lg">
                            <div className="flex justify-between gap-2">
                                <div>
                                    <Link
                                        href={`/submitted-templates/${item.id}`}
                                    >
                                        <h1 className="text-xl text-base-content font-extrabold">
                                            {item?.title}
                                        </h1>
                                    </Link>
                                    user{" "}
                                    <div className="mt-4">
                                        <p
                                            className="flex items-center gap-2 text-[14px] tooltip"
                                            data-tip="Author"
                                        >
                                            <span>
                                                <FaRegUser color="text-base-content" />
                                            </span>
                                            {item?.owner?.name}
                                        </p>
                                        <p
                                            className="flex items-center gap-2 text-[14px] tooltip"
                                            data-tip="Created At"
                                        >
                                            <span>
                                                <CiCalendar color="text-base-content" />
                                            </span>
                                            {formatDateString(item?.created_at)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <button
                                        onClick={() => handleCopyLink(item)}
                                        className="btn btn-ghost btn-sm tooltip"
                                        data-tip="Copy Link"
                                    >
                                        <FaRegCopy />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSelectedTemplate(item);
                                            setDeleteModal(true);
                                        }}
                                        className="btn btn-ghost btn-sm tooltip"
                                        data-tip="Delete"
                                    >
                                        <MdDeleteOutline />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSelectedTemplate(item);
                                            setCloneModal(true);
                                        }}
                                        className="btn  btn-ghost btn-sm tooltip"
                                        data-tip="Clone"
                                    >
                                        <GrClone />
                                    </button>
                                    <Link href={`/template-builder/${item.id}`}>
                                        <button
                                            className="btn btn-ghost btn-sm tooltip"
                                            data-tip="Edit"
                                        >
                                            <FaEdit />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <CreateTemplateModal
                onSuccess={handleSuccess}
                open={cloneModal}
                setOpen={setCloneModal}
                clonedTemplate={selectedTemplate}
            />
            <ActionModal
                open={deleteModal}
                setOpen={setDeleteModal}
                onAction={handleDelete}
                onCancel={() => {
                    setSelectedTemplate(null);
                    setDeleteModal(false);
                }}
                title={t("delete_template")}
                description={`${t("delete_template_message")} (${
                    selectedTemplate?.title
                })`}
            />
        </AuthenticatedLayout>
    );
}
