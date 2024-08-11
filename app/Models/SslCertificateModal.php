<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SslCertificateModal extends Model
{
    use HasFactory;
     protected $table = 'ssl_certificates';

      protected $fillable = [
        'user_id',
        'name',
        'certificate',
        'is_active',
        "password",
        "user_type"
    ];

    public function user()
    {
        return $this->belongsTo(User::class,"user_id");
    }

}
