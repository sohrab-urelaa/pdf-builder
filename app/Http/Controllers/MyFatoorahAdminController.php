<?php

namespace App\Http\Controllers;

use App\Models\MyFatoorah;
use Illuminate\Http\Request;

class MyFatoorahAdminController extends Controller
{
    function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string',
                'is_active' => 'required|string',
                'api_key' => 'required|string',
                'test_mode' => 'required|string',
            ]);

            $is_active = $validated["is_active"];
            $test_mode = $validated["test_mode"];
            $validated['is_active'] = $is_active === "true" || $is_active == "1" ? 1 : 0;
            $validated['test_mode'] = $test_mode === "true" || $test_mode == "1" ? 1 : 0;


            if ($validated['is_active'] === 1) {
                MyFatoorah::where('is_active', 1)->update(['is_active' => 0]);
            }

            $fatoorah_item = MyFatoorah::create($validated);
            return response()->json([
                "success" => true,
                "message" => "New My Fatoorah successfully created",
                "data" => $fatoorah_item,
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
                'name' => 'required|string',
                'is_active' => 'required|string',
                'api_key' => 'required|string',
                'test_mode' => 'required|string',
            ]);

            $is_active = $validated["is_active"];
            $test_mode = $validated["test_mode"];
            $validated['is_active'] = $is_active === "true" || $is_active === "1" ? 1 : 0;
            $validated['test_mode'] = $test_mode === "true" || $test_mode === "1" ? 1 : 0;

            //check the font is exists or not

            $prev_fatoorah = MyFatoorah::find($id);

            if (!$prev_fatoorah) {
                return response()->json([
                    "success" => false,
                    "message" => "Not getway not found",
                ]);
            }

            if ($validated['is_active'] === 1) {
                MyFatoorah::where('is_active', 1)->update(['is_active' => 0]);
            }

            $fatoorah_item = $prev_fatoorah->update($validated);
            return response()->json([
                "success" => true,
                "message" => "Data successfully updated",
                "data" => $fatoorah_item,
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
            $prev_font = MyFatoorah::find($id);

            if (!$prev_font) {
                return response()->json([
                    "success" => false,
                    "message" => "Getway not found",
                ]);
            }

            $font_item = $prev_font->delete();
            return response()->json([
                "success" => true,
                "message" => "Getway successfully deleted",
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
