<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Font extends Model
{
    use HasFactory;
    protected $fillable = ['font_name', 'font_family_file', 'is_active', 'is_public'];
    protected $table = 'fonts';
}
