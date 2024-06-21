<?php

namespace App\Http\Controllers;

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
        redirect("users");
    }
}
