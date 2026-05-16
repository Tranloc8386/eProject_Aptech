<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\File;

class UserController extends Controller
{
    // GET /api/users
    public function index()
    {
        $users = User::latest()->get();

        return response()->json([
            'success' => true,
            'message' => 'Danh sách người dùng',
            'data' => $users
        ], 200);
    }

    // POST /api/users
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
            'role' => 'required|in:user,admin',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'auth_provider' => 'local',
            'is_verified' => true,
            'avatar' => null,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Thêm người dùng thành công!',
            'data' => $user
        ], 201);
    }

    // GET /api/users/{id}
    public function show($id)
    {
        $user = User::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $user
        ], 200);
    }

    // PUT/PATCH /api/users/{id}
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

        // Update password nếu có nhập
        if ($request->filled('password')) {

            $request->validate([
                'password' => 'min:8'
            ]);

            $data['password'] = Hash::make($request->password);
        }

        $user->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Cập nhật người dùng thành công!',
            'data' => $user
        ], 200);
    }

    // DELETE /api/users/{id}
    public function destroy($id)
    {
        $user = User::findOrFail($id);

        // Không cho xóa nếu có đơn hàng
        if ($user->orders()->exists()) {

            return response()->json([
                'success' => false,
                'message' => 'Không thể xóa user đã có đơn hàng!'
            ], 400);
        }

        // Xóa avatar nếu có
        if (
            $user->avatar &&
            File::exists(public_path('users/' . $user->avatar))
        ) {

            File::delete(public_path('users/' . $user->avatar));
        }

        $user->delete();

        return response()->json([
            'success' => true,
            'message' => 'Xóa người dùng thành công!'
        ], 200);
    }

    // GET /api/profile
    public function profile()
    {
        return response()->json([
            'success' => true,
            'data' => auth()->user()
        ], 200);
    }

    // POST /api/upload-avatar
    public function uploadAvatar(Request $request)
    {
        $request->validate([
            'avatar' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048'
        ]);

        $user = auth()->user();

        // Xóa avatar cũ
        if (
            $user->avatar &&
            File::exists(public_path('users/' . $user->avatar))
        ) {

            File::delete(public_path('users/' . $user->avatar));
        }

        // Upload avatar mới
        $file = $request->file('avatar');

        $filename = time() . '_' . $file->getClientOriginalName();

        $file->move(public_path('users'), $filename);

        // Lưu DB
        $user->avatar = $filename;
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Upload avatar thành công!',
            'avatar' => $filename
        ], 200);
    }
}
