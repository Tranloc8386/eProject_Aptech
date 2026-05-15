import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const HomePage = ({ onLogout }) => {
    const [banners, setBanners] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [bannerRes, productRes] = await Promise.all([
                    axios.get(`${API_BASE_URL}/banners/active`),
                    axios.get(`${API_BASE_URL}/featured-products`),
                ]);
                setBanners(bannerRes.data);
                setProducts(productRes.data);
            } catch (err) {
                setError('Không thể tải dữ liệu. Vui lòng thử lại sau.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <main className="pt-8 min-h-screen bg-gray-50">
            <div className="max-w-[1440px] mx-auto px-4 md:px-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900">Xin chào, chào mừng bạn đến với MAISON ÉLÉGANT</h1>
                        <p className="mt-3 text-gray-600 max-w-2xl">
                            Khám phá bộ sưu tập và banner nổi bật được cập nhật mỗi ngày.
                        </p>
                    </div>
                    <button
                        onClick={onLogout}
                        className="inline-flex items-center justify-center rounded-full bg-pink-600 px-6 py-3 text-white font-semibold hover:bg-pink-700 transition"
                    >
                        Đăng xuất
                    </button>
                </div>

                {error && (
                    <div className="rounded-lg bg-red-50 border border-red-200 p-4 mb-8 text-red-700">{error}</div>
                )}

                <section className="mb-16">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-3xl font-bold">Banner nổi bật</h2>
                            <p className="text-gray-500 mt-2">Xem các chiến dịch hình ảnh đẹp nhất của cửa hàng.</p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-gray-600">Đang tải banner...</div>
                    ) : banners.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {banners.map((banner) => (
                                <div key={banner.id} className="rounded-3xl overflow-hidden shadow-lg bg-white">
                                    <img className="w-full h-72 object-cover" src={banner.image_url} alt={banner.title} />
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-gray-900">{banner.title}</h3>
                                        {banner.link && (
                                            <a href={banner.link} className="mt-3 inline-block text-pink-600 hover:underline">
                                                Xem chi tiết
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-3xl bg-white p-8 shadow">Chưa có banner hoạt động.</div>
                    )}
                </section>

                <section className="pb-24">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-3xl font-bold">Sản phẩm nổi bật</h2>
                            <p className="text-gray-500 mt-2">Những thiết kế được chọn lọc để dẫn đầu xu hướng.</p>
                        </div>
                        <a href="/products" className="text-pink-600 border-b border-pink-600">Xem tất cả</a>
                    </div>

                    {loading ? (
                        <div className="text-gray-600">Đang tải sản phẩm...</div>
                    ) : products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <div key={product.id} className="overflow-hidden rounded-[32px] bg-white shadow-lg transition hover:-translate-y-1">
                                    <img className="w-full h-80 object-cover" src={product.image_url} alt={product.name} />
                                    <div className="p-6">
                                        <h3 className="text-2xl font-semibold text-gray-900">{product.name}</h3>
                                        <p className="mt-3 text-pink-600 text-lg font-semibold">
                                            {product.price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                        </p>
                                        <p className="mt-4 text-gray-500">{product.category?.name || 'Danh mục chưa xác định'}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-3xl bg-white p-8 shadow">Chưa có sản phẩm nổi bật.</div>
                    )}
                </section>
            </div>
        </main>
    );
};

export default HomePage;