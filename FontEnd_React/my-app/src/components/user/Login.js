import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export default function Login({ onLoginSuccess, onSwitchToRegister }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post(`${API_BASE_URL}/login`, {
                email,
                password,
            });
            onLoginSuccess(response.data);
        } catch (err) {
            setError('Email hoặc mật khẩu không đúng. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex-grow flex items-stretch min-h-screen">

            {/* Left Image Section */}
            <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-gray-100">

                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent z-10"></div>

                <img
                    className="h-full w-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCglmnIF0Ax-qFvaXJ9IqhBTXlqIXFmX5AmZhW4XqFsWnVZSp_KbS9uvn0iKkoneL9bDLvm4nm_jJOJpyhhRaONv0FLH3zSB3_ZdN76XCSqvS4DeNC6-scusYswTw3qcR4k6zO-AEJthnZLvqxqoskMEWaFLuzFtv03Qm2hXJSDPvonMr62HFur_WYaxT-B2Il9VaDXH77HDemcTWayVW0vLWVxD29sERunidvCS7ebDO_duI4JnXEmSU8KXJUXm1ihzvtqKdtxE58"
                    alt=""
                />

                <div className="absolute bottom-20 left-20 z-20 max-w-md">
                    <p className="text-4xl font-semibold text-white mb-4 leading-snug">
                        Sự sang trọng bắt đầu từ phong cách cá nhân.
                    </p>

                    <div className="h-1 w-12 bg-pink-600"></div>
                </div>
            </div>

            {/* Right Login Section */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 md:px-12 py-24 bg-white">

                <div className="w-full max-w-md space-y-12">

                    {/* Heading */}
                    <div className="space-y-4">
                        <h2 className="text-4xl font-bold text-gray-900">
                            Chào mừng trở lại
                        </h2>

                        <p className="text-gray-500 leading-relaxed">
                            Đăng nhập để khám phá những bộ sưu tập mới nhất từ MAISON ÉLÉGANT.
                        </p>
                    </div>

                    {/* Login Form */}
                    <form className="space-y-8" onSubmit={handleSubmit}>
                        {error && (
                            <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-red-700">
                                {error}
                            </div>
                        )}

                        {/* Email */}
                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="uppercase tracking-widest text-xs text-gray-500"
                            >
                                Email
                            </label>

                            <input
                                id="email"
                                type="email"
                                placeholder="example@fashion.vn"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border-0 border-b border-gray-300 focus:ring-0 focus:border-pink-600 py-3"
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-2">

                            <div className="flex justify-between items-center">
                                <label
                                    htmlFor="password"
                                    className="uppercase tracking-widest text-xs text-gray-500"
                                >
                                    Mật khẩu
                                </label>

                                <a
                                    href="/forgot-password"
                                    className="text-pink-600 text-xs hover:underline"
                                >
                                    Quên mật khẩu?
                                </a>
                            </div>

                            <input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border-0 border-b border-gray-300 focus:ring-0 focus:border-pink-600 py-3"
                            />
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-pink-600 hover:bg-pink-700 disabled:opacity-70 text-white uppercase tracking-widest py-5 flex justify-center items-center gap-3 transition"
                        >
                            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}

                            <span className="material-symbols-outlined text-[18px]">
                                arrow_forward
                            </span>
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative flex items-center py-4">

                        <div className="flex-grow border-t border-gray-200"></div>

                        <span className="mx-4 text-[10px] uppercase tracking-widest text-gray-400">
                            Hoặc đăng nhập với
                        </span>

                        <div className="flex-grow border-t border-gray-200"></div>
                    </div>

                    {/* Social Login */}
                    <div className="grid grid-cols-2 gap-6">

                        <button className="flex items-center justify-center gap-3 py-4 border border-gray-200 hover:bg-gray-50 transition uppercase tracking-widest text-sm">

                            <span className="material-symbols-outlined text-pink-600">
                                brand_family
                            </span>

                            Google
                        </button>

                        <button className="flex items-center justify-center gap-3 py-4 border border-gray-200 hover:bg-gray-50 transition uppercase tracking-widest text-sm">

                            <span className="material-symbols-outlined text-pink-600">
                                social_leaderboard
                            </span>

                            Facebook
                        </button>
                    </div>

                    {/* Register */}
                    <p className="text-center text-gray-500">
                        Chưa có tài khoản?
                        <button
                            type="button"
                            onClick={onSwitchToRegister}
                            className="text-pink-600 font-semibold ml-2 hover:underline"
                        >
                            Đăng ký ngay
                        </button>
                    </p>
                </div>
            </div>
        </main>
    );
}