<?php

namespace App\Http\Controllers;

use App\Http\Helpers\EmailTemplateMarkers;
use App\Http\Helpers\EmailTemplateProviders;
use App\Mail\CustomMailTemplate;
use App\Models\EmailTemplate;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class EmailTemplatesController extends Controller
{
   public function getEmailTemplatesView(){
        $email_templates=EmailTemplate::get();
        return Inertia::render('Admin/EmailTemplates/EmailTemplates',[
            "email_templates"=>$email_templates
        ]);
       
    } 
    public function getBulkEmailView(){
        return Inertia::render('Admin/EmailTemplates/BulkEmailing');
       
    }
   public function getEditTemplateView($id){
        $email_template=EmailTemplate::find($id);
        $available_markers=EmailTemplateMarkers::getAvailableMarkers($email_template["name"]);
        return Inertia::render('Admin/EmailTemplates/EditEmailTemplate',[
            "email_template"=>$email_template,
            "markers"=>$available_markers,
        ]);
       
    }

    public function editTemplate(Request $request,$id){
        try{
         $validated = $request->validate([
                'subject' => 'required|string',
                'body' => 'required|string',
                'status' => 'required|string',
            ]);
        
         $email_template=EmailTemplate::find($id);
         if(!$email_template){
            return response()->json([
                "message"=>"Template not found!",
                "success"=>false
            ]);
         }

         $email_template["subject"]=$validated["subject"];
         $email_template["body"]=$validated["body"];
         $email_template["status"]=$validated["status"];
         $email_template->save();

        return response()->json([
            "message"=>"Template successfully updated",
            "success"=>true,
            "template"=>$email_template
        ]);
    }catch (ValidationException $e) {
        return response()->json([
            "message" => "Validation failed",
            "errors" => $e->errors(),
            "success" => false
        ], 422);
    }
    }

    public function sendBulkEmail(Request $request){
        try{
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
                            "receivers"=>["Invalid email address provided-".$recipient]
                        ],
                        "success"=>false,
                        "message"=>"Validation failed"
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
                "success"=>true,
                "message"=>"Email Sent Successfully."
            ], 200);
              

        }catch (ValidationException $e) {
        return response()->json([
            "message" => "Validation failed",
            "errors" => $e->errors(),
            "success" => false
        ], 422);
    }
    }
}
