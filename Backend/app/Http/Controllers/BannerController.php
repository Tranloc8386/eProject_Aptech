<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class BannerController extends Controller
{
    // =========================
    // GET ALL BANNERS
    // =========================
    public function index()
    {
        $banners = Banner::latest()->get();

        return response()->json([
            'success' => true,
            'message' => 'Danh sách banner',
            'data' => $banners
        ]);
    }

    // =========================
    // CREATE BANNER
    // =========================
    public function store(Request $request)
    {
        // Validate
        $request->validate([
            'title' => 'required|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        // Lấy data
        $data = $request->only([
            'title',
            'bg',
            'order',
            'is_active'
        ]);

        // Upload image
        if ($request->hasFile('image')) {

            $file = $request->file('image');

            $filename = time() . '_' . $file->getClientOriginalName();

            $file->move(
                public_path('uploads/banners'),
                $filename
            );

            $data['image'] = $filename;
        }

        // Save DB
        $banner = Banner::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Thêm banner thành công',
            'data' => $banner
        ], 201);
    }

    // =========================
    // SHOW ONE BANNER
    // =========================
    public function show($id)
    {
        $banner = Banner::find($id);

        if (!$banner) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy banner'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $banner
        ]);
    }

    // =========================
    // UPDATE BANNER
    // =========================
    public function update(Request $request, $id)
    {
        $banner = Banner::find($id);

        if (!$banner) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy banner'
            ], 404);
        }

        // Validate
        $request->validate([
            'title' => 'required|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        // Data
        $data = $request->only([
            'title',
            'bg',
            'order',
            'is_active'
        ]);

        // Upload image mới
        if ($request->hasFile('image')) {

            // Xóa ảnh cũ
            $oldPath = public_path(
                'uploads/banners/' . $banner->image
            );

            if ($banner->image && File::exists($oldPath)) {
                File::delete($oldPath);
            }

            // Upload ảnh mới
            $file = $request->file('image');

            $filename = time() . '_' . $file->getClientOriginalName();

            $file->move(
                public_path('uploads/banners'),
                $filename
            );

            $data['image'] = $filename;
        }

        // Update
        $banner->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Cập nhật banner thành công',
            'data' => $banner
        ]);
    }

    // =========================
    // DELETE BANNER
    // =========================
    public function destroy($id)
    {
        $banner = Banner::find($id);

        if (!$banner) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy banner'
            ], 404);
        }

        // Xóa file ảnh
        $filePath = public_path(
            'uploads/banners/' . $banner->image
        );

        if ($banner->image && File::exists($filePath)) {
            File::delete($filePath);
        }

        // Delete DB
        $banner->delete();

        return response()->json([
            'success' => true,
            'message' => 'Xóa banner thành công'
        ]);
    }
}
