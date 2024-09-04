<?php

namespace App\Mail;

use App\Models\SmtpSetting;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class CustomMailTemplate extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $mailData;
    public function __construct($mailData)
    {
        $this->mailData = $mailData;
    }
    static function setMailConfig(SmtpSetting $smtpSetting)
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
    public static function send_email($data)
    {
        // $active_smtp_config = SmtpSetting::where("status", "active")->first();
        // if ($active_smtp_config) {
        //     self::setMailConfig($active_smtp_config);
        // }
        Mail::to($data["email"])->send(new CustomMailTemplate($data));
    }
    public function build()
    {
        return $this->view('mail.custom-mail')
            ->subject($this->mailData["subject"])
            ->with(['body' => $this->mailData["body"]]);
    }

    public function attachments(): array
    {
        return [];
    }
}
