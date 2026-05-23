@extends('layouts.app')

@section('content')

<div class="container py-4">

    <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="fw-bold">
            Thêm sản phẩm mới
        </h2>

        <a href="{{ route('products.index') }}"
           class="btn btn-secondary">
            Quay lại
        </a>
    </div>

    {{-- Hiển thị lỗi validate --}}
    @if ($errors->any())

        <div class="alert alert-danger">

            <ul class="mb-0">

                @foreach ($errors->all() as $error)

                    <li>{{ $error }}</li>

                @endforeach

            </ul>

        </div>

    @endif

    <div class="card shadow-sm">

        <div class="card-body">

            <form
                action="{{ route('products.store') }}"
                method="POST"
                enctype="multipart/form-data">

                @csrf

                {{-- Tên sản phẩm --}}
                <div class="mb-3">

                    <label class="form-label fw-bold">
                        Tên sản phẩm
                    </label>

                    <input
                        type="text"
                        name="name"
                        value="{{ old('name') }}"
                        class="form-control"
                        required>

                </div>

                {{-- Danh mục --}}
                <div class="mb-3">

                    <label class="form-label fw-bold">
                        Danh mục
                    </label>

                    <select
                        name="category_id"
                        class="form-select"
                        required>

                        <option value="">
                            -- Chọn danh mục --
                        </option>

                        @foreach ($categories as $category)

                            <option
                                value="{{ $category->id }}"
                                {{ old('category_id') == $category->id ? 'selected' : '' }}>

                                {{ $category->name }}

                            </option>

                        @endforeach

                    </select>

                </div>

                {{-- Giá --}}
                <div class="mb-3">

                    <label class="form-label fw-bold">
                        Giá sản phẩm
                    </label>

                    <input
                        type="number"
                        name="price"
                        value="{{ old('price') }}"
                        class="form-control"
                        min="0"
                        required>

                </div>

                {{-- Số lượng --}}
                <div class="mb-3">

                    <label class="form-label fw-bold">
                        Số lượng kho
                    </label>

                    <input
                        type="number"
                        name="stock_quantity"
                        value="{{ old('stock_quantity') }}"
                        class="form-control"
                        min="0"
                        required>

                </div>

                {{-- Mô tả --}}
                <div class="mb-3">

                    <label class="form-label fw-bold">
                        Mô tả sản phẩm
                    </label>

                    <textarea
                        name="description"
                        rows="5"
                        class="form-control">{{ old('description') }}</textarea>

                </div>

                {{-- Ảnh sản phẩm --}}
                <div class="mb-3">

                    <label class="form-label fw-bold">
                        Hình ảnh sản phẩm
                    </label>

                    <input
                        type="file"
                        name="image"
                        class="form-control">

                </div>

                {{-- Sản phẩm nổi bật --}}
                <div class="form-check mb-4">

                    <input
                        type="checkbox"
                        name="is_featured"
                        value="1"
                        class="form-check-input"
                        id="featured">

                    <label
                        class="form-check-label"
                        for="featured">

                        Đánh dấu là sản phẩm nổi bật

                    </label>

                </div>

                {{-- Nút submit --}}
                <button
                    type="submit"
                    class="btn btn-primary">

                    Thêm sản phẩm

                </button>

            </form>

        </div>

    </div>

</div>

@endsection
