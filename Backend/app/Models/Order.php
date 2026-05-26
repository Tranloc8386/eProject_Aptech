<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Order extends Model
{
    use HasFactory;
    protected $fillable = [
        'customer_id',
        'shipping_name',
        'shipping_phone',
        'shipping_address',
        'note',
        'total_amount',
        'payment_method',
        'payment_status',
        'vnp_txn_ref',
        'status',
    ];

    // 1 đơn hàng có nhiều dòng sản phẩm
    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class);
    }

    // 1 đơn hàng thuộc về 1 khách hàng
    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
