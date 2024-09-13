<?php

namespace App\Http\Helpers;

use App\Models\GeneralSetting;
use Illuminate\Support\Facades\Log;

class EmailTemplatesMarkersData
{
  public static function global_markers_data()
  {
    $site_info = GeneralSetting::first();

    $global_markers_key = EmailTemplateMarkers::globalMarkers();
    $new_array = array_fill_keys($global_markers_key, "");

    $new_array["APPLICATION_NAME"] = $site_info["site_name"];
    $new_array["APPLICATION_DESCRIPTION"] = $site_info["site_description"];
    return $new_array;
  }

  public static function registration_success_markers_data($user)
  {
    $global_data = self::global_markers_data();

    $registration_marker_keys = EmailTemplateMarkers::registrationSuccessMarkers(false);
    $new_array = array_fill_keys($registration_marker_keys, "");

    $user_full_name = $user["name"];
    $user_email = $user["email"];

    $new_array["USER_NICK_NAME"] = substr($user_full_name, 0, 2);
    $new_array["USER_EMAIL"] = $user_email;
    $new_array["USER_FULL_NAME"] = $user_full_name;

    return array_merge($global_data, $new_array);
  }
  public static function plan_upgrade_success_template_date($user, $plan)
  {
    $global_data = self::global_markers_data();

    $registration_marker_keys = EmailTemplateMarkers::planUpgradeMarkers(false);
    $new_array = array_fill_keys($registration_marker_keys, "");

    $user_full_name = $user["name"];
    $user_email = $user["email"];

    $plan_name = $plan["title"];

    $new_array["USER_NICK_NAME"] = substr($user_full_name, 0, 2);
    $new_array["USER_EMAIL"] = $user_email;
    $new_array["USER_FULL_NAME"] = $user_full_name;
    $new_array["PLAN_NAME"] = $plan_name;

    return array_merge($global_data, $new_array);
  }
  public static function plan_upgrade_notifieng_template_date($company)
  {
    $global_data = self::global_markers_data();

    $registration_marker_keys = EmailTemplateMarkers::planUpgradeNotifiengMarkers(false);
    $new_array = array_fill_keys($registration_marker_keys, "");
    $user = $company["owner"];
    $user_full_name = $user["name"];
    $user_email = $user["email"];

    $company_name = $company["companyName"];

    $new_array["USER_NICK_NAME"] = substr($user_full_name, 0, 2);
    $new_array["USER_EMAIL"] = $user_email;
    $new_array["USER_FULL_NAME"] = $user_full_name;
    $new_array["COMPANY_NAME"] = $company_name;
    return array_merge($global_data, $new_array);
  }
  public static function paid_user_plan_extension_template_data($subscription)
  {
    $global_data = self::global_markers_data();

    $registration_marker_keys = EmailTemplateMarkers::planUpgradeNotifiengMarkers(false);
    $new_array = array_fill_keys($registration_marker_keys, "");
    $user = $subscription["user"];
    $user_full_name = $user["name"];
    $user_email = $user["email"];


    $new_array["USER_NICK_NAME"] = substr($user_full_name, 0, 2);
    $new_array["USER_EMAIL"] = $user_email;
    $new_array["USER_FULL_NAME"] = $user_full_name;
    $new_array["COMPANY_NAME"] = "";
    return array_merge($global_data, $new_array);
  }

  public static function account_verification_markers_data($user, $code)
  {
    $global_data = self::global_markers_data();

    $registration_marker_keys = EmailTemplateMarkers::accountVerificationMarkers(false);
    $new_array = array_fill_keys($registration_marker_keys, "");

    $user_full_name = $user["name"];
    $user_email = $user["email"];

    $new_array["USER_NICK_NAME"] = substr($user_full_name, 0, 2);
    $new_array["USER_EMAIL"] = $user_email;
    $new_array["USER_FULL_NAME"] = $user_full_name;
    $new_array["VERIFICATION_CODE"] = $code;

    return array_merge($global_data, $new_array);
  }

  public static function template_submitted_for_author_markers_data($submitted_template, $template)
  {
    $global_data = self::global_markers_data();

    $registration_marker_keys = EmailTemplateMarkers::templateSubmittedConfirmationMarkersForAuthor(false);
    $new_array = array_fill_keys($registration_marker_keys, "");
    $submitter_name = $submitted_template["submitted_user_name"];
    $submitter_email = $submitted_template["submitted_user_email"];
    $pdf_link = $submitted_template["templated_pdf_link"];
    $submitter_location = $submitted_template["location"];
    $template_title = $template["title"];
    $template_owner = $template["owner"];
    $author_name = $template_owner["name"];
    $author_email = $template_owner["email"];
    $submission_link = "/submission" . $template["id"];
    $new_array["SUBMITTER_NAME"] = $submitter_name;
    $new_array["SUBMITTER_EMAIL"] = $submitter_email;
    $new_array["SUBMITTER_LOCATION"] = $submitter_location;
    $new_array["TEMPLATE_TITLE"] = $template_title;
    $new_array["TEMPLATE_AUTHOR_NAME"] = $author_name;
    $new_array["TEMPLATE_AUTHOR_EMAIL"] = $author_email;
    $new_array["VIEW_SUBMISSIONS_LINK"] = $submission_link;

    $new_array["PDF_LINK"] = $pdf_link;
    return array_merge($global_data, $new_array);
  }

  public static function template_submitted_for_submitter_markers_data($submitted_template, $template)
  {
    $global_data = self::global_markers_data();

    $registration_marker_keys = EmailTemplateMarkers::templateSubmittedConfirmationMarkersForSubmitter(false);
    $new_array = array_fill_keys($registration_marker_keys, "");
    $submitter_name = $submitted_template["submitted_user_name"];
    $submitter_email = $submitted_template["submitted_user_email"];
    $submitter_location = $submitted_template["location"];
    $pdf_link = $submitted_template["templated_pdf_link"];
    $template_title = $template["title"];
    $template_owner = $template["owner"];
    $author_name = $template_owner["name"];
    $author_email = $template_owner["email"];
    $appUrl = url('/');
    $submission_link = $appUrl . "/submission/" . $template["id"];
    $new_array["SUBMITTER_NAME"] = $submitter_name;
    $new_array["SUBMITTER_EMAIL"] = $submitter_email;
    $new_array["SUBMITTER_LOCATION"] = $submitter_location;
    $new_array["TEMPLATE_TITLE"] = $template_title;
    $new_array["TEMPLATE_AUTHOR_NAME"] = $author_name;
    $new_array["TEMPLATE_AUTHOR_EMAIL"] = $author_email;
    $new_array["VIEW_SUBMISSIONS_LINK"] = $submission_link;
    $new_array["PDF_LINK"] = $pdf_link;
    return array_merge($global_data, $new_array);
  }

  public static function template_invitation_markers_data($template)
  {
    $global_data = self::global_markers_data();

    $registration_marker_keys = EmailTemplateMarkers::templateInvitationMarkers(false);

    $new_array = array_fill_keys($registration_marker_keys, "");

    $template_title = $template["title"];
    $template_owner = $template["owner"];
    $author_name = $template_owner["name"];
    $author_email = $template_owner["email"];

    $appUrl = url('/');

    $submission_link = $appUrl . "/submit-templates/" . $template["id"];

    $new_array["TEMPLATE_TITLE"] = $template_title;
    $new_array["TEMPLATE_AUTHOR_NAME"] = $author_name;
    $new_array["TEMPLATE_AUTHOR_EMAIL"] = $author_email;
    $new_array["TEMPLATE_SUBMISSION_LINK"] = $submission_link;

    return array_merge($global_data, $new_array);
  }
}
