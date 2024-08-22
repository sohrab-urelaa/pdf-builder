<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class CustomMailTemplate extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $mailData;
    public function __construct($mailData)
    {
        $this->mailData = $mailData;
    }

    public static function send_email($data)
    {
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
