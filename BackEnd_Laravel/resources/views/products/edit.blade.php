@extends('layouts.app')

@section('content')
<div class="container">
    <h2>Chỉnh sửa sản phẩm: {{ $product->name }}</h2>
    <form action="{{ route('products.update', $product->id) }}" method="POST" enctype="multipart/form-data" class="card p-4 shadow-sm">
        @csrf
        @method('PUT')

        <div class="row">
            <div class="col-md-6 mb-3">
                <label class="form-label">Tên sản phẩm</label>
                <input type="text" name="name" class="form-control" value="{{ $product->name }}" required>
            </div>
            <div class="col-md-6 mb-3">
                <label class="form-label">Danh mục</label>
                <select name="category_id" class="form-select" required>
                    @foreach($categories as $cat)
                        <option value="{{ $cat->id }}" {{ $product->category_id == $cat->id ? 'selected' : '' }}>
                            {{ $cat->name }}
                        </option>
                    @endforeach
                </select>
            </div>
        </div>

        <div class="row">
            <div class="col-md-4 mb-3">
                <label class="form-label">Giá (VNĐ)</label>
                <input type="number" name="price" class="form-control" value="{{ $product->price }}" required>
            </div>
            <div class="col-md-4 mb-3">
                <label class="form-label">Số lượng kho</label>
                <input type="number" name="stock_quantity" class="form-control" value="{{ $product->stock_quantity }}" required>
            </div>
            <div class="col-md-4 mb-3">
                <label class="form-label">Chất liệu</label>
                <input type="text" name="material" class="form-control" value="{{ $product->material }}">
            </div>
        </div>

        <div class="mb-3">
            <label class="form-label d-block">Hình ảnh hiện tại</label>
            @if($product->image)
                <img src="{{ str_contains($product->image, 'http') ? $product->image : asset('storage/' . $product->image) }}"
                     width="150" class="img-thumbnail mb-2 shadow-sm">
            @endif
            <input type="file" name="image" class="form-control" accept="image/*">
            <small class="text-muted">Để trống nếu không muốn thay đổi ảnh.</small>
        </div>

        <div class="mb-3 form-check">
            <input type="checkbox" name="is_featured" class="form-check-input" id="featured" {{ $product->is_featured ? 'checked' : '' }}>
            <label class="form-check-label" for="featured">Sản phẩm nổi bật</label>
        </div>

        <div class="mt-3">
            <button type="submit" class="btn btn-warning">Cập nhật sản phẩm</button>
            <a href="{{ route('products.index') }}" class="btn btn-secondary">Hủy bỏ</a>
        </div>
    </form>
</div>
@endsection
