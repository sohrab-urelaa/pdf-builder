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
            $current_user=auth()->user();
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

        $current_user=auth()->user();
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role'=>"user",
            "parent_admin"=>$current_user['id']
        ]);
        redirect("/settings/users");
    }
    public function getRegisterUser()
    {
        return Inertia::render('Auth/RegisterUser');
    }
     public function registerUser(LoginRequest $request)
     {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role'=>"user"
        ]);

        // http://127.0.0.1:8000/submit-templates/13
        $value = $request->session()->get('previous_url', 'submit-templates/10');
        $request->authenticate();
        $request->session()->regenerate();
        redirect($value);
    }
}
