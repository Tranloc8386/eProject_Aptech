<?php

namespace Database\Factories;

use App\Models\Comment;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Comment>
 */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'product_id' => \App\Models\Product::all()->random()->id,
            'user_name'  => fake()->name(), // Khớp với cột user_name trong ảnh DB
            'content'    => 'Sản phẩm váy rất đẹp, chất liệu ren rất thích!',
            'rating'     => rand(4, 5),
        ];
    }
}
