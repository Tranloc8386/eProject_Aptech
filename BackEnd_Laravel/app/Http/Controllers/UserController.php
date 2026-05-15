<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // Danh sách user
    public function index()
    {
        $users = User::latest()->get();

        return view('users.index', compact('users'));
    }

    // Form thêm
    public function create()
    {
        return view('users.create');
    }

    // Lưu user
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
            'role' => 'required|in:user,admin',
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'auth_provider' => 'local',
            'is_verified' => true,
        ]);

        return redirect()
            ->route('users.index')
            ->with('success', 'Thêm người dùng thành công!');
    }

    // Chi tiết user
    public function show($id)
    {
        $user = User::findOrFail($id);

        return view('users.show', compact('user'));
    }

    // Form sửa
    public function edit($id)
    {
        $user = User::findOrFail($id);

        return view('users.edit', compact('user'));
    }

    // Update
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $id,
            'role' => 'required|in:user,admin',
        ]);

        $data = [
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
        ];

        // Chỉ update password nếu có nhập
        if ($request->filled('password')) {

            $request->validate([
                'password' => 'min:8'
            ]);

            $data['password'] = Hash::make($request->password);
        }

        $user->update($data);

        return redirect()
            ->route('users.index')
            ->with('success', 'Cập nhật thành công!');
    }

    // Xóa
    public function destroy($id)
    {
        $user = User::findOrFail($id);

        // Không cho xóa nếu có đơn hàng
        if ($user->orders()->exists()) {

            return redirect()
                ->route('users.index')
                ->with('error', 'Không thể xóa user đã có đơn hàng!');
        }

        $user->delete();

        return redirect()
            ->route('users.index')
            ->with('success', 'Xóa thành công!');
    }
}
