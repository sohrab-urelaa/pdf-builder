<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmailTemplate extends Model
{

    use HasFactory;
    protected $fillable = ['name', 'subject', 'body'];
    protected $table = 'email_templates';
    // const REGISTRATION_SUCCESS_EMAIL="Registration Success Email";
    // const TEMPLATE_SUBMIT_INVITATION_MAIL="Template Submit Invitation Mail";
    // const TEMPLATE_SUBMITTED_CONFIRMATION_MAIL_FOR_AUTHOR="Template Submitted Confirmation Mail for Author";
    // const TEMPLATE_SUBMITTED_CONFIRMATION_MAIL_FOR_SUBMITTER="Template Submitted Confirmation Mail for Submitter";

    const STATUS_ACTIVE = 'active';
    const STATUS_INACTIVE = 'inactive';
   
}
