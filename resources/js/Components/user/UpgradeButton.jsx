import { useTranslation } from "react-i18next";
import { Link } from "@inertiajs/react";
import useCurrentPlan from "../../hooks/useCurrentPlan";

const UpgradeButton = () => {
    const { t } = useTranslation();
    const { plan, loading } = useCurrentPlan();
    const isDisplayUpgrade =
        !loading &&
        plan &&
        (plan?.current_plan_days_left <= 0 || plan?.is_default_plan === 1);
    if (isDisplayUpgrade) {
        return (
            <Link href="/settings/plans/upgrade">
                <button className="btn btn-warning text-xl mx-2">
                    {t("upgrade_plan")}
                </button>
            </Link>
        );
    }
    return null;
};

export default UpgradeButton;
