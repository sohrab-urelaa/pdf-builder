<?php

namespace App\Http\Controllers;

use App\Http\Helpers\EmailTemplateMarkers;
use App\Http\Helpers\EmailTemplateProviders;
use App\Mail\CustomMailTemplate;
use App\Models\AutomationMailTimings;
use App\Models\EmailTemplate;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class EmailTemplatesController extends Controller
{
    public function getAutomaionMailConfigView()
    {
        $data = AutomationMailTimings::first();
        return Inertia::render('Admin/EmailTemplates/AutomationMailConfig', [
            "mail_config" => $data
        ]);
    }
    public function getSubscriptionEmailTemplate($subscriptionId)
    {
        $template = EmailTemplate::where([
            "name" => EmailTemplateMarkers::INVOICE_MAIL_TEMPLATE,
        ])->first();
        if ($template) {
            $mail_template = EmailTemplateProviders::invoice_mail_template($subscriptionId, $template);
            return response()->json([
                "message" => "Template found",
                "success" => true,
                "template" => $mail_template
            ]);
        } else {
            return response()->json([
                "message" => "Template not found",
                "success" => false,
            ]);
        }
    }

    public function getEmailTemplatesView()
    {
        $email_templates = EmailTemplate::where("owner", EmailTemplate::ADMIN_OWNER)->get();
        return Inertia::render('Admin/EmailTemplates/EmailTemplates', [
            "email_templates" => $email_templates
        ]);
    }
    public function getBulkEmailView()
    {
        return Inertia::render('Admin/EmailTemplates/BulkEmailing');
    }
    public function getEditTemplateView($id)
    {
        $email_template = EmailTemplate::find($id);
        $available_markers = EmailTemplateMarkers::getAvailableMarkers($email_template["name"]);
        return Inertia::render('Admin/EmailTemplates/EditEmailTemplate', [
            "email_template" => $email_template,
            "markers" => $available_markers,
        ]);
    }

    public function editTemplate(Request $request, $id)
    {
        try {
            $validated = $request->validate([
                'subject' => 'required|string',
                'body' => 'required|string',
                'status' => 'required|string',
            ]);

            $email_template = EmailTemplate::find($id);
            if (!$email_template) {
                return response()->json([
                    "message" => "Template not found!",
                    "success" => false
                ]);
            }

            $email_template["subject"] = $validated["subject"];
            $email_template["body"] = $validated["body"];
            $email_template["status"] = $validated["status"];
            $email_template->save();

            return response()->json([
                "message" => "Template successfully updated",
                "success" => true,
                "template" => $email_template
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                "message" => "Validation failed",
                "errors" => $e->errors(),
                "success" => false
            ], 422);
        }
    }
    public function createUserTemplate(Request $request, $id)
    {
        try {
            $validated = $request->validate([
                'subject' => 'required|string',
                'body' => 'required|string',
                'status' => 'required|string',
            ]);
            $current_user = auth()->user();
            $main_user_id = User::get_main_user_id($current_user);

            $email_template = EmailTemplate::find($id);
            if (!$email_template) {
                return response()->json([
                    "message" => "Template not found!",
                    "success" => false
                ]);
            }
            //check user plan supports email template creations
            $has_template_creation_access = PlanHistoryController::can_change_email_template($current_user);
            if (!$has_template_creation_access) {
                return response()->json([
                    "message" => "Your curren't plan doesn't support email template configuration, please upgrade your plan.",
                    "success" => false
                ]);
            }

            //check it's a admin template or not then create new one for user

            if ($email_template["owner"] === EmailTemplate::ADMIN_OWNER) {
                //owner is admin
                //create new one for user
                $validated["name"] = $email_template["name"];
                $validated["user_id"] = $main_user_id;
                $validated["owner"] = EmailTemplate::USER_OWNER;
                $email_template = EmailTemplate::create($validated);
                return response()->json([
                    "message" => "Template successfully saved",
                    "success" => true,
                    "template" => $email_template
                ]);
            }

            //owner is user check user has correct authorization

            if ($email_template["user_id"] != $main_user_id) {
                return response()->json([
                    "message" => "You aren't authorized to update this template",
                    "success" => false
                ]);
            }

            $email_template["subject"] = $validated["subject"];
            $email_template["body"] = $validated["body"];
            $email_template["status"] = $validated["status"];
            $email_template->save();

            return response()->json([
                "message" => "Template successfully updated",
                "success" => true,
                "template" => $email_template
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                "message" => "Validation failed",
                "errors" => $e->errors(),
                "success" => false
            ], 422);
        }
    }
    public function deleteUserTemplate(Request $request, $id)
    {
        try {
            $current_user = auth()->user();
            $main_user_id = User::get_main_user_id($current_user);

            $email_template = EmailTemplate::find($id);
            if (!$email_template) {
                return response()->json([
                    "message" => "Template not found!",
                    "success" => false
                ]);
            }
            //check it's a admin template or not then create new one for user
            if ($email_template["owner"] === EmailTemplate::ADMIN_OWNER) {
                return response()->json([
                    "message" =>
                    "You aren't authorized to update this template",
                    "success" => false,
                ]);
            }

            //owner is user check user has correct authorization

            if ($email_template["user_id"] != $main_user_id) {
                return response()->json([
                    "message" => "You aren't authorized to update this template",
                    "success" => false
                ]);
            }

            $email_template->delete();
            return response()->json([
                "message" => "Template successfully deleted",
                "success" => true,
                "template" => $email_template
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                "message" => "Validation failed",
                "errors" => $e->errors(),
                "success" => false
            ], 422);
        }
    }

    public function sendBulkEmail(Request $request)
    {
        try {
            $validated = $request->validate([
                'receivers' => 'required|string',
                'subject' => 'required|string',
                'body' => 'required|string',
            ]);

            // Parse the email string into an array
            $recipients = array_map('trim', explode(',', $validated['receivers']));

            // Validate each email address
            foreach ($recipients as $recipient) {
                if (!filter_var($recipient, FILTER_VALIDATE_EMAIL)) {
                    return response()->json([
                        'errors' => [
                            "receivers" => ["Invalid email address provided-" . $recipient]
                        ],
                        "success" => false,
                        "message" => "Validation failed"
                    ], 400);
                }
            }

            $mailData = [
                'subject' => $validated['subject'],
                'body' => $validated['body'],
                'email' => $recipients,
            ];
            CustomMailTemplate::send_email($mailData);
            return response()->json([
                "success" => true,
                "message" => "Email Sent Successfully."
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                "message" => "Validation failed",
                "errors" => $e->errors(),
                "success" => false
            ], 422);
        }
    }
}
