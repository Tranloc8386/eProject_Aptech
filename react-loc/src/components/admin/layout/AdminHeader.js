import React, { useState, useEffect, useRef } from "react";
import { Search, Package, Users, ShoppingBag, User, Mail, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../services/api";

const AdminHeader = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ products: [], customers: [], orders: [] });
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Debounce: đợi 300ms sau khi gõ mới gọi API
  useEffect(() => {
    if (query.length < 2) {
      setResults({ products: [], customers: [], orders: [] });
      setShowDropdown(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await api.get(`/search?q=${encodeURIComponent(query)}`);
        setResults(res.data);
        setShowDropdown(true);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (url) => {
    setShowDropdown(false);
    setQuery('');
    navigate(url);
  };

  const hasResults =
    results.products.length > 0 ||
    results.customers.length > 0 ||
    results.orders.length > 0;

  return (
    <header className="fixed top-0 left-[260px] right-0 h-16 bg-white border-b z-40 flex items-center justify-between px-6">
      {/* Left */}
      <div className="flex items-center gap-6 w-full">
        <h2 className="text-2xl font-bold text-blue-700">AdminCentral</h2>

        {/* Search */}
        <div className="relative w-full max-w-md" ref={dropdownRef}>
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search data, orders, or users..."
            className="w-full bg-gray-100 rounded-full pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute top-12 left-0 right-0 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden">

              {loading && (
                <p className="p-4 text-sm text-gray-400">Đang tìm kiếm...</p>
              )}

              {/* Sản phẩm */}
              {results.products.length > 0 && (
                <div>
                  <p className="px-4 pt-3 pb-1 text-xs font-bold text-gray-400 uppercase flex items-center gap-1">
                    <Package size={12} /> Sản phẩm
                  </p>
                  {results.products.map(p => (
                    <div key={p.id} onClick={() => handleSelect('/products')}
                      className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-3">
                      <img
                        src={`http://127.0.0.1:8000/products/${p.image}`}
                        alt=""
                        className="w-8 h-8 rounded object-cover bg-gray-100"
                      />
                      <div>
                        <p className="text-sm font-medium">{p.name}</p>
                        <p className="text-xs text-gray-400">
                          {Number(p.price).toLocaleString('vi-VN')}₫
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Khách hàng */}
              {results.customers.length > 0 && (
                <div>
                  <p className="px-4 pt-3 pb-1 text-xs font-bold text-gray-400 uppercase flex items-center gap-1">
                    <Users size={12} /> Khách hàng
                  </p>
                  {results.customers.map(c => (
                    <div key={c.id} onClick={() => handleSelect('/users')}
                      className="px-4 py-2 hover:bg-gray-50 cursor-pointer">
                      <p className="text-sm font-medium">{c.name}</p>
                      <p className="text-xs text-gray-400">{c.email}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Đơn hàng */}
              {results.orders.length > 0 && (
                <div>
                  <p className="px-4 pt-3 pb-1 text-xs font-bold text-gray-400 uppercase flex items-center gap-1">
                    <ShoppingBag size={12} /> Đơn hàng
                  </p>
                  {results.orders.map(o => (
                    <div key={o.id} onClick={() => handleSelect('/orders')}
                      className="px-4 py-2 hover:bg-gray-50 cursor-pointer">
                      <p className="text-sm font-medium">Đơn #{o.id} — {o.shipping_name}</p>
                      <p className="text-xs text-gray-400">{o.status}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Không có kết quả */}
              {!loading && !hasResults && (
                <p className="p-4 text-sm text-gray-400">Không tìm thấy kết quả nào</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-3 hover:opacity-80 transition"
          >
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
              {user?.name?.charAt(0)?.toUpperCase() || "A"}
            </div>
            <div className="text-left">
              <h4 className="font-semibold text-sm">{user?.name || "Admin"}</h4>
              <p className="text-xs text-gray-500">{user?.email || ""}</p>
            </div>
          </button>

          {showProfile && (
            <div className="absolute right-0 top-14 w-72 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 p-5">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                  {user?.name?.charAt(0)?.toUpperCase() || "A"}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{user?.name || "Admin"}</h4>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">Quản trị viên</span>
                </div>
              </div>
              <div className="border-t pt-4 flex flex-col gap-3 text-sm text-gray-600">
                <div className="flex items-center gap-3">
                  <User size={16} className="text-gray-400" />
                  <span>{user?.name || "—"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-gray-400" />
                  <span>{user?.email || "—"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield size={16} className="text-gray-400" />
                  <span>Admin</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
