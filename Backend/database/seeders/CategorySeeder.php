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
            ['name' => 'Áo sơ mi',      'description' => 'Áo sơ mi nam nữ các loại, phù hợp công sở và dạo phố'],
            ['name' => 'Váy',            'description' => 'Chân váy các kiểu dáng: midi, mini, maxi, xòe, bút chì'],
            ['name' => 'Váy liền thân', 'description' => 'Đầm liền thân đa dạng phong cách: dạo phố, dự tiệc, công sở'],
            ['name' => 'Áo thun P.T',   'description' => 'Áo thun thể thao chuyên dụng, thoáng mát, co giãn tốt'],
            ['name' => 'Quần short P.T','description' => 'Quần short thể thao năng động, thoải mái cho tập luyện'],
            ['name' => 'Quần dài P.T',  'description' => 'Quần dài thể thao: jogger, legging, track pants'],
            ['name' => 'Thắt lưng',     'description' => 'Thắt lưng da thật, da PU, vải canvas đa dạng mẫu mã'],
            ['name' => 'Cà vạt',        'description' => 'Cà vạt lụa, kẻ sọc, bow tie dành cho nam giới lịch lãm'],
            ['name' => 'Logo',           'description' => 'Sản phẩm in logo thương hiệu: áo, mũ, túi tote'],
            ['name' => 'Tất',            'description' => 'Tất vớ các loại: thể thao, cotton, lưới, no-show'],
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
