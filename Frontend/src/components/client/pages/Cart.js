import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";

const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    price,
  );

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

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

  const updateQty = (productId, size, delta) => {
    const updated = cart
      .map((item) => {
        if (item.product_id !== productId || item.size !== size) return item;
        const newQty = item.quantity + delta;
        if (newQty <= 0) return null;
        return { ...item, quantity: newQty };
      })
      .filter(Boolean);
    saveCart(updated);
  };

  const removeItem = (productId, size) => {
    saveCart(
      cart.filter((i) => !(i.product_id === productId && i.size === size)),
    );
  };

  const clearCart = () => {
    if (window.confirm("Xóa toàn bộ giỏ hàng?")) saveCart([]);
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const totalQty = cart.reduce((sum, i) => sum + i.quantity, 0);

  if (cart.length === 0)
    return (
      <div className="max-w-2xl mx-auto px-4 py-28 text-center">
        <div className="w-20 h-20 rounded-full bg-[#f0ebe3] flex items-center justify-center mx-auto mb-6">
          <ShoppingBag size={36} className="text-[#c8bfb0]" />
        </div>
        <h2 className="font-display text-2xl font-bold text-[#1a1a1a] mb-2">
          Giỏ hàng trống
        </h2>
        <p className="text-[#999] text-sm mb-8">
          Bạn chưa thêm sản phẩm nào vào giỏ.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white px-8 py-3.5 rounded-xl text-sm font-semibold hover:bg-[#8b4513] transition-all duration-300"
        >
          Tiếp tục mua sắm <ArrowRight size={16} />
        </Link>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold text-[#1a1a1a]">
          Giỏ hàng
          <span className="text-base font-normal text-[#999] ml-2 font-sans">
            ({totalQty} sản phẩm)
          </span>
        </h1>
        <button
          onClick={clearCart}
          className="text-sm text-[#bbb] hover:text-red-500 transition-colors"
        >
          Xóa tất cả
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-7">
        {/* Danh sách sản phẩm */}
        <div className="flex-1 space-y-3">
          {cart.map((item) => (
            <div
              key={item.product_id}
              className="bg-white rounded-2xl p-4 flex gap-4 shadow-sm border border-[#f5f0ea] hover:shadow-md transition-shadow"
            >
              <Link to={`/products/${item.product_id}`} className="shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-xl bg-gray-100"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/96x96?text=No+Image";
                  }}
                />
              </Link>

              <div className="flex-1 min-w-0">
                <Link to={`/products/${item.product_id}`}>
                  <h3 className="text-sm font-semibold text-[#1a1a1a] hover:text-[#8b4513] line-clamp-2 transition-colors">
                    {item.name}
                  </h3>
                </Link>
                {item.size && (
                  <span className="inline-block mt-1 text-xs bg-[#f0ebe3] text-[#8b4513] px-2 py-0.5 rounded-full font-medium">
                    Size: {item.size}
                  </span>
                )}

                <p className="text-[#8b4513] font-bold text-sm mt-1">
                  {formatPrice(item.price)}
                </p>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-[#e8e0d5] rounded-xl overflow-hidden">
                    <button
                      onClick={() => updateQty(item.product_id, item.size, -1)}
                      className="px-3 py-1.5 hover:bg-[#faf8f5] transition-colors text-[#4a4a4a]"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="px-3.5 py-1.5 text-sm font-semibold border-x border-[#e8e0d5] min-w-[36px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQty(item.product_id, item.size, 1)}
                      className="px-3 py-1.5 hover:bg-[#faf8f5] transition-colors text-[#4a4a4a]"
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-[#1a1a1a]">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                    <button
                      onClick={() => removeItem(item.product_id, item.size)}
                      className="text-[#ddd] hover:text-red-400 transition-colors p-1"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tóm tắt đơn hàng */}
        <div className="lg:w-72 shrink-0">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#f5f0ea] sticky top-24">
            <h3 className="font-semibold text-[#1a1a1a] mb-5 text-base">
              Tóm tắt đơn hàng
            </h3>

            <div className="space-y-2.5 text-sm mb-5">
              {cart.map((item) => (
                <div
                  key={item.product_id}
                  className="flex justify-between text-[#777]"
                >
                  <span className="line-clamp-1 flex-1 mr-2">
                    {item.name} ×{item.quantity}
                  </span>
                  <span className="shrink-0 font-medium">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-[#f0ebe3] pt-4 mb-6">
              <div className="flex justify-between font-bold text-[#1a1a1a] text-base">
                <span>Tổng cộng</span>
                <span className="text-[#8b4513]">{formatPrice(total)}</span>
              </div>
              <p className="text-xs text-[#bbb] mt-1.5">
                Chưa bao gồm phí vận chuyển
              </p>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-[#1a1a1a] text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-[#8b4513] transition-all duration-300 flex items-center justify-center gap-2"
            >
              Tiến hành thanh toán <ArrowRight size={15} />
            </button>

            <Link
              to="/products"
              className="block text-center text-sm text-[#aaa] hover:text-[#1a1a1a] mt-4 transition-colors"
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
