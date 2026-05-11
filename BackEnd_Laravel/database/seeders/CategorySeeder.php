<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = ['Váy Công Sở', 'Váy Dự Tiệc', 'Váy Mùa Hè', 'Váy Cưới', 'Phụ Kiện'];
        foreach ($categories as $item) {
            Category::create([
                'name' => $item,
                'slug' => Str::slug($item),
            ]);
        }
    }
}
