<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserPlanHistory extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        "plan_id",
        "template_creation_count",
        "user_creation_count",
        "can_upload_certificate",
        "can_config_email_template",
        "is_active"
    ];
    protected $table = 'user_plan_histories';
}
