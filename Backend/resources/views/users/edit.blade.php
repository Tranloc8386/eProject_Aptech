@extends('layouts.app')

@section('content')

<div class="container py-5">

    <div class="row justify-content-center">

        <div class="col-lg-7">

            <div class="card shadow border-0 rounded-4">

                <div class="card-body p-5">

                    <h2 class="fw-bold mb-4">
                        Cập nhật người dùng
                    </h2>

                    @if ($errors->any())

                        <div class="alert alert-danger">

                            <ul class="mb-0">

                                @foreach ($errors->all() as $error)

                                    <li>{{ $error }}</li>

                                @endforeach

                            </ul>

                        </div>

                    @endif

                    <form
                        action="{{ route('users.update', $user->id) }}"
                        method="POST"
                    >

                        @csrf
                        @method('PUT')

                        <div class="mb-3">

                            <label class="form-label">
                                Họ tên
                            </label>

                            <input
                                type="text"
                                name="name"
                                class="form-control"
                                value="{{ old('name', $user->name) }}"
                                required
                            >

                        </div>

                        <div class="mb-3">

                            <label class="form-label">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                class="form-control"
                                value="{{ old('email', $user->email) }}"
                                required
                            >

                        </div>

                        <div class="mb-3">

                            <label class="form-label">
                                Mật khẩu mới
                            </label>

                            <input
                                type="password"
                                name="password"
                                class="form-control"
                            >

                            <small class="text-muted">
                                Để trống nếu không muốn đổi mật khẩu
                            </small>

                        </div>

                        <div class="mb-4">

                            <label class="form-label">
                                Phân quyền
                            </label>

                            <select
                                name="role"
                                class="form-select"
                                required
                            >
                                <option
                                    value="user"
                                    {{ $user->role == 'user' ? 'selected' : '' }}
                                >
                                    Người dùng
                                </option>

                                <option
                                    value="admin"
                                    {{ $user->role == 'admin' ? 'selected' : '' }}
                                >
                                    Quản trị viên
                                </option>

                            </select>

                        </div>

                        <div class="d-flex justify-content-between">

                            <a
                                href="{{ route('users.index') }}"
                                class="btn btn-secondary"
                            >
                                Quay lại
                            </a>

                            <button
                                type="submit"
                                class="btn btn-warning"
                            >
                                Cập nhật
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    </div>

</div>

@endsection
