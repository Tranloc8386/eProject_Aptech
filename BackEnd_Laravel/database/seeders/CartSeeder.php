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
        $customers = \App\Models\Customer::all();
        foreach ($customers as $customer) {
            \App\Models\Cart::create([
                'customer_id'    => $customer->id,
                'items'          => json_encode([]),
                'total_quantity' => 0,
                'total_price'    => 0,
                'status'         => 'active',
            ]);
        }
    }
}
