<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Cart extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'items', 'total_quantity', 'total_price', 'status'];

    // Ép kiểu JSON về Array để dễ thao tác code PHP
    protected $casts = [
        'items' => 'array',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
