<?php

namespace App\Http\Controllers;

use App\Http\Helpers\EmailTemplateProviders;
use App\Mail\CustomMailTemplate;
use App\Mail\TemplateSubmitted;
use App\Models\PdfTemplate;
use App\Models\SubmittedTemplate;
use App\Models\User;
use App\Models\UserPlanHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class TemplateController extends Controller
{
    public function index()
    {
        if (auth()->check()) {
            $current_user = auth()->user();
            $current_user_id = $current_user["id"];
            $pdf_templates = PdfTemplate::where('user_id', $current_user_id)
                ->with("owner")
                ->select('user_id', 'id', "created_at", 'updated_at', "description", "title")
                ->get();
            return Inertia::render('Dashboard', [
                'templates' => $pdf_templates,
                'user' => $current_user
            ]);
        }

        return response()->json(['message' => 'Not authenticated'], 401);
    }
    public function getSubmissions()
    {
        if (auth()->check()) {
            $current_user = auth()->user();
            $pdf_templates = SubmittedTemplate::with([
                'parent_template' => function ($query) {
                    $query->select('created_at', 'description', 'title', "user_id", "id");
                },
                'owner' => function ($query) {
                    $query->select('email', 'name', 'role', "id");
                }
            ])
                ->get();
            return Inertia::render('Submissions', [
                'templates' => $pdf_templates,
                'user' => $current_user
            ]);
        }

        return response()->json(['message' => 'Not authenticated'], 401);
    }
    public function getQrScannerPage()
    {
        $current_user = auth()->user();
        return Inertia::render('QRSubmitter', [
            'user' => $current_user
        ]);
    }

    // Store a new task
    public function store(Request $request)
    {
        try {
            $current_user = auth()->user();
            $validated = $request->validate([
                "description" => "required|string",
                "templated_pdf_link" => "required|string",
                "template_json" => "required|string",
                "title" => "required|string",
                "clone_template_id" => "nullable|integer",
            ]);

            //validate template creation limit

            $result = PlanHistoryController::has_template_creation_limit($current_user);
            if (!$result["has_limit"]) {
                return response()->json([
                    "success" => false,
                    "message" => "Template creation limit has been reached",
                ]);
            }

            $validated["user_id"]
                = $current_user["id"];

            $cloneTemplateId = $validated['clone_template_id'] ?? null;

            if ($cloneTemplateId) {
                $cloned_template = PdfTemplate::find($validated["clone_template_id"]);
                if ($cloned_template) {
                    $validated["template_json"] = $cloned_template["template_json"];
                }
            }

            $created_template = PdfTemplate::create($validated);
            //update creation count

            $result["plan_history"]->template_creation_count = $result["next_limit"];
            $result["plan_history"]->save();

            return response()->json([
                "success" => true,
                "message" => "Template successfully created",
                "data" => $created_template,
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                "success" => false,
                "message" => "verification failed",
                "errors" => $e->errors(),
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $validated = $request->validate([
                "description" => "nullable|string",
                "templated_pdf_link" => "nullable|string",
                "template_json" => "required|string",
                "title" => "nullable|string",
            ]);
            $pdf_template = PdfTemplate::find($id);

            if (!$pdf_template) {
                return response()->json([
                    "success" => false,
                    "message" => "Template not found",
                ]);
            }


            $updated_template = $pdf_template->update($validated);
            return response()->json([
                "success" => true,
                "message" => "Template saved successfully.",
                "data" => $updated_template,
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                "success" => false,
                "message" => "verification failed",
                "errors" => $e->errors(),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "success" => false,
                "message" => "Some error has occurred, please try again later.",
            ]);
        }
    }
    public function sendInvitaions(Request $request, $id)
    {
        try {
            $current_user = auth()->user();
            $validated = $request->validate([
                'receivers' => 'required|string',
            ]);
            $pdf_template = PdfTemplate::find($id);

            if (!$pdf_template) {
                return response()->json([
                    "success" => false,
                    "message" => "Template not found",
                ]);
            }


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
            $mail_template = EmailTemplateProviders::template_invitation_mail($pdf_template, $recipients, $current_user);
            if (!$mail_template) {
                return response()->json([
                    "success" => false,
                    "message" => "Invitaion mail currently deactivated."
                ], 400);
            }

            CustomMailTemplate::send_email($mail_template);
            return response()->json([
                "success" => true,
                "message" => "Invitaion Sent Successfully."
            ], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                "success" => false,
                "message" => "verification failed",
                "errors" => $e->errors(),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "success" => false,
                "message" => "Some error has occurred, please try again later.",
            ]);
        }
    }
    public function delete(Request $request, $id)
    {
        try {
            $pdf_template = PdfTemplate::find($id);

            if (!$pdf_template) {
                return response()->json([
                    "success" => false,
                    "message" => "Template not found",
                ]);
            }

            SubmittedTemplate::where('template_id', $id)->delete();
            $updated_template = $pdf_template->delete();
            return response()->json([
                "success" => true,
                "message" => "Template deleted successfully.",
                "data" => $updated_template,
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                "success" => false,
                "message" => "verification failed",
                "errors" => $e->errors(),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "success" => false,
                "message" => "Some error has occurred, please try again later.",
            ]);
        }
    }


    public function getTemplate(Request $request, $templateId)
    {
        try {
            $template = PdfTemplate::find($templateId);
            $current_user = auth()->user();
            return Inertia::render('TemplateFillup', ["user" => $current_user, "template" => $template]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return to_route(
                'template.index',
                [
                    'message' => 'Task not created'
                ]
            );
        }
    }

    public function getSubmittedTemplates(Request $request, $templateId)
    {
        try {
            $template = PdfTemplate::find($templateId);
            $submitted_template = SubmittedTemplate::where('template_id', $templateId)
                ->with([
                    'parent_template' => function ($query) {
                        $query->select('created_at', 'description', 'title', "user_id", "id");
                    },
                    'owner' => function ($query) {
                        $query->select('email', 'name', 'role', "id");
                    }
                ])
                ->get();
            $current_user = auth()->user();
            return Inertia::render('SubmittedTemplates', ["user" => $current_user, "submitted_templates" => $submitted_template, "template" => $template]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return to_route(
                'template.index',
                [
                    'message' => 'Task not created'
                ]
            );
        }
    }

    public function uploadTemplate(Request $request,)
    {
        try {
            $current_user = auth()->user();
            $pdf_file_path = $request->file("file")->store("submittedPdf", "public");
            $template_id = Request::createFromGlobals()->get('template_id');
            $current_user_id = $current_user["id"];
            $submitted_user_email = $current_user["email"];


            $full_path = asset('storage/' . $pdf_file_path);

            $template = PdfTemplate::find($template_id);
            $template_owner = User::find($template["user_id"]);



            $new_pdf_template = [
                'submitted_user_email' => $submitted_user_email,
                "user_id" => $current_user_id,
                "template_id" => $template_id,
                "template_json" => "",
                "templated_pdf_link" => $full_path,
                "owner_id" => $template["user_id"],

            ];

            $created_template = SubmittedTemplate::create($new_pdf_template);


            Mail::to($template_owner["email"])->send(new TemplateSubmitted([
                'name' => $current_user["name"],
                'template_title' => $template["title"],
            ]));


            return Inertia::render(
                'Welcome',
                [
                    "user" => $current_user,
                    "template" => $template,
                    "submitted_template" => $created_template,
                ]
            );
        } catch (\Illuminate\Validation\ValidationException $e) {
            return to_route(
                'template.index',
                [
                    'message' => 'Task not created'
                ]
            );
        }
    }
}
