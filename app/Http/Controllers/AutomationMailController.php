<?php

namespace App\Http\Controllers;

use App\Models\AutomationMailTimings;
use Illuminate\Http\Request;

class AutomationMailController extends Controller
{
    function store(Request $request)
    {
        $validated = $request->validate([
            'plan_extension_time_interval' => 'required|integer',
            'plan_upgrade_time_interval' => 'required|integer',
            'start_alarming_before_expiry_days' => 'required|integer',
        ]);


        $prevTimings = AutomationMailTimings::first();
        $is_new = false;
        if (
            !$prevTimings
        ) {
            $prevTimings = new AutomationMailTimings();
            $is_new = true;
        }

        $prevTimings->plan_extension_notifieng_mail_interval = $validated['plan_extension_time_interval'];
        $prevTimings->free_user_plan_upgrade_notifieng_mail_interval = $validated['plan_upgrade_time_interval'];
        $prevTimings->start_alarming_before_expiry = $validated['start_alarming_before_expiry_days'];

        $result = null;
        $message = "Mail Config Successfully Created";
        if ($is_new) {
            $prevTimings->save();
        } else {
            $prevTimings->save();
            $message = "Mail Config Successfully Updated";
        }

        return response()->json([
            "success" => true,
            "message" => $message,
            "data" => $result,
        ]);
    }
}
