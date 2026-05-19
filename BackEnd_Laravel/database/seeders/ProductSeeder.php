<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $cong_so  = Category::where('name', 'Váy Công Sở')->first()->id;
        $du_tiec  = Category::where('name', 'Váy Dự Tiệc')->first()->id;
        $mua_he   = Category::where('name', 'Váy Mùa Hè')->first()->id;
        $cuoi     = Category::where('name', 'Váy Cưới')->first()->id;
        $phu_kien = Category::where('name', 'Phụ Kiện')->first()->id;

        $products = [
            // Váy Công Sở
            [
                'category_id'    => $cong_so,
                'name'           => 'Váy Bút Chì Ôm Dáng Công Sở',
                'material'       => 'Vải Tweed',
                'price'          => 450000,
                'stock_quantity' => 35,
                'is_featured'    => true,
                'ratings'        => 4.8,
                'image'          => 'https://images.unsplash.com/photo-1594938298603-c8148c4b4e2b?w=640&h=800&fit=crop',
            ],
            [
                'category_id'    => $cong_so,
                'name'           => 'Váy Midi Chiffon Tay Loe',
                'material'       => 'Vải Chiffon',
                'price'          => 520000,
                'stock_quantity' => 28,
                'is_featured'    => false,
                'ratings'        => 4.6,
                'image'          => 'https://images.unsplash.com/photo-1551803091-e20379c086e9?w=640&h=800&fit=crop',
            ],

            // Váy Dự Tiệc
            [
                'category_id'    => $du_tiec,
                'name'           => 'Váy Đầm Ren Đen Dự Tiệc',
                'material'       => 'Vải Ren',
                'price'          => 890000,
                'stock_quantity' => 18,
                'is_featured'    => true,
                'ratings'        => 4.9,
                'image'          => 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=640&h=800&fit=crop',
            ],
            [
                'category_id'    => $du_tiec,
                'name'           => 'Váy Sequin Lấp Lánh Dạ Hội',
                'material'       => 'Vải Sequin',
                'price'          => 1500000,
                'stock_quantity' => 10,
                'is_featured'    => true,
                'ratings'        => 5.0,
                'image'          => 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=640&h=800&fit=crop',
            ],

            // Váy Mùa Hè
            [
                'category_id'    => $mua_he,
                'name'           => 'Váy Hoa Nhí Tay Phồng Mùa Hè',
                'material'       => 'Vải Cotton',
                'price'          => 320000,
                'stock_quantity' => 60,
                'is_featured'    => true,
                'ratings'        => 4.6,
                'image'          => 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=640&h=800&fit=crop',
            ],
            [
                'category_id'    => $mua_he,
                'name'           => 'Váy Boho Dài Thêu Hoa',
                'material'       => 'Vải Voan',
                'price'          => 420000,
                'stock_quantity' => 45,
                'is_featured'    => false,
                'ratings'        => 4.5,
                'image'          => 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=640&h=800&fit=crop',
            ],

            // Váy Cưới
            [
                'category_id'    => $cuoi,
                'name'           => 'Váy Cưới Đuôi Cá Ren Trắng',
                'material'       => 'Vải Ren + Satin',
                'price'          => 5500000,
                'stock_quantity' => 5,
                'is_featured'    => true,
                'ratings'        => 5.0,
                'image'          => 'https://images.unsplash.com/photo-1519657337289-077653f724ed?w=640&h=800&fit=crop',
            ],
            [
                'category_id'    => $cuoi,
                'name'           => 'Váy Cưới Xòe Bồng Công Chúa',
                'material'       => 'Vải Tulle',
                'price'          => 6800000,
                'stock_quantity' => 4,
                'is_featured'    => true,
                'ratings'        => 4.9,
                'image'          => 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=640&h=800&fit=crop',
            ],

            // Phụ Kiện
            [
                'category_id'    => $phu_kien,
                'name'           => 'Túi Xách Tay Da PU Cao Cấp',
                'material'       => 'Da PU',
                'price'          => 350000,
                'stock_quantity' => 30,
                'is_featured'    => true,
                'ratings'        => 4.6,
                'image'          => 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=640&h=800&fit=crop',
            ],
            [
                'category_id'    => $phu_kien,
                'name'           => 'Khăn Lụa Họa Tiết Hoa',
                'material'       => 'Lụa',
                'price'          => 180000,
                'stock_quantity' => 55,
                'is_featured'    => false,
                'ratings'        => 4.3,
                'image'          => 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=640&h=800&fit=crop',
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
