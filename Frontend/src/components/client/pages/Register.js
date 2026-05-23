import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";

const API = "http://localhost:8000/api";

// Field phải đặt NGOÀI Register, nếu đặt trong sẽ bị unmount/remount mỗi lần gõ
const Field = ({ name, label, type = "text", placeholder, required, value, onChange, error }) => (
    <div>
        <label className="block text-xs font-semibold text-[#4a4a4a] uppercase tracking-wider mb-2">
            {label} {required && <span className="text-red-400">*</span>}
        </label>
        <input
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 transition bg-white ${
                error
                    ? "border-red-300 focus:border-red-400 focus:ring-red-50"
                    : "border-[#e8e0d5] focus:border-[#8b4513] focus:ring-[#8b4513]/10"
            }`}
        />
        {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}
    </div>
);

const Register = () => {
    const { login }  = useAuth();
    const navigate   = useNavigate();
    const [showPass, setShowPass] = useState(false);
    const [loading,  setLoading]  = useState(false);
    const [errors,   setErrors]   = useState({});

    const [form, setForm] = useState({
        name:                  "",
        email:                 "",
        phone:                 "",
        address:               "",
        password:              "",
        password_confirmation: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const validate = () => {
        const e = {};
        if (!form.name.trim())    e.name    = "Vui lòng nhập họ tên";
        if (!form.email.trim())   e.email   = "Vui lòng nhập email";
        if (!form.phone.trim())   e.phone   = "Vui lòng nhập số điện thoại";
        if (!form.address.trim()) e.address = "Vui lòng nhập địa chỉ";
        if (!form.password)       e.password = "Vui lòng nhập mật khẩu";
        else if (form.password.length < 6) e.password = "Mật khẩu tối thiểu 6 ký tự";
        if (form.password !== form.password_confirmation)
            e.password_confirmation = "Mật khẩu xác nhận không khớp";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        try {
            const res  = await fetch(`${API}/auth/register`, {
                method:  "POST",
                headers: { "Content-Type": "application/json" },
                body:    JSON.stringify(form),
            });
            const data = await res.json();

            if (data.success) {
                login(data.user, data.token);
                navigate("/");
            } else {
                if (data.errors) {
                    const mapped = {};
                    Object.keys(data.errors).forEach((k) => {
                        mapped[k] = data.errors[k][0];
                    });
                    setErrors(mapped);
                } else {
                    setErrors({ general: data.message });
                }
            }
        } catch {
            setErrors({ general: "Không thể kết nối server" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[85vh] flex">
            {/* Panel trái — trang trí */}
            <div className="hidden lg:flex lg:w-[38%] bg-[#1a1a1a] items-center justify-center p-12 relative overflow-hidden">
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
                        Tạo tài khoản để trải nghiệm mua sắm thời trang tiện lợi hơn.
                    </p>
                </div>
            </div>

            {/* Panel phải — form */}
            <div className="flex-1 flex items-center justify-center px-6 py-12 bg-[#faf8f5]">
                <div className="w-full max-w-md">
                    {/* Logo (chỉ hiện trên mobile) */}
                    <div className="text-center mb-8 lg:hidden">
                        <Link to="/">
                            <div className="font-display text-2xl font-bold text-[#1a1a1a]">Maverick Dresses</div>
                            <div className="text-[10px] text-[#bbb] tracking-[0.25em] uppercase">Fashion Store</div>
                        </Link>
                    </div>

                    <h2 className="font-display text-2xl font-bold text-[#1a1a1a] mb-1">Tạo tài khoản</h2>
                    <p className="text-sm text-[#999] mb-8">Điền thông tin bên dưới để đăng ký</p>

                    {errors.general && (
                        <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl mb-5">
                            {errors.general}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Field name="name"  label="Họ và tên"     placeholder="Nguyễn Văn A"   required value={form.name}    onChange={handleChange} error={errors.name} />
                            <Field name="phone" label="Số điện thoại" placeholder="0909 123 456"   required value={form.phone}   onChange={handleChange} error={errors.phone} />
                        </div>
                        <Field name="email"   label="Email"   placeholder="example@gmail.com"      required value={form.email}   onChange={handleChange} error={errors.email} />
                        <Field name="address" label="Địa chỉ" placeholder="Số nhà, đường, quận..." required value={form.address} onChange={handleChange} error={errors.address} />

                        {/* Mật khẩu */}
                        <div>
                            <label className="block text-xs font-semibold text-[#4a4a4a] uppercase tracking-wider mb-2">
                                Mật khẩu <span className="text-red-400">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    name="password"
                                    type={showPass ? "text" : "password"}
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Tối thiểu 6 ký tự"
                                    className={`w-full border rounded-xl px-4 py-3 pr-10 text-sm outline-none focus:ring-2 transition bg-white ${
                                        errors.password
                                            ? "border-red-300 focus:border-red-400 focus:ring-red-50"
                                            : "border-[#e8e0d5] focus:border-[#8b4513] focus:ring-[#8b4513]/10"
                                    }`}
                                />
                                <button type="button" onClick={() => setShowPass(!showPass)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#bbb] hover:text-[#4a4a4a] transition">
                                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-xs mt-1.5">{errors.password}</p>}
                        </div>

                        {/* Xác nhận mật khẩu */}
                        <div>
                            <label className="block text-xs font-semibold text-[#4a4a4a] uppercase tracking-wider mb-2">
                                Xác nhận mật khẩu <span className="text-red-400">*</span>
                            </label>
                            <input
                                name="password_confirmation"
                                type="password"
                                value={form.password_confirmation}
                                onChange={handleChange}
                                placeholder="Nhập lại mật khẩu"
                                className={`w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 transition bg-white ${
                                    errors.password_confirmation
                                        ? "border-red-300 focus:border-red-400 focus:ring-red-50"
                                        : "border-[#e8e0d5] focus:border-[#8b4513] focus:ring-[#8b4513]/10"
                                }`}
                            />
                            {errors.password_confirmation && (
                                <p className="text-red-500 text-xs mt-1.5">{errors.password_confirmation}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#1a1a1a] text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-[#8b4513] transition-all duration-300 disabled:opacity-60 tracking-wide mt-2"
                        >
                            {loading ? "Đang đăng ký..." : "Đăng ký"}
                        </button>
                    </form>

                    <p className="text-center text-sm text-[#999] mt-6">
                        Đã có tài khoản?{" "}
                        <Link to="/login" className="text-[#8b4513] font-semibold hover:underline">
                            Đăng nhập
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
