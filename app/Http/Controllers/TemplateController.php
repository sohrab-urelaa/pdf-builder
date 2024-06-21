<?php

namespace App\Http\Controllers;

use App\Mail\TemplateSubmitted;
use App\Models\PdfTemplate;
use App\Models\SubmittedTemplate;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class TemplateController extends Controller
{
    public function index()
    {
        if (auth()->check()) {
            $current_user=auth()->user();
            $current_user_id=$current_user["id"];
            $pdf_templates = PdfTemplate::where('user_id', $current_user_id)->get();
            return Inertia::render('Dashboard', [
                'templates' => $pdf_templates,
                'user' => $current_user
            ]);
        }

        return response()->json(['message' => 'Not authenticated'], 401);
    }

    // Store a new task
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
               "template_json"=>"required",
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
            $submitted_template=SubmittedTemplate::with("user")->where('template_id',$templateId)->get();
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

             $new_pdf_template= [
                    'submitted_user_email'=>$submitted_user_email,
                    "user_id"=>$current_user_id,
                    "template_id"=>$template_id,
                    "template_json"=>"",
                    "templated_pdf_link"=>$full_path,

            ];

            $created_template=SubmittedTemplate::create($new_pdf_template);
            $template=PdfTemplate::find($template_id);
            $template_owner=User::find($template["user_id"]);
            

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
