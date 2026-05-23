@extends('layouts.app')

@section('content')
<div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="fw-bold">Thêm Banner Mới</h2>
        <a href="{{ route('banners.index') }}" class="btn btn-secondary">Quay lại</a>
    </div>

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
            <form action="{{ route('banners.store') }}" method="POST" enctype="multipart/form-data">
                @csrf

                <div class="mb-3">
                    <label class="form-label fw-bold">Tiêu đề banner</label>
                    <input type="text" name="title" value="{{ old('title') }}" class="form-control" required>
                </div>

                <div class="mb-3">
                    <label class="form-label fw-bold">Hình ảnh banner</label>
                    <input type="file" name="image" class="form-control" required>
                </div>

                <input type="hidden" name="bg" value="#ffffff">
                <input type="hidden" name="order" value="0">
                <input type="hidden" name="is_active" value="1">

                <button type="submit" class="btn btn-primary">Thêm banner</button>
            </form>
        </div>
    </div>
</div>
@endsection
