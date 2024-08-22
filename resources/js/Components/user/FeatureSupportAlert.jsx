import { useTranslation } from "react-i18next";
import { Link } from "@inertiajs/react";
import useCurrentPlan from "../../hooks/useCurrentPlan";

const alertMessages = {
    user: "user_feature_not_support_alert",
    certificate: "user_feature_not_support_alert",
    email: "user_feature_not_support_alert",
    template: "user_feature_not_support_alert",
};

const FeatureSupportAlert = ({ check_for = "user" }) => {
    const { loading, plan } = useCurrentPlan();
    const { t } = useTranslation();

    let isSupported = false;
    let message = "";

    if (check_for === "user" && plan) {
        isSupported = plan?.user_creation_count > 0;
    }

    if (check_for === "certificate" && plan) {
        isSupported = plan?.can_upload_certificate === 1;
    }
    if (check_for === "email" && plan) {
        isSupported = plan?.can_config_email_template === 1;
    }

    if (check_for === "template" && plan) {
        isSupported = plan?.template_creation_count > 0;
    }

    console.log("Current Plan", plan);

    return (
        <div>
            {/* {loading && (
                <span className="loading loading-spinner loading-lg"></span>
            )} */}

            {!loading && !isSupported && (
                <div role="alert" className="alert alert-warning my-2">
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
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                    <span>
                        {t(alertMessages[check_for])}
                        <span className="ml-4 font-extrabold text-secondary-content underline">
                            <Link href="/settings/plans/upgrade">
                                {t("upgrade_plan")}
                            </Link>
                        </span>
                    </span>
                </div>
            )}
        </div>
    );
};

export default FeatureSupportAlert;
