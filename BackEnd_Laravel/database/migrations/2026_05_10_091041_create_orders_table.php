<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id(); // Mã đơn hàng [cite: 18]
            $table->foreignId('user_id')->constrained('users'); // Người mua [cite: 18]
            $table->json('shipping_info'); // fullName, phone, address [cite: 18]
            $table->json('items'); // Dữ liệu sản phẩm tại thời điểm mua (giữ nguyên lịch sử) [cite: 18]
            $table->decimal('total_amount', 15, 2); // Tổng tiền cuối cùng [cite: 18]
            $table->string('payment_method')->default('COD'); // Phương thức thanh toán [cite: 18]
            $table->string('status')->default('pending'); // Trạng thái giao hàng [cite: 18]
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
