<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $data = $request->all();

        if ($request->hasFile('image')) {
            // Lưu vào thư mục riêng cho banner
            $data['image'] = $request->file('image')->store('uploads/banners', 'public');
        }

        Banner::create($data);
        return redirect()->route('banners.index')->with('success', 'Thêm banner thành công!');
    }

    public function edit(Banner $banner)
    {
        return view('banners.edit', compact('banner'));
    }

    public function update(Request $request, Banner $banner)
    {
        $data = $request->all();

        if ($request->hasFile('image')) {
            // Xóa ảnh cũ nếu có
            if ($banner->image && !filter_var($banner->image, FILTER_VALIDATE_URL)) {
                Storage::disk('public')->delete($banner->image);
            }
            $data['image'] = $request->file('image')->store('uploads/banners', 'public');
        }

        $banner->update($data);
        return redirect()->route('banners.index');
    }

    public function destroy(Banner $banner)
    {
        $banner->delete();
        return back()->with('success', 'Đã xóa banner!');
    }
}
