<?php

namespace App\Http\Controllers;

use App\Models\SslCertificateModal;
use Illuminate\Http\Request;

class SSlCertificateController extends Controller
{
  public function store(Request $request)
    {  
        $current_user=auth()->user();
         $validated = $request->validate([
            'name' => 'required|string|max:255',
            'certificate' => 'nullable|file|max:2048',
            'is_active' => 'required|string',
            'password' => 'nullable|string',
        ]);
        if ($request->hasFile('certificate')) {
              $file = $request->file('certificate');
                $originalName = $file->getClientOriginalName();
                $extension = $file->getClientOriginalExtension();
                $fileNameToStore =$originalName. time() . '.' . $extension;

                // Store the file
                $path = $file->storeAs('certificate', $fileNameToStore);
                $validated['certificate'] = $path;
        }
        $validated["user_id"]=$current_user["id"];
        $validated["is_active"]=$validated["is_active"]=="true"?true:false;

        $ssl_certificate=SslCertificateModal::create($validated);
        return response()->json(["data"=>$ssl_certificate,"success"=>true]);
    }
  public function deleteCertificate(Request $request,$id){
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
