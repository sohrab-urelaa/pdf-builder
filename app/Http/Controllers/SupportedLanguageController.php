<?php

namespace App\Http\Controllers;

use App\Models\SupportedLanguage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class SupportedLanguageController extends Controller

{
   

    public function index()
    {
        $lang= SupportedLanguage::all();
         return response()->json($lang, 200);
    }
   public function store(Request $request){
    try{
        $validated = $request->validate([
            'country_name' => 'required|string|max:255|unique:supported_languages,country_name',
            'country_code' => 'required|string|max:10|unique:supported_languages,country_code',
            'translation_file' => 'required|file|mimes:json', 
            'is_active' => 'required|string',
        ]);


        //check any lang exists with the same country name



        if ($request->hasFile('translation_file')) {
            $file = $request->file('translation_file');
            $originalFileName = $file->getClientOriginalName();
             $filePath = $file->storeAs('translations', $originalFileName,"public");
            // $filePath = $file->store('translations', 'public'); 
            $validated['translation_path'] = $filePath;
        }

          $validated['is_active']=$validated["is_active"]==="true"?1:0;

        $supportedLanguage = SupportedLanguage::create($validated);
            return response()->json([
                    "success"=>true,
                    "message"=>"New language created",
                    "data" => $supportedLanguage,
                ]);
        return response()->json($supportedLanguage, 201);
    }catch (\Illuminate\Validation\ValidationException $e) {
                return response()->json([
                    "success"=>false,
                    "message"=>"verification failed",
                    "errors" => $e->errors(),
                ]);
        }
    }
   public function update(Request $request)
    {
        try{
        $validated = $request->validate([
            'country_name' => 'required|string|max:255',
            'country_code' => 'required|string|max:10',
            'translation_file' => 'required|file|mimes:json',
            'is_active' => 'required|string',
            'id' => 'required|string',
        ]);

        $id=$validated["id"];
        $supportedLanguage = SupportedLanguage::find($id);
        if(!$supportedLanguage){
                 return response()->json([
                    "success"=>false,
                    "message"=>"Language not found",
                ]);
        }
        if ($request->hasFile('translation_file')) {
             $file = $request->file('translation_file');
             $originalFileName = $file->getClientOriginalName();
             $filePath = $file->storeAs('translations', $originalFileName,"public");
            $validated['translation_path'] = $filePath;
        }
        Log::info("Validated",["data"=>$validated]);
        $validated['is_active']=$validated["is_active"]==="true"?1:0;

        $supportedLanguage->update($validated);
          return response()->json([
                    "success"=>true,
                    "message"=>"Language succesfully updated",
                    "data" => $supportedLanguage,
                ],200);
     }catch (\Illuminate\Validation\ValidationException $e) {
                return response()->json([
                    "success"=>false,
                    "message"=>"verification failed",
                    "errors" => $e->errors(),
                ]);
        }
    }
    public function destroy($id)
    {
        $supportedLanguage = SupportedLanguage::findOrFail($id);
        $supportedLanguage->delete();

        return response()->json([
                    "success"=>true,
                    "message"=>"Language Deleted Successfully",
                ]);
    }
}
