@extends('layouts.app')

@section('content')
<div class="container">
    <h2>Chỉnh sửa sản phẩm: {{ $product->name }}</h2>
    <hr>

    <form action="{{ route('products.update', $product->id) }}" method="POST" enctype="multipart/form-data">
        @csrf
        @method('POST')
        <div class="mb-3">
            <label class="form-label">Tên sản phẩm</label>
            <input type="text" name="name" class="form-control" value="{{ old('name', $product->name) }}" required>
        </div>

        <div class="mb-3">
            <label class="form-label">Danh mục</label>
            <select name="category_id" class="form-control">
                @foreach($categories as $category)
                    <option value="{{ $category->id }}" {{ $product->category_id == $category->id ? 'selected' : '' }}>
                        {{ $category->name }}
                    </option>
                @endforeach
            </select>
        </div>

        <div class="mb-3">
            <label class="form-label">Giá sản phẩm</label>
            <input type="number" name="price" class="form-control" value="{{ old('price', $product->price) }}" required>
        </div>

        <div class="mb-3">
            <label class="form-label">Số lượng kho</label>
            <input type="number" name="stock_quantity" class="form-control" value="{{ old('stock_quantity', $product->stock_quantity) }}" required>
        </div>

        <div class="mb-3">
            <label class="form-label">Hình ảnh hiện tại</label><br>
            @if($product->image)
                <img src="{{ asset('storage/' . $product->image) }}" width="150" class="mb-2 img-thumbnail">
            @endif
            <input type="file" name="image" class="form-control">
            <small class="text-muted">Để trống nếu không muốn thay đổi ảnh</small>
        </div>

        <div class="mb-3 form-check">
            <input type="checkbox" name="is_featured" class="form-check-input" id="featured" {{ $product->is_featured ? 'checked' : '' }}>
            <label class="form-check-label" for="featured">Sản phẩm nổi bật</label>
        </div>

        <button type="submit" class="btn btn-primary">Cập nhật sản phẩm</button>
        <a href="{{ route('products.index') }}" class="btn btn-secondary">Quay lại</a>
    </form>
</div>
@endsection
