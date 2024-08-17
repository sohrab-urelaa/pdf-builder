<?php

namespace App\Http\Controllers;

use App\Models\Country;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CountryController extends Controller
{
    function index(Request $request)
    {
        $country_list = Country::where('is_active', 1)->get();
        return response()->json([
            "success" => true,
            "message" => "Country successfully fetched",
            "data" => $country_list,
        ]);
    }
    function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'country_name' => 'required|string',
                'is_active' => 'required|string',
            ]);
            $validated['is_active'] = $validated["is_active"] === "true" ? 1 : 0;
            Log::info("CountryData", ["data" => $validated]);
            $country_item = Country::create($validated);
            return response()->json([
                "success" => true,
                "message" => "Country successfully created",
                "data" => $country_item,
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
                'country_name' => 'required|string',
                'is_active' => 'required|string',
            ]);
            $validated['is_active'] = $validated["is_active"] === "true" ? 1 : 0;

            $prev_country = Country::find($id);
            if (!$prev_country) {
                return response()->json([
                    "success" => false,
                    "message" => "Country not found",
                ]);
            }

            $country_item = $prev_country->update($validated);
            return response()->json([
                "success" => true,
                "message" => "Country successfully updated",
                "data" => $country_item,
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
            //check getway exists or not
            $prev_country = Country::find($id);

            if (!$prev_country) {
                return response()->json([
                    "success" => false,
                    "message" => "Country not found",
                ]);
            }

            $country_item = $prev_country->delete();
            return response()->json([
                "success" => true,
                "message" => "Country successfully deleted",
                "data" => $country_item,
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
