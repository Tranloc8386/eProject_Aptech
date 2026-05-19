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
                // Redirect theo role
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
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">

                {/* Logo */}
                <div className="text-center mb-8">
                    <Link to="/" className="text-3xl font-bold tracking-widest text-[#2c2c2c]">SHOP</Link>
                    <p className="text-[#888] text-sm mt-2">Đăng nhập vào tài khoản của bạn</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email */}
                        <div>
                            <label className="block text-sm text-[#4a4a4a] mb-1">Email</label>
                            <input
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="example@gmail.com"
                                className="w-full border border-[#d4c9ba] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#8b4513] transition-colors"
                            />
                        </div>

                        {/* Mật khẩu */}
                        <div>
                            <label className="block text-sm text-[#4a4a4a] mb-1">Mật khẩu</label>
                            <div className="relative">
                                <input
                                    name="password"
                                    type={showPass ? "text" : "password"}
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full border border-[#d4c9ba] rounded-lg px-4 py-2.5 pr-10 text-sm outline-none focus:border-[#8b4513] transition-colors"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass(!showPass)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888] hover:text-[#2c2c2c]"
                                >
                                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        {/* Lỗi */}
                        {error && (
                            <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg">{error}</p>
                        )}

                        {/* Nút đăng nhập */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#2c2c2c] text-white py-3 rounded-lg font-medium text-sm hover:bg-[#8b4513] transition-colors disabled:opacity-60"
                        >
                            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                        </button>
                    </form>

                    <p className="text-center text-sm text-[#888] mt-5">
                        Chưa có tài khoản?{" "}
                        <Link to="/register" className="text-[#8b4513] font-medium hover:underline">
                            Đăng ký ngay
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
