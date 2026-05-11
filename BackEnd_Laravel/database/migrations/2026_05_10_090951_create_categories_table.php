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
        Schema::create('categories', function (Blueprint $table) {
            $table->id(); // Mã định danh danh mục [cite: 6]
            $table->string('name')->unique(); // Tên danh mục (VD: Váy dạ hội) [cite: 6]
            $table->string('slug')->unique(); // Đường dẫn tĩnh thân thiện chuẩn SEO [cite: 6]
            $table->text('description')->nullable(); // Mô tả chi tiết [cite: 6]
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
