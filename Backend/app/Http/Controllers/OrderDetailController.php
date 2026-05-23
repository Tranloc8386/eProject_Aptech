<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use Illuminate\Http\Request;

class OrderDetailController extends Controller
{
    // GET /api/orders/{order}/details — lấy tất cả dòng sản phẩm của 1 đơn hàng
    public function index(Order $order)
    {
        $details = $order->orderDetails()->with('product')->get();

        return response()->json([
            'success' => true,
            'data'    => $details,
            'order'   => $order,
        ]);
    }

    // POST /api/orders/{order}/details — thêm 1 sản phẩm vào đơn hàng
    public function store(Request $request, Order $order)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity'   => 'required|integer|min:1',
        ]);

        $product  = Product::findOrFail($request->product_id);
        $subtotal = $product->price * $request->quantity;

        $detail = $order->orderDetails()->create([
            'product_id'    => $product->id,
            'product_name'  => $product->name,
            'product_image' => $product->image,
            'price'         => $product->price,
            'quantity'      => $request->quantity,
            'subtotal'      => $subtotal,
        ]);

        // Cập nhật lại tổng tiền đơn hàng
        $order->update([
            'total_amount' => $order->orderDetails()->sum('subtotal')
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Đã thêm sản phẩm vào đơn hàng!',
            'data'    => $detail
        ], 201);
    }

    // GET /api/order-details/{id} — xem 1 dòng chi tiết
    public function show(OrderDetail $orderDetail)
    {
        return response()->json([
            'success' => true,
            'data'    => $orderDetail->load('product', 'order')
        ]);
    }

    // PUT /api/order-details/{id} — sửa số lượng 1 dòng chi tiết
    public function update(Request $request, OrderDetail $orderDetail)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $orderDetail->update([
            'quantity' => $request->quantity,
            'subtotal' => $orderDetail->price * $request->quantity,
        ]);

        // Cập nhật lại tổng tiền đơn hàng
        $orderDetail->order->update([
            'total_amount' => $orderDetail->order->orderDetails()->sum('subtotal')
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Đã cập nhật số lượng!',
            'data'    => $orderDetail
        ]);
    }

    // DELETE /api/order-details/{id} — xóa 1 dòng sản phẩm khỏi đơn hàng
    public function destroy(OrderDetail $orderDetail)
    {
        $order = $orderDetail->order;
        $orderDetail->delete();

        // Cập nhật lại tổng tiền sau khi xóa dòng
        $order->update([
            'total_amount' => $order->orderDetails()->sum('subtotal')
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Đã xóa sản phẩm khỏi đơn hàng!'
        ]);
    }
}
