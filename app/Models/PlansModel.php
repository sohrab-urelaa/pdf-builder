<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlansModel extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        "description",
        "number_of_document",
        "monthly_price",
        "yearly_price",
        "currency",
        "currency_symbol",
        "isDefault",
        "template_creation_limit",
        "template_submission_limit_per_template",
        "user_creation_limit",
        "can_upload_certificate",
        "can_config_email_template",
        "submission_count"
    ];
    protected $table = 'plans';


    public function company()
    {
        return $this->hasMany(CompanyModel::class);
    }
}
