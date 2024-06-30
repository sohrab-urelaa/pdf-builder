<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FooterSubNavModel extends Model
{
    use HasFactory;
    protected $table = 'footer_sub_navs';

    protected $fillable = ['title', 'link', 'footer_id'];

    public function footer()
    {
        return $this->belongsTo(FooterModel::class, 'footer_id');
    }

}
