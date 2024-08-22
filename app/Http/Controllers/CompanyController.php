<?php

namespace App\Http\Controllers;

use App\Models\CompanyModel;
use App\Models\PlansModel;
use App\Models\SubscriptionModel;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class CompanyController extends Controller
{
    public function store(Request $request)
    {
        $current_user = auth()->user();
        $validatedData = $request->validate([
            'companyName' => 'required|string|max:255',
            'description' => 'required|string',
            'planId' => 'required|string',
            // 'ownerId' => 'required|string',
        ]);
        $company = CompanyModel::create($validatedData);

        return response()->json([
            "success" => true,
            "message" => "Company Successfully Created",
            "data" => $company,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'companyName' => 'required|string|max:255',
            'description' => 'required|string',
            'planId' => 'required|string',
            // 'ownerId' => 'required|string',
        ]);
        $current_user = auth()->user();
        $company = CompanyModel::with("plan")->with("owner")->find($id);

        if (!$company) {
            return response()->json([
                "success" => false,
                "message" => "Company Not Found",
            ]);
        }

        //check company owner exists or not

        if ($company["ownerId"]) {
            //check company plan has changed or not

            $current_plan_id = $validatedData["planId"];
            $prev_plan_id = $company["planId"];

            if ($current_plan_id != $prev_plan_id) {
                $new_plan = PlansModel::find($current_plan_id);
                PlanHistoryController::create_new_plan_history($company["owner"], $new_plan);
                SubscriptionController::create_new_subscription($company["ownerId"], $company["id"], $new_plan, "yearly");
            }
        }


        $company->update($validatedData);

        return response()->json([
            "success" => true,
            "message" => "Company Successfully Update",
            "data" => $company,
        ]);
    }


    public function destroy($id)
    {

        $current_user = auth()->user();
        $company = CompanyModel::find($id);

        if (!$company) {
            return response()->json([
                "success" => false,
                "message" => "Company Not Found",
            ]);
        }

        $company->delete();

        return response()->json([
            "success" => true,
            "message" => "Company Successfully Deleted",
            "data" => $company,
        ]);
    }

    public function createCompanyOwner(Request $request)
    {

        $current_user = auth()->user();
        $request->validate([
            'name' => 'required|string|max:255',
            'country' => 'required|string',
            'timezone' => 'required|string',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'company_id' => ['required'],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'country' => $request->country,
            'timezone' => $request->timezone,
            'password' => Hash::make($request->password),
            'role' => "admin"
        ]);
        $updated_company = CompanyModel::where("id", $request->company_id)->first();
        $updated_company->ownerId = $user["id"];
        $updated_company->save();

        $plan_id = $updated_company["planId"];
        $company_plan = PlansModel::find($plan_id);
        PlanHistoryController::create_new_plan_history($user, $company_plan);
        SubscriptionController::create_new_subscription($user["id"], $request->company_id, $company_plan, "yearly");

        return response()->json([
            "success" => true,
            "message" => "Company owner successfully created",
            "data" => $user,
        ]);
    }
}
