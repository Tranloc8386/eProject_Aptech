@extends('layouts.app')

@section('content')
<div class="p-6 bg-white rounded-xl shadow">
    <h2 class="text-2xl font-bold mb-6 text-gray-800">Quản lý Bình luận & Đánh giá</h2>

    <table class="w-full border-collapse">
        <thead>
            <tr class="bg-gray-50 text-left">
                <th class="p-4 border-b text-sm font-semibold text-gray-600">Người dùng</th>
                <th class="p-4 border-b text-sm font-semibold text-gray-600">Sản phẩm</th>
                <th class="p-4 border-b text-sm font-semibold text-gray-600">Nội dung</th>
                <th class="p-4 border-b text-sm font-semibold text-gray-600">Đánh giá</th>
                <th class="p-4 border-b text-center text-sm font-semibold text-gray-600">Thao tác</th>
            </tr>
        </thead>
        <tbody>
            @foreach($comments as $comment)
            <tr class="hover:bg-gray-50 transition">
                <td class="p-4 border-b">
                    <span class="font-medium">{{ $comment->user->name ?? 'Ẩn danh' }}</span>
                </td>
                <td class="p-4 border-b">
                    <span class="text-indigo-600">{{ $comment->product->name ?? 'N/A' }}</span>
                </td>
                <td class="p-4 border-b text-gray-600 italic">
                    "{{ Str::limit($comment->content, 50) }}"
                </td>
                <td class="p-4 border-b text-yellow-500">
                    {{ $comment->rating }} ⭐
                </td>
                <td class="p-4 border-b text-center">
                    <form action="{{ route('comments.destroy', $comment->id) }}" method="POST" class="inline">
                        @csrf @method('DELETE')
                        <button type="submit" class="text-red-600 hover:underline font-bold"
                                onclick="return confirm('Bạn có chắc chắn muốn xóa bình luận này?')">
                            Xóa
                        </button>
                    </form>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection
