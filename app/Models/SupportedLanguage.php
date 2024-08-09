<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SupportedLanguage extends Model
{
    use HasFactory;
     protected $table = 'supported_languages';
     protected $fillable = [
        'country_name',
        'country_code',
        'translation_path',
        'is_active',
    ];
}
