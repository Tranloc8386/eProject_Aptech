@extends('layouts.app')

@section('title', 'Chỉnh sửa thông tin')

@section('content')
<div class="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
    <div class="mb-6">
        <h2 class="text-2xl font-bold text-gray-800">Cập nhật thông tin</h2>
        <p class="text-gray-500 text-sm">Chỉnh sửa thông tin cho người dùng: <strong>{{ $user->name }}</strong></p>
    </div>

    <form action="{{ route('users.update', $user->id) }}" method="POST" class="space-y-5">
        @csrf
        @method('PUT')
        <div>
            <label class="block text-sm font-semibold mb-2">Họ và tên</label>
            <input type="text" name="name" value="{{ $user->name }}" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition">
        </div>

        <div>
            <label class="block text-sm font-semibold mb-2">Địa chỉ Email</label>
            <input type="email" name="email" value="{{ $user->email }}" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition">
        </div>

        <div>
            <label class="block text-sm font-semibold mb-2">Mật khẩu mới (không bắt buộc)</label>
            <input type="password" name="password" placeholder="Để trống nếu không muốn đổi" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition">
        </div>

        <div class="pt-4 flex items-center justify-between border-t border-gray-100">
            <a href="{{ route('users.index') }}" class="text-gray-500 hover:text-gray-700 font-medium">Quay lại</a>
            <button type="submit" class="bg-amber-500 text-white px-8 py-2 rounded-lg font-bold hover:bg-amber-600 shadow-md shadow-amber-100 transition">
                Cập nhật ngay
            </button>
        </div>
    </form>
</div>
@endsection
