import { useState } from "react";
import UserSettingsLayout from "../../Layouts/UserSettingsLayout";
import UserUpgradePlanItem from "../../Components/plans/UserUpgradePlanItem";

const UpgradeMembership = ({ auth, plans }) => {
    return (
        <UserSettingsLayout user={auth?.user}>
            <div className="flex-grow mx-auto">
                <p className="text-4xl font-bold mb-4">Upgrade Membership</p>
            </div>
            {plans.map((plan) => (
                <UserUpgradePlanItem plan={plan} key={plan.id} />
            ))}
        </UserSettingsLayout>
    );
};

export default UpgradeMembership;
