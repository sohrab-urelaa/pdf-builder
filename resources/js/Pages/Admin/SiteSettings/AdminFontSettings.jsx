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
import { deleteFont } from "../../../api/fontApi";
import CreateNewFont from "../../../Components/admin/CreateNewFont";
const AdminFontSettings = ({ auth, data }) => {
    const [t] = useTranslation();
    const [createFontModal, setCreateFontModal] = useState(false);
    const [selectedFont, setSelectedFont] = useState(null);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const handleSuccess = () => {
        setSelectedFont(null);
        router.reload();
    };
    const handleDelete = async () => {
        try {
            setDeleteLoading(true);
            const res = await deleteFont(selectedFont?.id);
            if (res?.success) {
                toast.success(res?.message);
                setDeleteModal(false);
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

    return (
        <AdminLayout user={auth?.user} title={t("font_setting")}>
            <div className="w-full ">
                <div className="flex items-center justify-between">
                    <p className="text-4xl font-bold">{t("fonts")}</p>
                    <button
                        onClick={() => setCreateFontModal(true)}
                        className="btn btn-neutral"
                    >
                        {t("create_new_font")}
                    </button>
                </div>
                <div class="overflow-x-auto mt-4">
                    <table class="table w-full table-lg rounded-b-none overflow-hidden">
                        <thead class="bg-base-200">
                            <tr class="text-base-content uppercase">
                                <th>{t("font_name")}</th>
                                <th>{t("active")}</th>
                                <th>{t("public")}</th>
                                <th class="text-right" width="1px"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.data?.map((font) => (
                                <tr key={font.id} scope="row">
                                    <td>{font?.font_name}</td>
                                    <td>
                                        <span class="badge badge-info badge-outline">
                                            {font?.is_active === 0
                                                ? t("inactive")
                                                : t("active")}
                                        </span>
                                    </td>
                                    <td>
                                        <span class="badge badge-info badge-outline">
                                            {font?.is_public === 1
                                                ? t("for_public_user")
                                                : t("not_for_public_user")}
                                        </span>
                                    </td>
                                    <td class="flex items-center space-x-2 justify-end">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedFont(font);
                                                    setDeleteModal(true);
                                                }}
                                                className="btn btn-sm btn-outline"
                                            >
                                                {t("delete")}
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedFont(font);
                                                    setEditModal(true);
                                                }}
                                                className="btn btn-sm btn-outline"
                                            >
                                                {t("edit")}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <CreateNewFont
                open={createFontModal}
                setOpen={setCreateFontModal}
                onSuccess={handleSuccess}
            />
            <CreateNewFont
                key={"edit_font"}
                open={editModal}
                setOpen={setEditModal}
                onSuccess={handleSuccess}
                edit={true}
                font={selectedFont}
            />
            <ActionModal
                open={deleteModal}
                setOpen={setDeleteModal}
                onAction={handleDelete}
                onCancel={() => {
                    setDeleteModal(false);
                    setSelectedFont(null);
                }}
                title={t("delete_font")}
                description={`${t("delete_font_message")} (${
                    selectedFont?.font_name
                })`}
            />
        </AdminLayout>
    );
};

export default AdminFontSettings;
