<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FooterModel extends Model
{
    use HasFactory;

    protected $table = 'footer_parent';
    protected $fillable = ['title'];

    public function subNavs()
    {
        return $this->hasMany(FooterSubNavModel::class,"footer_id");
    }
}
