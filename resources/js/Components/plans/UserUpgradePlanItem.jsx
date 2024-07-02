import { Link } from "@inertiajs/react";
import { useState } from "react";

const UserUpgradePlanItem = ({ plan }) => {
    const [isMonthlyView, setIsMonthlyView] = useState(true);
    return (
        <div className="card bg-base-200/60 border-2 border-secondary-focus mt-2">
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
                            Yearly
                        </a>
                        <a
                            onClick={() => setIsMonthlyView(true)}
                            role="tab"
                            className={`tab ${
                                isMonthlyView ? " tab-active" : ""
                            }`}
                        >
                            Monthly
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
                            / month
                        </p>
                    ) : (
                        <p className="yearly-plan text-dark relative font-bold ">
                            <span className="text-4xl relative inline-block">
                                {plan?.currency_symbol}
                                {plan?.yearly_price}
                                {plan?.currency}
                            </span>{" "}
                            <span className="ml-5"> / year</span>
                        </p>
                    )}
                </div>
                <p>{plan?.description}</p>
                <Link
                    href={`/settings/plans/pay/${plan.id}/${
                        isMonthlyView ? "monthly" : "yearly"
                    }`}
                >
                    <button className="mt-4 btn btn-neutral px-4 text-xl">
                        Pay And Upgrade
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default UserUpgradePlanItem;
