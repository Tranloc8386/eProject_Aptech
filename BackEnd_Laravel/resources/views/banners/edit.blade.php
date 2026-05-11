@extends('layouts.app')

@section('content')
<div class="container">
    <div class="card p-4 shadow-sm">
        <h2>Chỉnh sửa Banner</h2>
        <form action="{{ route('banners.update', $banner->id) }}" method="POST" enctype="multipart/form-data">
            @csrf @method('PUT')
            <div class="mb-3">
                <label class="form-label">Tiêu đề</label>
                <input type="text" name="title" class="form-control" value="{{ $banner->title }}" required>
            </div>
            <div class="mb-3">
                <label class="form-label d-block">Ảnh hiện tại</label>
                <img src="{{ $banner->image_url }}" width="300" class="img-thumbnail mb-2">
                <input type="file" name="image" class="form-control" accept="image/*">
                <small class="text-muted">Bỏ trống nếu muốn giữ nguyên ảnh cũ.</small>
            </div>
            <div class="mb-3">
                <label class="form-label">Đường dẫn liên kết (Link)</label>
                <input type="text" name="link" class="form-control" value="{{ $banner->link }}">
            </div>
            <button type="submit" class="btn btn-warning">Cập nhật</button>
            <a href="{{ route('banners.index') }}" class="btn btn-secondary">Hủy</a>
        </form>
    </div>
</div>
@endsection
