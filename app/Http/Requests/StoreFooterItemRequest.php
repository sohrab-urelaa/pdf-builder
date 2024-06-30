<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFooterItemRequest extends FormRequest
{
     public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'title' => 'required|string|max:255',
            'footer_id' => 'nullable|exists:footer_parent,id',
            'subNavs' => 'required|array',
            'subNavs.*.title' => 'required|string|max:255',
            'subNavs.*.link' => 'required|url',
        ];
    }
}
