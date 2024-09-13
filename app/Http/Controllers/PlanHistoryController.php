<?php

namespace App\Http\Controllers;

use App\Http\Helpers\EmailTemplateProviders;
use App\Mail\CustomMailTemplate;
use App\Models\CompanyModel;
use App\Models\PlansModel;
use App\Models\SubscriptionModel;
use App\Models\User;
use App\Models\UserPlanHistory;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PlanHistoryController extends Controller
{

    public function getCurrentUserPlanSupportHistory()
    {

        $current_user = auth()->user();

        $user_id = User::get_main_user_id($current_user);

        $company = CompanyModel::where(["ownerId" => $user_id])->with("plan")->first();
        $subscription = SubscriptionModel::where([
            "company_id" => $company["id"],
            "is_active" => true,
        ])->first();

        if ($subscription) {
            $endDate = Carbon::parse($subscription->end_date);
            $daysLeft = $endDate->diffInDays(Carbon::now());
            $subscription["daysLeft"] = $daysLeft;
        }

        $plan_history = UserPlanHistory::where('user_id', $user_id)
            ->where('is_active', 1)
            ->first();

        $plan_history["current_plan_days_left"] = $subscription["daysLeft"];
        $plan_history["is_default_plan"] = $company["plan"]['isDefault'];
        return response()->json([
            "success" => true,
            "message" => "Plan History Fetched",
            "data" => $plan_history
        ]);
    }

    static function can_change_email_template($user)
    {
        $user_type = $user['role'];
        $user_id = $user["id"];

        if ($user_type === User::USER_USER_TYPE) {
            $user_id = $user["parent_admin"];
        }

        $plan_history = UserPlanHistory::where('user_id', $user_id)
            ->where('is_active', 1)
            ->first();

        $can_config_email_template = $plan_history["can_config_email_template"];
        $has_permission = false;
        if ($can_config_email_template === 1) {
            $has_permission = true;
        }
        return $has_permission;
    }

    static function can_upload_certificate($user)
    {
        $user_type = $user['role'];
        $user_id = $user["id"];

        if ($user_type === User::USER_USER_TYPE) {
            $user_id = $user["parent_admin"];
        }

        $plan_history = UserPlanHistory::where('user_id', $user_id)
            ->where('is_active', 1)
            ->first();

        $upload_certificate_permission = $plan_history["can_upload_certificate"];
        $has_permission = false;
        if ($upload_certificate_permission === 1) {
            $has_permission = true;
        }
        return $has_permission;
    }

    static function has_template_creation_limit($user)
    {
        $user_type = $user['role'];
        $user_id = $user["id"];

        if ($user_type === User::USER_USER_TYPE) {
            $user_id = $user["parent_admin"];
        }

        $plan_history = UserPlanHistory::where('user_id', $user_id)
            ->where('is_active', 1)
            ->first();

        $template_creation_limit = $plan_history["template_creation_count"];

        $has_limit = false;
        if ($template_creation_limit > 0) {
            $has_limit = true;
        }

        return [
            "has_limit" => $has_limit,
            "plan_history" => $plan_history,
            "next_limit" => $template_creation_limit - 1
        ];
    }
    static function has_user_creation_limit($user)
    {
        $user_type = $user['role'];
        $user_id = $user["id"];

        if ($user_type === User::USER_USER_TYPE) {
            $user_id = $user["parent_admin"];
        }

        $plan_history = UserPlanHistory::where('user_id', $user_id)
            ->where('is_active', 1)
            ->first();

        $user_creation_count = $plan_history["user_creation_count"];

        $has_limit = false;
        if ($user_creation_count > 0) {
            $has_limit = true;
        }
        return [
            "has_limit" => $has_limit,
            "plan_history" => $plan_history,
            "next_limit" => $user_creation_count - 1
        ];
    }

    static function create_new_plan_history($user, $plan)
    {
        $prevPlan = UserPlanHistory::where("user_id", $user["id"])
            ->where("is_active", true)
            ->first();

        $default_plan = PlansModel::where("isDefault", true)->first();


        $template_creation_count = $plan["template_creation_limit"];
        $user_creation_count = $plan["user_creation_limit"];
        $can_upload_certificate = $plan["can_upload_certificate"];
        $can_config_email_template = $plan["can_config_email_template"];



        if ($prevPlan && $prevPlan["plan_id"] !== $default_plan["id"]) {
            $template_creation_count
                = $template_creation_count + $prevPlan["template_creation_count"];
            $user_creation_count
                = $user_creation_count + $prevPlan["user_creation_count"];
        }
        if ($prevPlan) {
            $prevPlan->update(["is_active" => false]);
        }
        $new_plan_history = [
            "user_id" => $user["id"],
            "plan_id" => $plan["id"],
            "template_creation_count" => $template_creation_count,
            "user_creation_count" => $user_creation_count,
            "can_upload_certificate" => $can_upload_certificate,
            "can_config_email_template" => $can_config_email_template,
            "is_active" => true,
        ];
        $created_history = UserPlanHistory::create($new_plan_history);
        self::sendPlanUpgradeMail($user, $plan);
        return $created_history;
    }

    static function sendPlanUpgradeMail($user, $plan)
    {
        $mail_template = EmailTemplateProviders::plan_upgrade_successfull_template($user, $plan);
        if ($mail_template) {
            CustomMailTemplate::send_email($mail_template);
        }
    }
    static function getSubmissionLimitCountForCompany($user)
    {
        $user_type = $user['role'];
        $user_id = $user["id"];

        $is_admin = $user_type === User::ADMIN_USER_TYPE;
        $is_super_admin = $user_type === User::SUPER_ADMIN_USER_TYPE;
        $is_user = $user_type === User::USER_USER_TYPE;

        $submission_limit = 0;
        if ($is_user) {
            $company = CompanyModel::where(["ownerId" => $user["parent_admin"]])->with("plan")->first();
            $plan = $company["plan"];
            $submission_limit = $plan['template_submission_limit_per_template'];
        } else if ($is_admin) {
            $company = CompanyModel::where(["ownerId" => $user_id])->with("plan")->first();
            $plan = $company["plan"];
            $submission_limit = $plan['template_submission_limit_per_template'];
        }

        return $submission_limit;
    }
}
