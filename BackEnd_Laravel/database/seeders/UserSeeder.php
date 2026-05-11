<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Tạo 1 tài khoản Admin cố định để Lộc dễ đăng nhập test
        \App\Models\User::create([
            'name' => 'Lộc Admin',
            'email' => 'admin@maverick.com',
            'password' => bcrypt('admin123'),
            'role' => 'admin',
            'auth_provider' => 'local',
            'is_verified' => true,
        ]);

        // Tạo thêm 20 User ngẫu nhiên khác
        \App\Models\User::factory(20)->create();
    }
}
