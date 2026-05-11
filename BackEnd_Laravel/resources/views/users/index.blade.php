@extends('layouts.app')

@section('content')
<style>
    .user-card { border: none; border-radius: 15px; overflow: hidden; }
    .table thead { background-color: #f8f9fa; text-transform: uppercase; font-size: 0.85rem; }
    .badge { padding: 8px 12px; border-radius: 8px; font-weight: 500; font-size: 0.8rem; }

    /* CSS cho các nút trong cột Thao tác */
    .btn-action {
        width: 35px;
        height: 35px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        transition: all 0.3s;
        border: none;
        color: white !important;
        text-decoration: none;
    }
    .btn-edit { background-color: #ffc107; } /* Màu vàng cho nút Sửa */
    .btn-delete { background-color: #dc3545; } /* Màu đỏ cho nút Xóa */
    .btn-action:hover { transform: translateY(-2px); opacity: 0.9; }

    .add-btn {
        background: linear-gradient(45deg, #4e73df, #224abe);
        border: none; padding: 10px 20px; border-radius: 10px;
        font-weight: 600; color: white; text-decoration: none;
    }
</style>

<div class="container py-5">
    <div class="row mb-4 align-items-center">
        <div class="col">
            <h2 class="fw-bold text-dark">Quản lý người dùng</h2>
            <p class="text-muted mb-0">Hệ thống Maverick Dresses</p>
        </div>
        <div class="col-auto">
            <a href="{{ route('users.create') }}" class="add-btn">
                <i class="fas fa-plus-circle me-2"></i> Thêm người dùng mới
            </a>
        </div>
    </div>

    @if(session('success'))
        <div class="alert alert-success border-0 shadow-sm mb-4">
            {{ session('success') }}
        </div>
    @endif

    <div class="card shadow user-card">
        <div class="card-body p-0">
            <div class="table-responsive">
                <table class="table table-hover align-middle mb-0">
                    <thead>
                        <tr>
                            <th class="ps-4">ID</th>
                            <th>Họ và tên</th>
                            <th>Email</th>
                            <th>Phân quyền</th>
                            <th class="text-center pe-4">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($users as $user)
                        <tr>
                            <td class="ps-4 text-muted">#{{ $user->id }}</td>
                            <td><span class="fw-bold">{{ $user->name }}</span></td>
                            <td>{{ $user->email }}</td>
                            <td>
                                @if($user->role == 'admin')
                                    <span class="badge" style="background-color: #fee2e2; color: #dc2626;">Quản trị viên</span>
                                @else
                                    <span class="badge" style="background-color: #e0f2fe; color: #0284c7;">Người dùng</span>
                                @endif
                            </td>
                            <td class="text-center pe-4">
                                <a href="{{ route('users.edit', $user->id) }}" class="btn-action btn-edit me-2" title="Sửa">
                                    <i class="fas fa-edit"></i>
                                </a>

                                <form action="{{ route('users.destroy', $user->id) }}" method="POST" class="d-inline">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="btn-action btn-delete" title="Xóa" onclick="return confirm('Xóa người dùng này?')">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </form>
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
@endsection
