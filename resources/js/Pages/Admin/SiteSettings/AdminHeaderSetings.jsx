import { useTranslation } from "react-i18next";
import AdminLayout from "../../../Layouts/AdminLayout";
import { useEffect, useState } from "react";
import CreateNewHeader from "../../../Components/admin/CreateNewHeader";
import { router } from "@inertiajs/react";
import ActionModal from "../../../Components/utill/ActionModal";
import { toast } from "react-toastify";
import {
    deleteHeader,
    deleteSubHeader,
    getSubHeaders,
} from "../../../api/headerApi";
import CreateNewSubHeader from "../../../Components/admin/CreateNewSubHeader";
import { flushSync } from "react-dom";
const AdminHeaderSettings = ({ auth, data, nav_type }) => {
    const [t] = useTranslation();
    const [createHeaderModal, setCreateHeaderModal] = useState(false);
    const [selectedHeader, setSelectedHeader] = useState(null);
    const [actionSelectedHeader, setActionSelectedHeader] = useState(null);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteSubHeaderLoading, setDeleteSubHeaderLoading] = useState(false);

    const [selectedSubHeader, setSelectedSubHeader] = useState(null);
    const [createSubHeaderModal, setCreateSubHeaderModal] = useState(false);
    const [editSubHeaderModal, setEditSubHeaderModal] = useState(false);
    const [deleteSubHeaderModal, setDeleteSubHeaderModal] = useState(false);
    const [getSubHeadersLoading, setGetSubHeadersLoading] = useState(false);
    const [subHeaders, setSubHeaders] = useState([]);

    const handleSuccess = () => {
        setSelectedHeader(null);
        router.reload();
    };
    const handleSubHeaderSuccess = () => {
        fetchSubHeaders();
    };
    const handleDelete = async () => {
        try {
            setDeleteLoading(true);
            const res = await deleteHeader(actionSelectedHeader?.id);
            if (res?.success) {
                toast.success(res?.message);
                setDeleteModal(false);
                setActionSelectedHeader(null);
                setSelectedHeader(null);
                handleSuccess();
            } else {
                toast.error(res?.message);
            }
        } catch (err) {
            toast.error("Soemthing went' wrong please try again later!");
        } finally {
            setDeleteLoading(false);
        }
    };
    const handleDeleteSubHeader = async () => {
        try {
            setDeleteSubHeaderLoading(true);
            const res = await deleteSubHeader(selectedSubHeader?.id);
            if (res?.success) {
                toast.success(res?.message);
                setDeleteSubHeaderModal(false);
                setSelectedSubHeader(null);
                handleSubHeaderSuccess();
            } else {
                toast.error(res?.message);
            }
        } catch (err) {
            toast.error("Soemthing went' wrong please try again later!");
        } finally {
            setDeleteSubHeaderLoading(false);
        }
    };

    const fetchSubHeaders = async () => {
        try {
            setGetSubHeadersLoading(true);
            const data = await getSubHeaders(selectedHeader?.id);
            setSubHeaders(data?.data || []);
        } catch (err) {
        } finally {
            setGetSubHeadersLoading(false);
        }
    };

    useEffect(() => {
        if (selectedHeader?.id) {
            fetchSubHeaders();
        }
    }, [selectedHeader]);

    const isHeader = nav_type === "header";

    return (
        <AdminLayout user={auth?.user} title={t("header_settings")}>
            <div className="w-full ">
                <div className="flex items-center justify-between">
                    <p className="text-4xl font-bold">
                        {isHeader ? t("headers") : t("footers")}
                    </p>
                    <button
                        onClick={() => setCreateHeaderModal(true)}
                        className="btn btn-neutral"
                    >
                        {isHeader
                            ? t("create_new_header")
                            : t("create_new_footer")}
                    </button>
                </div>
                <div className="flex gap-3 mt-4">
                    <div className="flex flex-col gap-2 flex-[1]">
                        {data?.map((header) => (
                            <div
                                onClick={() => {
                                    if (header?.subModules === 1) {
                                        setSelectedHeader(header);
                                    }
                                }}
                                className="cursor-pointer bg-base-200 px-2 py-4 rounded-md"
                            >
                                <h5 className="font-bold text-xl text-base-content">
                                    {header?.name}{" "}
                                    <span className="btn btn-outline btn-sm btn-primary">
                                        {header?.public}
                                    </span>
                                </h5>
                                <p>
                                    {header?.subModules === 1
                                        ? "Has Sub Nav: Yes"
                                        : header?.link}
                                </p>
                                {t("has_dynamic_html")}:{" "}
                                {header?.has_dynamic_html === 1
                                    ? t("yes")
                                    : t("no")}
                                <div className="flex items-center gap-2 mt-2">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setActionSelectedHeader(header);
                                            setDeleteModal(true);
                                        }}
                                        className="btn btn-sm btn-outline"
                                    >
                                        {t("delete")}
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setActionSelectedHeader(header);
                                            setEditModal(true);
                                        }}
                                        className="btn btn-sm btn-outline"
                                    >
                                        {t("edit")}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {selectedHeader && (
                        <div className="flex-[1]">
                            <div className="flex items-center justify-between">
                                <h1 className="font-bold text-xl text-base-content">
                                    {isHeader
                                        ? t("sub_header_for")
                                        : t("sub_footer_for")}{" "}
                                    {selectedHeader?.name}
                                </h1>
                                <div className="flex flex-wrap gap-2 items-center">
                                    <button
                                        onClick={() => {
                                            setCreateSubHeaderModal(true);
                                        }}
                                        className="btn btn-sm btn-outline"
                                    >
                                        {t("create")}
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSelectedHeader(null);
                                        }}
                                        className="btn btn-sm btn-outline"
                                    >
                                        {t("close")}
                                    </button>
                                </div>
                            </div>
                            <div className="mt-3 flex flex-col gap-3">
                                {subHeaders?.map((subHeader) => (
                                    <div className="cursor-pointer bg-base-200 px-2 py-4 rounded-md">
                                        <h5 className="font-bold text-xl text-base-content">
                                            {subHeader?.title}
                                        </h5>
                                        <p>
                                            {t("link")}: {subHeader?.link}
                                        </p>
                                        <p>
                                            {t("has_dynamic_html")}:{" "}
                                            {subHeader?.has_dynamic_html === 1
                                                ? t("yes")
                                                : t("no")}
                                        </p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedSubHeader(
                                                        subHeader
                                                    );
                                                    setDeleteSubHeaderModal(
                                                        true
                                                    );
                                                }}
                                                className="btn btn-sm btn-outline"
                                            >
                                                {t("delete")}
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedSubHeader(
                                                        subHeader
                                                    );
                                                    setEditSubHeaderModal(true);
                                                }}
                                                className="btn btn-sm btn-outline"
                                            >
                                                {t("edit")}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <CreateNewHeader
                open={createHeaderModal}
                setOpen={setCreateHeaderModal}
                onSuccess={handleSuccess}
                nav_type={nav_type}
            />
            <CreateNewHeader
                key={"edit_header"}
                open={editModal}
                setOpen={setEditModal}
                onSuccess={handleSuccess}
                edit={true}
                header={actionSelectedHeader}
                nav_type={nav_type}
            />
            <CreateNewSubHeader
                open={createSubHeaderModal}
                setOpen={setCreateSubHeaderModal}
                onSuccess={handleSubHeaderSuccess}
                headerId={selectedHeader?.id}
                isHeader={isHeader}
            />
            <CreateNewSubHeader
                key={"edit_sub_header"}
                open={editSubHeaderModal}
                setOpen={setEditSubHeaderModal}
                onSuccess={handleSubHeaderSuccess}
                headerId={selectedHeader?.id}
                edit={true}
                subHeader={selectedSubHeader}
                isHeader={isHeader}
            />
            <ActionModal
                open={deleteModal}
                setOpen={setDeleteModal}
                onAction={handleDelete}
                onCancel={() => {
                    setDeleteModal(false);
                    setActionSelectedHeader(null);
                }}
                title={t(isHeader ? "delete_header" : "delete_footer")}
                description={`${t(
                    isHeader ? "delete_header_message" : "delete_footer_message"
                )} (${actionSelectedHeader?.name})`}
            />
            <ActionModal
                key={"delte_sub_header"}
                open={deleteSubHeaderModal}
                setOpen={setDeleteSubHeaderModal}
                onAction={handleDeleteSubHeader}
                onCancel={() => {
                    setDeleteSubHeaderModal(false);
                    setSelectedSubHeader(null);
                }}
                title={t(isHeader ? "delete_sub_header" : "delete_sub_footer")}
                description={`${t(
                    isHeader
                        ? "delete_sub_header_message"
                        : "delete_sub_footer_message"
                )} (${selectedSubHeader?.title})`}
            />
        </AdminLayout>
    );
};

export default AdminHeaderSettings;
