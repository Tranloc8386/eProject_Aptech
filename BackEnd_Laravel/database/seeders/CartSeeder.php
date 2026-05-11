<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CartSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = \App\Models\User::all();
        foreach ($users as $user) {
            \App\Models\Cart::create([
                'user_id' => $user->id,
                'items' => json_encode([]), // Giỏ hàng mặc định trống hoặc demo sp
                'total_quantity' => 0,
                'total_price' => 0,
                'status' => 'active',
            ]);
        }
    }
}
