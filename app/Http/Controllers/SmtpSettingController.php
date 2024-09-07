<?php

namespace App\Http\Controllers;

use App\Models\SmtpSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class SmtpSettingController extends Controller
{
    public function getSmtpConfigView()
    {
        $smtp_configs = SmtpSetting::get();
        return Inertia::render('Admin/EmailTemplates/SmtpSettings', [
            "smtp_settings" => $smtp_configs
        ]);
    }
    public function create(Request $request)
    {
        try {
            $request->validate([
                'mail_host' => 'required|string',
                'mail_port' => 'required|integer',
                'mail_username' => 'required|string',
                'mail_password' => 'required|string',
                'mail_encryption' => 'required|string',
                'mail_from_address' => 'nullable|email',
                'mail_from_name' => 'nullable|string',
                'status' => 'required|in:active,inactive',
            ]);
            $this->makeOtherConfigDeactivated($request->status);
            $smtp_settings = SmtpSetting::create($request->all());
            if ($request->status === "active") {
                $this->setMailConfig($smtp_settings);
            }
            return response()->json([
                "message" => "Smtp successfully created",
                "success" => true,
                "smtpSettings" => $smtp_settings
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                "message" => "Validation failed",
                "errors" => $e->errors(),
                "success" => false
            ], 422);
        }
    }
    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'mail_host' => 'required|string',
                'mail_port' => 'required|integer',
                'mail_username' => 'required|string',
                'mail_password' => 'required|string',
                'mail_encryption' => 'required|string',
                'mail_from_address' => 'nullable|email',
                'mail_from_name' => 'nullable|string',
                'status' => 'required|in:active,inactive',
            ]);
            $settings = SmtpSetting::find($id);
            if (!$settings) {
                return response()->json([
                    "message" => "Smtp config not found",
                    "success" => false,
                ]);
            }
            $this->makeOtherConfigDeactivated($request->status);
            $settings->update($request->all());

            if ($request->status === "active") {
                $this->setMailConfig($settings);
            }
            return response()->json([
                "message" => "Smtp successfully created",
                "success" => true,
                "smtpSettings" => $settings
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                "message" => "Validation failed",
                "errors" => $e->errors(),
                "success" => false
            ], 422);
        }
    }

    private function makeOtherConfigDeactivated($status)
    {
        if ($status === 'active') {
            // Set all other SMTP settings to inactive
            SmtpSetting::where('status', 'active')->update(['status' => 'inactive']);
        }
    }
    private function setMailConfig(SmtpSetting $smtpSetting)
    {
        Config::set('mail.mailers.smtp.transport', $smtpSetting->mail_driver);
        Config::set('mail.mailers.smtp.host', $smtpSetting->mail_host);
        Config::set('mail.mailers.smtp.port', $smtpSetting->mail_port);
        Config::set('mail.mailers.smtp.username', $smtpSetting->mail_username);
        Config::set('mail.mailers.smtp.password', $smtpSetting->mail_password);
        Config::set('mail.mailers.smtp.encryption', $smtpSetting->mail_encryption);
        Config::set('mail.from.address', $smtpSetting->mail_from_address);
        Config::set('mail.from.name', $smtpSetting->mail_from_name);

        Log::info('Mail Config:', [
            'transport' => Config::get('mail.mailers.smtp.transport'),
            'host' => Config::get('mail.mailers.smtp.host'),
            'port' => Config::get('mail.mailers.smtp.port'),
            'username' => Config::get('mail.mailers.smtp.username'),
            'password' => Config::get('mail.mailers.smtp.password'),
            'encryption' => Config::get('mail.mailers.smtp.encryption'),
            'from_address' => Config::get('mail.from.address'),
            'from_name' => Config::get('mail.from.name'),
        ]);
    }
}
