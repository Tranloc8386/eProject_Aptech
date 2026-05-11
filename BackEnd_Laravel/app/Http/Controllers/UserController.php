<?php

namespace App\Http\Controllers;

use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // 1. Hiển thị danh sách user
    public function index()
    {
        $users = User::all();
        return view('users.index', compact('users'));
    }

    // 2. Hiển thị form tạo mới
    public function create()
    {
        return view('users.create');
    }

    // 3. Lưu user mới vào database
    public function store(Request $request)
    {
        // 1. Validate dữ liệu
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required'
        ]);

        // 2. Tạo user mới
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password), // Bắt buộc phải mã hóa mật khẩu
            'role' => $request->role,
        ]);

        // 3. Chuyển hướng về trang danh sách với thông báo thành công
        return redirect()->route('users.index')->with('success', 'Thêm thành viên thành công!');
    }

    // 4. Hiển thị form chỉnh sửa
    public function edit($id)
    {
        $user = User::findOrFail($id);
        return view('users.edit', compact('user'));
    }

    // 5. Cập nhật thông tin
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email,' . $id,
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            // Chỉ đổi pass nếu người dùng nhập mới
            'password' => $request->password ? Hash::make($request->password) : $user->password,
        ]);

        return redirect()->route('users.index')->with('success', 'Cập nhật thành công!');
    }

    // 6. Xóa user
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return redirect()->route('users.index')->with('success', 'Xóa thành công!');
    }
}
