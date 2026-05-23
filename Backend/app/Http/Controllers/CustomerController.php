<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class CustomerController extends Controller
{
    // GET /api/customers — danh sách khách hàng (dành cho admin)
    public function index()
    {
        $customers = Customer::withCount('orders')->latest()->get();

        return response()->json([
            'success' => true,
            'data'    => $customers,
        ]);
    }

    // POST /api/customers — đăng ký tài khoản khách hàng
    // Bắt buộc nhập phone + address để dùng điền sẵn khi đặt hàng
    public function store(Request $request)
    {
        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:customers,email',
            'password' => 'required|min:6',
            'phone'    => 'required|string|max:20',
            'address'  => 'required|string',
        ]);

        $customer = Customer::create([
            'name'        => $request->name,
            'email'       => $request->email,
            'password'    => Hash::make($request->password),
            'phone'       => $request->phone,
            'address'     => $request->address,
            'is_verified' => true,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Đăng ký thành công!',
            'data'    => $customer,
        ], 201);
    }

    // GET /api/customers/{id}
    public function show(string $id)
    {
        $customer = Customer::with('orders')->findOrFail($id);

        return response()->json([
            'success' => true,
            'data'    => $customer,
        ]);
    }

    // PUT /api/customers/{id} — cập nhật thông tin khách hàng
    public function update(Request $request, string $id)
    {
        $customer = Customer::findOrFail($id);

        $request->validate([
            'name'    => 'sometimes|string|max:255',
            'email'   => 'sometimes|email|unique:customers,email,' . $id,
            'phone'   => 'sometimes|string|max:20',
            'address' => 'sometimes|string',
        ]);

        $data = $request->only(['name', 'email', 'phone', 'address']);

        if ($request->filled('password')) {
            $request->validate(['password' => 'min:6']);
            $data['password'] = Hash::make($request->password);
        }

        $customer->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Cập nhật thành công!',
            'data'    => $customer,
        ]);
    }

    // DELETE /api/customers/{id}
    public function destroy(string $id)
    {
        $customer = Customer::findOrFail($id);

        if ($customer->orders()->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'Không thể xóa khách hàng đã có đơn hàng!',
            ], 400);
        }

        $customer->delete();

        return response()->json([
            'success' => true,
            'message' => 'Đã xóa khách hàng!',
        ]);
    }
}
