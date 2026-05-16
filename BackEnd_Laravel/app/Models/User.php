<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

   protected $fillable = ['name', 'email', 'password', 'role', 'auth_provider', 'is_verified', 'avatar'];

    protected $hidden = ['password', 'remember_token'];

    // Một User có thể có một giỏ hàng
    public function cart()
    {
        return $this->hasOne(Cart::class);
    }

    // Một User có thể có nhiều đơn hàng
    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
