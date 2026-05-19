import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Đọc giỏ hàng từ localStorage
  const loadCart = () => {
    const saved = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(saved);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const saveCart = (newCart) => {
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const updateQty = (productId, delta) => {
    const updated = cart.map((item) => {
      if (item.product_id !== productId) return item;
      const newQty = item.quantity + delta;
      if (newQty <= 0) return null;
      return { ...item, quantity: newQty };
    }).filter(Boolean);
    saveCart(updated);
  };

  const removeItem = (productId) => {
    saveCart(cart.filter((i) => i.product_id !== productId));
  };

  const clearCart = () => {
    if (window.confirm("Xóa toàn bộ giỏ hàng?")) saveCart([]);
  };

  const total    = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const totalQty = cart.reduce((sum, i) => sum + i.quantity, 0);

  // Giỏ trống
  if (cart.length === 0) return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <ShoppingBag size={64} className="mx-auto text-[#d4c9ba] mb-4" />
      <h2 className="text-xl font-semibold text-[#2c2c2c] mb-2">Giỏ hàng trống</h2>
      <p className="text-[#888] text-sm mb-6">Bạn chưa thêm sản phẩm nào vào giỏ.</p>
      <Link
        to="/products"
        className="inline-block bg-[#2c2c2c] text-white px-8 py-3 rounded-lg text-sm font-medium hover:bg-[#8b4513] transition-colors"
      >
        Tiếp tục mua sắm
      </Link>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-[#2c2c2c] mb-6">
        Giỏ hàng <span className="text-base font-normal text-[#888]">({totalQty} sản phẩm)</span>
      </h1>

      <div className="flex flex-col lg:flex-row gap-6">

        {/* Danh sách sản phẩm */}
        <div className="flex-1 space-y-3">
          {cart.map((item) => (
            <div key={item.product_id} className="bg-white rounded-xl p-4 flex gap-4 shadow-sm">
              {/* Ảnh */}
              <Link to={`/products/${item.product_id}`} className="shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg bg-gray-100"
                  onError={(e) => { e.target.src = "https://placehold.co/96x96?text=No+Image"; }}
                />
              </Link>

              {/* Thông tin */}
              <div className="flex-1 min-w-0">
                <Link to={`/products/${item.product_id}`}>
                  <h3 className="text-sm font-medium text-[#2c2c2c] hover:text-[#8b4513] line-clamp-2">
                    {item.name}
                  </h3>
                </Link>
                <p className="text-[#8b4513] font-semibold text-sm mt-1">
                  {formatPrice(item.price)}
                </p>

                {/* Số lượng + xóa */}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-[#d4c9ba] rounded overflow-hidden">
                    <button
                      onClick={() => updateQty(item.product_id, -1)}
                      className="px-2 py-1 hover:bg-[#f0ebe3] transition-colors"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="px-3 py-1 text-sm font-medium border-x border-[#d4c9ba] min-w-[36px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQty(item.product_id, 1)}
                      className="px-2 py-1 hover:bg-[#f0ebe3] transition-colors"
                    >
                      <Plus size={13} />
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-[#2c2c2c]">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                    <button
                      onClick={() => removeItem(item.product_id)}
                      className="text-[#bbb] hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Xóa tất cả */}
          <div className="text-right">
            <button
              onClick={clearCart}
              className="text-sm text-[#888] hover:text-red-500 transition-colors"
            >
              Xóa tất cả
            </button>
          </div>
        </div>

        {/* Tóm tắt đơn hàng */}
        <div className="lg:w-72 shrink-0">
          <div className="bg-white rounded-xl p-5 shadow-sm sticky top-20">
            <h3 className="font-semibold text-[#2c2c2c] mb-4">Tóm tắt đơn hàng</h3>

            <div className="space-y-2 text-sm mb-4">
              {cart.map((item) => (
                <div key={item.product_id} className="flex justify-between text-[#666]">
                  <span className="line-clamp-1 flex-1 mr-2">{item.name} x{item.quantity}</span>
                  <span className="shrink-0">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-[#e8e0d5] pt-3 mb-5">
              <div className="flex justify-between font-semibold text-[#2c2c2c]">
                <span>Tổng cộng</span>
                <span className="text-[#8b4513]">{formatPrice(total)}</span>
              </div>
              <p className="text-xs text-[#888] mt-1">Chưa bao gồm phí vận chuyển</p>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-[#2c2c2c] text-white py-3 rounded-lg font-medium text-sm hover:bg-[#8b4513] transition-colors"
            >
              Tiến hành thanh toán
            </button>

            <Link
              to="/products"
              className="block text-center text-sm text-[#888] hover:text-[#2c2c2c] mt-3 transition-colors"
            >
              ← Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
