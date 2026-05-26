<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Models\Category;

class ProductController extends Controller
{
    // GET /api/products
    public function index()
    {
        $products = Product::with('category')
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Danh sách sản phẩm',
            'data' => $products
        ], 200);
    }

    // POST /api/products
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric|min:0',
            'stock_quantity' => 'required|integer|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'description' => 'nullable|string',
        ]);

        $data = $request->all();

        $data['is_featured'] = $request->input('is_featured') == 1;

        // Upload ảnh
        if ($request->hasFile('image')) {

            $file = $request->file('image');

            $filename = time() . '_' . $file->getClientOriginalName();

            $file->move(public_path('products'), $filename);

            $data['image'] = $filename;
        }

        $product = Product::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Thêm sản phẩm thành công!',
            'data' => $product
        ], 201);
    }

    // GET /api/products/{id}
    public function show($id)
    {
        $product = Product::with('category')
            ->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $product
        ], 200);
    }

    // PUT/PATCH /api/products/{id}
    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric|min:0',
            'stock_quantity' => 'required|integer|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'description' => 'nullable|string',
        ]);

        $data = $request->all();

        $data['is_featured'] = $request->input('is_featured') == 1;

        // Upload ảnh mới
        if ($request->hasFile('image')) {

            // Xóa ảnh cũ
            if (
                $product->image &&
                file_exists(public_path('products/' . $product->image))
            ) {

                unlink(public_path('products/' . $product->image));
            }

            $file = $request->file('image');

            $filename = time() . '_' . $file->getClientOriginalName();

            $file->move(public_path('products'), $filename);

            $data['image'] = $filename;
        }

        $product->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Cập nhật sản phẩm thành công!',
            'data' => $product
        ], 200);
    }

    // DELETE /api/products/{id}
    public function destroy(Product $product)
    {
        // Xóa ảnh
        if (
            $product->image &&
            file_exists(public_path('products/' . $product->image))
        ) {

            unlink(public_path('products/' . $product->image));
        }

        $product->delete();

        return response()->json([
            'success' => true,
            'message' => 'Đã xóa sản phẩm và hình ảnh liên quan!'
        ], 200);
    }
}
