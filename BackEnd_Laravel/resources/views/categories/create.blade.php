@extends('layouts.app')
@section('content')
    <div class="max-w-xl mx-auto bg-white p-8 rounded-xl shadow">
        <h2 class="text-2xl font-bold mb-6">Thêm Danh mục mới</h2>
        <form action="{{ route('categories.store') }}" method="POST" class="space-y-4">
            @csrf
            <div>
                <label class="block font-medium">Tên danh mục</label>
                <input type="text" name="name"
                    class="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="VD: Váy Công Sở">
            </div>
            <div>
                <label class="block font-medium">Mô tả (Không bắt buộc)</label>
                <textarea name="description" class="w-full border p-2 rounded" rows="3"></textarea>
            </div>
            <div class="flex gap-4">
                <button type="submit" class="bg-green-600 text-white px-6 py-2 rounded-lg">Lưu lại</button>
                <a href="{{ route('categories.index') }}" class="bg-gray-200 px-6 py-2 rounded-lg">Hủy</a>
            </div>
        </form>
    </div>
@endsection
