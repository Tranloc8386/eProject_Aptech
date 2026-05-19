<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    // GET /api/orders — danh sách đơn hàng kèm customer
    public function index()
    {
        $orders = Order::with('customer')
            ->withCount('orderDetails')
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Danh sách đơn hàng',
            'data'    => $orders,
        ]);
    }

    // GET /api/orders/{id} — chi tiết đơn hàng kèm từng sản phẩm
    public function show(Order $order)
    {
        $order->load(['customer', 'orderDetails.product']);

        return response()->json([
            'success' => true,
            'data'    => $order,
        ]);
    }

    // POST /api/orders — tạo đơn hàng mới kèm danh sách sản phẩm
    public function store(Request $request)
    {
        $request->validate([
            'customer_id'        => 'required|exists:customers,id',
            'shipping_name'      => 'required|string',
            'shipping_phone'     => 'required|string|max:20',
            'shipping_address'   => 'required|string',
            'payment_method'     => 'nullable|string',
            'note'               => 'nullable|string',
            'items'              => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity'   => 'required|integer|min:1',
        ]);

        // Transaction: nếu 1 bước lỗi → rollback toàn bộ, không có order rác
        $order = DB::transaction(function () use ($request) {
            $totalAmount = 0;
            $detailsData = [];

            foreach ($request->items as $item) {
                $product  = Product::findOrFail($item['product_id']);
                $subtotal = $product->price * $item['quantity'];
                $totalAmount += $subtotal;

                $detailsData[] = [
                    'product_id'    => $product->id,
                    'product_name'  => $product->name,
                    'product_image' => $product->image,
                    'price'         => $product->price,
                    'quantity'      => $item['quantity'],
                    'subtotal'      => $subtotal,
                ];
            }

            $order = Order::create([
                'customer_id'      => $request->customer_id,
                'shipping_name'    => $request->shipping_name,
                'shipping_phone'   => $request->shipping_phone,
                'shipping_address' => $request->shipping_address,
                'note'             => $request->note,
                'total_amount'     => $totalAmount,
                'payment_method'   => $request->payment_method ?? 'COD',
                'status'           => 'pending',
            ]);

            foreach ($detailsData as $detail) {
                $order->orderDetails()->create($detail);
            }

            return $order;
        });

        return response()->json([
            'success' => true,
            'message' => 'Đặt hàng thành công!',
            'data'    => $order->load('orderDetails'),
        ], 201);
    }

    // PUT /api/orders/{id} — cập nhật trạng thái đơn hàng
    public function update(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required|in:pending,processing,shipped,delivered,cancelled',
        ]);

        $order->update(['status' => $request->status]);

        return response()->json([
            'success' => true,
            'message' => 'Cập nhật trạng thái đơn hàng thành công!',
            'data'    => $order->load(['customer', 'orderDetails']),
        ]);
    }

    // DELETE /api/orders/{id} — xóa đơn hàng (order_details tự xóa theo cascade)
    public function destroy(Order $order)
    {
        $order->delete();

        return response()->json([
            'success' => true,
            'message' => 'Đã xóa đơn hàng!'
        ]);
    }
}
