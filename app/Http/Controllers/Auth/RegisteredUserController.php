<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Controllers\PlanHistoryController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Helpers\EmailTemplateProviders;
use App\Mail\CustomMailTemplate;
use App\Models\CompanyModel;
use App\Models\PlansModel;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'companyName' => 'required|string|max:255',
            'description' => 'required|string',
            'country' => 'required|string',
            'timezone' => 'required|string',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'country' => $request->country,
            'timezone' => $request->timezone,
        ]);

        $defaultPlan = PlansModel::where('isDefault', true)->first();
        $company = CompanyModel::create([
            "companyName" => $request->companyName,
            "description" => $request->description,
            "ownerId" => $user["id"],
            "planId" => $defaultPlan["id"],
        ]);
        PlanHistoryController::create_new_plan_history($user, $defaultPlan);
        SubscriptionController::create_new_subscription($user["id"], $company["id"], $defaultPlan, "monthly");
        //trigger register user email

        $template = EmailTemplateProviders::registration_success_template($user);
        if ($template) {
            CustomMailTemplate::send_email($template);
        }


        event(new Registered($user));

        Auth::login($user);
        $redirect_url = RouteServiceProvider::get_redirect_route($user);
        return redirect($redirect_url);
    }
}
