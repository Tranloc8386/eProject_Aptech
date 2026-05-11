@extends('layouts.app')

@section('title', 'Thêm thành viên')

@section('content')
    <div class="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div class="mb-6">
            <h2 class="text-2xl font-bold text-gray-800">Đăng ký thành viên</h2>
            <p class="text-gray-500 text-sm">Vui lòng điền đầy đủ thông tin bên dưới.</p>
        </div>


        <form action="{{ route('users.store') }}" method="POST" class="space-y-5">
            @csrf
            <div>
                <label class="block text-sm font-semibold mb-2">Họ và tên</label>
                <input type="text" name="name" required
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition">
            </div>

            <div>
                <label class="block text-sm font-semibold mb-2">Địa chỉ Email</label>
                <input type="email" name="email" required
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition">
            </div>

            <div>
                <label class="block text-sm font-semibold mb-2">Mật khẩu</label>
                <input type="password" name="password" required
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition">
            </div>
            <label>Vai trò:</label>
            <select name="role" class="form-control" required>
                <option value="user">Người dùng (User)</option>
                <option value="admin">Quản trị viên (Admin)</option>
            </select>

            <div class="pt-4 flex items-center justify-between border-t border-gray-100">
                <a href="{{ route('users.index') }}" class="text-gray-500 hover:text-gray-700 font-medium">Hủy bỏ</a>
                <button type="submit"
                    class="bg-indigo-600 text-white px-8 py-2 rounded-lg font-bold hover:bg-indigo-700 shadow-md shadow-indigo-100 transition">
                    Tạo tài khoản
                </button>
            </div>
        </form>
        @if ($errors->any())
            <div
                style="color: red; background: #ffeeee; padding: 10px; border: 1px solid red; border-radius: 5px; margin-bottom: 20px;">
                <strong>Có lỗi xảy ra:</strong>
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif
    </div>
@endsection
