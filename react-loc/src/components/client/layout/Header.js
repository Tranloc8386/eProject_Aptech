import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Search, Menu, X, User, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const Header = () => {
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [searchOpen,  setSearchOpen]  = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [keyword,     setKeyword]     = useState("");
  const [cartCount,   setCartCount]   = useState(0);
  const { user, logout, isLoggedIn }  = useAuth();
  const navigate  = useNavigate();
  const dropRef   = useRef(null);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target))
        setUserDropdown(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    logout();
    setUserDropdown(false);
    navigate("/login");
  };

  // Đọc số lượng giỏ hàng từ localStorage
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
    { label: "Trang chủ",   to: "/" },
    { label: "Sản phẩm",    to: "/products" },
    { label: "Đơn hàng",    to: "/orders" },
    { label: "Liên hệ",     to: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#faf8f5] border-b border-[#e8e0d5] shadow-sm">
      {/* Top bar */}
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link to="/" className="shrink-0">
          <div className="text-xl font-bold text-[#2c2c2c] leading-tight">Maverick Dresses</div>
          <div className="text-xs text-[#888] tracking-widest uppercase">Fashion Store</div>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium text-[#4a4a4a] hover:text-[#2c2c2c] tracking-wide uppercase transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right icons */}
        <div className="flex items-center gap-4">
          {/* Search icon */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="text-[#4a4a4a] hover:text-[#2c2c2c] transition-colors"
          >
            <Search size={20} />
          </button>

          {/* Account */}
          {isLoggedIn ? (
            <div className="relative" ref={dropRef}>
              <button
                onClick={() => setUserDropdown(!userDropdown)}
                className="flex items-center gap-1 text-[#4a4a4a] hover:text-[#2c2c2c] transition-colors text-sm"
              >
                <User size={18} />
                <span className="hidden md:block max-w-[100px] truncate">{user.name}</span>
                <ChevronDown size={14} />
              </button>
              {userDropdown && (
                <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-xl shadow-lg border border-[#e8e0d5] py-1 z-50">
                  <Link to="/orders" onClick={() => setUserDropdown(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-[#4a4a4a] hover:bg-[#f0ebe3]">
                    Đơn hàng của tôi
                  </Link>
                  <hr className="my-1 border-[#e8e0d5]" />
                  <button onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50">
                    <LogOut size={14} /> Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="text-[#4a4a4a] hover:text-[#2c2c2c] transition-colors">
              <User size={20} />
            </Link>
          )}

          {/* Cart */}
          <Link to="/cart" className="relative text-[#4a4a4a] hover:text-[#2c2c2c] transition-colors">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#8b4513] text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Hamburger mobile */}
          <button
            className="md:hidden text-[#4a4a4a]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Search bar */}
      {searchOpen && (
        <div className="border-t border-[#e8e0d5] bg-[#faf8f5] px-4 py-3">
          <form onSubmit={handleSearch} className="max-w-xl mx-auto flex gap-2">
            <input
              autoFocus
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Tìm kiếm sản phẩm..."
              className="flex-1 border border-[#d4c9ba] rounded px-4 py-2 text-sm bg-white outline-none focus:border-[#8b4513]"
            />
            <button
              type="submit"
              className="bg-[#2c2c2c] text-white px-4 py-2 rounded text-sm hover:bg-[#8b4513] transition-colors"
            >
              Tìm
            </button>
          </form>
        </div>
      )}

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#e8e0d5] bg-[#faf8f5] px-4 py-3 flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-[#4a4a4a] hover:text-[#2c2c2c] uppercase tracking-wide py-1"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
