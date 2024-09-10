<?php

namespace Database\Seeders;

use App\Http\Helpers\EmailTemplateMarkers;
use App\Models\EmailTemplate;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EmailTemplatesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //      EmailTemplate::create([
        //         'name' => EmailTemplateMarkers::REGISTRATION_SUCCESS_EMAIL,
        //         'subject' => 'Welcome to Our Platform!',
        //         'body' => 'Hello {name}, welcome to our platform. Your registration was successful!',
        //         "status"=>EmailTemplate::STATUS_ACTIVE
        //     ]);  

        // EmailTemplate::create([
        //     'name' => EmailTemplateMarkers::TEMPLATE_SUBMITTED_CONFIRMATION_MAIL_FOR_AUTHOR,
        //     'subject' => 'Template Submitted By a User',
        //     'body' => 'Hello {name}, New User Submitted a template',
        //     "status"=>EmailTemplate::STATUS_ACTIVE
        // ]); 
        // EmailTemplate::create([
        //     'name' => EmailTemplateMarkers::TEMPLATE_SUBMITTED_CONFIRMATION_MAIL_FOR_SUBMITTER,
        //     'subject' => 'Template Successfully Submitted',
        //     'body' => 'Your Template was submitted successfully',
        //     "status"=>EmailTemplate::STATUS_ACTIVE
        // ]);   

        // EmailTemplate::create([
        //     'name' => EmailTemplateMarkers::TEMPLATE_INVITATION_MAIL,
        //     'subject' => 'You have been invitated to submit a template',
        //     'body' => 'You have invited to submit a pdf template',
        //     "status" => EmailTemplate::STATUS_ACTIVE
        // ]); 

        EmailTemplate::create([
            'name' => EmailTemplateMarkers::ACCOUNT_VERIFICATION_MAIL,
            'subject' => 'Verify Your Account',
            'body' => 'Your Veirification Code is this one , please use this to verify your account',
            "status" => EmailTemplate::STATUS_ACTIVE
        ]);
    }
}
