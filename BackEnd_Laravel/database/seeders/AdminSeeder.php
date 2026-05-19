<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        // Tài khoản admin cố định
        \App\Models\Admin::create([
            'name'          => 'Lộc Admin',
            'email'         => 'admin@maverick.com',
            'password'      => bcrypt('admin123'),
            'role'          => 'admin',
            'auth_provider' => 'local',
            'is_verified'   => true,
        ]);

        // 20 admin ngẫu nhiên
        \App\Models\Admin::factory(20)->create();
    }
}
