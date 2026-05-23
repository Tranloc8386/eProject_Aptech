import React, { useState, useEffect } from "react";
import {
  Package,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Plus,
  Edit,
  Trash2,
  Loader,
} from "lucide-react";
import { apiEndpoints } from "../../../services/api";
import Pagination from "../../shared/Pagination";

const ITEMS_PER_PAGE = 10;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    category_id: '',
    status: 'active',
    is_featured: false,
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null); // null = Tất cả

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await apiEndpoints.products.getAll();
      console.log('Products API Response:', response.data);
      
      // Handle different response structures
      const productsData = response.data.data || response.data || [];
      
      // Ensure each product has proper structure
      const processedProducts = productsData.map(product => ({
        ...product,
        // Ensure category is handled properly
        category: typeof product.category === 'object' ? product.category : { name: product.category || 'Chưa phân loại' },
        // Ensure other fields are properly formatted
        price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
        stock: parseInt(product.stock_quantity ?? product.stock ?? 0)
      }));
      
      setProducts(processedProducts);
      setError(null);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message);
      // Fallback to demo data if API fails
      setProducts([
        {
          id: 1,
          name: "Pro Audio Headphones X1",
          description: "Electronics & Accessories",
          sku: "AUD-PRO-402",
          category: { name: "Electronics" },
          price: 249.00,
          stock: 156,
          status: "active",
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        },
        {
          id: 2,
          name: "Summit Smartwatch Series 5",
          description: "Wearables",
          sku: "WCH-SUM-005",
          category: { name: "Electronics" },
          price: 399.50,
          stock: 8,
          status: "active",
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories for dropdown
  const fetchCategories = async () => {
    try {
      const response = await apiEndpoints.categories.getAll();
      const categoriesData = response.data.data || response.data || [];
      setCategories(categoriesData);
    } catch (err) {
      console.error('Error fetching categories:', err);
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

  // Reset form
  const resetForm = () => {
    setFormData({ name: '', price: '', stock: '', category_id: '', status: 'active', is_featured: false, image: null });
    setImagePreview(null);
  };

  // Create product
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('price', parseFloat(formData.price));
      formDataToSend.append('stock_quantity', parseInt(formData.stock));
      formDataToSend.append('category_id', formData.category_id);
      formDataToSend.append('status', formData.status);
      formDataToSend.append('is_featured', formData.is_featured ? 1 : 0);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      const response = await apiEndpoints.products.create(formDataToSend);
      console.log('Product created:', response.data);
      await fetchProducts(); // Refresh list
      setShowAddModal(false);
      resetForm();
    } catch (err) {
      console.error('Error creating product:', err);
      alert('Error creating product: ' + err.message);
    }
  };

  // Update product
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('price', parseFloat(formData.price));
      formDataToSend.append('stock_quantity', parseInt(formData.stock));
      formDataToSend.append('category_id', formData.category_id);
      formDataToSend.append('status', formData.status);
      formDataToSend.append('is_featured', formData.is_featured ? 1 : 0);
      formDataToSend.append('_method', 'PUT');
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      const response = await apiEndpoints.products.update(editingProduct.id, formDataToSend);
      console.log('Product updated:', response.data);
      await fetchProducts();
      setShowEditModal(false);
      setEditingProduct(null);
      resetForm();
    } catch (err) {
      console.error('Error updating product:', err);
      alert('Error updating product: ' + err.message);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await apiEndpoints.products.delete(id);
      console.log('Product deleted');
      await fetchProducts(); // Refresh list
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Error deleting product: ' + err.message);
    }
  };

  // Open edit modal
  const openEditModal = (product) => {
    setEditingProduct(product);
    setImagePreview(null);
    setFormData({
      name: product.name || '',
      price: product.price?.toString() || '',
      stock: product.stock?.toString() || '',
      category_id: product.category?.id?.toString() || product.category_id?.toString() || '',
      status: product.status || 'active',
      is_featured: !!product.is_featured,
      image: null
    });
    setShowEditModal(true);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const filteredProducts = products.filter((p) => {
    if (selectedCategory !== null && p.category?.id !== selectedCategory) return false;
    return true;
  });

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getImageUrl = (product) => {
    if (product?.image_url) return product.image_url;
    const image = product?.image;
    if (!image) return "https://images.unsplash.com/photo-1505740420928-5e560c06d30e";
    if (image.startsWith('http')) return image;
    return `http://127.0.0.1:8000/products/${image}`;
  };

  // Helper function to get stock status
  const getStockStatus = (stock) => {
    if (stock === 0) return { status: 'Hết hàng', color: 'bg-gray-100 text-gray-600', dot: 'bg-gray-500' };
    if (stock < 10) return { status: 'Sắp hết', color: 'bg-red-100 text-red-600', dot: 'bg-red-500' };
    return { status: 'Còn hàng', color: 'bg-green-100 text-green-600', dot: 'bg-green-500' };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader className="animate-spin mx-auto mb-4" size={48} />
          <p className="text-gray-500">Đang tải sản phẩm...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f7f8fc] min-h-screen p-8">
      {/* HEADER */}
      <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
        <div>
          <p className="text-sm text-blue-600 mb-2">
            Quản trị / Quản lý sản phẩm
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Kho sản phẩm
          </h1>
          <p className="text-gray-500 mt-1">
            Quản lý danh mục sản phẩm và mức tồn kho.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2 font-medium transition flex-shrink-0"
        >
          <Plus size={18} />
          Thêm sản phẩm
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
            onClick={fetchProducts}
            className="mt-2 text-sm bg-red-100 hover:bg-red-200 px-3 py-1 rounded"
          >
            Thử lại
          </button>
        </div>
      )}

      {/* STATS */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <Package />
          </div>

          <div>
            <p className="text-sm text-gray-500">Tổng sản phẩm</p>

            <h2 className="text-3xl font-bold text-gray-800">
              {products.length}
            </h2>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center text-red-600">
            <AlertTriangle />
          </div>

          <div>
            <p className="text-sm text-gray-500">Sắp hết hàng</p>

            <h2 className="text-3xl font-bold text-gray-800">
              {products.filter(p => p.stock > 0 && p.stock < 10).length}
            </h2>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-600">
            <TrendingUp />
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Danh mục
            </p>

            <h2 className="text-3xl font-bold text-gray-800">
              {categories.length}
            </h2>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
            <DollarSign />
          </div>

          <div>
            <p className="text-sm text-gray-500">Tổng giá trị</p>

            <h2 className="text-3xl font-bold text-gray-800">
              {new Intl.NumberFormat("vi-VN", { notation: "compact", compactDisplay: "short" }).format(
                products.reduce((sum, p) => sum + (p.price || 0) * (p.stock || 0), 0)
              )} ₫
            </h2>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        {/* TOP BAR */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div className="flex gap-6 overflow-x-auto">
            <button
              onClick={() => { setSelectedCategory(null); setCurrentPage(1); }}
              className={`pb-2 font-semibold whitespace-nowrap transition ${
                selectedCategory === null
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              Tất cả ({products.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setSelectedCategory(cat.id); setCurrentPage(1); }}
                className={`pb-2 font-semibold whitespace-nowrap transition ${
                  selectedCategory === cat.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-black'
                }`}
              >
                {cat.name} ({products.filter(p => p.category?.id === cat.id).length})
              </button>
            ))}
          </div>

        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-left text-xs uppercase text-gray-500">
                <th className="p-4">Sản phẩm</th>
                <th className="p-4 w-32">Danh mục</th>
                <th className="p-4 w-36 text-right">Giá</th>
                <th className="p-4 w-24 text-right">Tồn kho</th>
                <th className="p-4 w-32">Trạng thái</th>
                <th className="p-4 w-24 text-center">Thao tác</th>
              </tr>
            </thead>

            <tbody>
              {paginatedProducts.map((product) => {
                const stockStatus = getStockStatus(product.stock || 0);
                return (
                <tr
                  key={product.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={getImageUrl(product)}
                        alt={product.name}
                        className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <h3 className="font-semibold text-gray-800 truncate">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-500 truncate">
                          {product.description || product.desc || 'Không có mô tả'}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-md text-sm whitespace-nowrap">
                      {product.category?.name || 'Chưa phân loại'}
                    </span>
                  </td>

                  <td className="p-4 text-right font-semibold text-gray-800 whitespace-nowrap">
                    {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product.price || 0)}
                  </td>

                  <td className="p-4 text-right text-gray-700">
                    {product.stock || 0}
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${stockStatus.dot}`}></span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${stockStatus.color}`}>
                        {stockStatus.status}
                      </span>
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => openEditModal(product)}
                        title="Sửa"
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                      >
                        <Edit size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        title="Xóa"
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalItems={filteredProducts.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={setCurrentPage}
          label="sản phẩm"
        />
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Thêm sản phẩm mới</h2>
            <form onSubmit={handleCreate}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Tên sản phẩm</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Giá
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số lượng
                  </label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Danh mục
                  </label>
                  <select
                    value={formData.category_id}
                    onChange={(e) => setFormData({...formData, category_id: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Chọn danh mục</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trạng thái
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="active">Hoạt động</option>
                    <option value="inactive">Không hoạt động</option>
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({...formData, is_featured: e.target.checked})}
                    className="w-4 h-4 accent-blue-600 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">Sản phẩm nổi bật</span>
                </label>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hình ảnh sản phẩm
                </label>
                <div className="flex items-center gap-4">
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-20 h-20 rounded-xl object-cover border border-gray-200"
                    />
                  )}
                  <label className="flex-1 cursor-pointer">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 hover:bg-blue-50 transition">
                      <p className="text-sm text-gray-500">
                        {imagePreview ? 'Nhấn để thay ảnh' : 'Nhấn để tải ảnh lên'}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">PNG, JPG, JPEG (tối đa 2MB)</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
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
                  Tạo sản phẩm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Chỉnh sửa sản phẩm</h2>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Tên sản phẩm</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Giá
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số lượng
                  </label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Danh mục
                  </label>
                  <select
                    value={formData.category_id}
                    onChange={(e) => setFormData({...formData, category_id: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Chọn danh mục</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trạng thái
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="active">Hoạt động</option>
                    <option value="inactive">Không hoạt động</option>
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({...formData, is_featured: e.target.checked})}
                    className="w-4 h-4 accent-blue-600 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">Sản phẩm nổi bật</span>
                </label>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hình ảnh sản phẩm
                </label>
                <div className="flex items-center gap-4">
                  {(imagePreview || editingProduct?.image) && (
                    <img
                      src={imagePreview || getImageUrl(editingProduct)}
                      alt="Preview"
                      className="w-20 h-20 rounded-xl object-cover border border-gray-200"
                    />
                  )}
                  <label className="flex-1 cursor-pointer">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 hover:bg-blue-50 transition">
                      <p className="text-sm text-gray-500">
                        {imagePreview ? 'Nhấn để thay ảnh' : 'Nhấn để tải ảnh mới'}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">PNG, JPG, JPEG (tối đa 2MB)</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingProduct(null);
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
};

export default Products;