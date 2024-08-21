<?php

namespace App\Http\Controllers;

use App\Models\SslCertificateModal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SSlCertificateController extends Controller
{
    public function store(Request $request)
    {
        $current_user = auth()->user();
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'certificate' => 'nullable|file|max:2048',
            'is_active' => 'required|string',
            'password' => 'nullable|string',
            'user_type' => 'nullable|string',
        ]);

        //check can upload certificate or not

        if ($validated["user_type"] === "user") {
            $can_upload_cert = PlanHistoryController::can_upload_certificate($current_user);
            if (!$can_upload_cert) {
                return response()->json([
                    'message' => 'You can\'t upload certificate, as your current plan doesn\'t support this, please upgrade your plan.',
                    'success' => false,
                ], 404);
            }
        }



        if ($request->hasFile('certificate')) {
            $file = $request->file('certificate');
            $originalName = $file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();
            $fileNameToStore = $originalName . time() . '.' . $extension;

            // Store the file
            $path = $file->storeAs('certificate', $fileNameToStore);
            $validated['certificate'] = $path;
        }

        $validated["user_type"] = $validated["user_type"] ?? "user";
        $validated["user_id"] = $current_user["id"];
        $this->deactive_other_certificate($validated["is_active"], $current_user["id"], $validated["user_type"]);
        $validated["is_active"] = $validated["is_active"] == "true" ? true : false;

        $ssl_certificate = SslCertificateModal::create($validated);
        return response()->json(["data" => $ssl_certificate, "success" => true, "message" => "Certificate successfully created"]);
    }
    public function update(Request $request, $id)
    {
        $current_user = auth()->user();
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'certificate' => 'nullable|file|max:2048',
            'is_active' => 'required|string',
            'password' => 'nullable|string',
            'user_type' => 'nullable|string',
        ]);

        //check id is correct 
        $prev_certificate = SslCertificateModal::find($id);

        if (!$prev_certificate) {
            return response()->json([
                'message' => 'Certificate not found',
                'success' => false,
            ], 404);
        }

        //check can upload certificate or not
        if ($validated["user_type"] === "user") {
            $can_upload_cert = PlanHistoryController::can_upload_certificate($current_user);
            if (!$can_upload_cert) {
                return response()->json([
                    'message' => 'You can\'t upload certificate, as your current plan doesn\'t support this, please upgrade your plan.',
                    'success' => false,
                ], 404);
            }
        }


        if ($request->hasFile('certificate')) {
            $file = $request->file('certificate');
            $originalName = $file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();
            $fileNameToStore = $originalName . time() . '.' . $extension;
            $path = $file->storeAs('certificate', $fileNameToStore);
            $validated['certificate'] = $path;
        }

        $validated["user_type"] = $validated["user_type"] ?? "user";
        $validated["user_id"] = $current_user["id"];
        $this->deactive_other_certificate($validated["is_active"], $current_user["id"], $validated["user_type"]);
        $validated["is_active"] = $validated["is_active"] == "true" ? true : false;



        $prev_certificate->update($validated);
        return response()->json(["data" => $prev_certificate, "success" => true, "message" => "Certificate successfully updated"]);
    }

    private function deactive_other_certificate($current_certificate_status, $user_id, $user_type)
    {
        Log::info("Current_Status", ["status" => $current_certificate_status, "User" => $user_id, "userType" => $user_type]);
        if ($current_certificate_status === "true") {
            SslCertificateModal::where('is_active', 1)
                ->where("user_id", $user_id)
                ->where("user_type", $user_type)
                ->update(['is_active' => 0]);
        }
    }

    public function deleteCertificate(Request $request, $id)
    {
        $record = SslCertificateModal::find($id);
        if (!$record) {
            return response()->json([
                'message' => 'Certificate not found',
                'success' => false,
            ], 404);
        }
        $record->delete();
        return response()->json([
            'message' => 'Certificate deleted successfully',
            'success' => true,
        ], 200);
    }
}
