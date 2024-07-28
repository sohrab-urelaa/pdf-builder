<?php

namespace App\Http\Helpers;


class EmailTemplateMarkers{
    const REGISTRATION_SUCCESS_EMAIL="Registration Success Email";

    public static function getAvailableMarkers($name){
        if($name===self::REGISTRATION_SUCCESS_EMAIL){
            return self::registrationSuccessMarkers();
        }else{
            return self::globalMarkers();
        }
    }
    public static function globalMarkers(){
        $global_markers=[
            "APPLICATION_NAME",
            "APPLICATION_DESCRIPTION"
        ];
        return $global_markers;
    }

    public static function registrationSuccessMarkers($merge=true){
        $global_markers=self::globalMarkers();
        $registration_markers=[
            "USER_NICK_NAME",
            "USER_EMAIL",
            "USER_FULL_NAME"
        ];
        $merged_array=[];
        if($merge){
            $merged_array= array_merge($global_markers,$registration_markers);
        }else{
            $merged_array=$registration_markers;
        }

        return $merged_array;
    }

   public static function fill_template($templateBody, $data)
        {
            foreach ($data as $key => $value) {
                $templateBody = str_replace('{{' . $key . '}}', $value, $templateBody);
            }
            return $templateBody;
        }

}