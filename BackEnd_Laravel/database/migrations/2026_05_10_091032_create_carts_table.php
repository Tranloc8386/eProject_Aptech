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
        Schema::create('carts', function (Blueprint $table) {
            $table->id(); // Mã định danh giỏ hàng [cite: 15]
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // Người sở hữu [cite: 15]
            $table->json('items'); // Mảng chứa product_id, price, quantity, size, color [cite: 15]
            $table->integer('total_quantity')->default(0); // Tổng số lượng [cite: 15]
            $table->decimal('total_price', 15, 2)->default(0); // Tổng tiền tạm tính [cite: 15]
            $table->enum('status', ['active', 'ordered'])->default('active'); // Trạng thái [cite: 15]
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('carts');
    }
};
