import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ShoppingCart, ArrowLeft, Plus, Minus, Check } from "lucide-react";

const API = "http://localhost:8000/api";

const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product,  setProduct]  = useState(null);
  const [related,  setRelated]  = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading,  setLoading]  = useState(true);
  const [added,    setAdded]    = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setQuantity(1);
      setAdded(false);
      try {
        const [pRes, allRes] = await Promise.all([
          fetch(`${API}/products/${id}`),
          fetch(`${API}/products`),
        ]);
        const pData   = await pRes.json();
        const allData = await allRes.json();

        const p = pData.data;
        setProduct(p);

        const rel = (allData.data || [])
          .filter((x) => x.category_id === p.category_id && x.id !== p.id)
          .slice(0, 4);
        setRelated(rel);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const idx  = cart.findIndex((i) => i.product_id === product.id);
    if (idx >= 0) {
      cart[idx].quantity += quantity;
    } else {
      cart.push({
        product_id: product.id,
        name:       product.name,
        price:      product.price,
        image:      product.image_url,
        quantity,
      });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const buyNow = () => {
    addToCart();
    navigate("/cart");
  };

  if (loading) return (
    <div className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="aspect-square bg-gray-200 rounded-2xl animate-pulse" />
      <div className="space-y-4 pt-4">
        {[80, 60, 40, 70, 50].map((w, i) => (
          <div key={i} className="h-5 bg-gray-200 rounded-full animate-pulse" style={{ width: `${w}%` }} />
        ))}
      </div>
    </div>
  );

  if (!product) return (
    <div className="text-center py-24 text-[#aaa]">
      <p className="text-5xl mb-4">😕</p>
      <p className="text-base font-medium text-[#888]">Không tìm thấy sản phẩm.</p>
      <Link to="/products" className="mt-4 inline-block text-[#8b4513] hover:underline text-sm">← Quay lại</Link>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[#aaa] mb-8">
        <Link to="/" className="hover:text-[#1a1a1a] transition-colors">Trang chủ</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-[#1a1a1a] transition-colors">Sản phẩm</Link>
        <span>/</span>
        <span className="text-[#1a1a1a] line-clamp-1">{product.name}</span>
      </nav>

      {/* Nội dung chính */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">

        {/* Ảnh */}
        <div className="aspect-square bg-gray-100 rounded-3xl overflow-hidden shadow-sm">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            onError={(e) => { e.target.src = "https://placehold.co/600x600?text=No+Image"; }}
          />
        </div>

        {/* Thông tin */}
        <div className="flex flex-col py-2">
          {product.category?.name && (
            <span className="inline-block self-start bg-[#f0ebe3] text-[#8b4513] text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
              {product.category.name}
            </span>
          )}

          <h1 className="font-display text-3xl font-bold text-[#1a1a1a] leading-tight mb-4">
            {product.name}
          </h1>

          <p className="text-4xl font-bold text-[#8b4513] mb-6">
            {formatPrice(product.price)}
          </p>

          {/* Divider */}
          <div className="border-t border-[#f0ebe3] mb-6" />

          {/* Meta */}
          <div className="space-y-2 mb-6 text-sm">
            {product.material && (
              <div className="flex gap-2">
                <span className="text-[#aaa] w-24 shrink-0">Chất liệu</span>
                <span className="font-medium text-[#1a1a1a]">{product.material}</span>
              </div>
            )}
            <div className="flex gap-2">
              <span className="text-[#aaa] w-24 shrink-0">Tình trạng</span>
              {product.stock_quantity > 0 ? (
                <span className="font-medium text-green-600">Còn hàng ({product.stock_quantity})</span>
              ) : (
                <span className="font-medium text-red-500">Hết hàng</span>
              )}
            </div>
          </div>

          {/* Số lượng */}
          <div className="flex items-center gap-4 mb-7">
            <span className="text-sm text-[#aaa] w-24 shrink-0">Số lượng</span>
            <div className="flex items-center border border-[#e8e0d5] rounded-xl overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 py-2.5 hover:bg-[#faf8f5] transition-colors text-[#4a4a4a]"
              >
                <Minus size={14} />
              </button>
              <span className="px-5 py-2.5 text-sm font-semibold border-x border-[#e8e0d5] min-w-[52px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => Math.min(product.stock_quantity, q + 1))}
                className="px-4 py-2.5 hover:bg-[#faf8f5] transition-colors text-[#4a4a4a]"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* Nút hành động */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={addToCart}
              disabled={product.stock_quantity === 0}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                added
                  ? "bg-green-600 text-white"
                  : "border-2 border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white"
              } disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              {added ? <Check size={16} /> : <ShoppingCart size={16} />}
              {added ? "Đã thêm vào giỏ!" : "Thêm vào giỏ"}
            </button>
            <button
              onClick={buyNow}
              disabled={product.stock_quantity === 0}
              className="flex-1 bg-[#8b4513] text-white py-3.5 rounded-xl font-medium text-sm hover:bg-[#723a10] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Mua ngay
            </button>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="mt-5 flex items-center gap-1.5 text-sm text-[#aaa] hover:text-[#1a1a1a] transition-colors self-start"
          >
            <ArrowLeft size={14} /> Quay lại
          </button>
        </div>
      </div>

      {/* Sản phẩm liên quan */}
      {related.length > 0 && (
        <section>
          <h2 className="font-display text-2xl font-bold text-[#1a1a1a] mb-6">Sản phẩm liên quan</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {related.map((p) => (
              <Link key={p.id} to={`/products/${p.id}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
                  <img
                    src={p.image_url}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => { e.target.src = "https://placehold.co/300x400?text=No+Image"; }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-medium text-[#1a1a1a] line-clamp-1 mb-1">{p.name}</h3>
                  <p className="text-sm font-bold text-[#8b4513]">{formatPrice(p.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
