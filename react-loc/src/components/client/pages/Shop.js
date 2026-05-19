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
    <Link to={`/products/${product.id}`} className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative overflow-hidden aspect-[3/4] bg-gray-100">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { e.target.src = "https://placehold.co/300x400?text=No+Image"; }}
        />
        {product.is_featured === 1 && (
          <span className="absolute top-2 left-2 bg-[#8b4513] text-white text-xs px-2 py-0.5 rounded">
            Nổi bật
          </span>
        )}
        <button
          onClick={addToCart}
          className="absolute bottom-0 left-0 right-0 bg-[#2c2c2c] text-white py-3 text-sm font-medium flex items-center justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
        >
          <ShoppingCart size={16} /> Thêm vào giỏ
        </button>
      </div>
      <div className="p-3">
        <p className="text-xs text-[#888] mb-1">{product.category?.name}</p>
        <h3 className="text-sm font-medium text-[#2c2c2c] line-clamp-2">{product.name}</h3>
        <p className="text-sm font-semibold text-[#8b4513] mt-1">{formatPrice(product.price)}</p>
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

  const selectedCat  = searchParams.get("category") || "";
  const searchText   = searchParams.get("search")   || "";
  const sortBy       = searchParams.get("sort")     || "newest";

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

  // Lọc + sort
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
      return b.id - a.id; // newest
    });

  const setParam = (key, value) => {
    const p = new URLSearchParams(searchParams);
    if (value) p.set(key, value);
    else p.delete(key);
    setSearchParams(p);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Tiêu đề + toolbar */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#2c2c2c]">Sản phẩm</h1>
          <p className="text-sm text-[#888] mt-1">{filtered.length} sản phẩm</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setParam("sort", e.target.value)}
            className="border border-[#d4c9ba] rounded px-3 py-2 text-sm bg-white outline-none focus:border-[#8b4513]"
          >
            <option value="newest">Mới nhất</option>
            <option value="price_asc">Giá tăng dần</option>
            <option value="price_desc">Giá giảm dần</option>
          </select>
          {/* Filter toggle mobile */}
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="md:hidden flex items-center gap-1 border border-[#d4c9ba] rounded px-3 py-2 text-sm"
          >
            <SlidersHorizontal size={14} /> Lọc
          </button>
        </div>
      </div>

      <div className="flex gap-6">

        {/* Sidebar lọc */}
        <aside className={`shrink-0 w-52 ${showFilter ? "block" : "hidden md:block"}`}>
          <div className="bg-white rounded-lg p-4 shadow-sm sticky top-20">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-[#2c2c2c] text-sm uppercase tracking-wide">Danh mục</h3>
              {selectedCat && (
                <button onClick={() => setParam("category", "")} className="text-[#888] hover:text-[#2c2c2c]">
                  <X size={14} />
                </button>
              )}
            </div>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => setParam("category", "")}
                  className={`w-full text-left text-sm px-2 py-1.5 rounded transition-colors ${
                    !selectedCat ? "bg-[#2c2c2c] text-white" : "text-[#4a4a4a] hover:bg-[#f0ebe3]"
                  }`}
                >
                  Tất cả
                </button>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => setParam("category", String(cat.id))}
                    className={`w-full text-left text-sm px-2 py-1.5 rounded transition-colors ${
                      selectedCat === String(cat.id)
                        ? "bg-[#2c2c2c] text-white"
                        : "text-[#4a4a4a] hover:bg-[#f0ebe3]"
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
          {/* Search tag */}
          {searchText && (
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-[#888]">Kết quả cho:</span>
              <span className="bg-[#f0ebe3] text-[#2c2c2c] text-sm px-3 py-1 rounded-full flex items-center gap-1">
                "{searchText}"
                <button onClick={() => setParam("search", "")}><X size={12} /></button>
              </span>
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-lg aspect-[3/4] animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-[#888]">
              <p className="text-4xl mb-3">🔍</p>
              <p>Không tìm thấy sản phẩm nào.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
