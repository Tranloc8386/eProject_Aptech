import React, { useState, useEffect } from "react";
import {
  Users as UsersIcon,
  UserCheck,
  UserCog,
  ShoppingBag,
  Pencil,
  Trash2,
  UserPlus,
  Loader,
  AlertTriangle,
  Phone,
  MapPin,
} from "lucide-react";
import { apiEndpoints } from "../../../services/api";
import Pagination from "../../shared/Pagination";

const ITEMS_PER_PAGE = 10;

const EMPTY_ADMIN_FORM = { name: '', email: '', password: '', role: 'admin' };
const EMPTY_CUSTOMER_FORM = { name: '', email: '', password: '', phone: '', address: '' };

const Users = () => {
  const [admins, setAdmins] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'admin' | 'customer'
  const [currentPage, setCurrentPage] = useState(1);

  const [showAddModal, setShowAddModal] = useState(false);
  const [addType, setAddType] = useState('admin'); // 'admin' | 'customer'
  const [adminForm, setAdminForm] = useState(EMPTY_ADMIN_FORM);
  const [customerForm, setCustomerForm] = useState(EMPTY_CUSTOMER_FORM);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [editingType, setEditingType] = useState('admin');

  // Fetch cả hai bảng cùng lúc
  const fetchAll = async () => {
    try {
      setLoading(true);
      const [adminRes, customerRes] = await Promise.all([
        apiEndpoints.users.getAll(),
        apiEndpoints.customers.getAll(),
      ]);
      setAdmins(adminRes.data.data || adminRes.data || []);
      setCustomers(customerRes.data.data || customerRes.data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  // Danh sách hiển thị theo tab
  const displayList = (() => {
    if (activeTab === 'admin') return admins.map(r => ({ ...r, _type: 'admin' }));
    if (activeTab === 'customer') return customers.map(r => ({ ...r, _type: 'customer' }));
    return [
      ...admins.map(r => ({ ...r, _type: 'admin' })),
      ...customers.map(r => ({ ...r, _type: 'customer' })),
    ];
  })();

  const paginated = displayList.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const switchTab = (tab) => { setActiveTab(tab); setCurrentPage(1); };

  // ── CREATE ──
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      if (addType === 'admin') {
        await apiEndpoints.users.create(adminForm);
      } else {
        await apiEndpoints.customers.create(customerForm);
      }
      await fetchAll();
      setShowAddModal(false);
      setAdminForm(EMPTY_ADMIN_FORM);
      setCustomerForm(EMPTY_CUSTOMER_FORM);
    } catch (err) {
      alert('Lỗi: ' + (err.response?.data?.message || err.message));
    }
  };

  // ── OPEN EDIT ──
  const openEdit = (record, type) => {
    setEditingRecord(record);
    setEditingType(type);
    if (type === 'admin') {
      setAdminForm({ name: record.name, email: record.email, password: '', role: record.role || 'admin' });
    } else {
      setCustomerForm({ name: record.name, email: record.email, password: '', phone: record.phone || '', address: record.address || '' });
    }
    setShowEditModal(true);
  };

  // ── UPDATE ──
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (editingType === 'admin') {
        const data = { ...adminForm };
        if (!data.password) delete data.password;
        await apiEndpoints.users.update(editingRecord.id, data);
      } else {
        const data = { ...customerForm };
        if (!data.password) delete data.password;
        await apiEndpoints.customers.update(editingRecord.id, data);
      }
      await fetchAll();
      setShowEditModal(false);
      setEditingRecord(null);
    } catch (err) {
      alert('Lỗi: ' + (err.response?.data?.message || err.message));
    }
  };

  // ── DELETE ──
  const handleDelete = async (record, type) => {
    if (!window.confirm(`Xóa "${record.name}"?`)) return;
    try {
      if (type === 'admin') {
        await apiEndpoints.users.delete(record.id);
      } else {
        await apiEndpoints.customers.delete(record.id);
      }
      await fetchAll();
    } catch (err) {
      alert('Lỗi: ' + (err.response?.data?.message || err.message));
    }
  };

  const formatDate = (d) => d ? new Date(d).toLocaleDateString('vi-VN') : 'N/A';

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader className="animate-spin mx-auto mb-4" size={48} />
          <p className="text-gray-500">Đang tải người dùng...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-sm text-gray-500 mb-1">Quản trị / Người dùng</p>
          <h1 className="text-3xl font-bold">Quản lý người dùng</h1>
          <p className="text-gray-500 mt-2">Quản lý quản trị viên và tài khoản khách hàng</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-700"
        >
          <UserPlus size={18} />
          Thêm người dùng
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3">
          <AlertTriangle size={20} className="text-red-600" />
          <p className="text-red-600 text-sm">{error}</p>
          <button onClick={fetchAll} className="ml-auto text-sm bg-red-100 hover:bg-red-200 px-3 py-1 rounded">Thử lại</button>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
            <UsersIcon className="text-blue-600" size={22} />
          </div>
          <p className="text-sm text-gray-500 uppercase">Tổng người dùng</p>
          <h2 className="text-4xl font-bold mt-1">{admins.length + customers.length}</h2>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
            <UserCog className="text-orange-600" size={22} />
          </div>
          <p className="text-sm text-gray-500 uppercase">Quản trị viên</p>
          <h2 className="text-4xl font-bold mt-1">{admins.length}</h2>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
            <UserCheck className="text-green-600" size={22} />
          </div>
          <p className="text-sm text-gray-500 uppercase">Khách hàng</p>
          <h2 className="text-4xl font-bold mt-1">{customers.length}</h2>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
            <ShoppingBag className="text-purple-600" size={22} />
          </div>
          <p className="text-sm text-gray-500 uppercase">Đã có đơn hàng</p>
          <h2 className="text-4xl font-bold mt-1">
            {customers.filter(c => c.orders_count > 0).length}
          </h2>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* Tabs */}
        <div className="p-6 border-b flex justify-between items-center">
          <div className="flex gap-2">
            {[
              { key: 'all', label: `Tất cả (${admins.length + customers.length})` },
              { key: 'admin', label: `Quản trị viên (${admins.length})` },
              { key: 'customer', label: `Khách hàng (${customers.length})` },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => switchTab(tab.key)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  activeTab === tab.key
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b text-xs uppercase text-gray-500">
              <tr>
                <th className="p-4 text-left">Người dùng</th>
                <th className="p-4 text-left">Loại</th>
                {activeTab !== 'admin' && (
                  <th className="p-4 text-left">SĐT / Địa chỉ</th>
                )}
                <th className="p-4 text-left">Ngày tham gia</th>
                <th className="p-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((record) => (
                <tr key={`${record._type}-${record.id}`} className="border-t hover:bg-gray-50">
                  <td className="p-4">
                    <p className="font-semibold text-gray-800">{record.name}</p>
                    <p className="text-sm text-gray-500">{record.email}</p>
                  </td>

                  <td className="p-4">
                    {record._type === 'admin' ? (
                      <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                        Quản trị viên
                      </span>
                    ) : (
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        Khách hàng
                      </span>
                    )}
                  </td>

                  {activeTab !== 'admin' && (
                    <td className="p-4">
                      {record._type === 'customer' ? (
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
                      ) : (
                        <span className="text-gray-400 text-sm">—</span>
                      )}
                    </td>
                  )}

                  <td className="p-4 text-gray-500 text-sm">{formatDate(record.created_at)}</td>

                  <td className="p-4">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => openEdit(record, record._type)}
                        className="text-blue-500 hover:text-blue-700 transition"
                      >
                        <Pencil size={17} />
                      </button>
                      <button
                        onClick={() => handleDelete(record, record._type)}
                        className="text-red-400 hover:text-red-600 transition"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {paginated.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-gray-400">Không có dữ liệu</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalItems={displayList.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={setCurrentPage}
          label="người dùng"
        />
      </div>

      {/* ── ADD MODAL ── */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Thêm người dùng mới</h2>

            {/* Chọn loại */}
            <div className="flex gap-2 mb-5">
              {[{ key: 'admin', label: 'Quản trị viên' }, { key: 'customer', label: 'Khách hàng' }].map(t => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setAddType(t.key)}
                  className={`flex-1 py-2 rounded-lg font-medium border transition ${
                    addType === t.key ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 text-gray-600'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleCreate}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
                <input
                  type="text" required
                  value={addType === 'admin' ? adminForm.name : customerForm.name}
                  onChange={e => addType === 'admin'
                    ? setAdminForm({ ...adminForm, name: e.target.value })
                    : setCustomerForm({ ...customerForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email" required
                  value={addType === 'admin' ? adminForm.email : customerForm.email}
                  onChange={e => addType === 'admin'
                    ? setAdminForm({ ...adminForm, email: e.target.value })
                    : setCustomerForm({ ...customerForm, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
                <input
                  type="password" required
                  value={addType === 'admin' ? adminForm.password : customerForm.password}
                  onChange={e => addType === 'admin'
                    ? setAdminForm({ ...adminForm, password: e.target.value })
                    : setCustomerForm({ ...customerForm, password: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {addType === 'admin' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vai trò</label>
                  <select
                    value={adminForm.role}
                    onChange={e => setAdminForm({ ...adminForm, role: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="admin">Admin</option>
                  </select>
                </div>
              )}

              {addType === 'customer' && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text" required
                      value={customerForm.phone}
                      onChange={e => setCustomerForm({ ...customerForm, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="0901234567"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Địa chỉ <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required rows={2}
                      value={customerForm.address}
                      onChange={e => setCustomerForm({ ...customerForm, address: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Số nhà, đường, quận, thành phố..."
                    />
                  </div>
                </>
              )}

              <div className="flex gap-3 mt-2">
                <button type="button" onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Hủy
                </button>
                <button type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Tạo tài khoản
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── EDIT MODAL ── */}
      {showEditModal && editingRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-1">Chỉnh sửa người dùng</h2>
            <p className="text-sm text-gray-500 mb-4">
              {editingType === 'admin' ? 'Quản trị viên' : 'Khách hàng'} — {editingRecord.email}
            </p>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
                <input
                  type="text" required
                  value={editingType === 'admin' ? adminForm.name : customerForm.name}
                  onChange={e => editingType === 'admin'
                    ? setAdminForm({ ...adminForm, name: e.target.value })
                    : setCustomerForm({ ...customerForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email" required
                  value={editingType === 'admin' ? adminForm.email : customerForm.email}
                  onChange={e => editingType === 'admin'
                    ? setAdminForm({ ...adminForm, email: e.target.value })
                    : setCustomerForm({ ...customerForm, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu mới (để trống nếu không đổi)</label>
                <input
                  type="password"
                  value={editingType === 'admin' ? adminForm.password : customerForm.password}
                  onChange={e => editingType === 'admin'
                    ? setAdminForm({ ...adminForm, password: e.target.value })
                    : setCustomerForm({ ...customerForm, password: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {editingType === 'admin' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vai trò</label>
                  <select
                    value={adminForm.role}
                    onChange={e => setAdminForm({ ...adminForm, role: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="admin">Admin</option>
                  </select>
                </div>
              )}

              {editingType === 'customer' && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                    <input
                      type="text"
                      value={customerForm.phone}
                      onChange={e => setCustomerForm({ ...customerForm, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
                    <textarea
                      rows={2}
                      value={customerForm.address}
                      onChange={e => setCustomerForm({ ...customerForm, address: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </>
              )}

              <div className="flex gap-3 mt-2">
                <button type="button" onClick={() => { setShowEditModal(false); setEditingRecord(null); }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Hủy
                </button>
                <button type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
