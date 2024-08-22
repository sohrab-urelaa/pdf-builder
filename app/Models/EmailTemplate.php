<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmailTemplate extends Model
{

    use HasFactory;
    protected $fillable = ['name', 'subject', 'body', "status", "owner", "user_id"];
    protected $table = 'email_templates';
    // const REGISTRATION_SUCCESS_EMAIL="Registration Success Email";
    // const TEMPLATE_SUBMIT_INVITATION_MAIL="Template Submit Invitation Mail";
    // const TEMPLATE_SUBMITTED_CONFIRMATION_MAIL_FOR_AUTHOR="Template Submitted Confirmation Mail for Author";
    // const TEMPLATE_SUBMITTED_CONFIRMATION_MAIL_FOR_SUBMITTER="Template Submitted Confirmation Mail for Submitter";
    const ADMIN_OWNER = "admin";
    const USER_OWNER = "user";
    const STATUS_ACTIVE = 'active';
    const STATUS_INACTIVE = 'inactive';
}
