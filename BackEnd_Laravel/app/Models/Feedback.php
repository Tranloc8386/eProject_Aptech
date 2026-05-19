<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Feedback extends Model
{
    use HasFactory;

    protected $table = 'feedbacks';

    protected $fillable = ['name', 'email', 'phone', 'message', 'admin_reply', 'status', 'replied_at'];

    protected $casts = [
        'replied_at' => 'datetime',
    ];
}
