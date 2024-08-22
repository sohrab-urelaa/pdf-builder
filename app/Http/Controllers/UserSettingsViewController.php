<?php

namespace App\Http\Controllers;

use App\Http\Helpers\EmailTemplateMarkers;
use App\Models\CompanyModel;
use App\Models\EmailTemplate;
use App\Models\PaymentGetwaysForCountries;
use App\Models\PlansModel;
use App\Models\SslCertificateModal;
use App\Models\SubscriptionModel;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class UserSettingsViewController extends Controller
{
    function getUserSettingsPlan()
    {
        $current_user = auth()->user();
        $main_user_id = User::get_main_user_id($current_user);
        $company = CompanyModel::where(["ownerId" => $main_user_id])->with("plan")->first();
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
        $user_id = User::get_main_user_id($current_user);
        $company = CompanyModel::where(["ownerId" => $user_id])->with("plan")->first();
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
        $main_user_id = User::get_main_user_id($current_user);

        $main_country = $current_user["country"];

        if ($current_user["id"] != $main_user_id) {
            $fetch_user = User::find($main_user_id);
            $main_country = $fetch_user["country"];
        }
        $getway_item = PaymentGetwaysForCountries::where("country_name", $main_country)
            ->first();
        $plan = PlansModel::where('id', $planId)->first();
        return Inertia::render(
            'UserSettings/PayForPlan',
            [
                "user" => $current_user,
                "plan" => $plan,
                "isYearly" => $billing_cycle === 'yearly' ? true : false,
                "payment_getway_list" => $getway_item["getway_list"] ?? []
            ]
        );
    }
    function getUerPaymentPage()
    {
        $current_user = auth()->user();
        $user_id = User::get_main_user_id($current_user);
        $data = SubscriptionModel::where("user_id", $user_id)->with("plan")->paginate(7);


        return Inertia::render(
            'UserSettings/UserPayments',
            [
                "user" => $current_user,
                "data" => $data,
            ]
        );
    }

    function getUserEmailTemplatesPage()
    {
        $current_user = auth()->user();

        $main_user_id = User::get_main_user_id($current_user);
        $templates = EmailTemplate::where(function ($query) use ($main_user_id) {
            $query->where('owner', EmailTemplate::ADMIN_OWNER)
                ->orWhere('user_id', $main_user_id);
        })
            ->whereIn('name', [
                EmailTemplateMarkers::TEMPLATE_INVITATION_MAIL,
                EmailTemplateMarkers::TEMPLATE_SUBMITTED_CONFIRMATION_MAIL_FOR_AUTHOR,
                EmailTemplateMarkers::TEMPLATE_SUBMITTED_CONFIRMATION_MAIL_FOR_SUBMITTER,
            ])
            ->get();

        $groupedTemplates = $templates->groupBy('name');
        $filteredTemplates = $groupedTemplates->map(function ($group) {
            if ($group->contains('owner', EmailTemplate::USER_OWNER)) {
                return $group->where('owner', EmailTemplate::USER_OWNER);
            }
            return $group;
        })->flatten();

        return Inertia::render(
            'UserSettings/UserEmailTemplates',
            [
                "user" => $current_user,
                "email_templates" => $filteredTemplates
            ]
        );
    }

    function getUserTemplateEditorPage($id)
    {
        $email_template = EmailTemplate::find($id);
        $available_markers = EmailTemplateMarkers::getAvailableMarkers($email_template["name"]);
        return Inertia::render('UserSettings/UserEmailTemplateEditor', [
            "email_template" => $email_template,
            "markers" => $available_markers,
        ]);
    }
}
