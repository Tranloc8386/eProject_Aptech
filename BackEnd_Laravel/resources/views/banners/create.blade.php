@extends('layouts.app')

@section('content')
<div class="container">
    <div class="card p-4 shadow-sm">
        <h2>Thêm Banner mới</h2>
        <form action="{{ route('banners.store') }}" method="POST" enctype="multipart/form-data">
            @csrf
            <div class="mb-3">
                <label class="form-label">Tiêu đề</label>
                <input type="text" name="title" class="form-control" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Hình ảnh (Khuyên dùng: 1920x600)</label>
                <input type="file" name="image" class="form-control" required accept="image/*">
            </div>
            <div class="mb-3">
                <label class="form-label">Đường dẫn liên kết (Link)</label>
                <input type="text" name="link" class="form-control" placeholder="https://...">
            </div>
            <button type="submit" class="btn btn-success">Lưu Banner</button>
            <a href="{{ route('banners.index') }}" class="btn btn-secondary">Quay lại</a>
        </form>
    </div>
</div>
@endsection
