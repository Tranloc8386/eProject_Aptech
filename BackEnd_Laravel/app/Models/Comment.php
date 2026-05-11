<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Comment extends Model
{
    use HasFactory;
    protected $fillable = ['product_id', 'user_name', 'content', 'rating'];

    public function product() {
        return $this->belongsTo(Product::class);
    }
}
