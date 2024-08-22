<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        if (auth()->check()) {
            $current_user = auth()->user();
            // $users = User::where('role', '!=', 'admin')->get();
            $users = User::get();
            return Inertia::render('Users', [
                'users' => $users,
                'user' => $current_user
            ]);
        }

        return response()->json(['message' => 'Not authenticated'], 401);
    }

    public function createUser(Request $request)
    {

        $current_user = auth()->user();
        $main_user_id = User::get_main_user_id($current_user);
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'country' => 'required|string',
            'timezone' => 'required|string',
        ]);

        //check user creation limit 
        $result = PlanHistoryController::has_user_creation_limit($current_user);
        if (!$result["has_limit"]) {
            return response()->json([
                "success" => false,
                "message" => "User creation limit has been reached",
            ]);
        }

        //update limit
        $result["plan_history"]->user_creation_count = $result["next_limit"];
        $result["plan_history"]->save();

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => User::USER_USER_TYPE,
            "parent_admin" => $main_user_id,
            "country" => $request->country,
            "timezone" => $request->timezone,
        ]);
        return response()->json([
            "success" => true,
            "message" => "User successfully created",
            "data" => $user
        ]);
    }
    public function updateUser(Request $request, $id)
    {

        $current_user = auth()->user();
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255',
            'password' => 'nullable|string',
            'country' => 'required|string',
            'timezone' => 'required|string',
        ]);

        $prev_user = User::find($id);
        if (!$prev_user) {
            return response()->json([
                "success" => false,
                "message" => "User not found",
            ]);
        }

        //check any other user has same email or not
        if ($prev_user["email"] !== $validated["email"]) {
            $exists = User::where('email', $validated["email"])
                ->where('id', '!=', $id)
                ->exists();
            if ($exists) {
                return response()->json([
                    "success" => false,
                    "message" => "Email already exists",
                ]);
            }
        }



        $prev_user->name = $validated["name"];
        $prev_user->email = $validated["email"];
        $prev_user->country = $validated["country"];
        $prev_user->timezone = $validated["timezone"];
        if ($validated["password"]) {
            $prev_user->password =
                Hash::make($validated["password"]);
        }
        $prev_user->save();

        return response()->json([
            "success" => true,
            "message" => "User successfully updated",
            "data" => $prev_user
        ]);
    }

    public function destroyUser(Request $request, $id)
    {

        $prev_user = User::find($id);
        if (!$prev_user) {
            return response()->json([
                "success" => false,
                "message" => "User not found",
            ]);
        }

        $prev_user->delete();

        return response()->json([
            "success" => true,
            "message" => "User successfully deleted",
            "data" => $prev_user
        ]);
    }


    public function getRegisterUser()
    {
        return Inertia::render('Auth/RegisterUser');
    }
    public function registerUser(LoginRequest $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => "user"
        ]);

        // http://127.0.0.1:8000/submit-templates/13
        $value = $request->session()->get('previous_url', 'submit-templates/10');
        $request->authenticate();
        $request->session()->regenerate();
        redirect($value);
    }
}
