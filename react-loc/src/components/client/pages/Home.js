import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";

const API = "http://localhost:8000/api";

// ── Format tiền ──────────────────────────────────────────
const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);

// ── Card sản phẩm ────────────────────────────────────────
const ProductCard = ({ product }) => {
  const addToCart = (e) => {
    e.preventDefault();
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const idx  = cart.findIndex((i) => i.product_id === product.id);
    if (idx >= 0) {
      cart[idx].quantity += 1;
    } else {
      cart.push({ product_id: product.id, name: product.name, price: product.price, image: product.image_url, quantity: 1 });
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

// ── Banner Slider ─────────────────────────────────────────
const BannerSlider = ({ banners }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => setCurrent((c) => (c + 1) % banners.length), 4000);
    return () => clearInterval(timer);
  }, [banners]);

  if (!banners.length) return (
    <div className="w-full h-[420px] bg-[#e8e0d5] flex items-center justify-center">
      <p className="text-[#888]">Đang tải banner...</p>
    </div>
  );

  const prev = () => setCurrent((c) => (c - 1 + banners.length) % banners.length);
  const next = () => setCurrent((c) => (c + 1) % banners.length);

  return (
    <div className="relative w-full overflow-hidden" style={{ height: "480px" }}>
      {banners.map((b, i) => (
        <div
          key={b.id}
          className={`absolute inset-0 transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0"}`}
        >
          <img
            src={`http://localhost:8000/uploads/banners/${b.image}`}
            alt={b.title}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = "https://placehold.co/1400x480?text=Banner"; }}
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <h2 className="text-white text-4xl font-bold tracking-widest drop-shadow-lg">{b.title}</h2>
          </div>
        </div>
      ))}

      {/* Nút prev/next */}
      {banners.length > 1 && (
        <>
          <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 transition">
            <ChevronLeft size={20} />
          </button>
          <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 transition">
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-white w-6" : "bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  );
};

// ── Section tiêu đề ───────────────────────────────────────
const SectionTitle = ({ title, subtitle, to }) => (
  <div className="flex items-end justify-between mb-6">
    <div>
      <h2 className="text-2xl font-bold text-[#2c2c2c] tracking-wide">{title}</h2>
      {subtitle && <p className="text-sm text-[#888] mt-1">{subtitle}</p>}
    </div>
    {to && (
      <Link to={to} className="text-sm text-[#8b4513] hover:underline font-medium">
        Xem tất cả →
      </Link>
    )}
  </div>
);

// ── Home page ─────────────────────────────────────────────
const Home = () => {
  const [banners,     setBanners]     = useState([]);
  const [featured,    setFeatured]    = useState([]);
  const [bestSelling, setBestSelling] = useState([]);
  const [loading,     setLoading]     = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [bRes, pRes] = await Promise.all([
          fetch(`${API}/banners`),
          fetch(`${API}/products`),
        ]);
        const bData = await bRes.json();
        const pData = await pRes.json();

        const allProducts = pData.data || [];

        setBanners(
          (bData.data || []).filter((b) => b.is_active).sort((a, b) => a.order - b.order)
        );
        setFeatured(allProducts.filter((p) => p.is_featured).slice(0, 8));
        // Tạm thời lấy 8 sản phẩm mới nhất làm bán chạy (sẽ thay bằng API thật sau)
        setBestSelling(allProducts.slice(0, 8));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  return (
    <div>
      {/* Banner */}
      <BannerSlider banners={banners} />

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">

        {/* Sản phẩm nổi bật */}
        <section>
          <SectionTitle
            title="Sản phẩm nổi bật"
            subtitle="Những sản phẩm được yêu thích nhất"
            to="/products?featured=1"
          />
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-lg aspect-[3/4] animate-pulse" />
              ))}
            </div>
          ) : featured.length === 0 ? (
            <p className="text-[#888] text-sm">Chưa có sản phẩm nổi bật.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {featured.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </section>

        {/* Divider */}
        <div className="border-t border-[#e8e0d5]" />

        {/* Sản phẩm bán chạy */}
        <section>
          <SectionTitle
            title="Sản phẩm bán chạy"
            subtitle="Top sản phẩm được mua nhiều nhất"
            to="/products"
          />
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-lg aspect-[3/4] animate-pulse" />
              ))}
            </div>
          ) : bestSelling.length === 0 ? (
            <p className="text-[#888] text-sm">Chưa có dữ liệu.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {bestSelling.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </section>

      </div>
    </div>
  );
};

export default Home;
