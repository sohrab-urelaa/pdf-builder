<?php

namespace App\Http\Helpers;

use App\Models\EmailTemplate;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class EmailTemplateProviders
{

    public static function registration_success_template($user)
    {
        $template = EmailTemplate::where([
            "name" => EmailTemplateMarkers::REGISTRATION_SUCCESS_EMAIL,
        ])->first();
        if ($template['status'] === EmailTemplate::STATUS_INACTIVE) {
            return false;
        }
        //parse the template and fillup with proper data

        $email_template_body = $template["body"];
        $markers_data = EmailTemplatesMarkersData::registration_success_markers_data($user);
        $filled_template = EmailTemplateMarkers::fill_template($email_template_body, $markers_data);
        $parsed_subject = EmailTemplateMarkers::fill_template($template["subject"], $markers_data);

        return [
            "body" => $filled_template,
            "subject" => $parsed_subject,
            "email" => $user["email"]
        ];
    }

    public static function template_submitted_template_for_author($submitted_template, $pdf_template)
    {

        $current_user =  $pdf_template["owner"];
        $template = self::fetch_email_template(EmailTemplateMarkers::TEMPLATE_SUBMITTED_CONFIRMATION_MAIL_FOR_AUTHOR, $current_user);

        if ($template['status'] === EmailTemplate::STATUS_INACTIVE) {
            return false;
        }
        $email_template_body = $template["body"];
        $markers_data = EmailTemplatesMarkersData::template_submitted_for_author_markers_data($submitted_template, $pdf_template);
        $filled_template = EmailTemplateMarkers::fill_template($email_template_body, $markers_data);
        $parsed_subject = EmailTemplateMarkers::fill_template($template["subject"], $markers_data);

        $template_owner_email = $pdf_template['owner']['email'];
        return [
            "body" => $filled_template,
            "subject" => $parsed_subject,
            "email" => $template_owner_email
        ];
    }

    public static function template_submitted_template_for_submitter($submitted_template, $pdf_template)
    {
        $current_user =  $pdf_template["owner"];
        $template = self::fetch_email_template(EmailTemplateMarkers::TEMPLATE_SUBMITTED_CONFIRMATION_MAIL_FOR_SUBMITTER, $current_user);

        if ($template['status'] === EmailTemplate::STATUS_INACTIVE) {
            return false;
        }
        $email_template_body = $template["body"];
        $markers_data = EmailTemplatesMarkersData::template_submitted_for_submitter_markers_data($submitted_template, $pdf_template);
        $filled_template = EmailTemplateMarkers::fill_template($email_template_body, $markers_data);
        $parsed_subject = EmailTemplateMarkers::fill_template($template["subject"], $markers_data);

        $template_owner_email = $submitted_template['submitted_user_email'];
        return [
            "body" => $filled_template,
            "subject" => $parsed_subject,
            "email" => $template_owner_email
        ];
    }

    private static function fetch_email_template($template_name, $current_user)
    {
        $template = null;
        if (User::is_user_or_admin($current_user)) {
            $main_id = User::get_main_user_id($current_user);
            $template = EmailTemplate::where([
                "name" => $template_name,
                "user_id" => $main_id,
            ])->first();
        } else {
            $template = EmailTemplate::where([
                "name" => $template_name,
                "owner" => EmailTemplate::ADMIN_OWNER
            ])->first();
        }

        if (!$template) {
            $template = EmailTemplate::where([
                "name" => $template_name,
                "owner" => EmailTemplate::ADMIN_OWNER
            ])->first();
        }

        return $template;
    }

    public static function template_invitation_mail($pdf_template, $receivers, $current_user)
    {

        $template = self::fetch_email_template(EmailTemplateMarkers::TEMPLATE_INVITATION_MAIL, $current_user);
        // if (User::is_user_or_admin($current_user)) {
        //     $main_id = User::get_main_user_id($current_user);
        //     $template = EmailTemplate::where([
        //         "name" => EmailTemplateMarkers::TEMPLATE_INVITATION_MAIL,
        //         "user_id" => $main_id,
        //     ])->first();
        // } else {
        //     $template = EmailTemplate::where([
        //         "name" => EmailTemplateMarkers::TEMPLATE_INVITATION_MAIL,
        //         "owner" => EmailTemplate::ADMIN_OWNER
        //     ])->first();
        // }

        // if (!$template) {
        //     $template = EmailTemplate::where([
        //         "name" => EmailTemplateMarkers::TEMPLATE_INVITATION_MAIL,
        //         "owner" => EmailTemplate::ADMIN_OWNER
        //     ])->first();
        // }

        if ($template['status'] === EmailTemplate::STATUS_INACTIVE) {
            return false;
        }
        $email_template_body = $template["body"];
        $markers_data = EmailTemplatesMarkersData::template_invitation_markers_data($pdf_template);
        $filled_template = EmailTemplateMarkers::fill_template($email_template_body, $markers_data);
        $parsed_subject = EmailTemplateMarkers::fill_template($template["subject"], $markers_data);

        return [
            "body" => $filled_template,
            "subject" => $parsed_subject,
            "email" => $receivers
        ];
    }
}
