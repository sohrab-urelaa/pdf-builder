import { useState } from "react";
import CompanyItem from "../../Components/company/CompanyItem";
import AdminLayout from "../../Layouts/AdminLayout";
import CreateNewCompany from "../../Components/company/CreateNewCompany";
import { router } from "@inertiajs/react";
import Pagination from "../../Components/utill/Pagination";
import { useTranslation } from "react-i18next";

const AdminCompany = ({ auth, companies }) => {
    const [createNewCompany, setCreateNewCompany] = useState(false);
    const { t } = useTranslation();
    const handleSuccess = () => {
        router.reload();
    };
    return (
        <AdminLayout title={"Company"} user={auth?.user}>
            <div className="max-w-7xl mx-auto sm:px-2">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                    <p className="text-4xl font-bold">{t("company")}</p>

                    <button
                        onClick={() => setCreateNewCompany(true)}
                        className="btn  btn-outline font-xl"
                    >
                        {t("create_new_company")}
                    </button>
                </div>
                <div className="overflow-x-auto mt-4">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>{t("id")}</th>
                                <th>{t("company_name")}</th>
                                <th>{t("description")}</th>
                                <th>{t("plan")}</th>
                                <th>{t("Owner")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {companies?.data?.map((company) => (
                                <CompanyItem
                                    key={company?.id}
                                    company={company}
                                />
                            ))}
                        </tbody>
                        {/* foot */}
                        <tfoot>
                            <tr>
                                <th>{t("id")}</th>
                                <th>{t("company_name")}</th>
                                <th>{t("description")}</th>
                                <th>{t("plan")}</th>
                                <th>{t("Owner")}</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <br />
                <Pagination links={companies?.links} />
            </div>
            <br />

            <CreateNewCompany
                open={createNewCompany}
                setOpen={setCreateNewCompany}
                onSuccess={handleSuccess}
            />
        </AdminLayout>
    );
};

export default AdminCompany;
