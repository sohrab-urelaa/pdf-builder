import { useRef, useState } from "react";
import UserSettingsLayout from "../../Layouts/UserSettingsLayout";
import UserUpgradePlanItem from "../../Components/plans/UserUpgradePlanItem";
import { upgradeMembership } from "../../api/userApi";
import { router } from "@inertiajs/react";

const PayForPlan = ({ auth, plan, isYearly }) => {
    const paymentAmount = isYearly ? plan?.yearly_price : plan?.monthly_price;
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState("");
    const [navigationTimeout, setNavigationTimeout] = useState(30);
    const currentInterval = useRef(null);

    const handleUpgradeMembership = async () => {
        const bodyData = {
            plan_id: plan.id,
            billing_cycle: isYearly ? "yearly" : "monthly",
            payment_method: "Bkash",
        };
        try {
            setIsLoading(true);
            const result = await upgradeMembership(bodyData);
            if (result?.data?.subscription) {
                setIsSuccess(true);
                setAutoNavigation();
                setError("");
            } else {
                setError("Something wen't wrong!! Please try again leter.");
            }
        } catch (err) {
        } finally {
            setIsLoading(false);
        }
    };

    const setAutoNavigation = () => {
        setNavigationTimeout(5);
        currentInterval.current = setInterval(() => {
            setNavigationTimeout((prev) => {
                if (prev == 0) {
                    clearInterval(currentInterval.current);
                    handleNaviageToMembershipPage();
                    return 0;
                } else {
                    return prev - 1;
                }
            });
        }, 1000);
    };

    const handleNaviageToMembershipPage = () => {
        router.replace("/settings/plans");
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
                            <span>Your membership upgraded successfully</span>
                        </div>
                        <br />
                        <p>
                            We will redirect to home page after{" "}
                            <span className="font-extrabold text-lg">
                                {navigationTimeout}s
                            </span>
                        </p>
                        <br />
                        <button
                            onClick={handleNaviageToMembershipPage}
                            className="btn btn-neutral text-xl"
                        >
                            Navigate To Home
                        </button>
                    </div>
                )}

                {plan && (
                    <div className="card bg-base-200/60 border-2 border-secondary-focus">
                        <div className="card-body relative flex flex-col justify-between">
                            <div className="flex items-center gap-4 justify-between">
                                <span className="text-secondary text-5xl font-extrabold">
                                    {plan?.title}
                                </span>
                                <button
                                    disabled={isLoading || isSuccess}
                                    onClick={handleUpgradeMembership}
                                    className="btn btn-outline text-xl"
                                >
                                    {!isLoading ? (
                                        <>
                                            Pay ${paymentAmount} For{" "}
                                            {isYearly ? "/year" : "/month"}
                                        </>
                                    ) : (
                                        "Upgrading.."
                                    )}
                                </button>
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