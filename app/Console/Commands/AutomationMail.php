<?php

namespace App\Console\Commands;

use App\Http\Helpers\EmailTemplateMarkers;
use App\Http\Helpers\EmailTemplateProviders;
use App\Mail\CustomMailTemplate;
use App\Models\AutomationMailLogs;
use App\Models\AutomationMailTimings;
use App\Models\CompanyModel;
use App\Models\EmailTemplate;
use App\Models\PlansModel;
use App\Models\SubscriptionModel;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class AutomationMail extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:automation-mail';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';
    public function handle()
    {
        $time_intervals = $this->fetchTimings();
        Log::info("RUNNING_SCHEDULER", []);
        $this->sendPlanExtensionMail($time_intervals);
        $this->sendPlanUpgradeMail($time_intervals);
    }

    private function sendPlanUpgradeMail($time_intervals)
    {
        $can_send = $this->canSendFreeUserPlanUpgradeNotifiengMail($time_intervals);
        Log::info("PERMITTED TO SEND MAIL", ["can_send" => $can_send]);
        $mail_template = $this->getMailTemplate(EmailTemplateMarkers::PLAN_UPGRADE_NOTIFIENG_MAIL);
        Log::info("GOT THE TEMPLATE RESPONSE", ["template" => $mail_template]);
        if ($can_send && $mail_template) {

            $users = $this->getFreeUsers();
            Log::info("GOT THE FREE USERS", ["users_count" => $users->count()]);
            foreach ($users as $user) {
                if (isset($user->owner->email)) {
                    $email = $user->owner->email;
                    $modified_mail_template = EmailTemplateProviders::plan_upgrade_notifieng_mail_template($user, $mail_template);
                    CustomMailTemplate::send_email($modified_mail_template);
                }
            }

            //update mail send timing
            $this->updateMailSendTiming(AutomationMailLogs::FREE_USER_PLAN_UPGRADE_MAIL_TYPE);
        }
    }

    private function updateMailSendTiming($mail_type)
    {
        AutomationMailLogs::updateOrCreate(
            ['notification_type' => $mail_type],
            ['last_sent_at' => Carbon::now()]
        );
    }
    private function sendPlanExtensionMail($time_intervals)
    {
        $can_send = $this->canSendPlanExtensionMail($time_intervals);
        Log::info("PERMITTED TO SEND MAIL", ["can_send" => $can_send]);
        $mail_template = $this->getMailTemplate(EmailTemplateMarkers::PAID_USER_PLAN_EXTENSION_MAIL);
        Log::info("GOT THE TEMPLATE RESPONSE", ["template" => $mail_template]);

        if ($can_send && $mail_template) {
            $users = $this->getPlanExtensionRequiredUsers($time_intervals["start_alarming_before_expiry"]);
            Log::info("GOT extension requred USERS", ["users_count" => $users->count()]);
            foreach ($users as $user) {
                if (isset($user->user->email)) {
                    $email = $user->user->email;
                    $modified_mail_template = EmailTemplateProviders::paid_user_plan_extension_template($user, $mail_template);
                    CustomMailTemplate::send_email($modified_mail_template);
                }
            }
            //update mail send timing
            $this->updateMailSendTiming(AutomationMailLogs::PLAN_EXTENSION_MAIL_TYPE);
        }
    }

    private function canSendFreeUserPlanUpgradeNotifiengMail($time_intervals)
    {
        $planExtensionLog = AutomationMailLogs::where('notification_type', AutomationMailLogs::FREE_USER_PLAN_UPGRADE_MAIL_TYPE)->first();


        if (!$planExtensionLog) {
            Log::info("PLAN TIMING NOT FOUND, SO CAN SEND EMAIL", []);
            return true;
        }
        $mail_interval = $time_intervals["free_user_mail_timings"];
        $last_sent_at = $planExtensionLog->last_sent_at;
        $last_sent_diff = Carbon::now()->diffInMinutes($last_sent_at);

        if ($last_sent_diff >= $mail_interval) {
            Log::info("PLAN TIMING FOUND AND TIMING ALSO EXPIRED", []);
            return true;
        }
        Log::info("PLAN TIMING FOUND BUT TIMING NOT EXPIRED, MAIL HAS BLOCKED", []);
        return false;
    }
    private function canSendPlanExtensionMail($time_intervals)
    {
        $planExtensionLog = AutomationMailLogs::where('notification_type', AutomationMailLogs::PLAN_EXTENSION_MAIL_TYPE)->first();


        if (!$planExtensionLog) {
            Log::info("PLAN TIMING NOT FOUND, SO CAN SEND EMAIL", []);
            return true;
        }
        $mail_interval = $time_intervals["plan_upgrade_mail_timings"];
        $last_sent_at = $planExtensionLog->last_sent_at;
        $last_sent_diff = Carbon::now()->diffInMinutes($last_sent_at);
        if ($last_sent_diff >= $mail_interval) {
            Log::info("PLAN TIMING FOUND AND TIMING ALSO EXPIRED", []);
            return true;
        }
        Log::info("PLAN TIMING FOUND BUT TIMING NOT EXPIRED, MAIL HAS BLOCKED", []);
        return false;
    }
    private function fetchTimings()
    {
        $mailTimings = AutomationMailTimings::first();
        $free_user_mail_timings = $mailTimings["free_user_plan_upgrade_notifieng_mail_interval"] ?? 24;
        $plan_upgrade_mail_timings = $mailTimings["plan_extension_notifieng_mail_interval"] ?? 24;
        $start_alarming_before_expiry = $mailTimings["start_alarming_before_expiry"] ?? 7;

        return [
            "free_user_mail_timings" => $free_user_mail_timings,
            "plan_upgrade_mail_timings" => $plan_upgrade_mail_timings,
            "start_alarming_before_expiry" => $start_alarming_before_expiry,
        ];
    }
    private function getFreeUsers()
    {
        //fetch default plan

        $default_plan = $default_plan = PlansModel::where("isDefault", true)->first();
        if (!$default_plan) {
            return collect();
        }
        $default_plan_id = $default_plan["id"];

        //fetch users which is included with this default plan

        $user_lists = CompanyModel::where(["planId" => $default_plan_id])->with("owner")->get();
        return $user_lists;
    }

    private function getMailTemplate($name)
    {
        $template = EmailTemplate::where([
            "name" => $name,
        ])->first();
        if ($template['status'] === EmailTemplate::STATUS_INACTIVE) {
            return false;
        }
        return $template;
    }
    private function getPlanExtensionRequiredUsers($expiary_time = 7)
    {
        $default_plan = $default_plan = PlansModel::where("isDefault", true)->first();
        if (!$default_plan) {
            return collect();
        }
        $default_plan_id = $default_plan["id"];

        $subscriptionsExpiringSoon = SubscriptionModel::where('is_active', true)
            ->where('plan_id', '!=', $default_plan_id)
            ->whereBetween('end_date', [Carbon::now(), Carbon::now()->addDays($expiary_time)])
            ->with("user")
            ->get();

        return $subscriptionsExpiringSoon;
    }
}
