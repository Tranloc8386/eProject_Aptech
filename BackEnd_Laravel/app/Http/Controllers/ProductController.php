<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Models\Category;

class ProductController extends Controller
{
    // Danh sách sản phẩm
    public function index()
    {
        $products = Product::with('category')->latest()->get();

        return view('products.index', compact('products'));
    }

    // Form thêm
    public function create()
    {
        $categories = Category::all();

        return view('products.create', compact('categories'));
    }

    // Lưu sản phẩm
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric|min:0',
            'stock_quantity' => 'required|integer|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data = $request->all();

        $data['is_featured'] = $request->has('is_featured');

        // Upload ảnh vào public/products
        if ($request->hasFile('image')) {

            $file = $request->file('image');

            // Tạo tên file mới tránh trùng
            $filename = time() . '_' . $file->getClientOriginalName();

            // Di chuyển file vào public/products
            $file->move(public_path('products'), $filename);

            // Lưu tên file vào database
            $data['image'] = $filename;
        }

        Product::create($data);

        return redirect()
            ->route('products.index')
            ->with('success', 'Thêm sản phẩm thành công!');
    }

    // Chi tiết sản phẩm
    public function show($id)
    {
        $product = Product::with('category')->findOrFail($id);

        return view('products.show', compact('product'));
    }

    // Form sửa
    public function edit(Product $product)
    {
        $categories = Category::all();

        return view('products.edit', compact('product', 'categories'));
    }

    // Cập nhật sản phẩm
    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric|min:0',
            'stock_quantity' => 'required|integer|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data = $request->all();

        $data['is_featured'] = $request->has('is_featured');

        // Upload ảnh mới
        if ($request->hasFile('image')) {

            // Xóa ảnh cũ nếu tồn tại
            if (
                $product->image &&
                file_exists(public_path('products/' . $product->image))
            ) {

                unlink(public_path('products/' . $product->image));
            }

            $file = $request->file('image');

            // Tạo tên file mới
            $filename = time() . '_' . $file->getClientOriginalName();

            // Upload vào public/products
            $file->move(public_path('products'), $filename);

            // Lưu tên file
            $data['image'] = $filename;
        }

        $product->update($data);

        return redirect()
            ->route('products.index')
            ->with('success', 'Cập nhật thành công!');
    }

    // Xóa sản phẩm
    public function destroy(Product $product)
    {
        // Xóa file ảnh
        if (
            $product->image &&
            file_exists(public_path('products/' . $product->image))
        ) {

            unlink(public_path('products/' . $product->image));
        }

        // Xóa database
        $product->delete();

        return back()->with(
            'success',
            'Đã xóa sản phẩm và hình ảnh liên quan!'
        );
    }
}
