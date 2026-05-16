<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    // GET /api/orders
    public function index()
    {
        $orders = Order::latest()->get();

        return response()->json([
            'success' => true,
            'message' => 'Danh sách đơn hàng',
            'data' => $orders
        ], 200);
    }

    // GET /api/orders/{id}
    public function show(Order $order)
    {
        return response()->json([
            'success' => true,
            'data' => $order
        ], 200);
    }

    // PUT/PATCH /api/orders/{id}
    public function update(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required'
        ]);

        $order->update([
            'status' => $request->status
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Cập nhật trạng thái đơn hàng thành công!',
            'data' => $order
        ], 200);
    }

    // DELETE /api/orders/{id}
    public function destroy(Order $order)
    {
        $order->delete();

        return response()->json([
            'success' => true,
            'message' => 'Đã xóa đơn hàng!'
        ], 200);
    }
}
