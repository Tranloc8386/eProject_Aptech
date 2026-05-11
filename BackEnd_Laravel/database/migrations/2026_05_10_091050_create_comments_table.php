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
        Schema::create('comments', function (Blueprint $table) {
            $table->id(); // Mã định danh bình luận [cite: 21]
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade'); // Trỏ tới sản phẩm [cite: 21]
            $table->string('user_name'); // Tên người đánh giá [cite: 21]
            $table->text('content'); // Nội dung bình luận [cite: 21]
            $table->integer('rating')->default(5); // Số sao đánh giá (1-5) [cite: 21]
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comments');
    }
};
