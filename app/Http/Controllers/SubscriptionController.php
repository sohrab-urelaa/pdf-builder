<?php

namespace App\Http\Controllers;

use App\Models\CompanyModel;
use App\Models\PlansModel;
use App\Models\SubscriptionModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class SubscriptionController extends Controller
{
    public function subscribe(Request $request)
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'plan_id' => 'required|exists:plans,id',
            'billing_cycle' => 'required|in:monthly,yearly',
            'payment_method' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $plan = PlansModel::find($request->plan_id);
        $company = CompanyModel::where("ownerId",Auth::id())->first();

        // Calculate the amount based on billing cycle
        $amount = $request->billing_cycle === 'yearly' ? $plan->yearly_price : $plan->monthly_price;

        // Create the subscription
        $subscription = SubscriptionModel::create([
            'user_id' => Auth::id(),
            'plan_id' => $request->plan_id,
            'start_date' => now(),
            'end_date' => $request->billing_cycle === 'yearly' ? now()->addYear() : now()->addMonth(),
            'is_active' => true,
            'payment_method' => $request->payment_method,
            'payment_status' => 'paid', 
            'amount' => $amount,
            'billing_cycle' => $request->billing_cycle,
            'company_id' => $company["id"],
        ]);

       
        CompanyModel::where('ownerId', Auth::id())->update(['planId' => $request->plan_id]);

        return response()->json(['message' => 'Subscription created successfully', 'subscription' => $subscription], 201);
    }
}
