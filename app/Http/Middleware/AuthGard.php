<?php

namespace App\Http\Middleware;

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class AuthGard
{
  /**
   * Handle an incoming request.
   *
   * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
   */
  public function handle(Request $request, Closure $next, $role1 = null, $role2 = null, $role3 = null)
  {
    $roles = [];

    if ($role1) {
      array_push($roles, $role1);
    }
    if ($role2) {
      array_push($roles, $role2);
    }

    if ($role3) {
      array_push($roles, $role3);
    }


    $user = auth()->user();
    $user_role = $user->role ?? "";
    $has_permission = in_array($user_role, $roles);
    if (auth()->check() && $has_permission) {
      return $next($request);
    }
    $redirect_route = RouteServiceProvider::get_redirect_route($user);
    return redirect($redirect_route)->with('error', 'You do not have access to this resource.');
  }
}
