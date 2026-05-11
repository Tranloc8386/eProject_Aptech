@extends('layouts.app')
@section('content')
    <div class="p-6 bg-white rounded-xl shadow">
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold">Quản lý Danh mục</h2>
            <a href="{{ route('categories.create') }}" class="bg-blue-600 text-white px-4 py-2 rounded-lg">Thêm mới</a>
        </div>

        @if (session('error'))
            <div class="bg-red-100 text-red-700 p-3 rounded mb-4">{{ session('error') }}</div>
        @endif

        <table class="w-full border-collapse">
            <thead>
                <tr class="bg-gray-100">
                    <th class="p-3 border-b text-left">Tên danh mục</th>
                    <th class="p-3 border-b text-left">Slug</th>
                    <th class="p-3 border-b text-center">Thao tác</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($categories as $cat)
                    <tr>
                        <td class="p-3 border-b font-medium">{{ $cat->name }}</td>
                        <td class="p-3 border-b text-gray-500">{{ $cat->slug }}</td>
                        <td class="p-3 border-b text-center space-x-2">
                            <a href="{{ route('categories.edit', $cat->id) }}" class="text-blue-600">Sửa</a>
                            <form action="{{ route('categories.destroy', $cat->id) }}" method="POST" class="inline">
                                @csrf @method('DELETE')
                                <button class="text-red-600" onclick="return confirm('Xóa danh mục này?')">Xóa</button>
                            </form>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endsection
