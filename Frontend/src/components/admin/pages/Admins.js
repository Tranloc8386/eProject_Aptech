import React, { useState, useEffect } from "react";
import { UserCog, UserPlus, Pencil, Trash2, Loader, AlertTriangle } from "lucide-react";
import { apiEndpoints } from "../../../services/api";
import Pagination from "../../shared/Pagination";

const ITEMS_PER_PAGE = 10;
const EMPTY_FORM = { name: '', email: '', password: '', role: 'admin' };

const Admins = () => {
  const [admins, setAdmins]       = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [showAddModal, setShowAddModal]   = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const res = await apiEndpoints.users.getAll();
      setAdmins(res.data.data || res.data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAdmins(); }, []);

  const paginated = admins.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await apiEndpoints.users.create(form);
      await fetchAdmins();
      setShowAddModal(false);
      setForm(EMPTY_FORM);
    } catch (err) {
      alert('Lỗi: ' + (err.response?.data?.message || err.message));
    }
  };

  const openEdit = (record) => {
    setEditingRecord(record);
    setForm({ name: record.name, email: record.email, password: '', role: record.role || 'admin' });
    setShowEditModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const data = { ...form };
      if (!data.password) delete data.password;
      await apiEndpoints.users.update(editingRecord.id, data);
      await fetchAdmins();
      setShowEditModal(false);
      setEditingRecord(null);
    } catch (err) {
      alert('Lỗi: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (record) => {
    if (!window.confirm(`Xóa quản trị viên "${record.name}"?`)) return;
    try {
      await apiEndpoints.users.delete(record.id);
      await fetchAdmins();
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
          <p className="text-sm text-gray-500 mb-1">Quản trị / Quản trị viên</p>
          <h1 className="text-3xl font-bold">Quản lý quản trị viên</h1>
          <p className="text-gray-500 mt-2">Danh sách tài khoản có quyền quản trị hệ thống</p>
        </div>
        <button
          onClick={() => { setForm(EMPTY_FORM); setShowAddModal(true); }}
          className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-700"
        >
          <UserPlus size={18} /> Thêm admin
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3">
          <AlertTriangle size={20} className="text-red-600" />
          <p className="text-red-600 text-sm">{error}</p>
          <button onClick={fetchAdmins} className="ml-auto text-sm bg-red-100 hover:bg-red-200 px-3 py-1 rounded">Thử lại</button>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 mb-8 max-w-xs">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
            <UserCog className="text-orange-600" size={22} />
          </div>
          <p className="text-sm text-gray-500 uppercase">Tổng quản trị viên</p>
          <h2 className="text-4xl font-bold mt-1">{admins.length}</h2>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="font-semibold text-gray-800">Danh sách quản trị viên</h3>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 border-b text-xs uppercase text-gray-500">
            <tr>
              <th className="px-6 py-4 text-left">Tên</th>
              <th className="px-6 py-4 text-left">Vai trò</th>
              <th className="px-6 py-4 text-left">Ngày tạo</th>
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
                  <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                    {record.role || 'Admin'}
                  </span>
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
        <Pagination currentPage={currentPage} totalItems={admins.length} itemsPerPage={ITEMS_PER_PAGE} onPageChange={setCurrentPage} label="admin" />
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold mb-4">Thêm quản trị viên</h2>
            <form onSubmit={handleCreate}>
              {[['Họ và tên','text',true,'name'],['Email','email',true,'email']].map(([label,type,req,key]) => (
                <div className="mb-4" key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input type={type} required={req} value={form[key]}
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
            <h2 className="text-xl font-bold mb-1">Chỉnh sửa quản trị viên</h2>
            <p className="text-sm text-gray-500 mb-4">{editingRecord.email}</p>
            <form onSubmit={handleUpdate}>
              {[['Họ và tên','text',true,'name'],['Email','email',true,'email']].map(([label,type,req,key]) => (
                <div className="mb-4" key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input type={type} required={req} value={form[key]}
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

export default Admins;
