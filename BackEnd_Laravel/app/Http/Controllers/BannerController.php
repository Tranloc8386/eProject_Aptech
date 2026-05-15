<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File; // Thêm thư viện này để quản lý file dễ hơn

class BannerController extends Controller
{
    public function index()
    {
        $banners = Banner::latest()->get();
        return view('banners.index', compact('banners'));
    }

    public function create()
    {
        return view('banners.create');
    }

    // 1. Hàm Lưu mới (Store)
    public function store(Request $request)
    {
        // 1. Validate
        $request->validate([
            'title' => 'required|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        // 2. Lấy dữ liệu (Chỉ lấy những cột thực sự có trong database của bạn)
        $data = $request->only(['title', 'bg', 'order', 'is_active']);

        // 3. Xử lý Upload ảnh
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();

            // Di chuyển vào public/uploads/banners như trong ảnh VS Code của bạn
            $file->move(public_path('uploads/banners'), $filename);

            $data['image'] = $filename;
        }

        // 4. Lưu vào DB
        \App\Models\Banner::create($data);

        return redirect()->route('banners.index')->with('success', 'Thêm banner thành công!');
    }
    public function edit(Banner $banner)
    {
        return view('banners.edit', compact('banner'));
    }

    // 2. Hàm Cập nhật (Update) - Quan trọng
    public function update(Request $request, Banner $banner)
    {
        $request->validate([
            'title' => 'required|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $data = $request->only(['title']);

        if ($request->hasFile('image')) {
            // Xóa ảnh cũ nếu tồn tại trong thư mục mới
            $oldPath = public_path('uploads/banners/' . $banner->image);
            if ($banner->image && File::exists($oldPath)) {
                File::delete($oldPath);
            }

            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();

            // Lưu ảnh mới vào thư mục mới
            $file->move(public_path('uploads/banners'), $filename);
            $data['image'] = $filename;
        }

        $banner->update($data);

        return redirect()->route('banners.index')->with('success', 'Cập nhật banner thành công!');
    }

    // 3. Hàm Xóa (Destroy)
    public function destroy(Banner $banner)
    {
        // Xóa file vật lý trước khi xóa bản ghi trong DB
        $filePath = public_path('uploads/banners/' . $banner->image);
        if ($banner->image && File::exists($filePath)) {
            File::delete($filePath);
        }

        $banner->delete();
        return back()->with('success', 'Đã xóa banner hoàn toàn!');
    }
}
////loc
