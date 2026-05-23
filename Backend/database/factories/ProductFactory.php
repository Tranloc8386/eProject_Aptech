<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'category_id' => \App\Models\Category::all()->random()->id,
            'name' => fake()->words(3, true),
            'material' => fake()->randomElement(['Lụa', 'Ren', 'Cotton', 'Voan']), // Chất liệu
            'image' => 'https://picsum.photos/640/480', // Sử dụng link ảnh ngẫu nhiên
            'price' => fake()->numberBetween(200000, 1500000),
            'stock_quantity' => fake()->numberBetween(10, 100),
            'is_featured' => fake()->boolean(20), // 20% là sản phẩm nổi bật
            'ratings' => fake()->randomFloat(1, 3, 5), // Điểm từ 3.0 đến 5.0
        ];
    }
}
