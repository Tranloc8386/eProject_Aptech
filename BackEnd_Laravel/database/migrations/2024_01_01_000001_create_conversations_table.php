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
        Schema::create('conversations', function (Blueprint $table) {
            $table->id(); // Mã định danh phòng chat [cite: 24]
            $table->foreignId('customer_id')->constrained('users'); // Khách hàng hỗ trợ [cite: 24]
            $table->foreignId('admin_id')->nullable()->constrained('users'); // Admin phụ trách [cite: 24]
            $table->boolean('admin_joined')->default(false); // Admin tham gia hay AI trực [cite: 24]
            $table->enum('status', ['open', 'closed', 'active'])->default('open');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('conversations');
    }
};
