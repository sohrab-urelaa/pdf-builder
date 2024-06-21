<?php

namespace App\Http\Controllers;

use App\Models\PdfTemplate;
use Illuminate\Http\Request;
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
            ]);
            $current_user=auth()->user();
            $current_user_id=$current_user["id"];
            $bodyContent =json_decode($request->getContent(), true);
            $new_pdf= [
                    'user_id'=>$current_user_id,
                    "template_json"=>$bodyContent["template_json"],
                    "templated_pdf_link"=>$bodyContent["templated_pdf_link"],
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
