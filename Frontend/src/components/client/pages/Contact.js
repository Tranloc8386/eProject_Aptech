import React, { useState } from "react";
import { MapPin, Phone, Mail, Send, CheckCircle } from "lucide-react";

const API = "http://localhost:8000/api";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors,  setErrors]  = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Vui lòng nhập họ tên";
    if (!form.email.trim())   e.email   = "Vui lòng nhập email";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Email không hợp lệ";
    if (!form.message.trim()) e.message = "Vui lòng nhập nội dung";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res  = await fetch(`${API}/feedbacks`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        alert(data.message || "Có lỗi xảy ra, vui lòng thử lại.");
      }
    } catch {
      alert("Không thể kết nối server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">

    
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-[#2c2c2c] tracking-wide">Liên hệ</h1>
        <p className="text-[#888] mt-2 text-sm">Chúng tôi luôn sẵn sàng hỗ trợ bạn</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Cột trái — Thông tin liên hệ */}
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-[#2c2c2c] mb-4">Thông tin liên hệ</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-[#8b4513] mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-[#2c2c2c]">Địa chỉ</p>
                  <p className="text-sm text-[#666]">285 Đội Cấn, Ba Đình, Hà Nội</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={20} className="text-[#8b4513] mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-[#2c2c2c]">Điện thoại</p>
                  <p className="text-sm text-[#666]">0909 123 456</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={20} className="text-[#8b4513] mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-[#2c2c2c]">Email</p>
                  <p className="text-sm text-[#666]">aptech@shop.vn</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#2c2c2c] mb-2">Giờ làm việc</h2>
            <div className="text-sm text-[#666] space-y-1">
              <p>Thứ 2 – Thứ 6: <span className="text-[#2c2c2c] font-medium">8:00 – 17:30</span></p>
              <p>Thứ 7: <span className="text-[#2c2c2c] font-medium">8:00 – 12:00</span></p>
              <p>Chủ nhật: <span className="text-red-500">Nghỉ</span></p>
            </div>
          </div>
        </div>

        {/* Cột phải — Form */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          {success ? (
            <div className="text-center py-8">
              <CheckCircle size={56} className="mx-auto text-green-500 mb-3" />
              <h3 className="text-lg font-semibold text-[#2c2c2c] mb-1">Gửi thành công!</h3>
              <p className="text-sm text-[#888] mb-5">
                Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất có thể.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="text-sm text-[#8b4513] hover:underline"
              >
                Gửi tin nhắn khác
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-lg font-semibold text-[#2c2c2c] mb-2">Gửi tin nhắn</h2>

              {/* Họ tên */}
              <div>
                <label className="block text-sm text-[#4a4a4a] mb-1">
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Nguyễn Văn A"
                  className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#8b4513] transition-colors ${
                    errors.name ? "border-red-400" : "border-[#d4c9ba]"
                  }`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm text-[#4a4a4a] mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                  className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#8b4513] transition-colors ${
                    errors.email ? "border-red-400" : "border-[#d4c9ba]"
                  }`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Số điện thoại */}
              <div>
                <label className="block text-sm text-[#4a4a4a] mb-1">Số điện thoại</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="0909 123 456"
                  className="w-full border border-[#d4c9ba] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#8b4513] transition-colors"
                />
              </div>

              {/* Nội dung */}
              <div>
                <label className="block text-sm text-[#4a4a4a] mb-1">
                  Nội dung <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Nhập nội dung bạn muốn gửi..."
                  rows={4}
                  className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#8b4513] transition-colors resize-none ${
                    errors.message ? "border-red-400" : "border-[#d4c9ba]"
                  }`}
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#2c2c2c] text-white py-3 rounded-lg text-sm font-medium hover:bg-[#8b4513] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? "Đang gửi..." : <><Send size={15} /> Gửi tin nhắn</>}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
