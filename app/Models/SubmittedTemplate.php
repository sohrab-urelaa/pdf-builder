<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubmittedTemplate extends Model
{
    protected $fillable = ['submitted_user_email',"submitted_user_name","template_id","template_json","templated_pdf_link","owner_id"];
    use HasFactory;

    protected $table = 'submitted_template';

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }
    public function parent_template()
    {
        return $this->belongsTo(PdfTemplate::class, 'template_id');
    }
}
