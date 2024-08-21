<?php

namespace App\Http\Middleware;

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsSuperAdmin
{
  /**
   * Handle an incoming request.
   *
   * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
   */
  public function handle(Request $request, Closure $next)
  {

    $user = auth()->user();
    if (auth()->check() && $user->role === User::SUPER_ADMIN_USER_TYPE) {
      return $next($request);
    }
    $redirect_route =
      RouteServiceProvider::get_redirect_route($user);
    return redirect($redirect_route)->with('error', 'You do not have access to this resource.');
  }
}
