import React, { useState, useEffect } from "react";
import { Plus, Filter, Download, Edit, Trash2, TrendingUp, AlertTriangle, Image, Loader } from "lucide-react";
import { apiEndpoints } from "../../../services/api";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [showAddModal, setShowAddModal]   = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '' });

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await apiEndpoints.categories.getAll();
      setCategories(res.data.data || res.data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await apiEndpoints.categories.create(formData);
      await fetchCategories();
      setShowAddModal(false);
      setFormData({ name: '', description: '' });
    } catch (err) {
      alert('Lỗi: ' + err.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await apiEndpoints.categories.update(editingCategory.id, formData);
      await fetchCategories();
      setShowEditModal(false);
      setEditingCategory(null);
      setFormData({ name: '', description: '' });
    } catch (err) {
      alert('Lỗi: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Xóa danh mục này?')) return;
    try {
      await apiEndpoints.categories.delete(id);
      await fetchCategories();
    } catch (err) {
      alert('Lỗi: ' + err.message);
    }
  };

  const openEditModal = (category) => {
    setEditingCategory(category);
    setFormData({ name: category.name || '', description: category.description || '' });
    setShowEditModal(true);
  };

  const emptyCategories = categories.filter(c => !c.products_count || c.products_count === 0).length;

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <Loader className="animate-spin mx-auto mb-4" size={48} />
        <p className="text-gray-500">Đang tải danh mục...</p>
      </div>
    </div>
  );

  return (
    <div className="pb-12">
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý danh mục</h1>
          <p className="text-gray-500 mt-1">Sắp xếp và cấu trúc danh mục sản phẩm.</p>
        </div>
        <button onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2 shadow-md">
          <Plus size={18} /> Thêm danh mục
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-2 text-red-700">
          <AlertTriangle size={18} /> {error}
          <button onClick={fetchCategories} className="ml-auto text-sm underline">Thử lại</button>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex gap-4 items-center">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
              <TrendingUp size={28} />
            </div>
            <div>
              <p className="text-sm text-gray-500 uppercase">Tổng danh mục</p>
              <h2 className="text-3xl font-bold">{categories.length}</h2>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex gap-4 items-center">
            <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600">
              <AlertTriangle size={28} />
            </div>
            <div>
              <p className="text-sm text-gray-500 uppercase">Danh mục trống</p>
              <h2 className="text-3xl font-bold">{emptyCategories}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b bg-gray-50 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Danh sách danh mục</h3>
          <div className="flex gap-2">
            <button className="p-2 border rounded-lg hover:bg-gray-50"><Filter size={18} /></button>
            <button className="p-2 border rounded-lg hover:bg-gray-50"><Download size={18} /></button>
          </div>
        </div>

        <table className="w-full">
          <thead className="bg-gray-50 border-b text-xs uppercase text-gray-500">
            <tr>
              <th className="px-6 py-4 text-left">Tên danh mục</th>
              <th className="px-6 py-4 text-right">Sản phẩm</th>
              <th className="px-6 py-4 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr><td colSpan={3} className="text-center py-12 text-gray-400">Chưa có danh mục nào</td></tr>
            ) : categories.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50 transition">
                <td className="px-6 py-5">
                  <div>
                    <h4 className="font-semibold text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-400">{item.description || 'Không có mô tả'}</p>
                  </div>
                </td>
                <td className="px-6 py-5 text-right font-semibold text-gray-700">
                  {item.products_count ?? 0}
                </td>
                <td className="px-6 py-5">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => openEditModal(item)} className="p-2 hover:bg-blue-50 rounded-lg text-blue-600">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 hover:bg-red-50 rounded-lg text-red-500">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="px-6 py-4 bg-gray-50 text-sm text-gray-500">
          Hiển thị {categories.length} danh mục
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold mb-4">Thêm danh mục mới</h2>
            <form onSubmit={handleCreate}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Tên danh mục <span className="text-red-500">*</span></label>
                <input type="text" required value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
                <textarea rows={3} value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => { setShowAddModal(false); setFormData({ name: '', description: '' }); }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Hủy</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Tạo danh mục</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold mb-4">Chỉnh sửa danh mục</h2>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Tên danh mục <span className="text-red-500">*</span></label>
                <input type="text" required value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
                <textarea rows={3} value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => { setShowEditModal(false); setEditingCategory(null); setFormData({ name: '', description: '' }); }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Hủy</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Cập nhật</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
