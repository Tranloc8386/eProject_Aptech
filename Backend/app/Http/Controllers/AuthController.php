<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // POST /api/auth/customer/login
    public function customerLogin(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        $customer = Customer::where('email', $request->email)->first();

        if (!$customer || !Hash::check($request->password, $customer->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Email hoặc mật khẩu không đúng',
            ], 401);
        }

        $token = base64_encode($customer->id . '|customer|' . time() . '|' . $customer->email);

        return response()->json([
            'success' => true,
            'message' => 'Đăng nhập thành công',
            'token'   => $token,
            'user'    => [
                'id'      => $customer->id,
                'name'    => $customer->name,
                'email'   => $customer->email,
                'phone'   => $customer->phone,
                'address' => $customer->address,
                'role'    => 'customer',
            ],
        ]);
    }

    // POST /api/auth/register
    public function customerRegister(Request $request)
    {
        $request->validate([
            'name'                  => 'required|string|max:255',
            'email'                 => 'required|email|unique:customers,email',
            'password'              => 'required|min:6|confirmed',
            'phone'                 => 'required|string|max:20',
            'address'               => 'required|string',
        ]);

        $customer = Customer::create([
            'name'        => $request->name,
            'email'       => $request->email,
            'password'    => Hash::make($request->password),
            'phone'       => $request->phone,
            'address'     => $request->address,
            'is_verified' => true,
        ]);

        $token = base64_encode($customer->id . '|customer|' . time() . '|' . $customer->email);

        return response()->json([
            'success' => true,
            'message' => 'Đăng ký thành công!',
            'token'   => $token,
            'user'    => [
                'id'      => $customer->id,
                'name'    => $customer->name,
                'email'   => $customer->email,
                'phone'   => $customer->phone,
                'address' => $customer->address,
                'role'    => 'customer',
            ],
        ], 201);
    }

    // POST /api/auth/logout
    public function logout()
    {
        return response()->json([
            'success' => true,
            'message' => 'Đăng xuất thành công',
        ]);
    }
}
