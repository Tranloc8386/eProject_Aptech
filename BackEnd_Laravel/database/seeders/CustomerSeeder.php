<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\Customer;

class CustomerSeeder extends Seeder
{
    public function run(): void
    {
        $customers = [
            ['name' => 'Nguyễn Thị Lan',   'email' => 'lan@gmail.com',   'phone' => '0901111111', 'address' => '12 Lê Lợi, Q1, TP.HCM'],
            ['name' => 'Trần Thị Mai',      'email' => 'mai@gmail.com',   'phone' => '0902222222', 'address' => '45 Hai Bà Trưng, Q3, TP.HCM'],
            ['name' => 'Phạm Thị Hoa',      'email' => 'hoa@gmail.com',   'phone' => '0903333333', 'address' => '78 Nguyễn Huệ, Q1, TP.HCM'],
            ['name' => 'Lê Thị Thu',        'email' => 'thu@gmail.com',   'phone' => '0904444444', 'address' => '23 Đinh Tiên Hoàng, Bình Thạnh, TP.HCM'],
            ['name' => 'Võ Thị Hương',      'email' => 'huong@gmail.com', 'phone' => '0905555555', 'address' => '99 Cách Mạng Tháng 8, Q10, TP.HCM'],
            ['name' => 'Đặng Thị Linh',     'email' => 'linh@gmail.com',  'phone' => '0906666666', 'address' => '56 Lý Thường Kiệt, Q11, TP.HCM'],
            ['name' => 'Hoàng Thị Ngọc',    'email' => 'ngoc@gmail.com',  'phone' => '0907777777', 'address' => '34 Trần Hưng Đạo, Q5, TP.HCM'],
            ['name' => 'Bùi Thị Tuyết',     'email' => 'tuyet@gmail.com', 'phone' => '0908888888', 'address' => '67 Nguyễn Trãi, Q5, TP.HCM'],
        ];

        foreach ($customers as $data) {
            Customer::create([
                'name'        => $data['name'],
                'email'       => $data['email'],
                'password'    => Hash::make('password123'),
                'phone'       => $data['phone'],
                'address'     => $data['address'],
                'is_verified' => true,
            ]);
        }
    }
}
