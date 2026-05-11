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
        Schema::create('products', function (Blueprint $table) {
            $table->id(); // Mã định danh sản phẩm [cite: 9]
            $table->foreignId('category_id')->constrained('categories')->onDelete('cascade'); // Trỏ tới danh mục [cite: 9]
            $table->string('name'); // Tên sản phẩm thời trang [cite: 9]
            $table->string('image')->default('default.jpg');
            $table->string('material')->nullable(); // Chất liệu vải (Thay thế cho tác giả)
            $table->decimal('price', 15, 2)->default(0); // Giá bán [cite: 9]
            $table->integer('stock_quantity')->default(0); // Số lượng tồn kho [cite: 9]
            $table->boolean('is_featured')->default(false); // Đánh dấu sản phẩm nổi bật [cite: 9]
            $table->float('ratings')->default(0); // Điểm đánh giá trung bình [cite: 9]

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
        $table->dropColumn('image');
    });
    }
};
