<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Customer;
use App\Models\Product;
use App\Models\Feedback;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $now       = Carbon::now();
        $thisMonth = $now->copy()->startOfMonth();
        $lastMonth = $now->copy()->subMonth()->startOfMonth();
        $lastMonthEnd = $now->copy()->subMonth()->endOfMonth();

        // ── KPI ──────────────────────────────────────────────
        $totalRevenue     = Order::where('status', 'delivered')->sum('total_amount');
        $revenueLastMonth = Order::where('status', 'delivered')
            ->whereBetween('created_at', [$lastMonth, $lastMonthEnd])->sum('total_amount');
        $revenueThisMonth = Order::where('status', 'delivered')
            ->where('created_at', '>=', $thisMonth)->sum('total_amount');

        $processingOrders = Order::whereIn('status', ['pending', 'processing', 'shipped'])->count();
        $processingLast   = Order::whereIn('status', ['pending', 'processing', 'shipped'])
            ->whereBetween('created_at', [$lastMonth, $lastMonthEnd])->count();
        $processingThis   = Order::whereIn('status', ['pending', 'processing', 'shipped'])
            ->where('created_at', '>=', $thisMonth)->count();

        $totalCustomers   = Customer::count();
        $customersLast    = Customer::whereBetween('created_at', [$lastMonth, $lastMonthEnd])->count();
        $customersThis    = Customer::where('created_at', '>=', $thisMonth)->count();

        // ── BIỂU ĐỒ: doanh số 7 ngày gần nhất ───────────────
        $weekDays = [];
        for ($i = 6; $i >= 0; $i--) {
            $day = $now->copy()->subDays($i);
            $revenue = Order::where('status', 'delivered')
                ->whereDate('created_at', $day->toDateString())
                ->sum('total_amount');
            $weekDays[] = [
                'label'   => $day->locale('vi')->isoFormat('dd'),
                'revenue' => (float) $revenue,
            ];
        }

        // ── SẢN PHẨM BÁN CHẠY ────────────────────────────────
        $topProducts = DB::table('order_details')
            ->join('products', 'order_details.product_id', '=', 'products.id')
            ->join('categories', 'products.category_id', '=', 'categories.id')
            ->select(
                'products.id',
                'products.name',
                'products.price',
                'products.stock_quantity',
                'categories.name as category_name',
                DB::raw('SUM(order_details.quantity) as total_sold'),
                DB::raw('COUNT(DISTINCT order_details.order_id) as order_count')
            )
            ->groupBy('products.id', 'products.name', 'products.price', 'products.stock_quantity', 'categories.name')
            ->orderByDesc('total_sold')
            ->limit(5)
            ->get();

        // ── HOẠT ĐỘNG GẦN ĐÂY ────────────────────────────────
        $recentOrders = Order::with('customer')
            ->latest()->limit(3)->get()
            ->map(fn($o) => [
                'type'       => 'order',
                'content'    => "Đơn hàng #{$o->id} — " . ($o->customer?->name ?? $o->shipping_name),
                'status'     => $o->status,
                'created_at' => $o->created_at,
            ]);

        $lowStockProducts = Product::where('stock_quantity', '<=', 5)
            ->where('stock_quantity', '>', 0)
            ->limit(3)->get()
            ->map(fn($p) => [
                'type'       => 'warning',
                'content'    => "Sắp hết hàng: {$p->name} (còn {$p->stock_quantity})",
                'created_at' => $p->updated_at,
            ]);

        $pendingFeedbacks = Feedback::where('status', 'pending')
            ->latest()->limit(2)->get()
            ->map(fn($f) => [
                'type'       => 'feedback',
                'content'    => "Feedback mới từ {$f->name}",
                'created_at' => $f->created_at,
            ]);

        $activities = $recentOrders->concat($lowStockProducts)->concat($pendingFeedbacks)
            ->sortByDesc('created_at')->values()->take(5);

        // ── THỐNG KÊ NHANH ────────────────────────────────────
        $pendingFeedbackCount = Feedback::where('status', 'pending')->count();
        $outOfStock           = Product::where('stock_quantity', 0)->count();

        return response()->json([
            'success' => true,
            'data'    => [
                'kpi' => [
                    'total_revenue'      => (float) $totalRevenue,
                    'revenue_growth'     => $revenueLastMonth > 0
                        ? round(($revenueThisMonth - $revenueLastMonth) / $revenueLastMonth * 100, 1) : 0,
                    'processing_orders'  => $processingOrders,
                    'orders_growth'      => $processingLast > 0
                        ? round(($processingThis - $processingLast) / $processingLast * 100, 1) : 0,
                    'total_customers'    => $totalCustomers,
                    'customers_growth'   => $customersLast > 0
                        ? round(($customersThis - $customersLast) / $customersLast * 100, 1) : 0,
                ],
                'chart'            => $weekDays,
                'top_products'     => $topProducts,
                'activities'       => $activities,
                'pending_feedbacks'=> $pendingFeedbackCount,
                'out_of_stock'     => $outOfStock,
            ],
        ]);
    }
}
