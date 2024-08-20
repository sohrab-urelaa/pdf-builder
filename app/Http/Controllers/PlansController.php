<?php

namespace App\Http\Controllers;

use App\Models\PlansModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PlansController extends Controller
{
    public function store(Request $request)
    {
        $current_user = auth()->user();
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'number_of_document' => 'required|integer',
            'monthly_price' => 'required|integer',
            'yearly_price' => 'required|integer',
            'isDefault' => 'required|boolean',
            'currency' => 'required|string',
            'currency_symbol' => 'required|string',
        ]);
        if ($validatedData['isDefault']) {
            PlansModel::where('isDefault', true)->update(['isDefault' => false]);
        }

        $plan = PlansModel::create($validatedData);

        return response()->json([
            "success" => true,
            "message" => "Plan Successfully Created",
            "data" => $plan,
        ]);
    }
    public function update(Request $request, $id)
    {

        $current_user = auth()->user();
        $plan = PlansModel::find($id);

        if (!$plan) {
            return response()->json([
                "success" => false,
                "message" => "Plan Not Found",
            ]);
        }

        $validatedData = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'number_of_document' => 'sometimes|required|integer',
            'monthly_price' => 'sometimes|required|integer',
            'yearly_price' => 'sometimes|required|integer',
            'isDefault' => 'required|boolean',
            'currency' => 'required|string',
            'currency_symbol' => 'required|string',
        ]);

        if ($validatedData['isDefault']) {
            PlansModel::where('isDefault', true)->update(['isDefault' => false]);
        }
        $plan->update($validatedData);
        return response()->json([
            "success" => true,
            "message" => "Plan Successfully Updated",
            "data" => $plan,
        ]);
    }


    public function destroy($id)
    {

        $current_user = auth()->user();
        $plan = PlansModel::find($id);

        if (!$plan) {
            return response()->json([
                "success" => false,
                "message" => "Plan Not Found",
            ]);
        }

        $plan->delete();
        return response()->json([
            "success" => true,
            "message" => "Plan Successfully Deleted",
            "data" => $plan,
        ]);
    }

    public function getJSONPlans()
    {
        $plans = PlansModel::get();
        return response(json_encode($plans), 200);
    }
}
