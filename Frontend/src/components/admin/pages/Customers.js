import React, { useState, useEffect } from "react";
import { Users, UserPlus, Pencil, Trash2, Loader, AlertTriangle, Phone, MapPin } from "lucide-react";
import { apiEndpoints } from "../../../services/api";
import Pagination from "../../shared/Pagination";

const ITEMS_PER_PAGE = 10;
const EMPTY_FORM = { name: '', email: '', password: '', phone: '', address: '' };

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [showAddModal, setShowAddModal]   = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const res = await apiEndpoints.customers.getAll();
      setCustomers(res.data.data || res.data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCustomers(); }, []);

  const paginated = customers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await apiEndpoints.customers.create(form);
      await fetchCustomers();
      setShowAddModal(false);
      setForm(EMPTY_FORM);
    } catch (err) {
      alert('Lỗi: ' + (err.response?.data?.message || err.message));
    }
  };

  const openEdit = (record) => {
    setEditingRecord(record);
    setForm({ name: record.name, email: record.email, password: '', phone: record.phone || '', address: record.address || '' });
    setShowEditModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const data = { ...form };
      if (!data.password) delete data.password;
      await apiEndpoints.customers.update(editingRecord.id, data);
      await fetchCustomers();
      setShowEditModal(false);
      setEditingRecord(null);
    } catch (err) {
      alert('Lỗi: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (record) => {
    if (!window.confirm(`Xóa khách hàng "${record.name}"?`)) return;
    try {
      await apiEndpoints.customers.delete(record.id);
      await fetchCustomers();
    } catch (err) {
      alert('Lỗi: ' + (err.response?.data?.message || err.message));
    }
  };

  const formatDate = (d) => d ? new Date(d).toLocaleDateString('vi-VN') : 'N/A';

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <Loader className="animate-spin mx-auto mb-4" size={48} />
        <p className="text-gray-500">Đang tải...</p>
      </div>
    </div>
  );

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-sm text-gray-500 mb-1">Quản trị / Khách hàng</p>
          <h1 className="text-3xl font-bold">Quản lý khách hàng</h1>
          <p className="text-gray-500 mt-2">Danh sách tài khoản khách hàng đã đăng ký</p>
        </div>
        <button
          onClick={() => { setForm(EMPTY_FORM); setShowAddModal(true); }}
          className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-700"
        >
          <UserPlus size={18} /> Thêm khách hàng
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3">
          <AlertTriangle size={20} className="text-red-600" />
          <p className="text-red-600 text-sm">{error}</p>
          <button onClick={fetchCustomers} className="ml-auto text-sm bg-red-100 hover:bg-red-200 px-3 py-1 rounded">Thử lại</button>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 mb-8 max-w-xs">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
            <Users className="text-blue-600" size={22} />
          </div>
          <p className="text-sm text-gray-500 uppercase">Tổng khách hàng</p>
          <h2 className="text-4xl font-bold mt-1">{customers.length}</h2>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="font-semibold text-gray-800">Danh sách khách hàng</h3>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 border-b text-xs uppercase text-gray-500">
            <tr>
              <th className="px-6 py-4 text-left">Tên</th>
              <th className="px-6 py-4 text-left">SĐT / Địa chỉ</th>
              <th className="px-6 py-4 text-left">Ngày tham gia</th>
              <th className="px-6 py-4 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((record) => (
              <tr key={record.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4">
                  <p className="font-semibold text-gray-800">{record.name}</p>
                  <p className="text-sm text-gray-500">{record.email}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex items-center gap-1">
                      <Phone size={13} className="text-gray-400" />
                      {record.phone || <span className="text-gray-400 italic">Chưa có</span>}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={13} className="text-gray-400" />
                      <span className="truncate max-w-[200px]">{record.address || <span className="text-gray-400 italic">Chưa có</span>}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-500 text-sm">{formatDate(record.created_at)}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-3">
                    <button onClick={() => openEdit(record)} className="p-2 hover:bg-blue-50 rounded-lg text-blue-500">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => handleDelete(record)} className="p-2 hover:bg-red-50 rounded-lg text-red-400">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr><td colSpan={4} className="p-12 text-center text-gray-400">Không có dữ liệu</td></tr>
            )}
          </tbody>
        </table>
        <Pagination currentPage={currentPage} totalItems={customers.length} itemsPerPage={ITEMS_PER_PAGE} onPageChange={setCurrentPage} label="khách hàng" />
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold mb-4">Thêm khách hàng</h2>
            <form onSubmit={handleCreate}>
              {[['Họ và tên','text','name'],['Email','email','email']].map(([label,type,key]) => (
                <div className="mb-4" key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input type={type} required value={form[key]}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
              ))}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
                <input type="password" required value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                <input type="text" required value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  placeholder="0901234567"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
                <textarea required rows={2} value={form.address}
                  onChange={e => setForm({ ...form, address: e.target.value })}
                  placeholder="Số nhà, đường, quận, thành phố..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="flex gap-3 mt-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Hủy</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Tạo tài khoản</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold mb-1">Chỉnh sửa khách hàng</h2>
            <p className="text-sm text-gray-500 mb-4">{editingRecord.email}</p>
            <form onSubmit={handleUpdate}>
              {[['Họ và tên','text','name'],['Email','email','email']].map(([label,type,key]) => (
                <div className="mb-4" key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input type={type} required value={form[key]}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
              ))}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu mới (để trống nếu không đổi)</label>
                <input type="password" value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                <input type="text" value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
                <textarea rows={2} value={form.address}
                  onChange={e => setForm({ ...form, address: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="flex gap-3 mt-2">
                <button type="button" onClick={() => { setShowEditModal(false); setEditingRecord(null); }} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Hủy</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Cập nhật</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;
