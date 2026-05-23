<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\OrderDetailController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\AuthController;

Route::get('dashboard', [DashboardController::class, 'index']);
Route::get('search', [SearchController::class, 'search']);

Route::apiResource('products', ProductController::class);
Route::apiResource('customers', CustomerController::class);
Route::apiResource('admins', AdminController::class);
Route::apiResource('categories', CategoryController::class);
Route::apiResource('banners', BannerController::class);

// Feedbacks (liên hệ từ khách hàng)
Route::apiResource('feedbacks', FeedbackController::class)->only(['index', 'show', 'store', 'destroy']);
Route::post('feedbacks/{id}/reply', [FeedbackController::class, 'reply']);

// Orders: GET /api/orders/{order}/details — lấy chi tiết theo đơn hàng (nested route)
Route::apiResource('orders', OrderController::class);
Route::get('orders/{order}/details', [OrderDetailController::class, 'index']);
Route::post('orders/{order}/details', [OrderDetailController::class, 'store']);

// OrderDetails riêng lẻ: sửa/xóa từng dòng
Route::apiResource('order-details', OrderDetailController::class)
    ->only(['show', 'update', 'destroy']);

// Cart (dành cho client page)
Route::get('cart/{customerId}', [CartController::class, 'show']);
Route::post('cart/{customerId}/items', [CartController::class, 'addItem']);
Route::put('cart/{customerId}/items/{productId}', [CartController::class, 'updateItem']);
Route::delete('cart/{customerId}/items/{productId}', [CartController::class, 'removeItem']);
Route::delete('cart/{customerId}', [CartController::class, 'clear']);

Route::post('/vnpay-payment', [CheckoutController::class, 'createPayment']);
Route::get('/vnpay-return', [CheckoutController::class, 'vnpayReturn']);

// Auth
Route::post('admins/login',        [AdminController::class, 'login']);
Route::post('admins/logout',       [AdminController::class, 'logout']);
Route::post('auth/customer/login', [AuthController::class, 'customerLogin']);
Route::post('auth/register',       [AuthController::class, 'customerRegister']);
Route::post('auth/logout',         [AuthController::class, 'logout']);
