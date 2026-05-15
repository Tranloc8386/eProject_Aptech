import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export default function Register({ onRegisterSuccess, onSwitchToLogin }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setLoading(true);

        if (password !== passwordConfirm) {
            setError('Mật khẩu xác nhận không khớp.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/register`, {
                name,
                email,
                password,
                password_confirmation: passwordConfirm,
            });

            onRegisterSuccess(response.data);
        } catch (err) {
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else if (err.response?.data?.errors) {
                const messages = Object.values(err.response.data.errors).flat();
                setError(messages.join(' '));
            } else {
                setError('Đăng ký thất bại. Vui lòng thử lại.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex-grow flex items-stretch min-h-screen">
            <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-gray-100">
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent z-10"></div>
                <img
                    className="h-full w-full object-cover"
                    src="https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=1200&q=80"
                    alt="Fashion showcase"
                />
                <div className="absolute bottom-20 left-20 z-20 max-w-md">
                    <p className="text-4xl font-semibold text-white mb-4 leading-snug">
                        Tạo tài khoản và bắt đầu khám phá.
                    </p>
                    <div className="h-1 w-12 bg-pink-600"></div>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 md:px-12 py-24 bg-white">
                <div className="w-full max-w-md space-y-12">
                    <div className="space-y-4">
                        <h2 className="text-4xl font-bold text-gray-900">Đăng ký ngay</h2>
                        <p className="text-gray-500 leading-relaxed">
                            Tạo tài khoản mới để quản lý đơn hàng và khám phá bộ sưu tập độc quyền.
                        </p>
                    </div>

                    <form className="space-y-8" onSubmit={handleSubmit}>
                        {error && (
                            <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-red-700">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label htmlFor="name" className="uppercase tracking-widest text-xs text-gray-500">
                                Họ và tên
                            </label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Nguyễn Văn A"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border-0 border-b border-gray-300 focus:ring-0 focus:border-pink-600 py-3"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="uppercase tracking-widest text-xs text-gray-500">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="example@fashion.vn"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border-0 border-b border-gray-300 focus:ring-0 focus:border-pink-600 py-3"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="uppercase tracking-widest text-xs text-gray-500">
                                Mật khẩu
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border-0 border-b border-gray-300 focus:ring-0 focus:border-pink-600 py-3"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="passwordConfirm" className="uppercase tracking-widest text-xs text-gray-500">
                                Xác nhận mật khẩu
                            </label>
                            <input
                                id="passwordConfirm"
                                type="password"
                                placeholder="••••••••"
                                value={passwordConfirm}
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                                className="w-full border-0 border-b border-gray-300 focus:ring-0 focus:border-pink-600 py-3"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-pink-600 hover:bg-pink-700 disabled:opacity-70 text-white uppercase tracking-widest py-5 flex justify-center items-center gap-3 transition"
                        >
                            {loading ? 'Đang đăng ký...' : 'Đăng ký'}
                        </button>
                    </form>

                    <p className="text-center text-gray-500">
                        Đã có tài khoản?
                        <button
                            type="button"
                            onClick={onSwitchToLogin}
                            className="text-pink-600 font-semibold ml-2 hover:underline"
                        >
                            Đăng nhập ngay
                        </button>
                    </p>
                </div>
            </div>
        </main>
    );
}
