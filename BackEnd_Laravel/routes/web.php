<?php

use Illuminate\Support\Facades\Route;
// Import các Controller đầy đủ
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\CommentController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// ==========================================
// 1. Quản lý Thành viên (Users)
// ==========================================
Route::get('users/index', [UserController::class, 'index'])->name('users.index');
Route::resource('users', UserController::class)->except(['index']);


// ==========================================
// 2. Quản lý Sản phẩm (Products) - ĐÃ SỬA LỖI UPLOAD FILE
// ==========================================
// Xem danh sách và sản phẩm nổi bật
Route::get('products/index', [ProductController::class, 'index'])->name('products.index');
Route::get('products/featured', [ProductController::class, 'featured'])->name('products.featured');
Route::get('products/create', [ProductController::class, 'create'])->name('products.create');
Route::get('products/{product}', [ProductController::class, 'show'])->name('products.show');
Route::get('products/{product}/edit', [ProductController::class, 'edit'])->name('products.edit');
Route::delete('products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');

// Bắt buộc dùng POST cho cả Thêm và Cập nhật khi có upload hình ảnh
Route::post('products/store', [ProductController::class, 'store'])->name('products.store');
Route::post('products/update/{product}', [ProductController::class, 'update'])->name('products.update');


// ==========================================
// 3. Quản lý Danh mục (Categories)
// ==========================================
Route::get('categories/index', [CategoryController::class, 'index'])->name('categories.index');
Route::get('categories/create', [CategoryController::class, 'create'])->name('categories.create');
Route::get('categories/{category}', [CategoryController::class, 'show'])->name('categories.show');
Route::get('categories/{category}/edit', [CategoryController::class, 'edit'])->name('categories.edit');
Route::delete('categories/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');

Route::resource('categories', CategoryController::class);

// ==========================================
// 4. Quản lý Đơn hàng (Orders)
// ==========================================
Route::get('orders/index', [OrderController::class, 'index'])->name('orders.index');
Route::resource('orders', OrderController::class)->except(['index', 'create', 'store']);


// ==========================================
// 5. Quản lý Banner (Banners) - ĐÃ SỬA LỖI UPLOAD FILE
// ==========================================
Route::get('banners/index', [BannerController::class, 'index'])->name('banners.index');
Route::get('banners/create', [BannerController::class, 'create'])->name('banners.create');
Route::get('banners/{banner}', [BannerController::class, 'show'])->name('banners.show');
Route::get('banners/{banner}/edit', [BannerController::class, 'edit'])->name('banners.edit');
Route::delete('banners/{banner}', [BannerController::class, 'destroy'])->name('banners.destroy');

Route::resource('admin/banners', BannerController::class)->names('banners');


// ==========================================
// 6. Quản lý Bình luận (Comments)
// ==========================================
Route::get('comments/index', [CommentController::class, 'index'])->name('comments.index');
Route::delete('comments/{comment}', [CommentController::class, 'destroy'])->name('comments.destroy');
