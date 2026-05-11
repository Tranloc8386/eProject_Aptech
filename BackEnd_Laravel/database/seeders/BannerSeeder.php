<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BannerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 3; $i++) {
            \App\Models\Banner::create([
                'title' => 'Khuyến mãi hè',
                'image' => 'https://picsum.photos/1920/600', // Phải là 'image', không phải 'img'
                'bg' => '#ffffff',
                'order' => 1,
                'is_active' => true,
            ]);
        }
    }
}
