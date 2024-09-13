<?php

namespace App\Http\Helpers;


class EmailTemplateMarkers
{
    const REGISTRATION_SUCCESS_EMAIL = "Registration Success Email";
    const TEMPLATE_SUBMITTED_CONFIRMATION_MAIL_FOR_AUTHOR = "Template Submitted Confirmation Mail for Author";
    const TEMPLATE_SUBMITTED_CONFIRMATION_MAIL_FOR_SUBMITTER = "Template Submitted Confirmation Mail for Submitter";
    const TEMPLATE_INVITATION_MAIL = "Template Invitation Mail";
    const ACCOUNT_VERIFICATION_MAIL = "Account Verification Mail";
    const INVOICE_MAIL_TEMPLATE = "Invoice Mail Template";
    const PLAN_UPGRADE_SUCCESSFULL_MAIL = "Plan Upgrade Successfull Mail Template";
    const PLAN_UPGRADE_NOTIFIENG_MAIL = "Free User Plan Upgrade Mail";
    const PAID_USER_PLAN_EXTENSION_MAIL = "Paid User Plan Extension Mail";

    public static function getAvailableMarkers($name)
    {
        if ($name === self::REGISTRATION_SUCCESS_EMAIL) {
            return self::registrationSuccessMarkers();
        } else if ($name === self::TEMPLATE_SUBMITTED_CONFIRMATION_MAIL_FOR_AUTHOR) {
            return self::templateSubmittedConfirmationMarkersForAuthor();
        } else if ($name === self::TEMPLATE_SUBMITTED_CONFIRMATION_MAIL_FOR_SUBMITTER) {
            return self::templateSubmittedConfirmationMarkersForSubmitter();
        } else if ($name === self::TEMPLATE_INVITATION_MAIL) {
            return self::templateInvitationMarkers();
        } else if ($name === self::ACCOUNT_VERIFICATION_MAIL) {
            return self::accountVerificationMarkers();
        } else if ($name === self::PLAN_UPGRADE_SUCCESSFULL_MAIL) {
            return self::planUpgradeMarkers();
        } else if ($name === self::PLAN_UPGRADE_NOTIFIENG_MAIL) {
            return self::planUpgradeNotifiengMarkers();
        } else if ($name === self::PAID_USER_PLAN_EXTENSION_MAIL) {
            return self::paidUserPlanExtensionMarkers();
        } else {
            return self::globalMarkers();
        }
    }
    public static function globalMarkers()
    {
        $global_markers = [
            "APPLICATION_NAME",
            "APPLICATION_DESCRIPTION"
        ];
        return $global_markers;
    }

    public static function registrationSuccessMarkers($merge = true)
    {
        $global_markers = self::globalMarkers();
        $registration_markers = [
            "USER_NICK_NAME",
            "USER_EMAIL",
            "USER_FULL_NAME"
        ];
        $merged_array = [];
        if ($merge) {
            $merged_array = array_merge($global_markers, $registration_markers);
        } else {
            $merged_array = $registration_markers;
        }

        return $merged_array;
    }

    public static function templateSubmittedConfirmationMarkersForAuthor($merge = true)
    {
        $global_markers = self::globalMarkers();
        $registration_markers = [
            "SUBMITTER_NAME",
            "SUBMITTER_EMAIL",
            "SUBMITTER_LOCATION",
            "TEMPLATE_TITLE",
            "TEMPLATE_AUTHOR_NAME",
            "TEMPLATE_AUTHOR_EMAIL",
            "VIEW_SUBMISSIONS_LINK",
            "PDF_LINK",
        ];
        $merged_array = [];
        if ($merge) {
            $merged_array = array_merge($global_markers, $registration_markers);
        } else {
            $merged_array = $registration_markers;
        }

        return $merged_array;
    }

    public static function templateSubmittedConfirmationMarkersForSubmitter($merge = true)
    {
        $global_markers = self::globalMarkers();
        $registration_markers = [
            "SUBMITTER_NAME",
            "SUBMITTER_EMAIL",
            "SUBMITTER_LOCATION",
            "TEMPLATE_TITLE",
            "TEMPLATE_AUTHOR_NAME",
            "TEMPLATE_AUTHOR_EMAIL",
            "VIEW_SUBMISSIONS_LINK",
            "PDF_LINK",
        ];
        $merged_array = [];
        if ($merge) {
            $merged_array = array_merge($global_markers, $registration_markers);
        } else {
            $merged_array = $registration_markers;
        }

        return $merged_array;
    }
    public static function templateInvitationMarkers($merge = true)
    {
        $global_markers = self::globalMarkers();
        $registration_markers = [
            "TEMPLATE_TITLE",
            "TEMPLATE_AUTHOR_NAME",
            "TEMPLATE_AUTHOR_EMAIL",
            "TEMPLATE_SUBMISSION_LINK",
        ];
        $merged_array = [];
        if ($merge) {
            $merged_array = array_merge($global_markers, $registration_markers);
        } else {
            $merged_array = $registration_markers;
        }

        return $merged_array;
    }
    public static function accountVerificationMarkers($merge = true)
    {
        $global_markers = self::globalMarkers();
        $registration_markers = [
            "VERIFICATION_CODE",
            "USER_NICK_NAME",
            "USER_EMAIL",
            "USER_FULL_NAME"
        ];
        $merged_array = [];
        if ($merge) {
            $merged_array = array_merge($global_markers, $registration_markers);
        } else {
            $merged_array = $registration_markers;
        }

        return $merged_array;
    }
    public static function planUpgradeMarkers($merge = true)
    {
        $global_markers = self::globalMarkers();
        $registration_markers = [
            "USER_NICK_NAME",
            "USER_EMAIL",
            "USER_FULL_NAME",
            "PLAN_NAME",
            "SUBSCRIPTION_AMOUNT"
        ];
        $merged_array = [];
        if ($merge) {
            $merged_array = array_merge($global_markers, $registration_markers);
        } else {
            $merged_array = $registration_markers;
        }

        return $merged_array;
    }
    public static function planUpgradeNotifiengMarkers($merge = true)
    {
        $global_markers = self::globalMarkers();
        $registration_markers = [
            "USER_NICK_NAME",
            "USER_EMAIL",
            "USER_FULL_NAME",
            "COMPANY_NAME",
        ];
        $merged_array = [];
        if ($merge) {
            $merged_array = array_merge($global_markers, $registration_markers);
        } else {
            $merged_array = $registration_markers;
        }

        return $merged_array;
    }
    public static function paidUserPlanExtensionMarkers($merge = true)
    {
        $global_markers = self::globalMarkers();
        $registration_markers = [
            "USER_NICK_NAME",
            "USER_EMAIL",
            "USER_FULL_NAME",
            "COMPANY_NAME",
        ];
        $merged_array = [];
        if ($merge) {
            $merged_array = array_merge($global_markers, $registration_markers);
        } else {
            $merged_array = $registration_markers;
        }

        return $merged_array;
    }

    public static function fill_template($templateBody, $data)
    {
        foreach ($data as $key => $value) {
            $templateBody = str_replace('{{' . $key . '}}', $value, $templateBody);
        }
        return $templateBody;
    }
}
