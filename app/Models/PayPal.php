<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PayPal extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'client_id',
        'client_secret',
        'is_active',
        'test_mode',
        'app_id',
        'payment_action',
        'locale'
    ];
    protected $table = 'paypal';
}
