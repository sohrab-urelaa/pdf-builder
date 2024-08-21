<?php

namespace App\Http\Controllers;

use App\Models\CompanyModel;
use App\Models\PlansModel;
use App\Models\SslCertificateModal;
use App\Models\SubscriptionModel;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserSettingsViewController extends Controller
{
    function getUserSettingsPlan()
    {
        $current_user = auth()->user();
        $company = CompanyModel::where(["ownerId" => $current_user["id"]])->with("plan")->first();
        $subscription = SubscriptionModel::where([
            "company_id" => $company["id"],
            "is_active" => true,
        ])->first();

        if ($subscription) {
            $endDate = Carbon::parse($subscription->end_date);
            $daysLeft = $endDate->diffInDays(Carbon::now());
            $subscription["daysLeft"] = $daysLeft;
        }


        return Inertia::render(
            'UserSettings/UserSettingsPlans',
            [
                "user" => $current_user,
                "company" => $company,
                "subscription" => $subscription
            ]
        );
    }
    function getUsersSettingsPage()
    {
        $current_user = auth()->user();
        $users = User::where(["parent_admin" => $current_user["id"]])->paginate(7);
        return Inertia::render(
            'UserSettings/UserListSettings',
            [
                "user" => $current_user,
                "users" => $users,
            ]
        );
    }
    function getSigneturePage()
    {
        $current_user = auth()->user();
        $certificates = SslCertificateModal::where("user_id", $current_user["id"])
            ->with("user")
            ->paginate();
        return Inertia::render(
            'UserSettings/ESignature',
            [
                "user" => $current_user,
                "data" => $certificates
            ]
        );
    }
    function getProfilePage()
    {
        $current_user = auth()->user();
        return Inertia::render(
            'UserSettings/UserProfile',
            [
                "user" => $current_user,
            ]
        );
    }
    function getCompanyPage()
    {
        $current_user = auth()->user();
        $company = CompanyModel::where(["ownerId" => $current_user["id"]])->with("plan")->first();
        return Inertia::render(
            'UserSettings/UserCompany',
            [
                "user" => $current_user,
                "company" => $company,
            ]
        );
    }
    function getVerifySigneturePage()
    {
        $current_user = auth()->user();
        return Inertia::render(
            'UserSettings/VerifySignature',
            [
                "user" => $current_user,
            ]
        );
    }
    function getUpgradePlansPage()
    {
        $current_user = auth()->user();
        $plans = PlansModel::where('isDefault', false)->get();
        return Inertia::render(
            'UserSettings/UpgradeMembership',
            [
                "user" => $current_user,
                "plans" => $plans
            ]
        );
    }
    function getPayPlanPage($planId, $billing_cycle)
    {
        $current_user = auth()->user();
        $plan = PlansModel::where('id', $planId)->first();
        return Inertia::render(
            'UserSettings/PayForPlan',
            [
                "user" => $current_user,
                "plan" => $plan,
                "isYearly" => $billing_cycle === 'yearly' ? true : false
            ]
        );
    }
    function getUerPaymentPage()
    {
        $current_user = auth()->user();
        $data = SubscriptionModel::where("user_id", $current_user["id"])->with("plan")->paginate(7);


        return Inertia::render(
            'UserSettings/UserPayments',
            [
                "user" => $current_user,
                "data" => $data,
            ]
        );
    }
}
