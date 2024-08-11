<?php

namespace App\Http\Controllers;

use App\Models\HeaderItem;
use App\Models\HeaderSubItem;
use Illuminate\Http\Request;

class HeaderItemController extends Controller
{
    function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string',
                'subModules' => 'required|string',
                'link' => 'nullable|string',
                'public' => 'required|string',
            ]);

            $validated['subModules'] = $validated["subModules"] === "true" ? 1 : 0;

            $header_item = HeaderItem::create($validated);
            return response()->json([
                "success" => true,
                "message" => "Header successfully created",
                "data" => $header_item,
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
                'subModules' => 'required|string',
                'link' => 'nullable|string',
                'public' => 'required|string',
            ]);

            //check header exists or not
            $perv_header = HeaderItem::find($id);

            if (!$perv_header) {
                return response()->json([
                    "success" => false,
                    "message" => "Header not found",
                ]);
            }

            $validated['subModules'] = $validated["subModules"] === "true" ? 1 : 0;

            $header_item = $perv_header->update($validated);
            return response()->json([
                "success" => true,
                "message" => "Header successfully updated",
                "data" => $header_item,
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
            //check header exists or not
            $perv_header = HeaderItem::find($id);

            if (!$perv_header) {
                return response()->json([
                    "success" => false,
                    "message" => "Header not found",
                ]);
            }

            $header_item = $perv_header->delete();
            return response()->json([
                "success" => true,
                "message" => "Header successfully deleted",
                "data" => $header_item,
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                "success" => false,
                "message" => "verification failed",
                "errors" => $e->errors(),
            ]);
        }
    }

    function storeSubHeader(Request $request)
    {
        try {
            $validated = $request->validate([
                'nav_item_id' => 'required|string',
                'title' => 'required|string',
                'description' => 'nullable|string',
                'link' => 'required|string',
            ]);

            $sub_header_item = HeaderSubItem::create($validated);
            return response()->json([
                "success" => true,
                "message" => "Header Sub Item successfully created",
                "data" => $sub_header_item,
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                "success" => false,
                "message" => "verification failed",
                "errors" => $e->errors(),
            ]);
        }
    }
    function editSubHeader(Request $request, $id)
    {
        try {
            $validated = $request->validate([
                'nav_item_id' => 'required|string',
                'title' => 'required|string',
                'description' => 'nullable|string',
                'link' => 'required|string',
            ]);

            //check header exists or not
            $perv_sub_header = HeaderSubItem::find($id);

            if (!$perv_sub_header) {
                return response()->json([
                    "success" => false,
                    "message" => "Sub Header not found",
                ]);
            }
            $header_item = $perv_sub_header->update($validated);
            return response()->json([
                "success" => true,
                "message" => "Sub Header successfully updated",
                "data" => $header_item,
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                "success" => false,
                "message" => "verification failed",
                "errors" => $e->errors(),
            ]);
        }
    }
    function deleteSubHeader(Request $request, $id)
    {
        try {
            //check header exists or not
            $perv_sub_header = HeaderSubItem::find($id);

            if (!$perv_sub_header) {
                return response()->json([
                    "success" => false,
                    "message" => "Sub Header not found",
                ]);
            }

            $header_item = $perv_sub_header->delete();
            return response()->json([
                "success" => true,
                "message" => "Sub Header successfully deleted",
                "data" => $header_item,
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                "success" => false,
                "message" => "verification failed",
                "errors" => $e->errors(),
            ]);
        }
    }
    function getSubHeaders(Request $request, $id)
    {
        try {
            //check header exists or not
            $sub_headers = HeaderSubItem::where("nav_item_id", $id)->get();
            return response()->json([
                "success" => true,
                "message" => "Sub Header Lists",
                "data" => $sub_headers,
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
