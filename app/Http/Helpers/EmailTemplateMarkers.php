<?php

namespace App\Http\Helpers;


class EmailTemplateMarkers
{
    const REGISTRATION_SUCCESS_EMAIL = "Registration Success Email";
    const TEMPLATE_SUBMITTED_CONFIRMATION_MAIL_FOR_AUTHOR = "Template Submitted Confirmation Mail for Author";
    const TEMPLATE_SUBMITTED_CONFIRMATION_MAIL_FOR_SUBMITTER = "Template Submitted Confirmation Mail for Submitter";
    const TEMPLATE_INVITATION_MAIL = "Template Invitation Mail";

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

    public static function fill_template($templateBody, $data)
    {
        foreach ($data as $key => $value) {
            $templateBody = str_replace('{{' . $key . '}}', $value, $templateBody);
        }
        return $templateBody;
    }
}
