<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GeneralSetting extends Model
{
    use HasFactory;

    protected $table = 'general_settings';
      protected $fillable = [
        'site_name',
        'site_description',
        'site_logo',
        'favicon',
        'default_language',
        'time_zone',
        'contact_email',
        'theme',
    ];
}
