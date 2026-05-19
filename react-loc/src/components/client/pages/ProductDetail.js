import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ShoppingCart, ArrowLeft, Plus, Minus } from "lucide-react";

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

        // Sản phẩm liên quan (cùng danh mục, khác id)
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
      <div className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-6 bg-gray-200 rounded animate-pulse" style={{ width: `${80 - i * 10}%` }} />
        ))}
      </div>
    </div>
  );

  if (!product) return (
    <div className="text-center py-20 text-[#888]">
      <p className="text-4xl mb-3">😕</p>
      <p>Không tìm thấy sản phẩm.</p>
      <Link to="/products" className="mt-4 inline-block text-[#8b4513] hover:underline">← Quay lại</Link>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[#888] mb-6">
        <Link to="/" className="hover:text-[#2c2c2c]">Trang chủ</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-[#2c2c2c]">Sản phẩm</Link>
        <span>/</span>
        <span className="text-[#2c2c2c] line-clamp-1">{product.name}</span>
      </nav>

      {/* Nội dung chính */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">

        {/* Ảnh */}
        <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = "https://placehold.co/600x600?text=No+Image"; }}
          />
        </div>

        {/* Thông tin */}
        <div className="flex flex-col">
          {/* Danh mục */}
          <p className="text-sm text-[#888] uppercase tracking-wide mb-2">
            {product.category?.name}
          </p>

          {/* Tên */}
          <h1 className="text-2xl font-bold text-[#2c2c2c] mb-3">{product.name}</h1>

          {/* Giá */}
          <p className="text-3xl font-semibold text-[#8b4513] mb-4">
            {formatPrice(product.price)}
          </p>

          {/* Chất liệu */}
          {product.material && (
            <div className="mb-4">
              <span className="text-sm text-[#888]">Chất liệu: </span>
              <span className="text-sm text-[#2c2c2c] font-medium">{product.material}</span>
            </div>
          )}

          {/* Tồn kho */}
          <div className="mb-6">
            <span className="text-sm text-[#888]">Tình trạng: </span>
            {product.stock_quantity > 0 ? (
              <span className="text-sm text-green-600 font-medium">
                Còn hàng ({product.stock_quantity})
              </span>
            ) : (
              <span className="text-sm text-red-500 font-medium">Hết hàng</span>
            )}
          </div>

          {/* Số lượng */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm text-[#888]">Số lượng:</span>
            <div className="flex items-center border border-[#d4c9ba] rounded overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-2 hover:bg-[#f0ebe3] transition-colors"
              >
                <Minus size={14} />
              </button>
              <span className="px-4 py-2 text-sm font-medium border-x border-[#d4c9ba] min-w-[48px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => Math.min(product.stock_quantity, q + 1))}
                className="px-3 py-2 hover:bg-[#f0ebe3] transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* Nút hành động */}
          <div className="flex flex-col sm:flex-row gap-3 mt-auto">
            <button
              onClick={addToCart}
              disabled={product.stock_quantity === 0}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium text-sm transition-colors ${
                added
                  ? "bg-green-600 text-white"
                  : "border-2 border-[#2c2c2c] text-[#2c2c2c] hover:bg-[#2c2c2c] hover:text-white"
              } disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              <ShoppingCart size={16} />
              {added ? "Đã thêm vào giỏ!" : "Thêm vào giỏ"}
            </button>
            <button
              onClick={buyNow}
              disabled={product.stock_quantity === 0}
              className="flex-1 bg-[#8b4513] text-white py-3 rounded-lg font-medium text-sm hover:bg-[#723a10] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Mua ngay
            </button>
          </div>

          {/* Quay lại */}
          <button
            onClick={() => navigate(-1)}
            className="mt-4 flex items-center gap-1 text-sm text-[#888] hover:text-[#2c2c2c] transition-colors"
          >
            <ArrowLeft size={14} /> Quay lại
          </button>
        </div>
      </div>

      {/* Sản phẩm liên quan */}
      {related.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-[#2c2c2c] mb-5">Sản phẩm liên quan</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((p) => (
              <Link key={p.id} to={`/products/${p.id}`} className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
                  <img
                    src={p.image_url}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.src = "https://placehold.co/300x400?text=No+Image"; }}
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium text-[#2c2c2c] line-clamp-2">{p.name}</h3>
                  <p className="text-sm text-[#8b4513] font-semibold mt-1">{formatPrice(p.price)}</p>
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
