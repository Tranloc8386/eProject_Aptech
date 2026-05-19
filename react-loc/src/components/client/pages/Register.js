import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";

const API = "http://localhost:8000/api";

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
                // Laravel trả lỗi validation
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

    const Field = ({ name, label, type = "text", placeholder, required }) => (
        <div>
            <label className="block text-sm text-[#4a4a4a] mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                name={name}
                type={type}
                value={form[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#8b4513] transition-colors ${
                    errors[name] ? "border-red-400" : "border-[#d4c9ba]"
                }`}
            />
            {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
        </div>
    );

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">

                {/* Logo */}
                <div className="text-center mb-8">
                    <Link to="/" className="text-3xl font-bold tracking-widest text-[#2c2c2c]">SHOP</Link>
                    <p className="text-[#888] text-sm mt-2">Tạo tài khoản mới</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-8">
                    {errors.general && (
                        <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg mb-4">{errors.general}</p>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Field name="name"    label="Họ và tên"        placeholder="Nguyễn Văn A"         required />
                        <Field name="email"   label="Email"             placeholder="example@gmail.com"    required />
                        <Field name="phone"   label="Số điện thoại"     placeholder="0909 123 456"         required />
                        <Field name="address" label="Địa chỉ"           placeholder="Số nhà, đường, quận..." required />

                        {/* Mật khẩu */}
                        <div>
                            <label className="block text-sm text-[#4a4a4a] mb-1">
                                Mật khẩu <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    name="password"
                                    type={showPass ? "text" : "password"}
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Tối thiểu 6 ký tự"
                                    className={`w-full border rounded-lg px-4 py-2.5 pr-10 text-sm outline-none focus:border-[#8b4513] transition-colors ${
                                        errors.password ? "border-red-400" : "border-[#d4c9ba]"
                                    }`}
                                />
                                <button type="button" onClick={() => setShowPass(!showPass)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888]">
                                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                        </div>

                        {/* Xác nhận mật khẩu */}
                        <div>
                            <label className="block text-sm text-[#4a4a4a] mb-1">
                                Xác nhận mật khẩu <span className="text-red-500">*</span>
                            </label>
                            <input
                                name="password_confirmation"
                                type="password"
                                value={form.password_confirmation}
                                onChange={handleChange}
                                placeholder="Nhập lại mật khẩu"
                                className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#8b4513] transition-colors ${
                                    errors.password_confirmation ? "border-red-400" : "border-[#d4c9ba]"
                                }`}
                            />
                            {errors.password_confirmation && (
                                <p className="text-red-500 text-xs mt-1">{errors.password_confirmation}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#2c2c2c] text-white py-3 rounded-lg font-medium text-sm hover:bg-[#8b4513] transition-colors disabled:opacity-60"
                        >
                            {loading ? "Đang đăng ký..." : "Đăng ký"}
                        </button>
                    </form>

                    <p className="text-center text-sm text-[#888] mt-5">
                        Đã có tài khoản?{" "}
                        <Link to="/login" className="text-[#8b4513] font-medium hover:underline">
                            Đăng nhập
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
