<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Customer;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    // GET /api/cart/{customer_id}
    public function show($customerId)
    {
        $customer = Customer::findOrFail($customerId);
        $cart = Cart::firstOrCreate(
            ['customer_id' => $customerId],
            ['items' => [], 'total_quantity' => 0, 'total_price' => 0, 'status' => 'active']
        );

        return response()->json([
            'success' => true,
            'data'    => $cart,
        ]);
    }

    // POST /api/cart/{customer_id}/items
    // body: { product_id, quantity }
    public function addItem(Request $request, $customerId)
    {
        Customer::findOrFail($customerId);

        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity'   => 'required|integer|min:1',
        ]);

        $product = Product::findOrFail($request->product_id);

        if ($product->stock_quantity < $request->quantity) {
            return response()->json([
                'success' => false,
                'message' => 'Sản phẩm không đủ số lượng trong kho.',
            ], 422);
        }

        $cart = Cart::firstOrCreate(
            ['customer_id' => $customerId],
            ['items' => [], 'total_quantity' => 0, 'total_price' => 0, 'status' => 'active']
        );

        $items = $cart->items ?? [];
        $index = collect($items)->search(fn($i) => $i['product_id'] == $request->product_id);

        if ($index !== false) {
            $newQty = $items[$index]['quantity'] + $request->quantity;
            if ($product->stock_quantity < $newQty) {
                return response()->json([
                    'success' => false,
                    'message' => 'Vượt quá số lượng tồn kho.',
                ], 422);
            }
            $items[$index]['quantity'] = $newQty;
            $items[$index]['subtotal'] = $newQty * $items[$index]['price'];
        } else {
            $items[] = [
                'product_id'    => $product->id,
                'product_name'  => $product->name,
                'product_image' => $product->image_url,
                'price'         => (float) $product->price,
                'quantity'      => $request->quantity,
                'subtotal'      => (float) $product->price * $request->quantity,
            ];
        }

        $cart->update([
            'items'          => $items,
            'total_quantity' => collect($items)->sum('quantity'),
            'total_price'    => collect($items)->sum('subtotal'),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Đã thêm vào giỏ hàng!',
            'data'    => $cart->fresh(),
        ]);
    }

    // PUT /api/cart/{customer_id}/items/{product_id}
    // body: { quantity }
    public function updateItem(Request $request, $customerId, $productId)
    {
        $request->validate(['quantity' => 'required|integer|min:0']);

        $cart = Cart::where('customer_id', $customerId)->firstOrFail();
        $items = $cart->items ?? [];
        $index = collect($items)->search(fn($i) => $i['product_id'] == $productId);

        if ($index === false) {
            return response()->json(['success' => false, 'message' => 'Sản phẩm không có trong giỏ.'], 404);
        }

        if ($request->quantity == 0) {
            array_splice($items, $index, 1);
        } else {
            $product = Product::find($productId);
            if ($product && $product->stock_quantity < $request->quantity) {
                return response()->json(['success' => false, 'message' => 'Không đủ hàng trong kho.'], 422);
            }
            $items[$index]['quantity'] = $request->quantity;
            $items[$index]['subtotal'] = $items[$index]['price'] * $request->quantity;
        }

        $cart->update([
            'items'          => array_values($items),
            'total_quantity' => collect($items)->sum('quantity'),
            'total_price'    => collect($items)->sum('subtotal'),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Đã cập nhật giỏ hàng!',
            'data'    => $cart->fresh(),
        ]);
    }

    // DELETE /api/cart/{customer_id}/items/{product_id}
    public function removeItem($customerId, $productId)
    {
        $cart = Cart::where('customer_id', $customerId)->firstOrFail();
        $items = collect($cart->items ?? [])->filter(fn($i) => $i['product_id'] != $productId)->values()->all();

        $cart->update([
            'items'          => $items,
            'total_quantity' => collect($items)->sum('quantity'),
            'total_price'    => collect($items)->sum('subtotal'),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Đã xóa sản phẩm khỏi giỏ!',
            'data'    => $cart->fresh(),
        ]);
    }

    // DELETE /api/cart/{customer_id}
    public function clear($customerId)
    {
        $cart = Cart::where('customer_id', $customerId)->firstOrFail();
        $cart->update([
            'items'          => [],
            'total_quantity' => 0,
            'total_price'    => 0,
            'status'         => 'active',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Đã xóa toàn bộ giỏ hàng!',
        ]);
    }
}
