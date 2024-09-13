<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AutomationMailTimings extends Model
{
    use HasFactory;
    protected $table = 'automation_mail_timings';
    protected $fillable = [
        'plan_extension_notifieng_mail_interval',
        'free_user_plan_upgrade_notifieng_mail_interval',
        "start_alarming_before_expiry"
    ];
}
