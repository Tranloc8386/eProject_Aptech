@extends('layouts.app')

@section('content')
    <div class="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div class="flex items-center gap-2 mb-6 text-gray-500">
            <a href="{{ route('categories.index') }}" class="hover:text-indigo-600 transition">Danh mục</a>
            <span>/</span>
            <span class="text-gray-800 font-bold">Chỉnh sửa</span>
        </div>

        <h2 class="text-2xl font-bold mb-6 text-gray-800">Cập nhật danh mục: <span
                class="text-indigo-600">{{ $category->name }}</span></h2>

        <form action="{{ route('categories.update', $category->id) }}" method="POST" class="space-y-5">
            @csrf
            @method('PUT')

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Tên danh mục</label>
                <input type="text" name="name" value="{{ old('name', $category->name) }}" required
                    class="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                @error('name')
                    <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                @enderror
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Mô tả danh mục</label>
                <textarea name="description" rows="4"
                    class="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="Mô tả ngắn về loại váy này...">{{ old('description', $category->description) }}</textarea>
            </div>

            <div class="flex items-center gap-4 pt-4">
                <button type="submit"
                    class="bg-indigo-600 text-white px-8 py-2.5 rounded-lg font-bold hover:bg-indigo-700 shadow-md transition">
                    Cập nhật ngay
                </button>
                <a href="{{ route('categories.index') }}" class="text-gray-500 font-medium hover:text-gray-700">
                    Hủy bỏ
                </a>
            </div>
        </form>
    </div>
@endsection
