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
                'title'     => 'Bộ Sưu Tập Mùa Hè 2025',
                'image'     => 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&h=600&fit=crop',
                'bg'        => '#fdf2f8',
                'order'     => 1,
                'is_active' => true,
            ],
            [
                'title'     => 'Váy Cưới Cao Cấp — Maverick Bridal',
                'image'     => 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1920&h=600&fit=crop',
                'bg'        => '#f8f4f0',
                'order'     => 2,
                'is_active' => true,
            ],
            [
                'title'     => 'Dạ Hội Sang Trọng — New Arrivals',
                'image'     => 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=1920&h=600&fit=crop',
                'bg'        => '#1a1a2e',
                'order'     => 3,
                'is_active' => true,
            ],
        ];

        foreach ($banners as $banner) {
            Banner::create($banner);
        }
    }
}
