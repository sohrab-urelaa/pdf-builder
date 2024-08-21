<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * The path to your application's "home" route.
     *
     * Typically, users are redirected here after authentication.
     *
     * @var string
     */
    public const ADMIN_HOME = '/dashboard';
    public const USER_HOME = '/dashboard';
    public const SUPER_ADMIN_HOME = '/admin/home';


    public static function get_redirect_route($user)
    {
        $user_type = $user['role'] ?? "";

        if ($user_type === User::USER_USER_TYPE) {
            return self::USER_HOME;
        } else if ($user_type === User::ADMIN_USER_TYPE) {
            return self::ADMIN_HOME;
        } else if ($user_type === User::SUPER_ADMIN_USER_TYPE) {
            return self::SUPER_ADMIN_HOME;
        }
        return '/';
    }


    public function boot(): void
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
        });

        $this->routes(function () {
            Route::middleware('api')
                ->prefix('api')
                ->group(base_path('routes/api.php'));

            Route::middleware('web')
                ->group(base_path('routes/web.php'));
        });
    }
}
