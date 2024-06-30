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
        $current_user=auth()->user();
        $validatedData = $request->validate([
            'companyName' => 'required|string|max:255',
            'description' => 'required|string',
            'planId' => 'required|string',
            // 'ownerId' => 'required|string',
        ]);
        $company = CompanyModel::create($validatedData);
        $companies=CompanyModel::with("plan")->get();
        return Inertia::render('Admin/AdminCompany', ["user"=>$current_user,"company"=>$company,"companies"=>$companies]);
       
    }
    public function update(Request $request, $id)
    {

        $current_user=auth()->user();
        $company = CompanyModel::find($id);

        if (!$company) {
          return Inertia::render('Admin/AdminCompany', [
            "user"=>$current_user,
            "errors"=>"No Plan Found",
           ]);
        }

        $validatedData = $request->validate([
            'companyName' => 'required|string|max:255',
            'description' => 'required|string',
            'planId' => 'required|string',
            // 'ownerId' => 'required|string',
        ]);

         $company->update($validatedData);
         $companies=CompanyModel::with("plan")->get();

        
    return redirect()->back()->with('success', 'Plan created successfully!');
        //  return Inertia::render('Admin/AdminCompany', ["user"=>$current_user,"company"=>$company,"companies"=>$companies]);
       
    }


    public function destroy($id)
    {

        $current_user=auth()->user();
        $company = CompanyModel::find($id);

        if (!$company) {
           return Inertia::render('Admin/AdminCompany', [
            "user"=>$current_user,
            "errors"=>"No Plan Found",
           ]);
        }

        $company->delete();
         $companies=CompanyModel::with("plan")->get();
         return Inertia::render('Admin/AdminCompany', ["user"=>$current_user,"company"=>$company,"companies"=>$companies,"success"=>true]);
       
    }

      public function createCompanyOwner(Request $request)
     {

        $current_user=auth()->user();
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'company_id' => ['required'],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role'=>"admin"
        ]);
         CompanyModel::where("id",$request->company_id)->update(["ownerId"=>$user["id"]]);
         $companies=CompanyModel::with("plan")->get();
         return redirect("/admin/company");
        //  return Inertia::render('Admin/AdminCompany', ["user"=>$current_user,"companies"=>$companies,"success"=>true]);
       
    }
}
