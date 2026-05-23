@extends('layouts.app')
@section('content')
    <div class="p-6 bg-white rounded-xl shadow">
        <h2 class="text-2xl font-bold mb-6">Quản lý Đơn hàng</h2>

        <table class="w-full border-collapse">
            <thead>
                <tr class="bg-gray-100 text-left">
                    <th class="p-3 border-b">Mã đơn</th>
                    <th class="p-3 border-b">Khách hàng</th>
                    <th class="p-3 border-b">Tổng tiền</th>
                    <th class="p-3 border-b">Thanh toán</th>
                    <th class="p-3 border-b">Trạng thái</th>
                    <th class="p-3 border-b text-center">Thao tác</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($orders as $order)
                    <tr>
                        <td class="p-3 border-b">#{{ $order->id }}</td>
                        <td class="p-3 border-b">{{ $order->shipping_info['name'] ?? 'Khách lẻ' }}</td>
                        <td class="p-3 border-b font-bold text-red-600">{{ number_format($order->total_amount) }}đ</td>
                        <td class="p-3 border-b">{{ $order->payment_method }}</td>
                        <td class="p-3 border-b">
                            <span
                                class="px-2 py-1 rounded text-xs {{ $order->status == 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700' }}">
                                {{ strtoupper($order->status) }}
                            </span>
                        </td>
                        <td class="p-3 border-b text-center space-x-2">
                            <a href="{{ route('orders.show', $order->id) }}" class="text-blue-600 font-bold">Xem chi
                                tiết</a>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endsection
