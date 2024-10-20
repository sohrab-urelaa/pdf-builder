import { useRef, useState } from "react";
import UserSettingsLayout from "../../Layouts/UserSettingsLayout";
import { upgradeMembership } from "../../api/userApi";
import { router } from "@inertiajs/react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const PayForPlan = ({ auth, plan, isYearly, payment_getway_list = [] }) => {
    const paymentAmount = isYearly ? plan?.yearly_price : plan?.monthly_price;
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [createdSubscriptions, setCreatedSubscriptions] = useState(null);
    const [error, setError] = useState("");
    const [navigationTimeout, setNavigationTimeout] = useState(30);
    const currentInterval = useRef(null);
    const { t } = useTranslation();
    const handleUpgradeMembership = async (getway_name) => {
        const bodyData = {
            plan_id: plan.id,
            billing_cycle: isYearly ? "yearly" : "monthly",
            payment_method: "My Fatoorah",
        };
        try {
            setCreatedSubscriptions(null);
            setIsLoading(true);
            const result = await upgradeMembership(bodyData);
            if (result?.data?.subscription) {
                setCreatedSubscriptions(result?.data?.subscription);
                setIsSuccess(true);
                setAutoNavigation(result?.data?.subscription, getway_name);
                setError("");
            } else {
                setError("Something wen't wrong!! Please try again leter.");
            }
        } catch (err) {
        } finally {
            setIsLoading(false);
        }
    };

    const setAutoNavigation = (subscription, getway_name) => {
        if (getway_name === "Paypal") {
            window.location.href = `/process-transaction/${subscription.id}`;
        } else if (getway_name === "My Fatoorah") {
            window.location.href = `/myfatoorah/checkout?oid=${subscription.id}`;
        } else {
            toast.error("Unsupported payment getway!");
        }
    };

    const handleNaviageToMembershipPage = () => {
        if (createdSubscriptions?.id) {
            router.replace(
                `/myfatoorah/checkout?oid=${createdSubscriptions.id}`
            );
        } else {
            router.replace("/settings/plans");
        }
    };
    return (
        <UserSettingsLayout user={auth?.user}>
            <div className="flex-grow mx-auto">
                <p className="text-4xl font-bold mb-4">UPGRADE MEMBERSHIP</p>
                {error && (
                    <div className="bg-base-300 rounded-md p-4 my-3">
                        <div role="alert" className="alert alert-error">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 shrink-0 stroke-current"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>{error}</span>
                        </div>
                    </div>
                )}

                {isSuccess && (
                    <div className="bg-base-300 rounded-md p-4 my-3">
                        <div role="alert" className="alert alert-success">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 shrink-0 stroke-current"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>Payment initiated successfully</span>
                        </div>
                        <br />
                        <p>
                            We will redirect to payment page after{" "}
                            <span className="font-extrabold text-lg">
                                {navigationTimeout}s
                            </span>
                        </p>
                        <br />
                        {/* <button
                            onClick={handleNaviageToMembershipPage}
                            className="btn btn-neutral text-xl"
                        >
                            Navigate To Payment Page
                        </button> */}
                    </div>
                )}

                {plan && (
                    <div className="card bg-base-200/60 border-2 border-secondary-focus">
                        <div className="card-body relative flex flex-col justify-between">
                            <div className="flex items-center gap-4 justify-between">
                                <span className="text-secondary text-5xl font-extrabold">
                                    {plan?.title}
                                </span>
                                <div className="flex flex-col gap-3">
                                    {!payment_getway_list?.length && (
                                        <button>
                                            {t("no_getway_configured")}
                                        </button>
                                    )}
                                    {payment_getway_list?.map((getway_item) => {
                                        return (
                                            <button
                                                disabled={
                                                    isLoading || isSuccess
                                                }
                                                onClick={() =>
                                                    handleUpgradeMembership(
                                                        getway_item
                                                    )
                                                }
                                                className="btn btn-outline text-xl"
                                            >
                                                {!isLoading ? (
                                                    <>
                                                        Pay{" "}
                                                        {plan?.currency_symbol}
                                                        {paymentAmount}{" "}
                                                        {plan?.currency} For{" "}
                                                        {isYearly
                                                            ? "/year"
                                                            : "/month"}{" "}
                                                        Using {getway_item}
                                                    </>
                                                ) : (
                                                    "Upgrading.."
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <p>{plan?.description}</p>
                        </div>
                    </div>
                )}
            </div>
        </UserSettingsLayout>
    );
};

export default PayForPlan;
