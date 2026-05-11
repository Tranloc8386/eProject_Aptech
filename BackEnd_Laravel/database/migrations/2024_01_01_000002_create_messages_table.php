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
        Schema::create('messages', function (Blueprint $table) {
            $table->id(); // Mã định danh tin nhắn [cite: 27]
            $table->foreignId('conversation_id')->constrained('conversations')->onDelete('cascade'); // Trỏ tới hội thoại [cite: 27]
            $table->enum('type', ['text', 'image']); // Định dạng nội dung [cite: 27]
           $table->enum('sender', ['user', 'admin', 'AI'])->default('user');; // Nguồn gửi (Khách, Admin, AI) [cite: 27]
            $table->text('message'); // Nội dung tin nhắn [cite: 27]
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
