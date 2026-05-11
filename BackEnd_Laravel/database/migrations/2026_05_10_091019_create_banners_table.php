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
        Schema::create('banners', function (Blueprint $table) {
            $table->id(); // Mã định danh banner [cite: 12]
            $table->string('title'); // Tiêu đề chiến dịch [cite: 12]
            $table->string('image'); // Đường dẫn URL hình ảnh [cite: 12]
            $table->string('bg')->nullable(); // Màu nền kết hợp [cite: 12]
            $table->integer('order')->default(0); // Thứ tự hiển thị [cite: 12]
            $table->boolean('is_active')->default(true); // Trạng thái hiển thị [cite: 12]
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('banners');
    }
};
