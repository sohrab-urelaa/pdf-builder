<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanyModel extends Model
{
    use HasFactory;
    protected $fillable = ['companyName',"description","planId","ownerId"];
    protected $table = 'company';



  public function plan()
    {
        return $this->belongsTo(PlansModel::class, 'planId');
    }

  public function owner()
    {
        return $this->belongsTo(User::class, 'ownerId');
    }




}
