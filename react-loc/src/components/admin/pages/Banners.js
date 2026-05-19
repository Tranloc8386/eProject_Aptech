import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Image as ImageIcon,
  Loader,
  Eye,
  EyeOff,
  Upload,
} from "lucide-react";
import { apiEndpoints } from "../../../services/api";

export default function Banners() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    bg: '',
    order: 1,
    is_active: true,
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);

  // Fetch banners from API
  const fetchBanners = async () => {
    try {
      setLoading(true);
      const response = await apiEndpoints.banners.getAll();
      console.log('Banners API Response:', response.data);
      
      // Handle different response structures
      const bannersData = response.data.data || response.data || [];
      setBanners(bannersData);
      setError(null);
    } catch (err) {
      console.error('Error fetching banners:', err);
      setError(err.message);
      // Fallback to demo data if API fails
      setBanners([
        {
          id: 1,
          title: "Summer Sale 2024",
          bg: "#FF6B6B",
          order: 1,
          is_active: true,
          image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
          created_at: new Date().toISOString(),
        },
        {
          id: 2,
          title: "New Collection Launch",
          bg: "#4ECDC4",
          order: 2,
          is_active: true,
          image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc",
          created_at: new Date().toISOString(),
        },
        {
          id: 3,
          title: "Black Friday Deals",
          bg: "#45B7D1",
          order: 3,
          is_active: false,
          image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da",
          created_at: new Date().toISOString(),
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({...formData, image: file});
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Create banner
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('bg', formData.bg);
      formDataToSend.append('order', formData.order);
      formDataToSend.append('is_active', formData.is_active ? 1 : 0);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      const response = await apiEndpoints.banners.create(formDataToSend);
      console.log('Banner created:', response.data);
      await fetchBanners(); // Refresh list
      setShowAddModal(false);
      resetForm();
    } catch (err) {
      console.error('Error creating banner:', err);
      alert('Error creating banner: ' + err.message);
    }
  };

  // Update banner
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('bg', formData.bg);
      formDataToSend.append('order', formData.order);
      formDataToSend.append('is_active', formData.is_active ? 1 : 0);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      const response = await apiEndpoints.banners.update(editingBanner.id, formDataToSend);
      console.log('Banner updated:', response.data);
      await fetchBanners(); // Refresh list
      setShowEditModal(false);
      setEditingBanner(null);
      resetForm();
    } catch (err) {
      console.error('Error updating banner:', err);
      alert('Error updating banner: ' + err.message);
    }
  };

  // Delete banner
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this banner?')) return;
    
    try {
      await apiEndpoints.banners.delete(id);
      console.log('Banner deleted');
      await fetchBanners(); // Refresh list
    } catch (err) {
      console.error('Error deleting banner:', err);
      alert('Error deleting banner: ' + err.message);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      bg: '',
      order: 1,
      is_active: true,
      image: null
    });
    setImagePreview(null);
  };

  // Open edit modal
  const openEditModal = (banner) => {
    setEditingBanner(banner);
    setFormData({
      title: banner.title || '',
      bg: banner.bg || '',
      order: banner.order || 1,
      is_active: banner.is_active || false,
      image: null // Don't pre-fill image
    });
    setImagePreview(banner.image_url || banner.image);
    setShowEditModal(true);
  };

  // Get banner image URL
  const getBannerImageUrl = (banner) => {
    if (banner.image_url) return banner.image_url;
    if (banner.image) {
      // Check if it's a full URL or just filename
      if (banner.image.startsWith('http')) {
        return banner.image;
      }
      return `http://127.0.0.1:8000/uploads/banners/${banner.image}`;
    }
    return "https://images.unsplash.com/photo-1441986300917-64674bd600d8";
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader className="animate-spin mx-auto mb-4" size={48} />
          <p className="text-gray-500">Đang tải banner...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-12">
      {/* Top */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Quản lý Banner
          </h1>

          <p className="text-gray-500 mt-2">
            Quản lý banner quảng cáo và chiến dịch marketing.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-3 rounded-xl flex items-center gap-2 shadow-md"
        >
          <Plus size={18} />
          Thêm banner
        </button>
      </div>

      {/* API Connection Status */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 text-red-700">
            <AlertTriangle size={20} />
            <span className="font-medium">Lỗi kết nối API</span>
          </div>
          <p className="text-red-600 text-sm mt-1">
            {error} - Đang hiển thị dữ liệu mẫu
          </p>
          <button
            onClick={fetchBanners}
            className="mt-2 text-sm bg-red-100 hover:bg-red-200 px-3 py-1 rounded"
          >
            Thử lại
          </button>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
              <TrendingUp size={28} />
            </div>

            <div>
              <p className="text-sm text-gray-500 uppercase">
                Tổng banner
              </p>

              <h2 className="text-3xl font-bold mt-1">{banners.length}</h2>

              <p className="text-green-600 text-sm mt-2">
                +2 tháng này
              </p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex gap-4">
            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-green-600">
              <CheckCircle size={28} />
            </div>

            <div>
              <p className="text-sm text-gray-500 uppercase">
                Đang hiển thị
              </p>

              <h2 className="text-3xl font-bold mt-1">
                {banners.filter(b => b.is_active).length}
              </h2>

              <p className="text-green-600 text-sm mt-2">
                Đang chạy
              </p>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex gap-4">
            <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600">
              <AlertTriangle size={28} />
            </div>

            <div>
              <p className="text-sm text-gray-500 uppercase">
                Đã ẩn
              </p>

              <h2 className="text-3xl font-bold mt-1">
                {banners.filter(b => !b.is_active).length}
              </h2>

              <p className="text-gray-500 text-sm mt-2">
                Không hiển thị với người dùng
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b bg-[#f9faff] flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            Danh sách banner
          </h3>

        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#f9faff] border-b">
              <tr className="text-left">
                <th className="px-6 py-4 text-sm text-gray-500 uppercase">
                  Xem trước
                </th>

                <th className="px-6 py-4 text-sm text-gray-500 uppercase">
                  Tiêu đề
                </th>

                <th className="px-6 py-4 text-sm text-gray-500 uppercase">
                  Màu nền
                </th>

                <th className="px-6 py-4 text-sm text-gray-500 uppercase text-center">
                  Thứ tự
                </th>

                <th className="px-6 py-4 text-sm text-gray-500 uppercase">
                  Trạng thái
                </th>

                <th className="px-6 py-4 text-sm text-gray-500 uppercase text-right">
                  Thao tác
                </th>
              </tr>
            </thead>

            <tbody>
              {banners.map((banner, index) => (
                <tr
                  key={banner.id || index}
                  className="border-b hover:bg-[#fafbff] transition"
                >
                  {/* Preview */}
                  <td className="px-6 py-5">
                    <div className="w-20 h-12 rounded-lg overflow-hidden bg-gray-100 border flex items-center justify-center">
                      {banner.image || banner.image_url ? (
                        <img
                          src={getBannerImageUrl(banner)}
                          alt={banner.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <ImageIcon
                        size={20}
                        className="text-gray-400"
                        style={{ display: banner.image || banner.image_url ? 'none' : 'block' }}
                      />
                    </div>
                  </td>

                  {/* Title */}
                  <td className="px-6 py-5">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {banner.title}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Created {new Date(banner.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </td>

                  {/* Background */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-6 h-6 rounded border"
                        style={{ backgroundColor: banner.bg || '#f3f4f6' }}
                      ></div>
                      <span className="text-sm text-gray-600">
                        {banner.bg || 'Default'}
                      </span>
                    </div>
                  </td>

                  {/* Order */}
                  <td className="px-6 py-5 text-center">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                      {banner.order || 0}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      {banner.is_active ? (
                        <>
                          <Eye size={16} className="text-green-600" />
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                            Hiển thị
                          </span>
                        </>
                      ) : (
                        <>
                          <EyeOff size={16} className="text-gray-400" />
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
                            Đã ẩn
                          </span>
                        </>
                      )}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => openEditModal(banner)}
                        className="p-2 hover:bg-blue-50 rounded-lg text-blue-600"
                      >
                        <Edit size={18} />
                      </button>

                      <button 
                        onClick={() => handleDelete(banner.id)}
                        className="p-2 hover:bg-red-50 rounded-lg text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 flex items-center justify-between bg-[#f9faff]">
          <p className="text-sm text-gray-500">
            Hiển thị 1 đến {banners.length} trong {banners.length} banner
          </p>

          <div className="flex gap-2">
            <button className="px-4 py-2 border rounded-lg text-sm hover:bg-white">
              Trước
            </button>

            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
              1
            </button>

            <button className="px-4 py-2 border rounded-lg text-sm hover:bg-white">
              Tiếp
            </button>
          </div>
        </div>
      </div>


      {/* Add Banner Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Thêm banner mới</h2>
            <form onSubmit={handleCreate}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiêu đề banner
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  placeholder="Enter banner title"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hình ảnh banner
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="banner-image"
                    required
                  />
                  <label 
                    htmlFor="banner-image" 
                    className="cursor-pointer flex flex-col items-center justify-center"
                  >
                    {imagePreview ? (
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full h-32 object-cover rounded-lg mb-2"
                      />
                    ) : (
                      <>
                        <Upload size={32} className="text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">Nhấn để tải ảnh banner lên</p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Màu nền
                  </label>
                  <input
                    type="color"
                    value={formData.bg}
                    onChange={(e) => setFormData({...formData, bg: e.target.value})}
                    className="w-full h-10 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Thứ tự hiển thị
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.order}
                    onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Hiển thị trên website
                  </span>
                </label>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    resetForm();
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Tạo banner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Banner Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Chỉnh sửa banner</h2>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiêu đề banner
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  placeholder="Enter banner title"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hình ảnh (để trống giữ ảnh cũ)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="banner-image-edit"
                  />
                  <label 
                    htmlFor="banner-image-edit" 
                    className="cursor-pointer flex flex-col items-center justify-center"
                  >
                    {imagePreview ? (
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full h-32 object-cover rounded-lg mb-2"
                      />
                    ) : (
                      <>
                        <Upload size={32} className="text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">Nhấn để tải ảnh banner mới</p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Màu nền
                  </label>
                  <input
                    type="color"
                    value={formData.bg}
                    onChange={(e) => setFormData({...formData, bg: e.target.value})}
                    className="w-full h-10 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Thứ tự hiển thị
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.order}
                    onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Hiển thị trên website
                  </span>
                </label>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingBanner(null);
                    resetForm();
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}