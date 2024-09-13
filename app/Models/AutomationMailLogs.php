<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AutomationMailLogs extends Model
{
    const FREE_USER_PLAN_UPGRADE_MAIL_TYPE = "FREE_USER_PLAN_UPGRADE_MAIL_TYPE";
    const PLAN_EXTENSION_MAIL_TYPE = "PLAN_EXTENSION_MAIL_TYPE";
    use HasFactory;
    protected $table = 'automation_mail_logs';
    protected $fillable = [
        'notification_type',
        'last_sent_at'
    ];
}
