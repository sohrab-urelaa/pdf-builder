<?php

namespace App\Http\Controllers;

use App\Models\Font;
use App\Models\PlansModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class FontController extends Controller
{
    function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'font_name' => 'required|string',
                'is_active' => 'required|string',
                'is_public' => 'required|string',
                'font_family_file' => 'required|file',
            ]);

            $validated['is_active'] = $validated["is_active"] === "true" ? 1 : 0;
            $validated['is_public'] = $validated["is_public"] === "true" ? 1 : 0;


            //upload the font file

            if ($request->hasFile('font_family_file')) {
                $file = $request->file('font_family_file');
                $originalFileName = $file->getClientOriginalName();
                $filePath = $file->storeAs('fonts', $originalFileName, "public");
                $validated['font_family_file'] = $filePath;
            }

            if ($validated['is_active'] === 1) {
                Font::where('is_active', 1)->update(['is_active' => 0]);
            }

            $font_item = Font::create($validated);
            return response()->json([
                "success" => true,
                "message" => "Font successfully created",
                "data" => $font_item,
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                "success" => false,
                "message" => "verification failed",
                "errors" => $e->errors(),
            ]);
        }
    }
    function update(Request $request, $id)
    {
        try {
            $validated = $request->validate([
                'font_name' => 'required|string',
                'is_active' => 'required|string',
                'is_public' => 'required|string',
                'font_family_file' => 'nullable|file|mimes:ttf,otf,woff,woff2',
            ]);

            $validated['is_active'] = $validated["is_active"] === "true" ? 1 : 0;
            $validated['is_public'] = $validated["is_public"] === "true" ? 1 : 0;


            //check the font is exists or not

            $prev_font = Font::find($id);

            if (!$prev_font) {
                return response()->json([
                    "success" => false,
                    "message" => "Font not found",
                ]);
            }

            //upload the font file

            if ($request->hasFile('font_family_file')) {
                $file = $request->file('font_family_file');
                $originalFileName = $file->getClientOriginalName();
                $filePath = $file->storeAs('fonts', $originalFileName, "public");
                $validated['font_family_file'] = $filePath;
            }

            if ($validated['is_active'] === 1) {
                Font::where('is_active', 1)->update(['is_active' => 0]);
            }

            $font_item = $prev_font->update($validated);
            return response()->json([
                "success" => true,
                "message" => "Font successfully updated",
                "data" => $font_item,
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                "success" => false,
                "message" => "verification failed",
                "errors" => $e->errors(),
            ]);
        }
    }
    function delete(Request $request, $id)
    {
        try {
            //check font exists or not
            $prev_font = Font::find($id);

            if (!$prev_font) {
                return response()->json([
                    "success" => false,
                    "message" => "Font not found",
                ]);
            }

            $font_item = $prev_font->delete();
            return response()->json([
                "success" => true,
                "message" => "Font successfully deleted",
                "data" => $font_item,
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                "success" => false,
                "message" => "verification failed",
                "errors" => $e->errors(),
            ]);
        }
    }
}
