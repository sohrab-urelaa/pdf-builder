<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
  public function handle(Request $request, Closure $next)
    {
      
        if (auth()->check()) {
              $role=auth()->user()->role;
              if ($role === 'user' || $role==='admin'){
                return $next($request);
              }
              
        }
          // return Inertia::render('Auth/RegisterUser',["redirect_link"=>$request->url()]);
      }
}
