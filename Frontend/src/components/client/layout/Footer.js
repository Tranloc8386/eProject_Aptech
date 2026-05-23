import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => (
  <footer className="bg-[#f7f2e8] text-[#7a7060] border-t border-[#e8dcc8]">
    <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
      {/* Cột 1 — Thương hiệu */}
      <div>
        <div className="font-display text-2xl font-bold text-[#1a1a1a] mb-1 tracking-wide">
          Maverick Dresses
        </div>
        <div className="text-[9px] text-[#b8860b] tracking-[0.28em] uppercase font-semibold mb-5">
          Fashion Store
        </div>
        <p className="text-sm leading-relaxed text-[#8a8070] mb-6">
          Thời trang chất lượng cao, phong cách hiện đại. Mang đến trải nghiệm
          mua sắm tuyệt vời cho mọi người.
        </p>
        <div className="flex items-center gap-3">
          {["f", "in", "yt"].map((label, i) => (
            <button
              key={i}
              type="button"
              className="w-8 h-8 rounded-full border border-[#d8c898] text-[#b8860b] flex items-center justify-center text-[11px] font-bold hover:bg-[#b8860b] hover:text-white hover:border-[#b8860b] transition-all duration-200"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-[#1a1a1a] font-semibold mb-5 uppercase tracking-widest text-xs">
          Điều hướng
        </h4>
        <ul className="space-y-3 text-sm">
          {[
            { label: "Trang chủ", to: "/" },
            { label: "Sản phẩm", to: "/products" },
            { label: "Giỏ hàng", to: "/cart" },
            { label: "Đơn hàng", to: "/orders" },
            { label: "Liên hệ", to: "/contact" },
          ].map(({ label, to }) => (
            <li key={to}>
              <Link
                to={to}
                className="hover:text-[#b8860b] transition-colors inline-flex items-center gap-2 group"
              >
                <span className="w-4 h-px bg-[#d8c898] group-hover:bg-[#b8860b] group-hover:w-6 transition-all duration-300 inline-block" />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Cột 4 — Liên hệ */}
      <div>
        <h4 className="text-[#1a1a1a] font-semibold mb-5 uppercase tracking-widest text-xs">
          Liên hệ
        </h4>
        <ul className="space-y-4 text-sm">
          <li className="flex items-start gap-3">
            <MapPin size={14} className="mt-0.5 shrink-0 text-[#b8860b]" />
            <span>Apteach</span>
          </li>
          <li className="flex items-center gap-3">
            <Phone size={14} className="shrink-0 text-[#b8860b]" />
            <span>0339 623 430</span>
          </li>
          <li className="flex items-center gap-3">
            <Mail size={14} className="shrink-0 text-[#b8860b]" />
            <span>tranhuuloc2602@gmail.com</span>
          </li>
        </ul>
      </div>

      {/* Cột 4 — Map */}
      <div>
        <h4 className="text-[#1a1a1a] font-semibold mb-5 uppercase tracking-widest text-xs">
          Tìm chúng tôi
        </h4>
        <iframe
          title="Bản đồ cửa hàng Maverick Dresses"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1075.6106030461406!2d105.81887819385277!3d21.035839411153077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab0d127a01e7%3A0xab069cd4eaa76ff2!2zMjg1IMSQ4buZaSBD4bqlbiwgTmfhu41jIEjDoCwgSMOgIE7bu5lpIDEwMDAwMCwgVmlldG5hbQ!5e0!3m2!1sen!2s!4v1779303130478!5m2!1sen!2s"
          width="100%"
          height="180"
          style={{ border: 0 }}
          className="rounded-xl w-full"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>

    <div className="border-t border-[#e0d0a8] py-5 bg-[#f0e8d0]">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-[#a09070]">
        <span>
          © {new Date().getFullYear()} Maverick Dresses. All rights reserved.
        </span>
        <span>
          Thiết kế bởi{" "}
          <span className="text-[#b8860b] font-semibold">Aptech</span>
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;
