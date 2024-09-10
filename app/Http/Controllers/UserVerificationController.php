<?php

namespace App\Http\Controllers;

use App\Http\Helpers\EmailTemplateProviders;
use App\Mail\CustomMailTemplate;
use App\Models\User;
use App\Models\VerificationCodesModel;
use Carbon\Carbon;
use Illuminate\Http\Request;

class UserVerificationController extends Controller
{
    function send_verification_code(Request $request)
    {
        $current_user = auth()->user();
        $current_user_id = $current_user["id"];

        //fetch previous history of verification code

        $code = rand(100000, 999999);
        $is_old_exists = true;

        $prev_code = VerificationCodesModel::where("user_id", $current_user_id)->first();


        $expires_at = Carbon::now()->addMinutes(30);
        if (!$prev_code) {
            $is_old_exists = false;
        }
        $prev_code = [];
        $prev_code["user_id"] = $current_user_id;
        $prev_code["code"] = $code;
        $prev_code["expires_at"] = $expires_at;




        if ($is_old_exists) {
            //need to update previous code
            VerificationCodesModel::where('user_id', $current_user_id)->update($prev_code);
            // VerificationCodesModel::
        } else {
            //need to create new record
            VerificationCodesModel::create($prev_code);
        }


        //send the mail to the user

        $mail_template = EmailTemplateProviders::account_verification_mail_template($current_user, $code);
        if ($mail_template) {
            CustomMailTemplate::send_email($mail_template);
        }

        return response()->json([
            "success" => true,
            "message" => "Verification code successfully sent to your email."
        ]);
    }
    function verify_account(Request $request)
    {
        try {
            $current_user = auth()->user();
            $current_user_id = $current_user["id"];

            $validated = $request->validate([
                'code' => 'required|string',

            ]);
            //fetch previous history of verification code
            $verification_code_info = VerificationCodesModel::where("user_id", $current_user_id)->first();
            if (!$verification_code_info) {
                return response()->json([
                    "success" => false,
                    "message" => "Verification code not found!"
                ]);
            }

            $db_code = $verification_code_info["code"];
            $user_code = $validated["code"];
            if ($db_code !== $user_code) {
                return response()->json([
                    "success" => false,
                    "message" => "Verification code doesn't matched."
                ]);
            }

            if (Carbon::now()->greaterThan($verification_code_info->expires_at)) {
                return response()->json([
                    "success" => false,
                    "message" => "Verification code expired"
                ]);
            }


            //code is verified update user info

            $verification_code_info->delete();

            User::where('id', $current_user_id)->update([
                "isVerified" => 1,
            ]);



            return response()->json([
                "success" => true,
                "message" => "Your account successfully verified!"
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                "success" => false,
                "message" => "verification failed",
                "errors" => $e->errors(),
            ]);
        }
    }
}
