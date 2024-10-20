<?php

namespace App\Mail;

use App\Models\SmtpSetting;
use Exception;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use PHPMailer\PHPMailer\PHPMailer;

class CustomMailTemplate implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $mailData;
    public function __construct($mailData)
    {
        $this->mailData = $mailData;
    }
    function setMailConfig(SmtpSetting $smtpSetting)
    {
        config([
            'mail.mailers.smtp.transport' => $smtpSetting->mail_driver,
            'mail.mailers.smtp.host' => $smtpSetting->mail_host,
            'mail.mailers.smtp.port' => $smtpSetting->mail_port,
            'mail.mailers.smtp.username' => $smtpSetting->mail_username,
            'mail.mailers.smtp.password' => $smtpSetting->mail_password,
            'mail.mailers.smtp.encryption' => $smtpSetting->mail_encryption,
            'mail.from.address' => $smtpSetting->mail_from_address,
            'mail.from.name' => $smtpSetting->mail_from_name,

        ]);
        Log::info('Active Mail Config:', [
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
    static function send_via_php_mailer($data)
    {
        $mail = new PHPMailer(true);

        try {
            //Server settings
            $mail->isSMTP();
            $mail->Host = Config::get('mail.mailers.smtp.host');
            $mail->SMTPAuth   = true;
            $mail->Username   = Config::get('mail.mailers.smtp.username');
            $mail->Password   = Config::get('mail.mailers.smtp.password');
            $mail->SMTPSecure = Config::get('mail.mailers.smtp.encryption');
            $mail->Port = Config::get('mail.mailers.smtp.port');
            // Set From address
            $mail->setFrom(Config::get('mail.from.address'), Config::get('mail.from.name'));

            // Check if the email field is an array (multiple recipients)
            if (is_array($data["email"])) {
                foreach ($data["email"] as $recipientEmail) {
                    $mail->addAddress($recipientEmail);
                }
            } else {
                $mail->addAddress($data["email"]);
            }

            // Content
            $mail->isHTML(true);                                        // Set email format to HTML
            $mail->Subject = $data["subject"];
            $mail->Body    = $data['body'];
            // Send email
            $mail->send();
            Log::info('Mail has been sent successfully to multiple recipients.');
        } catch (Exception $e) {
            Log::error("Message could not be sent. Mailer Error: {$mail->ErrorInfo}");
        }
    }
    public static function send_email($data)
    {
        // $active_smtp_config = SmtpSetting::where("status", "active")->first();
        // if ($active_smtp_config) {
        //     Artisan::call('config:clear');
        //     self::setMailConfig($active_smtp_config);
        // }
        // self::send_via_php_mailer($data);
        // Mail::mailer('smtp')->to($data["email"])->send(new CustomMailTemplate($data));
        dispatch(new CustomMailTemplate(($data)));
    }
    public function handle()
    {
        $active_smtp_config = SmtpSetting::where("status", "active")->first();
        if ($active_smtp_config) {
            Artisan::call('config:clear');
            $this->setMailConfig($active_smtp_config);
        }
        $this->send_via_php_mailer($this->mailData);
    }
    // public function build()
    // {
    //     Log::info('Build Method is calling');
    //     return $this->view('mail.custom-mail')
    //         ->subject($this->mailData["subject"])
    //         ->with(['body' => $this->mailData["body"]]);
    // }

    public function attachments(): array
    {
        return [];
    }
}
