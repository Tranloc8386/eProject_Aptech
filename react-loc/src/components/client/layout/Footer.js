import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-[#2c2c2c] text-[#ccc] mt-16">
    <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">

      {/* Cột 1 — Thương hiệu */}
      <div>
        <h3 className="text-white text-xl font-bold tracking-widest mb-4">SHOP</h3>
        <p className="text-sm leading-relaxed">
          Thời trang chất lượng cao, phong cách hiện đại. Mang đến trải nghiệm mua sắm tuyệt vời.
        </p>
      </div>

      {/* Cột 2 — Liên kết */}
      <div>
        <h4 className="text-white font-semibold mb-4 uppercase tracking-wide text-sm">Liên kết</h4>
        <ul className="space-y-2 text-sm">
          <li><Link to="/"          className="hover:text-white transition-colors">Trang chủ</Link></li>
          <li><Link to="/products"  className="hover:text-white transition-colors">Sản phẩm</Link></li>
          <li><Link to="/cart"      className="hover:text-white transition-colors">Giỏ hàng</Link></li>
          <li><Link to="/orders"    className="hover:text-white transition-colors">Đơn hàng</Link></li>
        </ul>
      </div>

      {/* Cột 3 — Liên hệ */}
      <div>
        <h4 className="text-white font-semibold mb-4 uppercase tracking-wide text-sm">Liên hệ</h4>
        <ul className="space-y-2 text-sm">
          <li>📍 Apteach</li>
          <li>📞 0339 623 430</li>
          <li>✉️ tranhuuloc2602@gmail.com.vn</li>
        </ul>
      </div>
    </div>

    <div className="border-t border-[#444] text-center py-4 text-xs text-[#888]">
      © {new Date().getFullYear()} Aptech
    </div>
  </footer>
);

export default Footer;
