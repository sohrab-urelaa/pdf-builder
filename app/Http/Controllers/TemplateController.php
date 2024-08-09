<?php

namespace App\Http\Controllers;

use App\Mail\TemplateSubmitted;
use App\Models\PdfTemplate;
use App\Models\SubmittedTemplate;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class TemplateController extends Controller
{
    public function index()
    {
        if (auth()->check()) {
            $current_user=auth()->user();
            $current_user_id=$current_user["id"];
            $pdf_templates = PdfTemplate::where('user_id', $current_user_id)->with("owner")->get();
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
            $current_user=auth()->user();
            $pdf_templates = SubmittedTemplate::with("parent_template")
                        ->with("owner")
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
        if (auth()->check()) {
            $current_user=auth()->user();
            return Inertia::render('QRSubmitter', [
                'user' => $current_user
            ]);
        }

        return response()->json(['message' => 'Not authenticated'], 401);
    }

    // Store a new task
    public function store(Request $request)
    {
        try {
           $request->validate([
                "description"=>"required",
                "templated_pdf_link"=>"required",
                "title"=>"required",
            ]);
            $current_user=auth()->user();
            $current_user_id=$current_user["id"];
            $bodyContent =json_decode($request->getContent(), true);
            $new_pdf= [
                    'user_id'=>$current_user_id,
                    "template_json"=>$bodyContent["template_json"],
                    "templated_pdf_link"=>$bodyContent["templated_pdf_link"],
                    "title"=>$bodyContent["title"],
                    "description"=>$bodyContent["description"],
            ];
            $created_template=PdfTemplate::create($new_pdf);
             $current_user=auth()->user();
             
            return Inertia::render('TemplateBuilder', ["user"=>$current_user,"template"=>$created_template]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return to_route(
                'template.index',
                [
                    'message' => 'Task not created'
                ]
            );
        }
    } 

    public function update(Request $request,$id)
        {
            try {
                $request->validate([
                    "templated_pdf_link" => "required",
                    "title" => "required",
                ]);

                $current_user = auth()->user();
                $bodyContent = json_decode($request->getContent(), true);
                // $id=$bodyContent["id"];
                // Find the existing PDF template by ID
                $pdfTemplate = PdfTemplate::find($id);

                // Ensure the current user is authorized to update the template
                // if ($pdfTemplate->user_id !== $current_user->id) {
                //     return response()->json(['message' => 'Unauthorized'], 403);
                // }

                // Update the template details
                $pdfTemplate->template_json = $bodyContent["template_json"];
                $pdfTemplate->templated_pdf_link = $bodyContent["templated_pdf_link"];
                $pdfTemplate->title = $bodyContent["title"];
                $pdfTemplate->description = $bodyContent["description"];

                // Save the updated template
                $pdfTemplate->save();
            return to_route('template.index');
         } catch (\Illuminate\Validation\ValidationException $e) {
                 Log::info("Data",["Error"=>$e]);
                 return response()->json(['message' => 'An error occurred','error'=>$e,"body"=>json_decode($request->getContent(), true)], 500);
            } catch (\Exception $e) {
                return response()->json(['message' => 'An error occurred'], 500);
            }
        }


 public function getTemplate(Request $request,$templateId)
    {
        try {
            $template=PdfTemplate::find($templateId);
             $current_user=auth()->user();
            return Inertia::render('TemplateFillup', ["user"=>$current_user,"template"=>$template]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return to_route(
                'template.index',
                [
                    'message' => 'Task not created'
                ]
            );
        }
    }

 public function getSubmittedTemplates(Request $request,$templateId)
    {
        try {
             $template=PdfTemplate::find($templateId);
            $submitted_template=SubmittedTemplate::where('template_id',$templateId)
                        ->with("parent_template")
                        ->with("owner")
                        ->get();
             $current_user=auth()->user();
            return Inertia::render('SubmittedTemplates', ["user"=>$current_user,"submitted_templates"=>$submitted_template,"template"=>$template]);
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
            $current_user=auth()->user();
            $pdf_file_path=$request->file("file")->store("submittedPdf","public");
            $template_id = Request::createFromGlobals()->get('template_id');
            $current_user_id=$current_user["id"];
            $submitted_user_email=$current_user["email"];
           

             $full_path=asset('storage/' . $pdf_file_path);

             $template=PdfTemplate::find($template_id);
             $template_owner=User::find($template["user_id"]);
            


             $new_pdf_template= [
                    'submitted_user_email'=>$submitted_user_email,
                    "user_id"=>$current_user_id,
                    "template_id"=>$template_id,
                    "template_json"=>"",
                    "templated_pdf_link"=>$full_path,
                    "owner_id"=>$template["user_id"],

            ];

            $created_template=SubmittedTemplate::create($new_pdf_template);
           

            Mail::to($template_owner["email"])->send(new TemplateSubmitted([
                'name' => $current_user["name"],
                'template_title' => $template["title"],
            ]));


            return Inertia::render('Welcome', 
                [
                    "user"=>$current_user,
                    "template"=>$template,
                    "submitted_template"=>$created_template,
                ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return to_route(
                'template.index',
                [
                    'message' => 'Task not created'
                ]
            );
        }
    }






    // Update the specified task
    // public function update(Request $request, Task $task)
    // {
    //     $validatedData = $request->validate([
    //         'title' => 'required|max:255',
    //         'description' => 'nullable',
    //     ]);

    //     $task->update($validatedData);

    //     return to_route('tasks.index');
    // }

    // Remove the specified task
    public function destroy($templateId)
    {
        PdfTemplate::where("id",$templateId)->delete();
        return to_route('template.index', [
            'message' => 'Task deleted successfully'
        ]);
    }
}
