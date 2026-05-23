@extends('layouts.app')

@section('content')

<div class="container py-5">

    <div class="row justify-content-center">

        <div class="col-lg-7">

            <div class="card shadow border-0 rounded-4">

                <div class="card-body p-5">

                    <div class="d-flex justify-content-between align-items-center mb-4">

                        <h2 class="fw-bold mb-0">
                            Chi tiết người dùng
                        </h2>

                        <a
                            href="{{ route('users.index') }}"
                            class="btn btn-secondary"
                        >
                            Quay lại
                        </a>

                    </div>

                    <hr>

                    <div class="mb-4">

                        <label class="text-muted mb-1">
                            ID
                        </label>

                        <h5>
                            #{{ $user->id }}
                        </h5>

                    </div>

                    <div class="mb-4">

                        <label class="text-muted mb-1">
                            Họ tên
                        </label>

                        <h5>
                            {{ $user->name }}
                        </h5>

                    </div>

                    <div class="mb-4">

                        <label class="text-muted mb-1">
                            Email
                        </label>

                        <h5>
                            {{ $user->email }}
                        </h5>

                    </div>

                    <div class="mb-4">

                        <label class="text-muted mb-1">
                            Phân quyền
                        </label>

                        <div>

                            @if($user->role == 'admin')

                                <span class="badge bg-danger fs-6">
                                    Quản trị viên
                                </span>

                            @else

                                <span class="badge bg-primary fs-6">
                                    Người dùng
                                </span>

                            @endif

                        </div>

                    </div>

                    <div class="mb-4">

                        <label class="text-muted mb-1">
                            Ngày tạo
                        </label>

                        <h5>
                            {{ $user->created_at->format('d/m/Y H:i') }}
                        </h5>

                    </div>

                    <div class="d-flex gap-2 mt-4">

                        <a
                            href="{{ route('users.edit', $user->id) }}"
                            class="btn btn-warning"
                        >
                            Sửa
                        </a>

                        <form
                            action="{{ route('users.destroy', $user->id) }}"
                            method="POST"
                        >

                            @csrf
                            @method('DELETE')

                            <button
                                type="submit"
                                class="btn btn-danger"
                                onclick="return confirm('Xóa user này?')"
                            >
                                Xóa
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>

    </div>

</div>

@endsection
