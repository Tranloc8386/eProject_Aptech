<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Customer;
use App\Models\Order;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $q = trim($request->query('q', ''));

        if (strlen($q) < 2) {
            return response()->json([
                'products'  => [],
                'customers' => [],
                'orders'    => []
            ]);
        }

        $like = "%{$q}%";

        $products = Product::where('name', 'LIKE', $like)
            ->select('id', 'name', 'price', 'image')
            ->limit(5)
            ->get();

        $customers = Customer::where('name', 'LIKE', $like)
            ->orWhere('email', 'LIKE', $like)
            ->select('id', 'name', 'email')
            ->limit(5)
            ->get();

        $orders = Order::where('shipping_name', 'LIKE', $like)
            ->orWhere('id', is_numeric($q) ? $q : 0)
            ->select('id', 'shipping_name', 'status', 'total_amount')
            ->limit(5)
            ->get();

        return response()->json([
            'products'  => $products,
            'customers' => $customers,
            'orders'    => $orders,
        ]);
    }
}
