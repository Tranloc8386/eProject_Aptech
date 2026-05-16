<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\CommentController;

Route::apiResource('products', ProductController::class);

Route::apiResource('users', UserController::class);

Route::apiResource('categories', CategoryController::class);

Route::apiResource('orders', OrderController::class);

Route::apiResource('banners', BannerController::class);

Route::apiResource('comments', CommentController::class);
