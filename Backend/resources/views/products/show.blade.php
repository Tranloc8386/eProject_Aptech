@extends('layouts.app')

@section('content')
<div class="container">
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h2>Chi tiết sản phẩm</h2>
        <div>
            <a href="{{ route('products.index') }}" class="btn btn-secondary">Quay lại</a>
            <a href="{{ route('products.edit', $product->id) }}" class="btn btn-warning">Sửa</a>
        </div>
    </div>

    <div class="card mb-4">
        <div class="row g-0">
            <div class="col-md-4">
                @if ($product->image)
                    <img src="{{ asset('storage/' . $product->image) }}" class="img-fluid rounded-start" alt="{{ $product->name }}">
                @else
                    <div class="d-flex align-items-center justify-content-center bg-light" style="height:100%; min-height:300px;">
                        <span class="text-muted">Không có ảnh sản phẩm</span>
                    </div>
                @endif
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h3 class="card-title">{{ $product->name }}</h3>
                    <p class="card-text"><strong>Danh mục:</strong> {{ $product->category->name ?? 'N/A' }}</p>
                    <p class="card-text"><strong>Giá:</strong> {{ number_format($product->price) }}đ</p>
                    <p class="card-text"><strong>Số lượng kho:</strong> {{ $product->stock_quantity }}</p>
                    <p class="card-text"><strong>Chất liệu:</strong> {{ $product->material ?? 'Chưa có' }}</p>
                    <p class="card-text">
                        <strong>Trạng thái nổi bật:</strong>
                        @if ($product->is_featured)
                            <span class="badge bg-success">Nổi bật</span>
                        @else
                            <span class="badge bg-secondary">Bình thường</span>
                        @endif
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
