<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    // Hiển thị danh sách đơn hàng
    public function index()
    {
        $orders = Order::latest()->get();
        return view('orders.index', compact('orders'));
    }

    // Xem chi tiết đơn hàng (Dùng để demo thông tin khách và món đồ đã mua)
    public function show(Order $order)
    {
        return view('orders.show', compact('order'));
    }

    // Cập nhật trạng thái đơn hàng (Ví dụ: Chờ xử lý -> Đã giao)
    public function update(Request $request, Order $order)
    {
        $request->validate(['status' => 'required']);

        $order->update(['status' => $request->status]);

        return back()->with('success', 'Cập nhật trạng thái đơn hàng thành công!');
    }

    // Xóa đơn hàng (Thường dùng cho đơn bị hủy)
    public function destroy(Order $order)
    {
        $order->delete();
        return redirect()->route('orders.index')->with('success', 'Đã xóa đơn hàng!');
    }
}
