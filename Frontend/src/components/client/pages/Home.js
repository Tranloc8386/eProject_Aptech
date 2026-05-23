import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, ChevronLeft, ChevronRight, Truck, RefreshCw, Gem, ShieldCheck } from "lucide-react";

const API = "http://localhost:8000/api";

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

// ── Banner Slider ─────────────────────────────────────────
const BannerSlider = ({ banners }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => setCurrent((c) => (c + 1) % banners.length), 5000);
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
    <div className="relative w-full overflow-hidden h-[300px] md:h-[420px] lg:h-[480px]">
      {banners.map((b, i) => (
        <div
          key={b.id}
          className={`absolute inset-0 transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0"}`}
          style={{ backgroundColor: b.bg || "#f7f2e8" }}
        >
          <img
            src={b.image?.startsWith("http") ? b.image : `http://localhost:8000/uploads/banners/${b.image}`}
            alt={b.title}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.display = "none"; }}
          />
          {/* px-6 mobile → px-16 desktop | items-center mobile → items-start desktop */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/70 via-[#1a1a1a]/30 to-transparent flex flex-col items-center md:items-start justify-center px-6 md:px-16 gap-4 md:gap-5">
            <div className="w-10 md:w-12 h-[2px] bg-[#b8860b]" />
            {/* text-xl mobile → text-3xl tablet → text-5xl desktop */}
            <h2 className="font-display text-white text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight drop-shadow-lg max-w-xs sm:max-w-sm md:max-w-xl text-center md:text-left">
              {b.title}
            </h2>
            {/* nút nhỏ hơn trên mobile */}
            <Link
              to="/products"
              className="mt-1 inline-flex items-center gap-2 bg-[#b8860b] text-white text-xs md:text-sm font-semibold tracking-widest uppercase px-5 md:px-8 py-2.5 md:py-3 hover:bg-[#a07608] transition-all duration-300"
            >
              Khám phá ngay <span>→</span>
            </Link>
          </div>
        </div>
      ))}

      {/* Nút prev/next ẩn trên mobile nhỏ */}
      {banners.length > 1 && (
        <>
          <button onClick={prev} className="hidden sm:flex absolute left-3 md:left-5 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-[#b8860b] backdrop-blur-sm text-white rounded-full p-2 md:p-2.5 transition-all duration-300">
            <ChevronLeft size={18} />
          </button>
          <button onClick={next} className="hidden sm:flex absolute right-3 md:right-5 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-[#b8860b] backdrop-blur-sm text-white rounded-full p-2 md:p-2.5 transition-all duration-300">
            <ChevronRight size={18} />
          </button>
        </>
      )}

      {/* Dots: căn giữa mobile, căn trái desktop */}
      <div className="absolute bottom-4 md:bottom-6 left-1/2 md:left-16 -translate-x-1/2 md:translate-x-0 flex gap-2">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-[3px] rounded-full transition-all duration-300 ${i === current ? "bg-[#b8860b] w-8" : "bg-white/50 w-4"}`}
          />
        ))}
      </div>
    </div>
  );
};

// ── Features bar ──────────────────────────────────────────
const FeaturesBar = () => (
  <div className="border-y border-[#e8e0d5] bg-white py-8">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
      {[
        { Icon: Truck,       title: "Miễn phí vận chuyển", sub: "Đơn hàng trên 500K" },
        { Icon: RefreshCw,   title: "Đổi trả dễ dàng",     sub: "Trong vòng 30 ngày" },
        { Icon: Gem,         title: "Chất lượng cao cấp",   sub: "Vải nhập khẩu" },
        { Icon: ShieldCheck, title: "Thanh toán an toàn",   sub: "Mã hóa SSL" },
      ].map(({ Icon, title, sub }) => (
        <div key={title} className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-full bg-[#faf8f5] flex items-center justify-center shrink-0">
            <Icon size={18} className="text-[#8b4513]" />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-[#1a1a1a]">{title}</p>
            <p className="text-xs text-[#999]">{sub}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ── Section tiêu đề ───────────────────────────────────────
const SectionTitle = ({ title, subtitle, to }) => (
  <div className="flex items-end justify-between mb-8">
    <div>
      <h2 className="font-display text-3xl font-bold text-[#1a1a1a] leading-tight">{title}</h2>
      {subtitle && <p className="text-sm text-[#999] mt-2">{subtitle}</p>}
    </div>
    {to && (
      <Link to={to} className="text-sm font-medium text-[#8b4513] hover:text-[#1a1a1a] transition-colors flex items-center gap-1 group">
        Xem tất cả
        <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
      </Link>
    )}
  </div>
);

// ── Skeleton card ─────────────────────────────────────────
const SkeletonGrid = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {[...Array(8)].map((_, i) => (
      <div key={i} className="bg-gray-200 rounded-2xl aspect-[3/4] animate-pulse" />
    ))}
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
      <BannerSlider banners={banners} />
      <FeaturesBar />

      <div className="max-w-7xl mx-auto px-4 py-14 space-y-20">

        {/* Sản phẩm nổi bật */}
        <section>
          <SectionTitle
            title="Sản phẩm nổi bật"
            subtitle="Những sản phẩm được yêu thích nhất"
            to="/products?featured=1"
          />
          {loading ? <SkeletonGrid /> : featured.length === 0 ? (
            <p className="text-[#999] text-sm">Chưa có sản phẩm nổi bật.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
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
          {loading ? <SkeletonGrid /> : bestSelling.length === 0 ? (
            <p className="text-[#999] text-sm">Chưa có dữ liệu.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {bestSelling.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </section>

      </div>
    </div>
  );
};

export default Home;
