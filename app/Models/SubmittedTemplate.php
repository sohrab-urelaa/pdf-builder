<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubmittedTemplate extends Model
{
    protected $fillable = ['submitted_user_email',"user_id","template_id","template_json","templated_pdf_link"];
    use HasFactory;

    protected $table = 'submitted_template';

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
