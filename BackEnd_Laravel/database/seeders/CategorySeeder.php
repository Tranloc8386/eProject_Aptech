<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Váy Công Sở',  'description' => 'Váy thanh lịch, phù hợp môi trường văn phòng và công sở'],
            ['name' => 'Váy Dự Tiệc',  'description' => 'Váy sang trọng, quyến rũ cho các buổi tiệc và sự kiện đặc biệt'],
            ['name' => 'Váy Mùa Hè',   'description' => 'Váy nhẹ nhàng, thoáng mát, năng động cho mùa hè'],
            ['name' => 'Váy Cưới',     'description' => 'Váy cưới cao cấp, tinh tế dành cho ngày trọng đại'],
            ['name' => 'Phụ Kiện',     'description' => 'Túi xách, thắt lưng, khăn và các phụ kiện thời trang nữ'],
        ];

        foreach ($categories as $item) {
            Category::create([
                'name'        => $item['name'],
                'slug'        => Str::slug($item['name']),
                'description' => $item['description'],
            ]);
        }
    }
}
