<?php

namespace App\Http\Helpers;

use App\Models\GeneralSetting;
use Illuminate\Support\Facades\Log;

class EmailTemplatesMarkersData{
   public static function global_markers_data(){
      $site_info=GeneralSetting::first();

      $global_markers_key=EmailTemplateMarkers::globalMarkers();
      $new_array = array_fill_keys($global_markers_key, "");

      $new_array["APPLICATION_NAME"]=$site_info["site_name"];
      $new_array["APPLICATION_DESCRIPTION"]=$site_info["site_description"];
      return $new_array;
   }

   public static function registration_success_markers_data($user){
     $global_data=self::global_markers_data();

     $registration_marker_keys=EmailTemplateMarkers::registrationSuccessMarkers(false);
     $new_array = array_fill_keys($registration_marker_keys, "");

     $user_full_name=$user["name"];
     $user_email=$user["email"];

     $new_array["USER_NICK_NAME"]=substr($user_full_name, 0, 2);
     $new_array["USER_EMAIL"]=$user_email;
     $new_array["USER_FULL_NAME"]=$user_full_name;

     return array_merge($global_data,$new_array);

   }

}