<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PdfTemplate extends Model
{
    protected $fillable = ['template_json',"user_id","templated_pdf_link","title"];
    use HasFactory;

    protected $table = 'pdf_template';

    public function submittedTemplate()
    {
        return $this->hasMany(SubmittedTemplate::class);
    }
    public function owner()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
