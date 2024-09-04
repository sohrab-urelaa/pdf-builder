<?php

namespace App\Http\Controllers;

use App\Models\ContactUs;
use Illuminate\Http\Request;

class ContactUsController extends Controller
{
    function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'firstName' => 'required|string',
                'lastName' => 'required|string',
                'email' => 'required|string',
                'message' => 'required|string',
            ]);
            $contact_us_item = ContactUs::create($validated);
            return response()->json([
                "success" => true,
                "message" => "Your message sent successfully",
                "data" => $contact_us_item,
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
                'firstName' => 'required|string',
                'lastName' => 'required|string',
                'email' => 'required|string',
                'message' => 'required|string',
            ]);

            $prev_contact = ContactUs::find($id);
            if (!$prev_contact) {
                return response()->json([
                    "success" => false,
                    "message" => "Contact-us not found",
                ]);
            }

            $contact_item = $prev_contact->update($validated);
            return response()->json([
                "success" => true,
                "message" => "Contact successfully updated",
                "data" => $contact_item,
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
            $prev_contact = ContactUs::find($id);

            if (!$prev_contact) {
                return response()->json([
                    "success" => false,
                    "message" => "Contact not found",
                ]);
            }

            $country_item = $prev_contact->delete();
            return response()->json([
                "success" => true,
                "message" => "Contact successfully deleted",
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
