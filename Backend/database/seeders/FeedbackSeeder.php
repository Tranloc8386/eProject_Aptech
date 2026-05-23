<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Customer;
use App\Models\Feedback;

class FeedbackSeeder extends Seeder
{
    public function run(): void
    {
        $customers = Customer::take(5)->get();

        $messages = [
            [
                'message'     => 'Shop có váy công sở màu navy size M không ạ? Mình muốn mua cho buổi phỏng vấn tuần sau nhưng không tìm thấy trên web.',
                'status'      => 'pending',
                'admin_reply' => null,
                'replied_at'  => null,
            ],
            [
                'message'     => 'Mình đặt đơn hàng được 5 ngày rồi mà chưa thấy ship. Cho mình hỏi bao giờ hàng về vậy shop?',
                'status'      => 'replied',
                'admin_reply' => 'Chào bạn! Shop xin lỗi vì sự chậm trễ. Đơn hàng của bạn đang trên đường vận chuyển và dự kiến sẽ đến trong 1-2 ngày tới. Cảm ơn bạn đã kiên nhẫn!',
                'replied_at'  => now()->subDays(1),
            ],
            [
                'message'     => 'Mình mua váy dự tiệc tuần trước, chất vải rất đẹp và đường may chắc chắn. Shop giao hàng nhanh, đóng gói cẩn thận. Sẽ ủng hộ shop dài dài!',
                'status'      => 'replied',
                'admin_reply' => 'Cảm ơn bạn rất nhiều! Shop rất vui khi bạn hài lòng với sản phẩm. Hẹn gặp lại bạn ở những lần mua sắm tiếp theo nhé!',
                'replied_at'  => now()->subDays(3),
            ],
            [
                'message'     => 'Shop có nhận đổi trả không ạ? Mình mua váy size L nhưng hơi rộng, muốn đổi sang size M.',
                'status'      => 'pending',
                'admin_reply' => null,
                'replied_at'  => null,
            ],
            [
                'message'     => 'Cho mình hỏi váy chất liệu gì vậy? Mình bị dị ứng với vải tổng hợp nên cần biết trước khi đặt.',
                'status'      => 'pending',
                'admin_reply' => null,
                'replied_at'  => null,
            ],
        ];

        foreach ($customers as $i => $customer) {
            if (!isset($messages[$i])) break;
            Feedback::create([
                'name'        => $customer->name,
                'email'       => $customer->email,
                'phone'       => $customer->phone,
                'message'     => $messages[$i]['message'],
                'status'      => $messages[$i]['status'],
                'admin_reply' => $messages[$i]['admin_reply'],
                'replied_at'  => $messages[$i]['replied_at'],
            ]);
        }
    }
}
