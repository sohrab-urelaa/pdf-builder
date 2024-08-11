<?php

namespace App\Http\Controllers;

use App\Http\Helpers\EmailTemplateProviders;
use App\Mail\CustomMailTemplate;
use App\Models\PdfTemplate;
use App\Models\SslCertificateModal;
use App\Models\SubmittedTemplate;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class SubmitTemplateController extends Controller
{
    public function uploadTemplate(Request $request)
    {
        try {
                $current_user=auth()->user();

                $validated = $request->validate([
                    'template_id' => 'required|string',
                    'submitted_user_name' => 'required|string',
                    'submitted_user_email' => 'required|string',
                    'submittedPdf' => 'nullable|file',
                    'location' => 'nullable|string',
                ]);

                //store the submitted pdf file

                $pdf_file_path=$request->file("file")->store("submittedPdf","public");
                $originalFileName = basename($pdf_file_path);

                //find the parent template with owner
                $template_id=$validated["template_id"];
                $template=PdfTemplate::with("owner")
                    ->select('user_id', 'id',"created_at",'updated_at',"description","title")
                    ->find($template_id);

                //check template is exists or not
                if(!$template){
                    return response()->json(["success"=>false,"message"=>"Template not found"]);
                }  

                //fetch the owner registered certificate
                $certificate=SslCertificateModal::where([
                    "user_id"=>$template["user_id"],
                    "is_active"=>true
                ])->first();

                if(!$certificate){
                    //fetch admin certificate
                    $certificate=SslCertificateModal::where([
                        "user_type"=>"admin",
                        "is_active"=>true
                    ])->first();
                }

                //throw error if no certificate found either admin or user
                if(!$certificate){
                     return response()->json(["success"=>false,"message"=>"Certificate doesn't found"]);
                }

                //Todo: if there is not certificate exists to the client end need to pass application certificate

  
            $certificate_path = 'file://'.base_path().'/storage/app/'.$certificate["certificate"];
            $pdf_file_full_path = 'file://'.base_path().'/public/storage/'.$pdf_file_path;
            //sign the pdf via node.js api
            $signed_result=$this->signPDF($certificate_path,$pdf_file_full_path,$originalFileName,$certificate,[
                    'name'=>$validated["submitted_user_name"],
                    'email'=>$validated["submitted_user_email"],
                    'location'=>$validated["location"] ?? "",
            ]);

            if(!$signed_result["success"]){
              return response()->json([
                "success"=>false,
                "message"=>"Something wen't wrong",
                "error"=>$signed_result["result"]
              ]);
            }
            //removed unsigned pdf from storage
            Storage::disk('public')->delete($pdf_file_path);

            $signed_pdf_path=$signed_result["result"];

            //create the submitted template response
             $full_path=asset('storage/' . $signed_pdf_path);
             $new_pdf_template= [
                    'submitted_user_name'=>$validated["submitted_user_name"],
                    'submitted_user_email'=>$validated["submitted_user_email"],
                    "template_id"=>$template_id,
                    "template_json"=>"",
                    "templated_pdf_link"=>$full_path,
                    "owner_id"=>$template["user_id"],
            ];

            $created_template=SubmittedTemplate::create($new_pdf_template);
            $created_template['location']=$validated['location'];
            $this->sendMail($created_template,$template);

            return response()->json([
                "success"=>true,
                "message"=>"Template successfully submitted",
                "template"=>$created_template
            ]);
            
            }catch (\Illuminate\Validation\ValidationException $e) {
                return response()->json([
                    "success"=>false,
                    "message"=>"Template submission failed",
                    "errors" => $e->errors(),
                ]);
            }
    }
    private function signPDF($certificate_path,$pdf_path,$originalFileName,$certificate,$submitter){

        $certificate_password=$certificate["password"];
        $submitter_email=$submitter["email"];
        $submitter_name=$submitter["name"];
        $submitter_location=$submitter["location"];
        $request_url=env('NODE_SERVER_API_URL')."/sign-pdf";
        $client = new Client();
        $response = $client->post($request_url, [
            'multipart' => [
                [
                    'name'     => 'pdfFile',
                    'contents' => fopen($pdf_path, 'r'),
                    'filename' => 'submittedPdf.pdf'
                ],
                [
                    'name'     => 'certificate',
                    'contents' => fopen($certificate_path, 'r'),
                    'filename' => 'certificate.p12'
                ],
                [
                    'name'     => 'password',
                    'contents' => $certificate_password
                ],
                [
                    'name'     => 'reason',
                    'contents' => 'For verification of pdf'
                ],
                [
                    'name'     => 'contactInfo',
                    'contents' => $submitter_email
                ],
                [
                    'name'     => 'name',
                    'contents' => $submitter_name
                ],
                [
                    'name'     => 'location',
                    'contents' => $submitter_location
                ],
            ],
        ]);
        if ($response->getStatusCode() === 200) {
             $fileContent = $response->getBody()->getContents();
             $filePath = 'signed_pdfs/'.$originalFileName;
             Storage::disk('public')->put($filePath, $fileContent);
             return [
                "success"=>true,
                "result"=>$filePath
            ];
        } else {
            $errorData =json_decode($response->getBody(), true);
            return [
                "success"=>false,
                "result"=>$errorData
            ];
        }
    }

    private function verifyPDF($pdf_path){

        $client = new Client();

        $request_url=env('NODE_SERVER_API_URL')."/check-signature";
        $response = $client->post($request_url, [
            'multipart' => [
                [
                    'name'     => 'pdfFile',
                    'contents' => fopen($pdf_path, 'r'),
                    'filename' => 'submittedPdf.pdf'
                ],
            ],
        ]);
       
        $response_data =json_decode($response->getBody(), true);
        return $response_data;
    }

    public function verifyTemplate(Request $request){
        try{
        $current_user=auth()->user();
        $validated = $request->validate([
            'submittedPdf' => 'nullable|file',
        ]);
        
        $pdf_file_path=$request->file("file")->store("submittedPdf","public");
        $pdf_file_full_path = 'file://'.base_path().'/public/storage/'.$pdf_file_path;
           
        $verification_result=$this->verifyPDF($pdf_file_full_path);
        Storage::disk('public')->delete($pdf_file_path);

            return response()->json([
                "success"=>true,
                "result"=>$verification_result
            ]);
            
        }catch (\Illuminate\Validation\ValidationException $e) {
                return response()->json([
                    "success"=>false,
                    "message"=>"Pdf verify failed",
                    "errors" => $e->errors(),
                ]);
        }


    }

    private function sendMail($submitted_template,$template){
         $mail_template=EmailTemplateProviders::template_submitted_template_for_author($submitted_template,$template);
         if($mail_template){
            CustomMailTemplate::send_email($mail_template);
         } 
         $submitter_template=EmailTemplateProviders::template_submitted_template_for_submitter($submitted_template,$template);
         if($submitter_template){
            CustomMailTemplate::send_email($submitter_template);
         }
         
    }


}
