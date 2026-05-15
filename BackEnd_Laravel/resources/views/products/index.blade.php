@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h2>Danh sách sản phẩm</h2>
            <a href="{{ route('products.create') }}" class="btn btn-primary">Thêm sản phẩm mới</a>
        </div>

        @if (session('success'))
            <div class="alert alert-success">{{ session('success') }}</div>
        @endif

        <table class="table table-bordered">
            <thead class="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Hình ảnh</th>
                    <th>Tên sản phẩm</th>
                    <th>Danh mục</th>
                    <th>Giá</th>
                    <th>Kho</th>
                    <th>Nổi bật</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($products as $product)
                    <tr>
                        <td>{{ $product->id }}</td>
                        <td>
                        <td>
                            @if ($product->image)
                                @if (\Illuminate\Support\Str::startsWith($product->image, 'http'))
                                    <img src="{{ $product->image }}" alt="{{ $product->name }}" width="80"
                                        class="img-thumbnail">
                                @else
                                    <img src="{{ asset('products/' . $product->image) }}" alt="{{ $product->name }}"
                                        width="80" class="img-thumbnail">
                                @endif
                            @else
                                <span class="text-muted">
                                    Không có ảnh
                                </span>
                            @endif

                        </td>
                        </td>
                        <td>{{ $product->name }}</td>
                        <td>{{ $product->category->name ?? 'N/A' }}</td>
                        <td>{{ number_format($product->price) }}đ</td>
                        <td>{{ $product->stock_quantity }}</td>
                        <td>
                            {!! $product->is_featured
                                ? '<span class="badge bg-success">Có</span>'
                                : '<span class="badge bg-secondary">Không</span>' !!}
                        </td>
                        <td>
                            <a href="{{ route('products.show', $product->id) }}" class="btn btn-sm btn-info">Xem</a>
                            <a href="{{ route('products.edit', $product->id) }}" class="btn btn-sm btn-warning">Sửa</a>
                            <form action="{{ route('products.destroy', $product->id) }}" method="POST" class="d-inline"
                                onsubmit="return confirm('Bạn có chắc chắn muốn xóa?')">
                                @csrf
                                @method('DELETE')
                                <button class="btn btn-sm btn-danger">Xóa</button>
                            </form>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endsection
