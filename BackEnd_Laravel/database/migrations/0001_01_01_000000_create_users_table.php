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
        Schema::create('users', function (Blueprint $table) {
            $table->id(); // Mã định danh hệ thống [cite: 3]
            $table->string('name')->default('Người dùng'); // Tên hiển thị [cite: 3]
            $table->string('email')->unique(); // Email đăng nhập [cite: 3]
            $table->string('password'); // Mật khẩu băm [cite: 3]
            $table->enum('role', ['user', 'admin'])->default('user'); // Phân quyền [cite: 3]
            $table->enum('auth_provider', ['local', 'google', 'facebook'])->default('local'); // Hỗ trợ OAuth2 [cite: 3]
            $table->boolean('is_verified')->default(false); // Trạng thái xác minh [cite: 3]
            $table->rememberToken();
            $table->timestamps();
            $table->string('avatar')->nullable();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
