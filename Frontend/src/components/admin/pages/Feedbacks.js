import React, { useState, useEffect } from 'react';
import { apiEndpoints } from '../../../services/api';
import { Mail, Trash2, Clock, CheckCircle, X, Send } from 'lucide-react';

const STATUS_MAP = {
  pending:  { label: 'Chờ phản hồi', color: 'bg-yellow-100 text-yellow-800' },
  replied:  { label: 'Đã phản hồi',  color: 'bg-green-100 text-green-800'  },
};

export default function Feedbacks() {
  const [feedbacks, setFeedbacks]       = useState([]);
  const [loading, setLoading]           = useState(true);
  const [selected, setSelected]         = useState(null);
  const [replyText, setReplyText]       = useState('');
  const [sending, setSending]           = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [toast, setToast]               = useState(null);

  useEffect(() => { fetchFeedbacks(); }, []);

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const res = await apiEndpoints.feedbacks.getAll();
      setFeedbacks(res.data.data || []);
    } catch (e) {
      showToast('Không tải được danh sách feedback', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const openModal = (fb) => {
    setSelected(fb);
    setReplyText(fb.admin_reply || '');
  };

  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    try {
      setSending(true);
      const res = await apiEndpoints.feedbacks.reply(selected.id, { admin_reply: replyText });
      showToast(`Đã gửi email phản hồi đến ${selected.email}!`);
      setSelected(null);
      fetchFeedbacks();
    } catch (e) {
      showToast(e.message || 'Gửi email thất bại', 'error');
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Xóa feedback này?')) return;
    try {
      await apiEndpoints.feedbacks.delete(id);
      setFeedbacks(prev => prev.filter(f => f.id !== id));
      if (selected?.id === id) setSelected(null);
      showToast('Đã xóa feedback!');
    } catch (e) {
      showToast('Xóa thất bại', 'error');
    }
  };

  const filtered = filterStatus === 'all'
    ? feedbacks
    : feedbacks.filter(f => f.status === filterStatus);

  const counts = {
    all:     feedbacks.length,
    pending: feedbacks.filter(f => f.status === 'pending').length,
    replied: feedbacks.filter(f => f.status === 'replied').length,
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl shadow-lg text-white font-medium
          ${toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Phản hồi khách hàng</h1>
          <p className="text-gray-500 text-sm mt-1">Quản lý và trả lời feedback qua email</p>
        </div>
        <div className="flex gap-3">
          {[
            { key: 'all',     label: `Tất cả (${counts.all})` },
            { key: 'pending', label: `Chờ phản hồi (${counts.pending})` },
            { key: 'replied', label: `Đã phản hồi (${counts.replied})` },
          ].map(tab => (
            <button key={tab.key} onClick={() => setFilterStatus(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition
                ${filterStatus === tab.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-48 text-gray-400">Đang tải...</div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-gray-400">
            <Mail size={40} className="mb-2 opacity-30" />
            <p>Chưa có feedback nào</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="px-6 py-3 text-left">Khách hàng</th>
                <th className="px-6 py-3 text-left">Nội dung</th>
                <th className="px-6 py-3 text-left">Ngày gửi</th>
                <th className="px-6 py-3 text-left">Trạng thái</th>
                <th className="px-6 py-3 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(fb => (
                <tr key={fb.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-800">{fb.name}</p>
                    <p className="text-blue-600 text-xs">{fb.email}</p>
                    {fb.phone && <p className="text-gray-400 text-xs">{fb.phone}</p>}
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <p className="text-gray-600 truncate">{fb.message}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                    {new Date(fb.created_at).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_MAP[fb.status]?.color}`}>
                      {STATUS_MAP[fb.status]?.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => openModal(fb)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-xs font-medium">
                        <Mail size={13} />
                        {fb.status === 'replied' ? 'Xem' : 'Trả lời'}
                      </button>
                      <button onClick={() => handleDelete(fb.id)}
                        className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Reply Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className="text-lg font-bold text-gray-800">Chi tiết feedback</h2>
                <p className="text-sm text-gray-500">{selected.email}</p>
              </div>
              <button onClick={() => setSelected(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Customer Info */}
              <div className="flex gap-4 text-sm">
                <div><span className="text-gray-400">Tên:</span> <span className="font-medium">{selected.name}</span></div>
                {selected.phone && <div><span className="text-gray-400">SĐT:</span> <span className="font-medium">{selected.phone}</span></div>}
              </div>

              {/* Original Message */}
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-400 mb-1 font-medium uppercase">Nội dung khách hàng gửi</p>
                <p className="text-gray-700 whitespace-pre-wrap">{selected.message}</p>
              </div>

              {/* Previous reply if exists */}
              {selected.status === 'replied' && selected.admin_reply && (
                <div className="bg-green-50 rounded-xl p-4">
                  <div className="flex items-center gap-1 text-xs text-green-600 font-medium mb-1 uppercase">
                    <CheckCircle size={12} /> Đã phản hồi
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap">{selected.admin_reply}</p>
                </div>
              )}

              {/* Reply Form */}
              <form onSubmit={handleReply}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nội dung trả lời <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  required
                  placeholder="Nhập nội dung trả lời cho khách hàng..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Email sẽ được gửi tự động đến <strong>{selected.email}</strong>
                </p>
                <div className="flex gap-3 mt-4">
                  <button type="button" onClick={() => setSelected(null)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 text-sm">
                    Hủy
                  </button>
                  <button type="submit" disabled={sending}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-60 text-sm font-medium">
                    <Send size={15} />
                    {sending ? 'Đang gửi...' : 'Gửi email'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
