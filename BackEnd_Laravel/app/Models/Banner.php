<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Banner extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'image', 'bg', 'order', 'is_active'];
    protected function imageUrl(): Attribute
    {
        return Attribute::make(
            get: function () {
                if (!$this->image) return asset('images/default-banner.jpg');

                return filter_var($this->image, FILTER_VALIDATE_URL)
                    ? $this->image
                    : asset('storage/' . $this->image);
            },
        );
    }
}
