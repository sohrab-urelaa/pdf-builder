<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HeaderSubItem extends Model
{
    use HasFactory;
    protected $fillable = ['nav_item_id', 'image', 'title', 'description', 'link', 'has_dynamic_html', 'dynamic_html'];
    protected $table = 'header_sub_options';
    public function navItem()
    {
        return $this->belongsTo(HeaderItem::class, "footer_id");
    }
}
