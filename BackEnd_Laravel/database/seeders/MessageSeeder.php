<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Conversation;
use App\Models\Message;
use App\Models\User;

class MessageSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Lấy user và admin để làm demo
        $customer = \App\Models\User::where('role', 'user')->first();
        $admin = \App\Models\User::where('role', 'admin')->first();

        if ($customer && $admin) {
            // 2. Tạo cuộc hội thoại (Dùng customer_id và admin_id theo đúng ảnh DB của bạn)
            $conversation = \App\Models\Conversation::create([
                'customer_id' => $customer->id,
                'admin_id'    => $admin->id,
                'status'      => 'active',
            ]);

            // 3. Tạo tin nhắn mẫu cho cuộc hội thoại này
            \App\Models\Message::create([
                'conversation_id' => $conversation->id,
                'type'            => 'text',
                'sender'          => 'user',
                'message'         => 'Chào Admin, mình cần tư vấn về váy Maverick Dresses!',
            ]);

            \App\Models\Message::create([
                'conversation_id' => $conversation->id,
                'type'            => 'text',
                'sender'          => 'admin',
                'message'         => 'Chào bạn, Shop có thể giúp gì cho bạn ạ?',
            ]);
        }
    }
}
