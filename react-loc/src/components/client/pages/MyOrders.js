import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { PackageCheck, ChevronDown, ChevronUp, CheckCircle } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const API = "http://localhost:8000/api";

const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);

const formatDate = (dateStr) => {
  if (!dateStr) return "---";
  const d = new Date(dateStr);
  return `${d.getDate().toString().padStart(2,"0")}/${(d.getMonth()+1).toString().padStart(2,"0")}/${d.getFullYear()} ${d.getHours().toString().padStart(2,"0")}:${d.getMinutes().toString().padStart(2,"0")}`;
};

const STATUS_LABEL = {
  pending:    { label: "Chờ xử lý",    color: "bg-yellow-100 text-yellow-700" },
  processing: { label: "Đang xử lý",   color: "bg-blue-100 text-blue-700" },
  shipped:    { label: "Đang giao",     color: "bg-purple-100 text-purple-700" },
  delivered:  { label: "Đã giao",       color: "bg-green-100 text-green-700" },
  cancelled:  { label: "Đã huỷ",        color: "bg-red-100 text-red-700" },
};

const OrderCard = ({ order }) => {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const status = STATUS_LABEL[order.status] || { label: order.status, color: "bg-gray-100 text-gray-700" };

  const toggleDetails = async () => {
    if (!open && details.length === 0) {
      setLoading(true);
      try {
        const res  = await fetch(`${API}/orders/${order.id}/details`);
        const data = await res.json();
        setDetails(data.data || []);
      } catch { }
      finally { setLoading(false); }
    }
    setOpen(!open);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Header đơn hàng */}
      <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-[#2c2c2c]">Đơn #{order.id}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${status.color}`}>
              {status.label}
            </span>
            <span className="text-xs text-[#888] uppercase tracking-wide">
              {order.payment_method === "vnpay" ? "VNPay" : "COD"}
            </span>
          </div>
          <p className="text-xs text-[#888]">{formatDate(order.created_at)}</p>
          <p className="text-xs text-[#666]">
            Giao đến: <span className="text-[#2c2c2c]">{order.shipping_name} — {order.shipping_address}</span>
          </p>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <span className="text-base font-bold text-[#8b4513]">{formatPrice(order.total_amount)}</span>
          <button
            onClick={toggleDetails}
            className="flex items-center gap-1 text-sm text-[#888] hover:text-[#2c2c2c] transition-colors"
          >
            {open ? <><ChevronUp size={16} /> Ẩn</> : <><ChevronDown size={16} /> Chi tiết</>}
          </button>
        </div>
      </div>

      {/* Chi tiết sản phẩm */}
      {open && (
        <div className="border-t border-[#f0ebe3] px-4 py-3 bg-[#faf8f5]">
          {loading ? (
            <p className="text-sm text-[#888] py-2">Đang tải...</p>
          ) : details.length === 0 ? (
            <p className="text-sm text-[#888] py-2">Không có sản phẩm.</p>
          ) : (
            <div className="space-y-3">
              {details.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <img
                    src={item.product_image
                      ? `http://localhost:8000/products/${item.product_image}`
                      : "https://placehold.co/56x56?text=No"}
                    alt={item.product_name}
                    className="w-14 h-14 object-cover rounded-lg bg-gray-100 shrink-0"
                    onError={(e) => { e.target.src = "https://placehold.co/56x56?text=No"; }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#2c2c2c] font-medium line-clamp-1">{item.product_name}</p>
                    <p className="text-xs text-[#888]">
                      {formatPrice(item.price)} x {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-[#8b4513] shrink-0">
                    {formatPrice(item.subtotal)}
                  </p>
                </div>
              ))}
              {order.note && (
                <p className="text-xs text-[#888] pt-2 border-t border-[#e8e0d5]">
                  Ghi chú: {order.note}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const MyOrders = () => {
  const [searchParams] = useSearchParams();
  const [orders,  setOrders]  = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const showSuccess = searchParams.get("success") === "1";
  const orderId     = searchParams.get("orderId");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res  = await fetch(`${API}/orders`);
        const data = await res.json();
        const myOrders = (data.data || []).filter(
          (o) => o.customer_id === user?.id
        );
        setOrders(myOrders);
      } catch { }
      finally { setLoading(false); }
    };
    fetchOrders();
  }, [user?.id]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">

      {/* Thông báo đặt hàng thành công */}
      {showSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3 mb-6">
          <CheckCircle size={22} className="text-green-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-green-700">Đặt hàng thành công!</p>
            <p className="text-xs text-green-600 mt-0.5">
              Đơn hàng #{orderId} đã được ghi nhận. Chúng tôi sẽ liên hệ sớm nhất.
            </p>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-bold text-[#2c2c2c] mb-6">Đơn hàng của tôi</h1>

      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl h-24 animate-pulse" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20">
          <PackageCheck size={56} className="mx-auto text-[#d4c9ba] mb-3" />
          <p className="text-[#888] text-sm">Bạn chưa có đơn hàng nào.</p>
          <Link
            to="/products"
            className="inline-block mt-4 bg-[#2c2c2c] text-white px-8 py-3 rounded-lg text-sm font-medium hover:bg-[#8b4513] transition-colors"
          >
            Mua sắm ngay
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
