import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { Eye, EyeOff, PanelsTopLeft } from "lucide-react";

const API = "http://localhost:8000/api";

const AdminLogin = () => {
    const { login }  = useAuth();
    const navigate   = useNavigate();
    const [showPass, setShowPass] = useState(false);
    const [loading,  setLoading]  = useState(false);
    const [error,    setError]    = useState("");
    const [form,     setForm]     = useState({ email: "", password: "" });

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
            const res  = await fetch(`${API}/admins/login`, {
                method:  "POST",
                headers: { "Content-Type": "application/json" },
                body:    JSON.stringify(form),
            });
            const data = await res.json();

            if (data.success) {
                login(data.user, data.token);
                navigate("/admin/dashboard");
            } else {
                setError(data.message || "Email hoặc mật khẩu không đúng");
            }
        } catch {
            setError("Không thể kết nối server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f5f6ff] flex items-center justify-center px-4">
            <div className="w-full max-w-sm">

                {/* Logo admin */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-3 shadow-lg">
                        <PanelsTopLeft size={28} />
                    </div>
                    <h1 className="text-xl font-bold text-blue-700">Maverick Dresses</h1>
                    <p className="text-sm text-gray-500 mt-1">Đăng nhập quản trị</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-8">
                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Email */}
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Email</label>
                            <input
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="admin@example.com"
                                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>

                        {/* Mật khẩu */}
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Mật khẩu</label>
                            <div className="relative">
                                <input
                                    name="password"
                                    type={showPass ? "text" : "password"}
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 pr-10 text-sm outline-none focus:border-blue-500 transition-colors"
                                />
                                <button type="button" onClick={() => setShowPass(!showPass)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        {/* Lỗi */}
                        {error && (
                            <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg">{error}</p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors disabled:opacity-60"
                        >
                            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
