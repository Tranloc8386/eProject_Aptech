import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Search, Menu, X, User, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const Header = () => {
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [searchOpen,   setSearchOpen]   = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [keyword,      setKeyword]      = useState("");
  const [cartCount,    setCartCount]    = useState(0);
  const [scrolled,     setScrolled]     = useState(false);
  const { user, logout, isLoggedIn }   = useAuth();
  const navigate = useNavigate();
  const dropRef  = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target))
        setUserDropdown(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setUserDropdown(false);
    navigate("/login");
  };

  useEffect(() => {
    const updateCart = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
    };
    updateCart();
    window.addEventListener("cartUpdated", updateCart);
    return () => window.removeEventListener("cartUpdated", updateCart);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products?search=${encodeURIComponent(keyword.trim())}`);
      setSearchOpen(false);
      setKeyword("");
    }
  };

  const navLinks = [
    { label: "Trang chủ", to: "/" },
    { label: "Sản phẩm",  to: "/products" },
    { label: "Đơn hàng",  to: "/orders" },
    { label: "Liên hệ",   to: "/contact" },
  ];

  return (
    <div className="sticky top-0 z-50">
      {/* Announcement bar — gold */}
      <div className="bg-[#b8860b] text-white text-[11px] text-center py-2.5 tracking-widest font-medium">
        MIỄN PHÍ VẬN CHUYỂN ĐƠN HÀNG TRÊN 500.000đ &nbsp;·&nbsp; ĐỔI TRẢ TRONG 30 NGÀY
      </div>

      <header className={`bg-white border-b border-[#e8dcc8] transition-shadow duration-300 ${scrolled ? "shadow-md" : "shadow-sm"}`}>
        <div className="max-w-7xl mx-auto px-4 h-[68px] flex items-center justify-between gap-4">

          {/* Logo */}
          <Link to="/" className="shrink-0 group">
            <div className="font-display text-[22px] font-bold text-[#1a1a1a] leading-tight tracking-wide group-hover:text-[#b8860b] transition-colors duration-300">
              Maverick Dresses
            </div>
            <div className="text-[9px] text-[#b8860b] tracking-[0.28em] uppercase font-semibold">Fashion Store</div>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="relative text-[13px] font-medium text-[#555] hover:text-[#1a1a1a] tracking-wider uppercase transition-colors group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#b8860b] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-5">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-[#777] hover:text-[#b8860b] transition-colors"
            >
              <Search size={19} />
            </button>

            {isLoggedIn ? (
              <div className="relative" ref={dropRef}>
                <button
                  onClick={() => setUserDropdown(!userDropdown)}
                  className="flex items-center gap-1.5 text-[#777] hover:text-[#1a1a1a] transition-colors text-sm"
                >
                  <div className="w-7 h-7 rounded-full bg-[#fdf3dc] border border-[#e8d5a0] flex items-center justify-center text-[#b8860b] font-bold text-xs">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden md:block max-w-[90px] truncate font-medium text-[13px] text-[#555]">{user.name}</span>
                  <ChevronDown size={13} className={`transition-transform duration-200 ${userDropdown ? "rotate-180" : ""}`} />
                </button>
                {userDropdown && (
                  <div className="absolute right-0 top-full mt-2.5 w-48 bg-white rounded-2xl shadow-xl border border-[#f0e8d0] py-1.5 z-50 animate-fadeIn">
                    <div className="px-4 py-2.5 border-b border-[#f5edd8] mb-1">
                      <p className="text-[11px] text-[#aaa] uppercase tracking-wide">Xin chào,</p>
                      <p className="text-sm font-semibold text-[#1a1a1a] truncate">{user.name}</p>
                    </div>
                    <Link to="/orders" onClick={() => setUserDropdown(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#555] hover:bg-[#fdf9f0] transition-colors">
                      Đơn hàng của tôi
                    </Link>
                    <hr className="my-1 border-[#f5edd8]" />
                    <button onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors rounded-b-2xl">
                      <LogOut size={14} /> Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="text-[#777] hover:text-[#b8860b] transition-colors">
                <User size={19} />
              </Link>
            )}

            <Link to="/cart" className="relative text-[#777] hover:text-[#b8860b] transition-colors">
              <ShoppingCart size={19} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#b8860b] text-white text-[10px] w-[18px] h-[18px] rounded-full flex items-center justify-center font-bold">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>

            <button
              className="md:hidden text-[#777] hover:text-[#1a1a1a]"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="border-t border-[#e8dcc8] bg-[#fdfaf4] px-4 py-4">
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex gap-3">
              <input
                autoFocus
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Tìm kiếm sản phẩm..."
                className="flex-1 border border-[#e8dcc8] rounded-full px-5 py-2.5 text-sm bg-white outline-none focus:border-[#b8860b] focus:ring-2 focus:ring-[#b8860b]/10 transition"
              />
              <button
                type="submit"
                className="bg-[#b8860b] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#9a7009] transition-colors"
              >
                Tìm
              </button>
            </form>
          </div>
        )}

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-[#e8dcc8] bg-white px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="text-[13px] font-medium text-[#555] hover:text-[#1a1a1a] hover:bg-[#fdf9f0] uppercase tracking-wider px-4 py-3 rounded-xl transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
