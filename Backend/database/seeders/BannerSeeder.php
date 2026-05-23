<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Banner;

class BannerSeeder extends Seeder
{
    public function run(): void
    {
        $banners = [
            [
                // Thời trang cao cấp — model váy dạ hội sang trọng
                'title'     => 'Thời Trang Đẳng Cấp — Maverick Dresses',
                'image'     => 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=600&fit=crop',
                'bg'        => '#1a1a1a',
                'order'     => 1,
                'is_active' => true,
            ],
            [
                // Sale mùa hè — túi mua sắm, màu sắc rực rỡ
                'title'     => 'Sale Hè 2025 — Giảm Đến 40%',
                'image'     => 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1920&h=600&fit=crop',
                'bg'        => '#b8860b',
                'order'     => 2,
                'is_active' => true,
            ],
            [
                // Thể thao — phụ nữ tập gym, trang phục thể thao
                'title'     => 'Bộ Sưu Tập Thể Thao — Năng Động Mỗi Ngày',
                'image'     => 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1920&h=600&fit=crop',
                'bg'        => '#1a1a1a',
                'order'     => 3,
                'is_active' => true,
            ],
            [
                // Công sở — thời trang văn phòng lịch sự
                'title'     => 'Phong Cách Công Sở — Lịch Lãm & Hiện Đại',
                'image'     => 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&h=600&fit=crop',
                'bg'        => '#f7f2e8',
                'order'     => 4,
                'is_active' => true,
            ],
            [
                // Cửa hàng thời trang — nội thất shop quần áo
                'title'     => 'Miễn Phí Vận Chuyển — Đơn Từ 500.000đ',
                'image'     => 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&h=600&fit=crop',
                'bg'        => '#2c2c2c',
                'order'     => 5,
                'is_active' => true,
            ],
        ];

        foreach ($banners as $banner) {
            Banner::create($banner);
        }
    }
}
