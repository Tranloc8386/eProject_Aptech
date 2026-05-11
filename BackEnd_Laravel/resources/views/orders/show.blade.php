@extends('layouts.app')
@section('content')
    <div class="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">
        <div class="flex justify-between items-center mb-8">
            <h2 class="text-2xl font-bold">Chi tiết đơn hàng #{{ $order->id }}</h2>
            <a href="{{ route('orders.index') }}" class="text-gray-500 underline">Quay lại danh sách</a>
        </div>

        <div class="grid grid-cols-2 gap-8 mb-8">
            <div class="bg-gray-50 p-4 rounded-lg">
                <h3 class="font-bold border-b mb-3 pb-2 uppercase text-sm text-gray-600">Thông tin giao hàng</h3>
                <p><strong>Người nhận:</strong> {{ $order->shipping_info['name'] }}</p>
                <p><strong>Số điện thoại:</strong> {{ $order->shipping_info['phone'] }}</p>
                <p><strong>Địa chỉ:</strong> {{ $order->shipping_info['address'] }}</p>
            </div>

            <div class="bg-gray-50 p-4 rounded-lg">
                <h3 class="font-bold border-b mb-3 pb-2 uppercase text-sm text-gray-600">Trạng thái & Thanh toán</h3>
                <form action="{{ route('orders.update', $order->id) }}" method="POST">
                    @csrf @method('PUT')
                    <select name="status" class="w-full border p-2 rounded mb-3">
                        <option value="pending" {{ $order->status == 'pending' ? 'selected' : '' }}>Chờ xử lý</option>
                        <option value="processing" {{ $order->status == 'processing' ? 'selected' : '' }}>Đang đóng gói
                        </option>
                        <option value="completed" {{ $order->status == 'completed' ? 'selected' : '' }}>Đã giao hàng
                        </option>
                        <option value="canceled" {{ $order->status == 'canceled' ? 'selected' : '' }}>Đã hủy</option>
                    </select>
                    <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded w-full">Cập nhật trạng
                        thái</button>
                </form>
            </div>
        </div>

        <table class="w-full mb-6">
            <thead>
                <tr class="bg-gray-100">
                    <th class="p-3 text-left">Sản phẩm</th>
                    <th class="p-3 text-center">Số lượng</th>
                    <th class="p-3 text-right">Đơn giá</th>
                </tr>
            </thead>
            <tbody>
                {{-- Giả định items được lưu dạng mảng các sản phẩm --}}
                @foreach ($order->items as $item)
                    <tr>
                        <td class="p-3 border-b">{{ $item['name'] }}</td>
                        <td class="p-3 border-b text-center">x{{ $item['qty'] }}</td>
                        <td class="p-3 border-b text-right">{{ number_format($item['price']) }}đ</td>
                    </tr>
                @endforeach
            </tbody>
        </table>

        <div class="text-right text-xl font-bold text-red-600">
            Tổng thanh toán: {{ number_format($order->total_amount) }}đ
        </div>
    </div>
@endsection
