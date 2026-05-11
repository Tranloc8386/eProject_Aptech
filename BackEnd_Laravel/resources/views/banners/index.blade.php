@extends('layouts.app')

@section('content')
<div class="container">
    <div class="d-flex justify-content-between mb-3">
        <h2>Quản lý Banner</h2>
        <a href="{{ route('banners.create') }}" class="btn btn-primary">Thêm Banner mới</a>
    </div>

    <table class="table table-bordered bg-white shadow-sm">
        <thead class="table-dark">
            <tr>
                <th>Hình ảnh</th>
                <th>Tiêu đề</th>
                <th>Liên kết</th>
                <th>Hành động</th>
            </tr>
        </thead>
        <tbody>
            @foreach($banners as $banner)
            <tr>
                <td>
                    <img src="{{ $banner->image_url }}" width="200" class="img-thumbnail">
                </td>
                <td>{{ $banner->title }}</td>
                <td>{{ $banner->link ?? 'Không có' }}</td>
                <td>
                    <a href="{{ route('banners.edit', $banner->id) }}" class="btn btn-sm btn-warning">Sửa</a>
                    <form action="{{ route('banners.destroy', $banner->id) }}" method="POST" class="d-inline" onsubmit="return confirm('Xóa banner này?')">
                        @csrf @method('DELETE')
                        <button class="btn btn-sm btn-danger">Xóa</button>
                    </form>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection
