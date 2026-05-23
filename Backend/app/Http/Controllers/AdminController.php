<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\File;

class AdminController extends Controller
{
    // POST /api/admins/login
    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        $admin = Admin::where('email', $request->email)->first();

        if (!$admin || !Hash::check($request->password, $admin->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Email hoặc mật khẩu không đúng',
            ], 401);
        }

        $token = base64_encode($admin->id . '|admin|' . time() . '|' . $admin->email);

        return response()->json([
            'success' => true,
            'message' => 'Đăng nhập thành công',
            'token'   => $token,
            'user'    => [
                'id'    => $admin->id,
                'name'  => $admin->name,
                'email' => $admin->email,
                'role'  => 'admin',
            ],
        ]);
    }

    // POST /api/admins/logout
    public function logout()
    {
        return response()->json([
            'success' => true,
            'message' => 'Đăng xuất thành công',
        ]);
    }

    // GET /api/admins
    public function index()
    {
        $admins = Admin::latest()->get();

        return response()->json([
            'success' => true,
            'message' => 'Danh sách quản trị viên',
            'data'    => $admins,
        ]);
    }

    // POST /api/admins
    public function store(Request $request)
    {
        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:admins,email',
            'password' => 'required|min:8',
            'role'     => 'required|in:admin',
        ]);

        $admin = Admin::create([
            'name'          => $request->name,
            'email'         => $request->email,
            'password'      => Hash::make($request->password),
            'role'          => $request->role,
            'auth_provider' => 'local',
            'is_verified'   => true,
            'avatar'        => null,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Thêm quản trị viên thành công!',
            'data'    => $admin,
        ], 201);
    }

    // GET /api/admins/{id}
    public function show($id)
    {
        $admin = Admin::findOrFail($id);

        return response()->json([
            'success' => true,
            'data'    => $admin,
        ]);
    }

    // PUT /api/admins/{id}
    public function update(Request $request, $id)
    {
        $admin = Admin::findOrFail($id);

        $request->validate([
            'name'  => 'required|string|max:255',
            'email' => 'required|email|unique:admins,email,' . $id,
            'role'  => 'required|in:admin',
        ]);

        $data = [
            'name'  => $request->name,
            'email' => $request->email,
            'role'  => $request->role,
        ];

        if ($request->filled('password')) {
            $request->validate(['password' => 'min:8']);
            $data['password'] = Hash::make($request->password);
        }

        $admin->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Cập nhật quản trị viên thành công!',
            'data'    => $admin,
        ]);
    }

    // DELETE /api/admins/{id}
    public function destroy($id)
    {
        $admin = Admin::findOrFail($id);

        if ($admin->avatar && File::exists(public_path('admins/' . $admin->avatar))) {
            File::delete(public_path('admins/' . $admin->avatar));
        }

        $admin->delete();

        return response()->json([
            'success' => true,
            'message' => 'Xóa quản trị viên thành công!',
        ]);
    }
}
