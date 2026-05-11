@extends('layouts.app')

@section('content')
<div class="container">
    <h2>Thêm sản phẩm mới</h2>
    <form action="{{ route('products.store') }}" method="POST" enctype="multipart/form-data" class="card p-4 shadow-sm">
        @csrf
        <div class="row">
            <div class="col-md-6 mb-3">
                <label class="form-label">Tên sản phẩm</label>
                <input type="text" name="name" class="form-control" required>
            </div>
            <div class="col-md-6 mb-3">
                <label class="form-label">Danh mục</label>
                <select name="category_id" class="form-select" required>
                    <option value="">Chọn danh mục</option>
                    @foreach($categories as $cat)
                        <option value="{{ $cat->id }}">{{ $cat->name }}</option>
                    @endforeach
                </select>
            </div>
        </div>

        <div class="row">
            <div class="col-md-4 mb-3">
                <label class="form-label">Giá (VNĐ)</label>
                <input type="number" name="price" class="form-control" required>
            </div>
            <div class="col-md-4 mb-3">
                <label class="form-label">Số lượng kho</label>
                <input type="number" name="stock_quantity" class="form-control" required>
            </div>
            <div class="col-md-4 mb-3">
                <label class="form-label">Chất liệu</label>
                <input type="text" name="material" class="form-control">
            </div>
        </div>

        <div class="mb-3">
            <label class="form-label">Hình ảnh sản phẩm</label>
            <input type="file" name="image" class="form-control" accept="image/*">
        </div>

        <div class="mb-3 form-check">
            <input type="checkbox" name="is_featured" class="form-check-input" id="featured">
            <label class="form-check-label" for="featured">Sản phẩm nổi bật</label>
        </div>

        <div class="mt-3">
            <button type="submit" class="btn btn-success">Lưu sản phẩm</button>
            <a href="{{ route('products.index') }}" class="btn btn-secondary">Quay lại</a>
        </div>
    </form>
</div>
@endsection
