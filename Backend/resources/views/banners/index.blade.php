@extends('layouts.app')

@section('content')

<div class="container py-4">

    <div class="d-flex justify-content-between align-items-center mb-4">

        <h2 class="fw-bold">
            Danh sách Banner
        </h2>

        <a href="{{ route('banners.create') }}"
           class="btn btn-primary">

            Thêm banner mới

        </a>

    </div>

    {{-- Thông báo --}}
    @if(session('success'))

        <div class="alert alert-success">

            {{ session('success') }}

        </div>

    @endif

    @if(session('error'))

        <div class="alert alert-danger">

            {{ session('error') }}

        </div>

    @endif

    <div class="card shadow-sm">

        <div class="card-body p-0">

            <table class="table table-bordered align-middle mb-0">

                <thead class="table-dark">

                    <tr>

                        <th width="80">
                            ID
                        </th>

                        <th width="220">
                            Hình ảnh
                        </th>

                        <th>
                            Tiêu đề
                        </th>

                        <th width="200">
                            Hành động
                        </th>

                    </tr>

                </thead>

                <tbody>

                    @forelse ($banners as $banner)

                        <tr>

                            <td>
                                {{ $banner->id }}
                            </td>

                            <td>

                                @if ($banner->image)

                                    <img
                                        src="{{ asset('uploads/banners/' . $banner->image) }}"
                                        alt="{{ $banner->title }}"
                                        width="180"
                                        class="img-thumbnail">

                                @else

                                    <span class="text-muted">
                                        Không có ảnh
                                    </span>

                                @endif

                            </td>

                            <td>

                                {{ $banner->title }}

                            </td>

                            <td>

                                <a href="{{ route('banners.edit', $banner->id) }}"
                                   class="btn btn-warning btn-sm">

                                    Sửa

                                </a>

                                <form
                                    action="{{ route('banners.destroy', $banner->id) }}"
                                    method="POST"
                                    class="d-inline"
                                    onsubmit="return confirm('Bạn có chắc muốn xóa banner này?')">

                                    @csrf
                                    @method('DELETE')

                                    <button
                                        type="submit"
                                        class="btn btn-danger btn-sm">

                                        Xóa

                                    </button>

                                </form>

                            </td>

                        </tr>

                    @empty

                        <tr>

                            <td colspan="4" class="text-center py-4">

                                Chưa có banner nào

                            </td>

                        </tr>

                    @endforelse

                </tbody>

            </table>

        </div>

    </div>

</div>

@endsection
