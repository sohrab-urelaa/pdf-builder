<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VerificationCodesModel extends Model
{
    use HasFactory;
    protected $table = 'verification_codes';
    protected $fillable = [
        'user_id',
        'code',
        'expires_at',
    ];
}
