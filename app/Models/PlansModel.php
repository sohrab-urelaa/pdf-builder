<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlansModel extends Model
{
    use HasFactory;
    protected $fillable = ['title',"description","number_of_document","monthly_price","yearly_price","currency","currency_symbol","isDefault"];
    protected $table = 'plans';


     public function company()
        {
            return $this->hasMany(CompanyModel::class);
        }
}
