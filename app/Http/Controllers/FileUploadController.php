<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FileUploadController extends Controller
{
    public function upload(Request $request)
        {
            $request->validate([
                'file' => 'required|mimes:jpg,png,pdf|max:2048',
            ]);

            $file = $request->file('file');
            $path = $file->store('uploads', 'public');
            return response()->json([
                            "message"=>"File successfully uploaded",
                            "file_location"=>$path
                        ]);
        }
}
