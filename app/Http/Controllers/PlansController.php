<?php

namespace App\Http\Controllers;

use App\Models\PlansModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PlansController extends Controller
{
 public function store(Request $request)
    {
        $current_user=auth()->user();
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'number_of_document' => 'required|integer',
            'monthly_price' => 'required|integer',
            'yearly_price' => 'required|integer',
            'isDefault' => 'required|boolean',
        ]);
        if ($validatedData['isDefault']) {
            PlansModel::where('isDefault', true)->update(['isDefault' => false]);
        }

        $plan = PlansModel::create($validatedData);

         $plans=PlansModel::get();
        return Inertia::render('Admin/AdminPlans', ["user"=>$current_user,"plan"=>$plan,"plans"=>$plans]);
       
    }
    public function update(Request $request, $id)
    {

        $current_user=auth()->user();
        $plan = PlansModel::find($id);

        if (!$plan) {
          return Inertia::render('Admin/AdminPlans', [
            "user"=>$current_user,
            "errors"=>"No Plan Found",
           ]);
        }

        $validatedData = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'number_of_document' => 'sometimes|required|integer',
            'monthly_price' => 'sometimes|required|integer',
            'yearly_price' => 'sometimes|required|integer',
            'isDefault' => 'required|boolean',
        ]);

         if ($validatedData['isDefault']) {
            PlansModel::where('isDefault', true)->update(['isDefault' => false]);
        }
        $plan->update($validatedData);
         $plans=PlansModel::get();
        return Inertia::render('Admin/AdminPlans', ["user"=>$current_user,"plan"=>$plan,"plans"=>$plans]);
    }


    public function destroy($id)
    {

        $current_user=auth()->user();
        $plan = PlansModel::find($id);

        if (!$plan) {
           return Inertia::render('Admin/AdminPlans', [
            "user"=>$current_user,
            "errors"=>"No Plan Found",
           ]);
        }

        $plan->delete();

   
         $plans=PlansModel::get();
         return Inertia::render('Admin/AdminPlans', ["user"=>$current_user,"plan"=>$plan,"plans"=>$plans,"success"=>true]);
    }

    public function getJSONPlans()
    {
        $plans = PlansModel::get();
        return response(json_encode($plans),200);
      }



}
