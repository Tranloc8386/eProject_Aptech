import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShoppingBag, CreditCard, Truck } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const API = "http://localhost:8000/api";

const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [cart,    setCart]    = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors,  setErrors]  = useState({});

  const [form, setForm] = useState({
    name:           user?.name    || "",
    phone:          user?.phone   || "",
    address:        user?.address || "",
    note:           "",
    payment_method: "cod",
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart") || "[]");
    if (saved.length === 0) navigate("/cart");
    setCart(saved);
  }, [navigate]);

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Vui lòng nhập họ tên";
    if (!form.phone.trim())   e.phone   = "Vui lòng nhập số điện thoại";
    if (!form.address.trim()) e.address = "Vui lòng nhập địa chỉ";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      // 1. Tạo đơn hàng + items trong 1 request
      const orderRes = await fetch(`${API}/orders`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_id:      user?.id,
          shipping_name:    form.name,
          shipping_phone:   form.phone,
          shipping_address: form.address,
          note:             form.note,
          payment_method:   form.payment_method,
          items: cart.map((item) => ({
            product_id: item.product_id,
            quantity:   item.quantity,
          })),
        }),
      });

      const orderData = await orderRes.json();
      if (!orderData.success) throw new Error(orderData.message || "Tạo đơn hàng thất bại");
      const orderId = orderData.data?.id;

      // 2. Xóa giỏ hàng
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("cartUpdated"));

      // 4. Thanh toán
      if (form.payment_method === "vnpay") {
        // Gọi API tạo link VNPay
        const vnpRes = await fetch(`${API}/vnpay-payment`, {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: total }),
        });
        const vnpData = await vnpRes.json();
        if (vnpData.payment_url) {
          window.location.href = vnpData.payment_url; // Redirect sang VNPay
        } else {
          throw new Error("Không lấy được link thanh toán");
        }
      } else {
        // COD — chuyển sang trang thành công
        navigate(`/orders?success=1&orderId=${orderId}`);
      }
    } catch (err) {
      alert("Có lỗi xảy ra: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-[#2c2c2c] mb-6">Thanh toán</h1>

      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-6">

        {/* Cột trái — Thông tin giao hàng */}
        <div className="flex-1 space-y-5">

          {/* Thông tin nhận hàng */}
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <h2 className="font-semibold text-[#2c2c2c] mb-4 flex items-center gap-2">
              <Truck size={18} /> Thông tin giao hàng
            </h2>
            <div className="space-y-4">

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

              {/* Số điện thoại */}
              <div>
                <label className="block text-sm text-[#4a4a4a] mb-1">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="0909 123 456"
                  className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#8b4513] transition-colors ${
                    errors.phone ? "border-red-400" : "border-[#d4c9ba]"
                  }`}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              {/* Địa chỉ */}
              <div>
                <label className="block text-sm text-[#4a4a4a] mb-1">
                  Địa chỉ giao hàng <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành"
                  rows={3}
                  className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#8b4513] transition-colors resize-none ${
                    errors.address ? "border-red-400" : "border-[#d4c9ba]"
                  }`}
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>

              {/* Ghi chú */}
              <div>
                <label className="block text-sm text-[#4a4a4a] mb-1">Ghi chú</label>
                <input
                  name="note"
                  value={form.note}
                  onChange={handleChange}
                  placeholder="Giao giờ hành chính, gọi trước khi giao..."
                  className="w-full border border-[#d4c9ba] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#8b4513] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Phương thức thanh toán */}
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <h2 className="font-semibold text-[#2c2c2c] mb-4 flex items-center gap-2">
              <CreditCard size={18} /> Phương thức thanh toán
            </h2>
            <div className="space-y-3">

              {/* COD */}
              <label className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                form.payment_method === "cod" ? "border-[#2c2c2c] bg-[#f0ebe3]" : "border-[#e8e0d5]"
              }`}>
                <input
                  type="radio"
                  name="payment_method"
                  value="cod"
                  checked={form.payment_method === "cod"}
                  onChange={handleChange}
                  className="accent-[#2c2c2c]"
                />
                <div>
                  <p className="text-sm font-medium text-[#2c2c2c]">Thanh toán khi nhận hàng (COD)</p>
                  <p className="text-xs text-[#888]">Trả tiền mặt khi nhận được hàng</p>
                </div>
              </label>

              {/* VNPay */}
              <label className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                form.payment_method === "vnpay" ? "border-[#2c2c2c] bg-[#f0ebe3]" : "border-[#e8e0d5]"
              }`}>
                <input
                  type="radio"
                  name="payment_method"
                  value="vnpay"
                  checked={form.payment_method === "vnpay"}
                  onChange={handleChange}
                  className="accent-[#2c2c2c]"
                />
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-sm font-medium text-[#2c2c2c]">Thanh toán VNPay</p>
                    <p className="text-xs text-[#888]">Thẻ ATM, thẻ quốc tế, ví điện tử</p>
                  </div>
                  <img
                    src="https://vnpay.vn/s1/statics/img/logo-2.png"
                    alt="VNPay"
                    className="h-7 object-contain ml-auto"
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Cột phải — Tóm tắt đơn hàng */}
        <div className="lg:w-72 shrink-0">
          <div className="bg-white rounded-xl p-5 shadow-sm sticky top-20">
            <h3 className="font-semibold text-[#2c2c2c] mb-4 flex items-center gap-2">
              <ShoppingBag size={16} /> Đơn hàng ({cart.length} sản phẩm)
            </h3>

            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.product_id} className="flex gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded-lg bg-gray-100 shrink-0"
                    onError={(e) => { e.target.src = "https://placehold.co/56x56?text=No"; }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[#2c2c2c] line-clamp-2">{item.name}</p>
                    <p className="text-xs text-[#888] mt-0.5">x{item.quantity}</p>
                    <p className="text-xs font-semibold text-[#8b4513]">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[#e8e0d5] pt-3 space-y-2 text-sm mb-5">
              <div className="flex justify-between text-[#666]">
                <span>Tạm tính</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-[#666]">
                <span>Phí vận chuyển</span>
                <span className="text-green-600">Miễn phí</span>
              </div>
              <div className="flex justify-between font-semibold text-[#2c2c2c] text-base pt-1 border-t border-[#e8e0d5]">
                <span>Tổng cộng</span>
                <span className="text-[#8b4513]">{formatPrice(total)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2c2c2c] text-white py-3 rounded-lg font-medium text-sm hover:bg-[#8b4513] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading
                ? "Đang xử lý..."
                : form.payment_method === "vnpay"
                ? "Thanh toán qua VNPay"
                : "Đặt hàng"}
            </button>

            <Link
              to="/cart"
              className="block text-center text-sm text-[#888] hover:text-[#2c2c2c] mt-3"
            >
              ← Quay lại giỏ hàng
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
