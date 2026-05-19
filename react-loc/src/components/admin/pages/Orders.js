import React, { useState, useEffect } from "react";
import {
  Plus,
  Eye,
  ShoppingBag,
  DollarSign,
  ClipboardList,
  RotateCcw,
  Loader,
  AlertTriangle,
  X,
  MapPin,
  Phone,
  CreditCard,
  Package,
} from "lucide-react";
import { apiEndpoints } from "../../../services/api";
import Pagination from "../../shared/Pagination";

const ITEMS_PER_PAGE = 10;

const STATUS_MAP = {
  pending:    { label: 'Chờ xử lý',   color: 'bg-yellow-100 text-yellow-700' },
  processing: { label: 'Đang xử lý',  color: 'bg-blue-100 text-blue-700' },
  shipped:    { label: 'Đang giao',    color: 'bg-indigo-100 text-indigo-700' },
  delivered:  { label: 'Đã giao',      color: 'bg-green-100 text-green-700' },
  cancelled:  { label: 'Đã hủy',       color: 'bg-red-100 text-red-700' },
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Modal chi tiết
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  // Cập nhật trạng thái
  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await apiEndpoints.orders.getAll();
      const data = res.data.data || res.data || [];
      setOrders(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  // Bấm Eye → fetch chi tiết đơn hàng kèm order_details
  const openDetail = async (order) => {
    setDetailLoading(true);
    setSelectedOrder({ ...order, orderDetails: [] }); // mở modal trước
    try {
      const res = await apiEndpoints.orders.getById(order.id);
      setSelectedOrder(res.data.data || res.data);
    } catch {
      // giữ nguyên data cũ nếu lỗi
    } finally {
      setDetailLoading(false);
    }
  };

  // Cập nhật trạng thái đơn hàng
  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      await apiEndpoints.orders.update(orderId, { status: newStatus });
      await fetchOrders();
      // Cập nhật luôn trong modal nếu đang mở
      if (selectedOrder?.id === orderId) {
        setSelectedOrder(prev => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      alert('Lỗi: ' + err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const formatDate = (d) => d
    ? new Date(d).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    : 'N/A';

  const formatVND = (amount) => {
    const n = parseFloat(amount) || 0;
    return n.toLocaleString('vi-VN') + ' ₫';
  };

  const getInitials = (name) =>
    (name || '?').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  const getImageUrl = (img) => {
    if (!img) return null;
    if (img.startsWith('http')) return img;
    return `http://127.0.0.1:8000/products/${img}`;
  };

  const paginated = orders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  return (
    <div className="bg-[#f6f7fb] min-h-screen text-gray-800">
      <div className="p-8">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3">
            <AlertTriangle size={20} className="text-red-600" />
            <p className="text-red-600 text-sm flex-1">{error}</p>
            <button onClick={fetchOrders} className="text-sm bg-red-100 hover:bg-red-200 px-3 py-1 rounded">Thử lại</button>
          </div>
        )}

        {/* TOP */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-4xl font-bold mb-2">Quản lý đơn hàng</h2>
            <p className="text-gray-500">Theo dõi và quản lý tất cả đơn hàng khách hàng theo thời gian thực.</p>
          </div>
          <button className="bg-blue-600 text-white px-5 py-3 rounded-xl font-medium flex items-center gap-2 hover:bg-blue-700 transition">
            <Plus size={18} /> Tạo đơn thủ công
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            { icon: <ShoppingBag />, bg: 'bg-blue-100', text: 'text-blue-600', label: 'Tổng đơn hàng', value: orders.length, sub: '+12.5% so với tháng trước', subColor: 'text-green-600' },
            { icon: <DollarSign />, bg: 'bg-green-100', text: 'text-green-600', label: 'Doanh thu', value: formatVND(orders.reduce((s, o) => s + (parseFloat(o.total_amount) || 0), 0)), sub: '+8.2% so với tháng trước', subColor: 'text-green-600' },
            { icon: <ClipboardList />, bg: 'bg-yellow-100', text: 'text-yellow-600', label: 'Đơn chờ xử lý', value: orders.filter(o => ['pending','processing'].includes(o.status)).length, sub: 'Cần xem xét', subColor: 'text-red-500' },
            { icon: <RotateCcw />, bg: 'bg-red-100', text: 'text-red-600', label: 'Đã hủy', value: orders.filter(o => o.status === 'cancelled').length, sub: 'Ổn định so với tháng trước', subColor: 'text-gray-500' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex gap-4">
              <div className={`w-14 h-14 rounded-xl ${s.bg} ${s.text} flex items-center justify-center flex-shrink-0`}>
                {s.icon}
              </div>
              <div>
                <p className="text-sm text-gray-500">{s.label}</p>
                <h3 className="text-2xl font-bold mt-1">{s.value}</h3>
                <span className={`text-sm ${s.subColor}`}>{s.sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-left text-xs uppercase text-gray-500">
                <th className="px-6 py-4">Mã đơn</th>
                <th className="px-4 py-4">Khách hàng</th>
                <th className="px-4 py-4">Ngày đặt</th>
                <th className="px-4 py-4">Thanh toán</th>
                <th className="px-4 py-4">Trạng thái</th>
                <th className="px-4 py-4 text-right">Tổng tiền</th>
                <th className="px-4 py-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((order) => {
                const statusInfo = STATUS_MAP[order.status] || { label: order.status, color: 'bg-gray-100 text-gray-700' };
                const customerName = order.customer?.name || order.shipping_name || 'Khách';
                const customerEmail = order.customer?.email || '—';
                return (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="px-6 py-5 font-semibold text-blue-600">
                      #ORD-{order.id}
                    </td>
                    <td className="px-4 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center flex-shrink-0">
                          {getInitials(customerName)}
                        </div>
                        <div>
                          <div className="font-medium text-sm">{customerName}</div>
                          <div className="text-xs text-gray-500">{customerEmail}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-5 text-sm text-gray-500">{formatDate(order.created_at)}</td>
                    <td className="px-4 py-5">
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {order.payment_method || 'COD'}
                      </span>
                    </td>
                    <td className="px-4 py-5">
                      <select
                        value={order.status}
                        onChange={e => handleStatusChange(order.id, e.target.value)}
                        disabled={updatingId === order.id}
                        className={`px-3 py-1 rounded-full text-sm font-medium border-0 cursor-pointer ${statusInfo.color}`}
                      >
                        {Object.entries(STATUS_MAP).map(([val, { label }]) => (
                          <option key={val} value={val}>{label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-5 text-right font-semibold">{formatVND(order.total_amount)}</td>
                    <td className="px-4 py-5">
                      <div className="flex justify-center">
                        <button
                          onClick={() => openDetail(order)}
                          className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition"
                          title="Xem chi tiết"
                        >
                          <Eye size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-gray-400">Chưa có đơn hàng nào</td>
                </tr>
              )}
            </tbody>
          </table>

          <Pagination
            currentPage={currentPage}
            totalItems={orders.length}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={setCurrentPage}
            label="đơn hàng"
          />
        </div>
      </div>

      {/* ── MODAL CHI TIẾT ── */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal header */}
            <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10">
              <div>
                <h2 className="text-xl font-bold">Chi tiết đơn hàng #ORD-{selectedOrder.id}</h2>
                <p className="text-sm text-gray-500 mt-0.5">{formatDate(selectedOrder.created_at)}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${STATUS_MAP[selectedOrder.status]?.color || 'bg-gray-100 text-gray-700'}`}>
                  {STATUS_MAP[selectedOrder.status]?.label || selectedOrder.status}
                </span>
                <button onClick={() => setSelectedOrder(null)} className="p-2 rounded-lg hover:bg-gray-100">
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Thông tin khách hàng & giao hàng */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Package size={16} /> Khách hàng
                  </h3>
                  <p className="font-medium">{selectedOrder.customer?.name || selectedOrder.shipping_name}</p>
                  <p className="text-sm text-gray-500">{selectedOrder.customer?.email || '—'}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <MapPin size={16} /> Địa chỉ giao hàng
                  </h3>
                  <p className="font-medium text-sm">{selectedOrder.shipping_name}</p>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <Phone size={12} /> {selectedOrder.shipping_phone}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{selectedOrder.shipping_address}</p>
                  {selectedOrder.note && (
                    <p className="text-xs text-blue-600 mt-2 italic">Ghi chú: {selectedOrder.note}</p>
                  )}
                </div>
              </div>

              {/* Thanh toán */}
              <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
                <CreditCard size={18} className="text-gray-500" />
                <span className="text-sm text-gray-600">Phương thức thanh toán:</span>
                <span className="font-semibold">{selectedOrder.payment_method || 'COD'}</span>
              </div>

              {/* Danh sách sản phẩm */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-3">Sản phẩm trong đơn</h3>
                {detailLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader className="animate-spin text-blue-500" size={28} />
                  </div>
                ) : (
                  <div className="border border-gray-200 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                        <tr>
                          <th className="px-4 py-3 text-left">Sản phẩm</th>
                          <th className="px-4 py-3 text-center">SL</th>
                          <th className="px-4 py-3 text-right">Đơn giá</th>
                          <th className="px-4 py-3 text-right">Thành tiền</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(selectedOrder.order_details || []).map((detail, i) => (
                          <tr key={detail.id || i} className="border-t border-gray-100">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                {detail.product_image && (
                                  <img
                                    src={getImageUrl(detail.product_image)}
                                    alt={detail.product_name}
                                    className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                                    onError={e => { e.target.style.display = 'none'; }}
                                  />
                                )}
                                <span className="font-medium text-gray-800">{detail.product_name}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-center text-gray-600">×{detail.quantity}</td>
                            <td className="px-4 py-3 text-right text-gray-600">{formatVND(detail.price)}</td>
                            <td className="px-4 py-3 text-right font-semibold">{formatVND(detail.subtotal)}</td>
                          </tr>
                        ))}
                        {(selectedOrder.order_details || []).length === 0 && !detailLoading && (
                          <tr>
                            <td colSpan={4} className="px-4 py-6 text-center text-gray-400">Không có sản phẩm</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                    {/* Tổng cộng */}
                    <div className="border-t border-gray-200 px-4 py-3 flex justify-between items-center bg-gray-50">
                      <span className="font-semibold text-gray-700">Tổng cộng</span>
                      <span className="text-xl font-bold text-blue-600">{formatVND(selectedOrder.total_amount)}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Cập nhật trạng thái */}
              <div className="flex items-center gap-3 pt-2 border-t">
                <span className="text-sm font-medium text-gray-600">Cập nhật trạng thái:</span>
                <select
                  value={selectedOrder.status}
                  onChange={e => handleStatusChange(selectedOrder.id, e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                >
                  {Object.entries(STATUS_MAP).map(([val, { label }]) => (
                    <option key={val} value={val}>{label}</option>
                  ))}
                </select>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
