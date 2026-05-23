import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ShoppingCart, SlidersHorizontal, X } from "lucide-react";

const API = "http://localhost:8000/api";

const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);

// ── Card sản phẩm ─────────────────────────────────────────
const ProductCard = ({ product }) => {
  const addToCart = (e) => {
    e.preventDefault();
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const idx  = cart.findIndex((i) => i.product_id === product.id);
    if (idx >= 0) {
      cart[idx].quantity += 1;
    } else {
      cart.push({
        product_id: product.id,
        name:       product.name,
        price:      product.price,
        image:      product.image_url,
        quantity:   1,
      });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    alert("Đã thêm vào giỏ hàng!");
  };

  return (
    <Link to={`/products/${product.id}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
      <div className="relative overflow-hidden aspect-[3/4] bg-gray-100">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          onError={(e) => { e.target.src = "https://placehold.co/300x400?text=No+Image"; }}
        />
        {product.is_featured === 1 && (
          <span className="absolute top-3 left-3 bg-[#8b4513] text-white text-[10px] font-semibold px-2.5 py-1 rounded-full tracking-wider uppercase">
            Nổi bật
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <button
          onClick={addToCart}
          className="absolute bottom-0 left-0 right-0 bg-[#1a1a1a]/90 backdrop-blur-sm text-white py-3.5 text-sm font-medium flex items-center justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"
        >
          <ShoppingCart size={15} /> Thêm vào giỏ
        </button>
      </div>
      <div className="p-4">
        <p className="text-[10px] text-[#aaa] mb-1 uppercase tracking-widest">{product.category?.name}</p>
        <h3 className="text-sm font-medium text-[#1a1a1a] line-clamp-1 mb-2">{product.name}</h3>
        <p className="text-base font-bold text-[#8b4513]">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
};

// ── Shop page ─────────────────────────────────────────────
const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products,   setProducts]   = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [showFilter, setShowFilter] = useState(false);

  const selectedCat = searchParams.get("category") || "";
  const searchText  = searchParams.get("search")   || "";
  const sortBy      = searchParams.get("sort")     || "newest";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [pRes, cRes] = await Promise.all([
          fetch(`${API}/products`),
          fetch(`${API}/categories`),
        ]);
        const pData = await pRes.json();
        const cData = await cRes.json();
        setProducts(pData.data   || []);
        setCategories(cData.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filtered = products
    .filter((p) => {
      const matchCat    = selectedCat ? String(p.category_id) === selectedCat : true;
      const matchSearch = searchText
        ? p.name.toLowerCase().includes(searchText.toLowerCase())
        : true;
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === "price_asc")  return a.price - b.price;
      if (sortBy === "price_desc") return b.price - a.price;
      return b.id - a.id;
    });

  const setParam = (key, value) => {
    const p = new URLSearchParams(searchParams);
    if (value) p.set(key, value);
    else p.delete(key);
    setSearchParams(p);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* Tiêu đề + toolbar */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-[#1a1a1a]">Sản phẩm</h1>
          <p className="text-sm text-[#999] mt-1">{filtered.length} sản phẩm</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={sortBy}
            onChange={(e) => setParam("sort", e.target.value)}
            className="border border-[#e8e0d5] rounded-full px-4 py-2 text-sm bg-white outline-none focus:border-[#8b4513] transition cursor-pointer"
          >
            <option value="newest">Mới nhất</option>
            <option value="price_asc">Giá tăng dần</option>
            <option value="price_desc">Giá giảm dần</option>
          </select>
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="md:hidden flex items-center gap-1.5 border border-[#e8e0d5] rounded-full px-4 py-2 text-sm bg-white hover:border-[#8b4513] transition"
          >
            <SlidersHorizontal size={14} /> Lọc
          </button>
        </div>
      </div>

      <div className="flex gap-7">

        {/* Sidebar lọc */}
        <aside className={`shrink-0 w-52 ${showFilter ? "block" : "hidden md:block"}`}>
          <div className="bg-white rounded-2xl p-5 shadow-sm sticky top-24 border border-[#f0ebe3]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#1a1a1a] text-sm uppercase tracking-widest">Danh mục</h3>
              {selectedCat && (
                <button onClick={() => setParam("category", "")} className="text-[#aaa] hover:text-[#1a1a1a] transition">
                  <X size={14} />
                </button>
              )}
            </div>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => setParam("category", "")}
                  className={`w-full text-left text-sm px-3 py-2 rounded-xl transition-all ${
                    !selectedCat
                      ? "bg-[#1a1a1a] text-white font-medium"
                      : "text-[#4a4a4a] hover:bg-[#faf8f5]"
                  }`}
                >
                  Tất cả
                </button>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => setParam("category", String(cat.id))}
                    className={`w-full text-left text-sm px-3 py-2 rounded-xl transition-all ${
                      selectedCat === String(cat.id)
                        ? "bg-[#1a1a1a] text-white font-medium"
                        : "text-[#4a4a4a] hover:bg-[#faf8f5]"
                    }`}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Grid sản phẩm */}
        <div className="flex-1">
          {searchText && (
            <div className="flex items-center gap-2 mb-5">
              <span className="text-sm text-[#999]">Kết quả cho:</span>
              <span className="bg-[#f0ebe3] text-[#1a1a1a] text-sm px-3 py-1 rounded-full flex items-center gap-1.5 font-medium">
                "{searchText}"
                <button onClick={() => setParam("search", "")} className="text-[#aaa] hover:text-[#1a1a1a]">
                  <X size={12} />
                </button>
              </span>
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-2xl aspect-[3/4] animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24 text-[#aaa]">
              <p className="text-5xl mb-4">🔍</p>
              <p className="text-base font-medium text-[#888]">Không tìm thấy sản phẩm nào.</p>
              <p className="text-sm mt-1">Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
