<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Customer;
use App\Models\Product;
use App\Models\Order;
use App\Models\OrderDetail;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        $customers = Customer::all();
        $products  = Product::all();

        if ($customers->isEmpty() || $products->isEmpty()) return;

        $statuses = ['pending', 'processing', 'shipped', 'delivered', 'delivered', 'delivered'];

        foreach ($customers as $customer) {
            // Mỗi khách tạo 2-3 đơn
            $orderCount = rand(2, 3);

            for ($i = 0; $i < $orderCount; $i++) {
                // Lấy ngẫu nhiên 1-3 sản phẩm cho đơn hàng này
                $pickedProducts = $products->random(rand(1, 3));
                $totalAmount    = 0;
                $items          = [];

                foreach ($pickedProducts as $product) {
                    $qty      = rand(1, 3);
                    $subtotal = $product->price * $qty;
                    $totalAmount += $subtotal;

                    $items[] = [
                        'product'  => $product,
                        'qty'      => $qty,
                        'subtotal' => $subtotal,
                    ];
                }

                $status = $statuses[array_rand($statuses)];

                // Tạo thời gian ngẫu nhiên trong 30 ngày gần nhất
                $createdAt = now()->subDays(rand(0, 30))->subHours(rand(0, 23));

                $order = Order::create([
                    'customer_id'      => $customer->id,
                    'shipping_name'    => $customer->name,
                    'shipping_phone'   => $customer->phone,
                    'shipping_address' => $customer->address,
                    'total_amount'     => $totalAmount,
                    'payment_method'   => rand(0, 1) ? 'COD' : 'banking',
                    'status'           => $status,
                    'created_at'       => $createdAt,
                    'updated_at'       => $createdAt,
                ]);

                // Tạo order_details cho đơn hàng này
                foreach ($items as $item) {
                    OrderDetail::create([
                        'order_id'      => $order->id,
                        'product_id'    => $item['product']->id,
                        'product_name'  => $item['product']->name,
                        'product_image' => $item['product']->image,
                        'price'         => $item['product']->price,
                        'quantity'      => $item['qty'],
                        'subtotal'      => $item['subtotal'],
                    ]);
                }
            }
        }
    }
}
