<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MyFatoorah extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'api_key', 'is_active', 'test_mode'];
    protected $table = 'my_fatoorahs';
}
