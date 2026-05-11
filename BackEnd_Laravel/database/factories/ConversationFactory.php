<?php

namespace Database\Factories;

use App\Models\Conversation;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Conversation>
 */
class ConversationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
        'customer_id' => \App\Models\User::all()->random()->id,
        'admin_id' => \App\Models\User::all()->random()->id,
        'admin_joined' => fake()->boolean(),
        // Chỗ này cực kỳ quan trọng: phải khớp với 'open', 'closed' trong migration
        'status' => fake()->randomElement(['open', 'closed']),
    ];
    }
}
