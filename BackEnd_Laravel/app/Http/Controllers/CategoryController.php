<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    // GET /api/categories
    public function index()
    {
        $categories = Category::latest()->get();

        return response()->json([
            'success' => true,
            'message' => 'Danh sách danh mục',
            'data' => $categories
        ], 200);
    }

    // POST /api/categories
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:categories'
        ]);

        $category = Category::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'description' => $request->description
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Thêm danh mục thành công!',
            'data' => $category
        ], 201);
    }

    // GET /api/categories/{id}
    public function show(Category $category)
    {
        return response()->json([
            'success' => true,
            'data' => $category
        ], 200);
    }

    // PUT/PATCH /api/categories/{id}
    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'required'
        ]);

        $category->update([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'description' => $request->description
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Cập nhật danh mục thành công!',
            'data' => $category
        ], 200);
    }

    // DELETE /api/categories/{id}
    public function destroy(Category $category)
    {
        if ($category->products()->count() > 0) {
            return response()->json([
                'success' => false,
                'message' => 'Không thể xóa danh mục đang có sản phẩm!'
            ], 400);
        }

        $category->delete();

        return response()->json([
            'success' => true,
            'message' => 'Đã xóa danh mục!'
        ], 200);
    }
}
