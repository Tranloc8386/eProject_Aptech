<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Product extends Model
{
    use HasFactory;
    protected $fillable = ['category_id', 'name', 'image','description', 'material', 'price', 'stock_quantity', 'is_featured', 'ratings', 'sizes'   ];
    protected $appends = ['image_url'];

    // Một sản phẩm thuộc về một danh mục
    public function category() {
        return $this->belongsTo(Category::class);
    }

    protected function imageUrl(): Attribute
    {
        return Attribute::make(
            get: function () {
                if (!$this->image) {
                    return asset('images/no-image.png'); // Ảnh mặc định nếu không có ảnh
                }

                // Nếu ảnh là link từ internet (Factory)
                if (filter_var($this->image, FILTER_VALIDATE_URL)) {
                    return $this->image;
                }

                // Nếu là ảnh upload trong máy (lưu ở public/products/)
                return asset('products/' . $this->image);
            },
        );
    }
}
