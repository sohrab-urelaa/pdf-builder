<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(EmailVerificationRequest $request): RedirectResponse
    {
        if ($request->user()->hasVerifiedEmail()) {
            $current_user = auth()->user();
            $redirect_url = RouteServiceProvider::get_redirect_route($current_user);

            return redirect()->intended($redirect_url . '?verified=1');
        }

        if ($request->user()->markEmailAsVerified()) {
            event(new Verified($request->user()));
        }
        $current_user = auth()->user();
        $redirect_url = RouteServiceProvider::get_redirect_route($current_user);

        return redirect()->intended($redirect_url . '?verified=1');
    }
}
