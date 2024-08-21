<?php

namespace App\Http\Controllers;

use App\Models\PayPal;
use Illuminate\Http\Request;

class AdminPaypalController extends Controller
{
    function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string',
                'client_id' => 'required|string',
                'client_secret' => 'required|string',
                'app_id' => 'required|string',
                'payment_action' => 'required|string',
                'locale' => 'required|string',
                'is_active' => 'required|boolean',
                'test_mode' => 'required|boolean',
            ]);

            if ($validated['is_active']) {
                PayPal::where('is_active', 1)->update(['is_active' => 0]);
            }

            $paypal_item = PayPal::create($validated);
            return response()->json([
                "success" => true,
                "message" => "Paypal successfully created",
                "data" => $paypal_item,
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
                'client_id' => 'required|string',
                'client_secret' => 'required|string',
                'app_id' => 'required|string',
                'payment_action' => 'required|string',
                'locale' => 'required|string',
                'is_active' => 'required|boolean',
                'test_mode' => 'required|boolean',
            ]);


            $prev_paypal = PayPal::find($id);

            if (!$prev_paypal) {
                return response()->json([
                    "success" => false,
                    "message" => "Paypal not found",
                ]);
            }

            if ($validated['is_active']) {
                PayPal::where('is_active', 1)->update(['is_active' => 0]);
            }

            $paypal_item = $prev_paypal->update($validated);
            return response()->json([
                "success" => true,
                "message" => "Data successfully updated",
                "data" => $paypal_item,
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
            $prev_paypal = PayPal::find($id);

            if (!$prev_paypal) {
                return response()->json([
                    "success" => false,
                    "message" => "Getway not found",
                ]);
            }

            $paypal = $prev_paypal->delete();
            return response()->json([
                "success" => true,
                "message" => "Getway successfully deleted",
                "data" => $paypal,
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
