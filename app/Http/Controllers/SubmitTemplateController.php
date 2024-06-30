<?php

namespace App\Http\Controllers;

use App\Mail\TemplateSubmitted;
use App\Models\PdfTemplate;
use App\Models\SubmittedTemplate;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SubmitTemplateController extends Controller
{
    public function uploadTemplate(Request $request)
{
    try {
        $current_user = auth()->user();
        $pdf = $request->file("file");
        $pdf_file_path = $pdf->store("submittedPdf", "public");
        $template_id = $request->get('template_id');
        $current_user_id = $current_user["id"];
        $submitted_user_email = $current_user["email"];
        
        $full_path = storage_path('app/public/' . $pdf_file_path);

        // Load the PDF
        $pdfData = file_get_contents($full_path);

        // Generate hash of the PDF
        $hash = hash('sha256', $pdfData);

        // Load the private key
        $privateKey = Storage::disk('local')->get('private.key');
        $res = openssl_get_privatekey($privateKey);

        // Sign the hash
        openssl_sign($hash, $signature, $res, OPENSSL_ALGO_SHA256);
        openssl_free_key($res);

        // Embed signature in the PDF (this is a simplified example)
        $signatureText = 'Signature: ' . base64_encode($signature);
        $pdf->move(storage_path('app/public/signedPdf'), 'signed_' . $pdf->getClientOriginalName());
        $signedPdfPath = storage_path('app/public/signedPdf/signed_' . $pdf->getClientOriginalName());

        file_put_contents($signedPdfPath, $pdfData . "\n\n" . $signatureText);

        $template = PdfTemplate::find($template_id);
        $template_owner = User::find($template["user_id"]);

        $new_pdf_template = [
            'submitted_user_email' => $submitted_user_email,
            "user_id" => $current_user_id,
            "template_id" => $template_id,
            "template_json" => "",
            "templated_pdf_link" => asset('storage/signedPdf/signed_' . $pdf->getClientOriginalName()),
            "owner_id" => $template["user_id"],
        ];

        $created_template = SubmittedTemplate::create($new_pdf_template);

        Mail::to($template_owner["email"])->send(new TemplateSubmitted([
            'name' => $current_user["name"],
            'template_title' => $template["title"],
        ]));

        return Inertia::render('Welcome', 
            [
                "user" => $current_user,
                "template" => $template,
                "submitted_template" => $created_template,
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

}
