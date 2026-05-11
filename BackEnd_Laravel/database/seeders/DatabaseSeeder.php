<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
        UserSeeder::class,         // 1. Tạo User trước
        CategorySeeder::class,     // 2. Tạo đúng 5 danh mục (Váy Công Sở,...)
        ProductSeeder::class,      // 3. Tạo sản phẩm (Lấy ID từ 5 danh mục trên)
        ConversationSeeder::class, // 4. Tạo phòng chat
        MessageSeeder::class,      // 5. Tạo tin nhắn
        OrderSeeder::class,
        CartSeeder::class,
        BannerSeeder::class,
    ]);

    // Các factory nhỏ lẻ chạy cuối cùng
    \App\Models\Comment::factory(30)->create();
}
}
