<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentGetwaysForCountries extends Model
{
    use HasFactory;
    protected $fillable = ['country_name', 'getway_list'];
    protected $table = 'payment_getways_for_countries';
    protected $casts = [
        'getway_list' => 'array',
    ];
}
