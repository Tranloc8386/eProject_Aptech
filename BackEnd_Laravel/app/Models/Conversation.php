<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Conversation extends Model
{
    // app/Models/Conversation.php
    use HasFactory;
    protected $fillable = ['customer_id', 'admin_id', 'admin_joined', 'status'];
    // Một cuộc hội thoại có nhiều tin nhắn
    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    // Một hội thoại thuộc về một khách hàng (User)
    public function customer()
    {
        return $this->belongsTo(User::class, 'customer_id');
    }
}
