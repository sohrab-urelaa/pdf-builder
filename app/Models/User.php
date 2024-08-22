<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    const ADMIN_USER_TYPE = "admin";
    const USER_USER_TYPE = "user";
    const SUPER_ADMIN_USER_TYPE = "super_admin";
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'parent_admin',
        "country",
        "timezone"
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];


    public function submittedTemplate()
    {
        return $this->hasMany(SubmittedTemplate::class);
    }

    public function pdfTemplate()
    {
        return $this->hasMany(PdfTemplate::class);
    }

    public static function get_main_user_id($user)
    {
        $user_type = $user['role'];
        $user_id = $user["id"];

        if ($user_type === User::USER_USER_TYPE) {
            $user_id = $user["parent_admin"];
        }
        return $user_id;
    }
    public static function is_user_or_admin($user)
    {
        $user_type = $user['role'];
        if ($user_type === User::USER_USER_TYPE || $user_type === User::ADMIN_USER_TYPE) {
            return true;
        }
        return false;
    }
}
