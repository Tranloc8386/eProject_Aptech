import React, { useState, useEffect } from "react";
import api from "../../../services/api";
import {
  DollarSign, ShoppingBag, Users,
  TrendingUp, TrendingDown,
  CheckCircle, AlertTriangle, Mail,
} from "lucide-react";

const fmt = (n) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n);


export default function Dashboard() {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/dashboard')
      .then(r => setData(r.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-64 text-gray-400 text-lg">Đang tải...</div>
  );
  if (!data) return null;

  const { kpi, chart, top_products, activities, pending_feedbacks, out_of_stock } = data;

  const maxRevenue = Math.max(...chart.map(d => d.revenue), 1);

  const activityIcon = (type) => {
    if (type === 'order')    return <CheckCircle className="text-green-600" size={18} />;
    if (type === 'warning')  return <AlertTriangle className="text-red-500" size={18} />;
    if (type === 'feedback') return <Mail className="text-blue-500" size={18} />;
  };
  const activityBg = (type) => {
    if (type === 'order')    return 'bg-green-100';
    if (type === 'warning')  return 'bg-red-100';
    if (type === 'feedback') return 'bg-blue-100';
  };

  const Growth = ({ value }) => value >= 0
    ? <span className="flex items-center text-green-600 text-sm font-semibold"><TrendingUp size={14} className="mr-0.5" />+{value}%</span>
    : <span className="flex items-center text-red-500 text-sm font-semibold"><TrendingDown size={14} className="mr-0.5" />{value}%</span>;

  return (
    <div className="w-full space-y-6">

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between">
            <div>
              <p className="text-xs uppercase text-gray-500 font-medium">Tổng doanh thu</p>
              <h2 className="text-3xl font-bold mt-2 text-gray-800">{fmt(kpi.total_revenue)}</h2>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <DollarSign className="text-blue-600" size={22} />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <Growth value={kpi.revenue_growth} />
            <span className="text-gray-400 text-xs">so với tháng trước</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between">
            <div>
              <p className="text-xs uppercase text-gray-500 font-medium">Đơn đang xử lý</p>
              <h2 className="text-3xl font-bold mt-2 text-gray-800">{kpi.processing_orders}</h2>
            </div>
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <ShoppingBag className="text-green-600" size={22} />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <Growth value={kpi.orders_growth} />
            <span className="text-gray-400 text-xs">so với tháng trước</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between">
            <div>
              <p className="text-xs uppercase text-gray-500 font-medium">Tổng khách hàng</p>
              <h2 className="text-3xl font-bold mt-2 text-gray-800">{kpi.total_customers}</h2>
            </div>
            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
              <Users className="text-orange-600" size={22} />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <Growth value={kpi.customers_growth} />
            <span className="text-gray-400 text-xs">tháng này</span>
          </div>
        </div>
      </div>

      {/* Alert badges */}
      {(pending_feedbacks > 0 || out_of_stock > 0) && (
        <div className="flex gap-3">
          {pending_feedbacks > 0 && (
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-700">
              <Mail size={15} /> {pending_feedbacks} feedback chưa phản hồi
            </div>
          )}
          {out_of_stock > 0 && (
            <div className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
              <AlertTriangle size={15} /> {out_of_stock} sản phẩm hết hàng
            </div>
          )}
        </div>
      )}

      {/* Chart + Activities */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 bg-white rounded-2xl p-6 shadow-sm">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800">Doanh thu 7 ngày gần nhất</h3>
            <p className="text-gray-400 text-sm">Tính theo đơn hàng đã giao</p>
          </div>
          <div className="flex items-end justify-between h-52 gap-3">
            {chart.map((d, i) => (
              <div key={i} className="flex flex-col items-center flex-1 h-full justify-end">
                <span className="text-xs text-gray-400 mb-1">
                  {d.revenue > 0 ? (d.revenue / 1000000).toFixed(1) + 'tr' : ''}
                </span>
                <div
                  className={`w-full rounded-t-lg transition-all ${d.revenue > 0 ? 'bg-blue-500' : 'bg-gray-100'}`}
                  style={{ height: `${Math.max((d.revenue / maxRevenue) * 100, 4)}%` }}
                />
                <span className="text-xs text-gray-500 mt-2">{d.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-5">Hoạt động gần đây</h3>
          {activities.length === 0 ? (
            <p className="text-gray-400 text-sm">Chưa có hoạt động</p>
          ) : (
            <div className="space-y-4">
              {activities.map((a, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${activityBg(a.type)}`}>
                    {activityIcon(a.type)}
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">{a.content}</p>
                    <span className="text-xs text-gray-400">
                      {new Date(a.created_at).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="text-lg font-bold text-gray-800">Sản phẩm bán chạy nhất</h3>
          <p className="text-gray-400 text-sm">Dựa trên số lượng đã bán qua order details</p>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
            <tr>
              <th className="px-6 py-3 text-left">Sản phẩm</th>
              <th className="px-6 py-3 text-left">Danh mục</th>
              <th className="px-6 py-3 text-left">Tồn kho</th>
              <th className="px-6 py-3 text-right">Giá</th>
              <th className="px-6 py-3 text-right">Đã bán</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {top_products.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-8 text-gray-400">Chưa có dữ liệu bán hàng</td></tr>
            ) : top_products.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-gray-800">{p.name}</td>
                <td className="px-6 py-4 text-gray-500">{p.category_name}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    p.stock_quantity === 0 ? 'bg-red-100 text-red-700' :
                    p.stock_quantity <= 5  ? 'bg-yellow-100 text-yellow-700' :
                                             'bg-green-100 text-green-700'
                  }`}>
                    {p.stock_quantity === 0 ? 'Hết hàng' :
                     p.stock_quantity <= 5  ? `Còn ${p.stock_quantity}` : 'Còn hàng'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-gray-700">{fmt(p.price)}</td>
                <td className="px-6 py-4 text-right font-bold text-blue-600">{p.total_sold}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
