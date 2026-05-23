<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Customer extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'address',
        'avatar',
        'is_verified',
    ];

    protected $hidden = ['password', 'remember_token'];

    // 1 khách hàng có nhiều đơn hàng
    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    // 1 khách hàng có 1 giỏ hàng
    public function cart()
    {
        return $this->hasOne(Cart::class);
    }
}
