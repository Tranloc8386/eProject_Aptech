<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Message extends Model
{
    use HasFactory;
    protected $fillable = ['conversation_id', 'type', 'sender', 'message'];

    // Một tin nhắn phải thuộc về một cuộc hội thoại
    public function conversation()
    {
        return $this->belongsTo(Conversation::class);
    }
}
