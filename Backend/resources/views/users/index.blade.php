@extends('layouts.app')

@section('content')

<style>
    .user-card{
        border:none;
        border-radius:20px;
        overflow:hidden;
    }

    .btn-action{
        width:36px;
        height:36px;
        border:none;
        border-radius:10px;
        display:inline-flex;
        align-items:center;
        justify-content:center;
        color:white;
        text-decoration:none;
    }

    .btn-show{
        background:#0ea5e9;
    }

    .btn-edit{
        background:#f59e0b;
    }

    .btn-delete{
        background:#dc2626;
    }

    .add-btn{
        background:#2563eb;
        color:white;
        padding:10px 18px;
        border-radius:10px;
        text-decoration:none;
    }
</style>

<div class="container py-5">

    <div class="d-flex justify-content-between align-items-center mb-4">

        <div>
            <h2 class="fw-bold mb-1">
                Quản lý người dùng
            </h2>

            <p class="text-muted mb-0">
                Maverick Dresses
            </p>
        </div>

        <a
            href="{{ route('users.create') }}"
            class="add-btn"
        >
            + Thêm user
        </a>

    </div>

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

    <div class="card shadow user-card">

        <div class="card-body p-0">

            <div class="table-responsive">

                <table class="table align-middle mb-0">

                    <thead class="table-light">

                        <tr>
                            <th>ID</th>
                            <th>Họ tên</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th class="text-center">
                                Thao tác
                            </th>
                        </tr>

                    </thead>

                    <tbody>

                        @forelse($users as $user)

                            <tr>

                                <td>
                                    #{{ $user->id }}
                                </td>

                                <td>
                                    {{ $user->name }}
                                </td>

                                <td>
                                    {{ $user->email }}
                                </td>

                                <td>

                                    @if($user->role == 'admin')

                                        <span class="badge bg-danger">
                                            Admin
                                        </span>

                                    @else

                                        <span class="badge bg-primary">
                                            User
                                        </span>

                                    @endif

                                </td>

                                <td class="text-center">

                                    <a
                                        href="{{ route('users.show', $user->id) }}"
                                        class="btn-action btn-show me-2"
                                    >
                                        <i class="fas fa-eye"></i>
                                    </a>

                                    <a
                                        href="{{ route('users.edit', $user->id) }}"
                                        class="btn-action btn-edit me-2"
                                    >
                                        <i class="fas fa-edit"></i>
                                    </a>

                                    <form
                                        action="{{ route('users.destroy', $user->id) }}"
                                        method="POST"
                                        class="d-inline"
                                    >
                                        @csrf
                                        @method('DELETE')

                                        <button
                                            type="submit"
                                            class="btn-action btn-delete"
                                            onclick="return confirm('Xóa user này?')"
                                        >
                                            <i class="fas fa-trash"></i>
                                        </button>

                                    </form>

                                </td>

                            </tr>

                        @empty

                            <tr>

                                <td colspan="5" class="text-center py-4">
                                    Chưa có user
                                </td>

                            </tr>

                        @endforelse

                    </tbody>

                </table>

            </div>

        </div>

    </div>

</div>

<link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
/>

@endsection
