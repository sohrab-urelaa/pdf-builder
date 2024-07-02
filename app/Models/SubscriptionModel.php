<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubscriptionModel extends Model
{
    use HasFactory;
       protected $table = 'subscriptions';

      protected $fillable = [
        'user_id',
        'plan_id',
        'start_date',
        'end_date',
        'is_active',
        'payment_method',
        'payment_status',
        'amount',
        'billing_cycle',
        'company_id',
        'invoice_error',
        'invoice_id',
        'payment_message',
        "currency"
    ];

    public function user()
    {
        return $this->belongsTo(User::class,"user_id");
    }

    public function plan()
    {
        return $this->belongsTo(PlansModel::class,"plan_id");
    }
    public function company()
    {
        return $this->belongsTo(CompanyModel::class,"company_id");
    }
}
