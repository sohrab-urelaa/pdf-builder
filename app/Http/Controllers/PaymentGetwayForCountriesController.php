<?php

namespace App\Http\Controllers;

use App\Models\PaymentGetwaysForCountries;
use Illuminate\Http\Request;

class PaymentGetwayForCountriesController extends Controller
{
    function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'country_name' => 'required|string|unique:payment_getways_for_countries,country_name',
                'getway_list' => 'required|array',
                'getway_list.*' => 'string',
            ]);
            $getway_item = PaymentGetwaysForCountries::create($validated);
            return response()->json([
                "success" => true,
                "message" => "Payment Getway successfully created",
                "data" => $getway_item,
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
                'getway_list' => 'required|array',
                'getway_list.*' => 'string',
            ]);
            //check the getway is exists or not

            $prev_getway = PaymentGetwaysForCountries::find($id);
            if (!$prev_getway) {
                return response()->json([
                    "success" => false,
                    "message" => "Getway not found",
                ]);
            }

            $getway_item = $prev_getway->update($validated);
            return response()->json([
                "success" => true,
                "message" => "Getway successfully updated",
                "data" => $getway_item,
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
            $prev_getway = PaymentGetwaysForCountries::find($id);

            if (!$prev_getway) {
                return response()->json([
                    "success" => false,
                    "message" => "Getway not found",
                ]);
            }

            $getway_item = $prev_getway->delete();
            return response()->json([
                "success" => true,
                "message" => "Getway successfully deleted",
                "data" => $getway_item,
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
