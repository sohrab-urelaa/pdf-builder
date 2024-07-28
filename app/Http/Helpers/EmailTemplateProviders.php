<?php

namespace App\Http\Helpers;

use App\Models\EmailTemplate;
use Illuminate\Support\Facades\Log;

class EmailTemplateProviders{
    
    public static function registration_success_template($user){
        $template=EmailTemplate::where([
            "name"=>EmailTemplateMarkers::REGISTRATION_SUCCESS_EMAIL,
        ])->first();
       if($template['status']===EmailTemplate::STATUS_INACTIVE){
           return false;
        }
        //parse the template and fillup with proper data

        $email_template_body=$template["body"];
        $markers_data=EmailTemplatesMarkersData::registration_success_markers_data($user);
        $filled_template=EmailTemplateMarkers::fill_template($email_template_body,$markers_data);
        $parsed_subject=EmailTemplateMarkers::fill_template($template["subject"],$markers_data);

        return [
            "body"=>$filled_template,
            "subject"=>$parsed_subject,
            "email"=>$user["email"]
        ];
    }





}