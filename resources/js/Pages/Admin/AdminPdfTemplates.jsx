import AdminLayout from "../../Layouts/AdminLayout";
import { Link } from "@inertiajs/react";
import Pagination from "../../Components/utill/Pagination";
import { useTranslation } from "react-i18next";

const AdminPdfTemplates = ({ auth, data }) => {
    const { t } = useTranslation();
    return (
        <AdminLayout title={"Company"} user={auth?.user}>
            <div className="max-w-7xl mx-auto sm:px-2">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                    <p className="text-4xl font-bold">
                        {t("pdf_templates")}({data?.total})
                    </p>
                </div>
                <div class="overflow-x-auto mt-4">
                    <table class="table w-full table-lg rounded-b-none overflow-hidden">
                        <thead class="bg-base-200">
                            <tr class="text-base-content uppercase">
                                <th>{t("owner")}</th>
                                <th>{t("title")}</th>
                                <th>{t("description")}</th>
                                <th class="text-right" width="1px"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.data?.map((item) => (
                                <tr key={item.id} scope="row">
                                    <td>
                                        <div className="flex flex-col">
                                            <h1 className="font-bold">
                                                {item?.owner?.name}
                                            </h1>
                                            <p>{item?.owner?.email}</p>
                                        </div>
                                    </td>
                                    <td>{item?.title}</td>
                                    <td>{item?.description}</td>
                                    <td class="flex items-center space-x-2 justify-end">
                                        <Link
                                            href={`/admin/submissions/${item.id}`}
                                        >
                                            <button class="btn btn-outline btn-sm">
                                                {t("view_submissions")}
                                            </button>{" "}
                                        </Link>
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
        </AdminLayout>
    );
};

export default AdminPdfTemplates;
