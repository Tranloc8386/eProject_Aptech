<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    protected $fillable = [
        'order_id',
        'product_id',
        'product_name',
        'product_image',
        'price',
        'quantity',
        'subtotal',
    ];

    // Mỗi dòng detail thuộc về 1 đơn hàng
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    // Liên kết đến product (nullable — product có thể bị xóa)
    public function product()
    {
        return $this->belongsTo(Product::class)->withDefault();
    }
}
