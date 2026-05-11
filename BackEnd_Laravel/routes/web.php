    <?php

    use Illuminate\Support\Facades\Route;
    // 1. Nhớ import Controller của bạn vào đây
    use App\Http\Controllers\UserController;
    use App\Http\Controllers\ProductController;
    use App\Http\Controllers\CategoryController;
    use App\Http\Controllers\OrderController;
    use App\Http\Controllers\BannerController;
    use App\Http\Controllers\CommentController;

    // 1. Định nghĩa đường dẫn tùy chỉnh trước
    Route::get('users/index', [UserController::class, 'index'])->name('users.index');
    // Hoặc dùng resource nếu bạn làm đủ CRUD
    Route::resource('users', UserController::class);

    // 1. Route cho trang danh sách tùy chỉnh (Nếu bạn vẫn muốn dùng URL /products/index)
    // Phải đặt tên là 'products.index' để khớp với các thẻ <a href="{{ route('products.index') }}">
    Route::get('products/index', [ProductController::class, 'index'])->name('products.index');

    // 2. Khai báo Resource cho tất cả các tính năng CRUD còn lại
    // Chúng ta dùng except(['index']) để không bị đè lên route tùy chỉnh ở trên
    Route::resource('products', ProductController::class)->except(['index']);

    // --- Routes cho Category (Danh mục) ---
    // 1. Định nghĩa trang danh sách danh mục tùy chỉnh
    Route::get('categories/index', [CategoryController::class, 'index'])->name('categories.index');

    // 2. Khai báo Resource cho các hàm còn lại (create, store, edit, update, destroy)
    Route::resource('categories', CategoryController::class)->except(['index']);



    // Route danh sách đơn hàng
Route::get('orders/index', [OrderController::class, 'index'])->name('orders.index');

// Resource cho các hàm show, update, destroy (Bỏ qua create và store vì đơn hàng do khách tạo)
Route::resource('orders', OrderController::class)->except(['index', 'create', 'store']);




// Route danh sách banner
Route::get('banners/index', [BannerController::class, 'index'])->name('banners.index');

// Resource cho các hàm còn lại
Route::resource('banners', BannerController::class)->except(['index']);



// Xem danh sách
Route::get('comments/index', [CommentController::class, 'index'])->name('comments.index');

// Xóa bình luận
Route::delete('comments/{comment}', [CommentController::class, 'destroy'])->name('comments.destroy');
