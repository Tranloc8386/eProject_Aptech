<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = \App\Models\User::all();
        foreach ($users as $user) {
            \App\Models\Order::create([
                'user_id' => $user->id,
                'shipping_info' => [
                    'name' => $user->name,
                    'address' => fake()->address(),
                    'phone' => '09' . rand(10000000, 99999999)
                ],
                'items' => [
                    ['product_id' => 1, 'name' => 'Váy Demo', 'price' => 500000, 'qty' => 1]
                ],
                'total_amount' => 500000,
                'payment_method' => 'COD',
                'status' => 'pending',
            ]);
        }
    }
}
