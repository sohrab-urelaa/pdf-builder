<?php

namespace App\Http\Controllers;

use App\Models\CompanyModel;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Hash;

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

        $current_user = auth()->user();
        $company = CompanyModel::find($id);

        if (!$company) {
            return response()->json([
                "success" => false,
                "message" => "Company Not Found",
            ]);
        }

        $validatedData = $request->validate([
            'companyName' => 'required|string|max:255',
            'description' => 'required|string',
            'planId' => 'required|string',
            // 'ownerId' => 'required|string',
        ]);

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
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'company_id' => ['required'],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => "admin"
        ]);
        CompanyModel::where("id", $request->company_id)->update(["ownerId" => $user["id"]]);
        return response()->json([
            "success" => true,
            "message" => "Company owner successfully created",
            "data" => $user,
        ]);
        //  return Inertia::render('Admin/AdminCompany', ["user"=>$current_user,"companies"=>$companies,"success"=>true]);

    }
}
