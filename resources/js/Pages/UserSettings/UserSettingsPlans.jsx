import { useState } from "react";
import UserSettingsLayout from "../../Layouts/UserSettingsLayout";
import { Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

const UserSettingsPlans = ({ auth, company, subscription }) => {
    const plan = company?.plan;
    const [isMonthlyView, setIsMonthlyView] = useState(true);
    const { t } = useTranslation();
    return (
        <UserSettingsLayout user={auth?.user}>
            <div className="flex-grow mx-auto">
                <p className="text-4xl font-bold mb-4">{t("plans")}</p>
                {subscription && plan && (
                    <div className="card bg-base-200/60 border-2 border-secondary-focus p-4 rounded-lg mb-4">
                        <p className="text-base-content font-extrabold text-2xl">
                            {t("you_are_currently_under")}{" "}
                            <span className="text-green-500">
                                {plan?.title}
                            </span>
                            <br />
                            {t("and")}{" "}
                            <span className="text-green-500">
                                {subscription?.daysLeft}
                            </span>{" "}
                            {t("days_left_for_plan")}
                        </p>
                    </div>
                )}
                {plan && (
                    <div className="card bg-base-200/60 border-2 border-secondary-focus">
                        <div className="card-body relative flex flex-col justify-between">
                            <div className="flex items-center gap-4">
                                <span className="text-secondary text-5xl font-extrabold">
                                    {plan?.title}
                                </span>
                                <div role="tablist" className="tabs tabs-boxed">
                                    <a
                                        onClick={() => setIsMonthlyView(false)}
                                        role="tab"
                                        className={`tab ${
                                            !isMonthlyView ? " tab-active" : ""
                                        }`}
                                    >
                                        {t("yearly")}
                                    </a>
                                    <a
                                        onClick={() => setIsMonthlyView(true)}
                                        role="tab"
                                        className={`tab ${
                                            isMonthlyView ? " tab-active" : ""
                                        }`}
                                    >
                                        {t("monthly")}
                                    </a>
                                </div>
                            </div>
                            <div>
                                {isMonthlyView ? (
                                    <p className="monthly-plan text-dark font-bold">
                                        <span className="text-4xl">
                                            {plan?.currency_symbol}
                                            {plan?.monthly_price}
                                            {plan?.currency}
                                        </span>
                                        / {t("month")}
                                    </p>
                                ) : (
                                    <p className="yearly-plan text-dark relative font-bold ">
                                        <span className="text-4xl relative inline-block">
                                            {plan?.currency_symbol}
                                            {plan?.yearly_price}
                                            {plan?.currency}
                                        </span>{" "}
                                        <span className="ml-5">
                                            {" "}
                                            / {t("year")}
                                        </span>
                                    </p>
                                )}
                            </div>
                            <p>{plan?.description}</p>
                        </div>
                    </div>
                )}

                <Link href="/settings/plans/upgrade">
                    <button className="btn btn-neutral mt-5">
                        {t("upgrade_your_membership")}
                    </button>
                </Link>
            </div>
        </UserSettingsLayout>
    );
};

export default UserSettingsPlans;
