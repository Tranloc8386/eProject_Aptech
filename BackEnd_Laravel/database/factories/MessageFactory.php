<?php

namespace Database\Factories;

use App\Models\Message;
use App\Models\Conversation;
use Illuminate\Database\Eloquent\Factories\Factory;

class MessageFactory extends Factory
{
    protected $model = Message::class;

    public function definition(): array
    {
        return [
            // Lấy ngẫu nhiên ID từ bảng conversations đã seed trước đó
            'conversation_id' => Conversation::all()->random()->id,
            'type' => 'text',
            'sender' => $this->faker->randomElement(['user', 'admin','AI']),
            'message' => $this->faker->sentence(12),
        ];
    }
}
