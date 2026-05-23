import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";

const API = "http://localhost:8000/api";

const Login = () => {
    const { login }  = useAuth();
    const navigate   = useNavigate();

    const [showPass, setShowPass] = useState(false);
    const [loading,  setLoading]  = useState(false);
    const [error,    setError]    = useState("");

    const [form, setForm] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.email || !form.password) {
            setError("Vui lòng nhập đầy đủ thông tin");
            return;
        }
        setLoading(true);
        try {
            const res  = await fetch(`${API}/auth/customer/login`, {
                method:  "POST",
                headers: { "Content-Type": "application/json" },
                body:    JSON.stringify(form),
            });
            const data = await res.json();

            if (data.success) {
                login(data.user, data.token);
                if (data.user.role === "admin") {
                    navigate("/admin/dashboard");
                } else {
                    navigate("/");
                }
            } else {
                setError(data.message || "Đăng nhập thất bại");
            }
        } catch {
            setError("Không thể kết nối server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[85vh] flex">
            {/* Panel trái — trang trí */}
            <div className="hidden lg:flex lg:w-[45%] bg-[#1a1a1a] items-center justify-center p-12 relative overflow-hidden">
                <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                        backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                        backgroundSize:  "32px 32px",
                    }}
                />
                <div className="relative text-center">
                    <div className="font-display text-4xl font-bold text-white leading-tight tracking-wide mb-2">
                        Maverick<br />Dresses
                    </div>
                    <div className="text-[#8b4513] text-[11px] tracking-[0.3em] uppercase mb-8">Fashion Store</div>
                    <div className="w-12 h-px bg-[#444] mx-auto mb-8" />
                    <p className="text-[#666] text-sm max-w-xs leading-relaxed">
                        Thời trang chất lượng cao, phong cách hiện đại cho mọi người.
                    </p>
                </div>
            </div>

            {/* Panel phải — form */}
            <div className="flex-1 flex items-center justify-center px-6 py-12 bg-[#faf8f5]">
                <div className="w-full max-w-sm">
                    {/* Logo (chỉ hiện trên mobile) */}
                    <div className="text-center mb-8 lg:hidden">
                        <Link to="/">
                            <div className="font-display text-2xl font-bold text-[#1a1a1a]">Maverick Dresses</div>
                            <div className="text-[10px] text-[#bbb] tracking-[0.25em] uppercase">Fashion Store</div>
                        </Link>
                    </div>

                    <h2 className="font-display text-2xl font-bold text-[#1a1a1a] mb-1">Đăng nhập</h2>
                    <p className="text-sm text-[#999] mb-8">Chào mừng bạn quay trở lại</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-xs font-semibold text-[#4a4a4a] uppercase tracking-wider mb-2">
                                Email
                            </label>
                            <input
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="example@gmail.com"
                                className="w-full border border-[#e8e0d5] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#8b4513] focus:ring-2 focus:ring-[#8b4513]/10 transition bg-white"
                            />
                        </div>

                        {/* Mật khẩu */}
                        <div>
                            <label className="block text-xs font-semibold text-[#4a4a4a] uppercase tracking-wider mb-2">
                                Mật khẩu
                            </label>
                            <div className="relative">
                                <input
                                    name="password"
                                    type={showPass ? "text" : "password"}
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full border border-[#e8e0d5] rounded-xl px-4 py-3 pr-10 text-sm outline-none focus:border-[#8b4513] focus:ring-2 focus:ring-[#8b4513]/10 transition bg-white"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass(!showPass)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#bbb] hover:text-[#4a4a4a] transition"
                                >
                                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#1a1a1a] text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-[#8b4513] transition-all duration-300 disabled:opacity-60 tracking-wide"
                        >
                            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                        </button>
                    </form>

                    <p className="text-center text-sm text-[#999] mt-6">
                        Chưa có tài khoản?{" "}
                        <Link to="/register" className="text-[#8b4513] font-semibold hover:underline">
                            Đăng ký ngay
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
