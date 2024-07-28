<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmailTemplate extends Model
{

    use HasFactory;
    protected $fillable = ['name', 'subject', 'body'];
    protected $table = 'email_templates';
    const REGISTRATION_SUCCESS_EMAIL="Registration Success Email";

    const STATUS_ACTIVE = 'active';
    const STATUS_INACTIVE = 'inactive';
   
}
