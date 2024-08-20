<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HeaderItem extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'subModules', 'link', "public", "has_dynamic_html", "dynamic_html", 'nav_type'];
    protected $table = 'header_items';

    public function subOptions()
    {
        return $this->hasMany(HeaderSubItem::class, "nav_item_id");
    }
}
