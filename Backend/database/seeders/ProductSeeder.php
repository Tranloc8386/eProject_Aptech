<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $ao_so_mi    = Category::where('name', 'Áo sơ mi')->first()->id;
        $vay         = Category::where('name', 'Váy')->first()->id;
        $vay_lien    = Category::where('name', 'Váy liền thân')->first()->id;
        $ao_thun     = Category::where('name', 'Áo thun P.T')->first()->id;
        $quan_short  = Category::where('name', 'Quần short P.T')->first()->id;
        $quan_dai    = Category::where('name', 'Quần dài P.T')->first()->id;
        $that_lung   = Category::where('name', 'Thắt lưng')->first()->id;
        $ca_vat      = Category::where('name', 'Cà vạt')->first()->id;
        $logo        = Category::where('name', 'Logo')->first()->id;
        $tat         = Category::where('name', 'Tất')->first()->id;

        $products = [

            // ── Áo sơ mi ────────────────────────────────────────
            ['category_id' => $ao_so_mi, 'name' => 'Áo Sơ Mi Trắng Tay Dài Công Sở',      'material' => 'Cotton 100%',   'price' => 320000, 'stock_quantity' => 50, 'is_featured' => true,  'ratings' => 4.8, 'image' => 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=640&h=800&fit=crop'],
            ['category_id' => $ao_so_mi, 'name' => 'Áo Sơ Mi Kẻ Sọc Xanh Slim Fit',       'material' => 'Cotton Pha',    'price' => 280000, 'stock_quantity' => 40, 'is_featured' => false, 'ratings' => 4.5, 'image' => 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=640&h=800&fit=crop'],
            ['category_id' => $ao_so_mi, 'name' => 'Áo Sơ Mi Nữ Lụa Trơn Màu Pastel',     'material' => 'Lụa',           'price' => 420000, 'stock_quantity' => 30, 'is_featured' => true,  'ratings' => 4.7, 'image' => 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=640&h=800&fit=crop'],
            ['category_id' => $ao_so_mi, 'name' => 'Áo Sơ Mi Oxford Button-Down Nam',      'material' => 'Vải Oxford',    'price' => 350000, 'stock_quantity' => 35, 'is_featured' => false, 'ratings' => 4.6, 'image' => 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=640&h=800&fit=crop'],
            ['category_id' => $ao_so_mi, 'name' => 'Áo Sơ Mi Nữ Họa Tiết Hoa Nhí',        'material' => 'Chiffon',       'price' => 295000, 'stock_quantity' => 45, 'is_featured' => false, 'ratings' => 4.4, 'image' => 'https://images.unsplash.com/photo-1604695573706-53170668f6a6?w=640&h=800&fit=crop'],
            ['category_id' => $ao_so_mi, 'name' => 'Áo Sơ Mi Denim Tay Ngắn Unisex',       'material' => 'Denim',         'price' => 390000, 'stock_quantity' => 28, 'is_featured' => true,  'ratings' => 4.9, 'image' => 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=640&h=800&fit=crop'],

            // ── Váy ─────────────────────────────────────────────
            ['category_id' => $vay, 'name' => 'Chân Váy Midi Xếp Ly Thanh Lịch',           'material' => 'Vải Tweed',     'price' => 260000, 'stock_quantity' => 40, 'is_featured' => true,  'ratings' => 4.7, 'image' => 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=640&h=800&fit=crop'],
            ['category_id' => $vay, 'name' => 'Chân Váy Mini Denim Trẻ Trung',              'material' => 'Denim',         'price' => 220000, 'stock_quantity' => 55, 'is_featured' => false, 'ratings' => 4.5, 'image' => 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=640&h=800&fit=crop'],
            ['category_id' => $vay, 'name' => 'Chân Váy Bút Chì Công Sở Ôm Dáng',          'material' => 'Vải Co Giãn',   'price' => 240000, 'stock_quantity' => 38, 'is_featured' => true,  'ratings' => 4.8, 'image' => 'https://images.unsplash.com/photo-1594938298603-c8148c4b4e2b?w=640&h=800&fit=crop'],
            ['category_id' => $vay, 'name' => 'Chân Váy Maxi Boho Thêu Hoa',               'material' => 'Vải Voan',      'price' => 310000, 'stock_quantity' => 25, 'is_featured' => false, 'ratings' => 4.6, 'image' => 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=640&h=800&fit=crop'],
            ['category_id' => $vay, 'name' => 'Chân Váy Tennis Trắng Năng Động',            'material' => 'Polyester',     'price' => 195000, 'stock_quantity' => 60, 'is_featured' => false, 'ratings' => 4.4, 'image' => 'https://images.unsplash.com/photo-1551803091-e20379c086e9?w=640&h=800&fit=crop'],
            ['category_id' => $vay, 'name' => 'Chân Váy Xòe Hoa Vintage Dáng Dài',         'material' => 'Cotton',        'price' => 275000, 'stock_quantity' => 32, 'is_featured' => true,  'ratings' => 4.7, 'image' => 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=640&h=800&fit=crop'],

            // ── Váy liền thân ────────────────────────────────────
            ['category_id' => $vay_lien, 'name' => 'Đầm Hoa Nhí Tay Phồng Dạo Phố',       'material' => 'Cotton',        'price' => 380000, 'stock_quantity' => 42, 'is_featured' => true,  'ratings' => 4.8, 'image' => 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=640&h=800&fit=crop'],
            ['category_id' => $vay_lien, 'name' => 'Đầm Ren Đen Dự Tiệc Sang Trọng',       'material' => 'Vải Ren',       'price' => 890000, 'stock_quantity' => 18, 'is_featured' => true,  'ratings' => 4.9, 'image' => 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=640&h=800&fit=crop'],
            ['category_id' => $vay_lien, 'name' => 'Đầm Sequin Lấp Lánh Dạ Hội',           'material' => 'Vải Sequin',    'price' => 1200000,'stock_quantity' => 12, 'is_featured' => true,  'ratings' => 5.0, 'image' => 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=640&h=800&fit=crop'],
            ['category_id' => $vay_lien, 'name' => 'Đầm Linen Thoáng Mát Đi Biển',         'material' => 'Linen',         'price' => 340000, 'stock_quantity' => 50, 'is_featured' => false, 'ratings' => 4.5, 'image' => 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=640&h=800&fit=crop'],
            ['category_id' => $vay_lien, 'name' => 'Đầm Xếp Tầng Màu Pastel Ngọt Ngào',    'material' => 'Vải Voan',      'price' => 450000, 'stock_quantity' => 30, 'is_featured' => false, 'ratings' => 4.6, 'image' => 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=640&h=800&fit=crop'],
            ['category_id' => $vay_lien, 'name' => 'Đầm Công Sở Cổ V Tay Dài',             'material' => 'Vải Tuyết Mưa', 'price' => 520000, 'stock_quantity' => 25, 'is_featured' => true,  'ratings' => 4.7, 'image' => 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=640&h=800&fit=crop'],

            // ── Áo thun P.T ──────────────────────────────────────
            ['category_id' => $ao_thun, 'name' => 'Áo Thun Thể Thao Dri-Fit Thoáng Mát',   'material' => 'Polyester',     'price' => 180000, 'stock_quantity' => 80, 'is_featured' => true,  'ratings' => 4.7, 'image' => 'https://images.unsplash.com/photo-1556906781-9a412961a28c?w=640&h=800&fit=crop'],
            ['category_id' => $ao_thun, 'name' => 'Áo Thun Polo Thể Thao Nam',              'material' => 'Cotton Pique',  'price' => 220000, 'stock_quantity' => 60, 'is_featured' => false, 'ratings' => 4.5, 'image' => 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=640&h=800&fit=crop'],
            ['category_id' => $ao_thun, 'name' => 'Áo Thun Gym Cổ Tròn Co Giãn 4 Chiều',   'material' => 'Spandex Pha',   'price' => 195000, 'stock_quantity' => 70, 'is_featured' => true,  'ratings' => 4.8, 'image' => 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=640&h=800&fit=crop'],
            ['category_id' => $ao_thun, 'name' => 'Áo Thun Nữ Tập Yoga Ba Lỗ',             'material' => 'Nylon Pha',     'price' => 165000, 'stock_quantity' => 55, 'is_featured' => false, 'ratings' => 4.6, 'image' => 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=640&h=800&fit=crop'],
            ['category_id' => $ao_thun, 'name' => 'Áo Thun Training Phản Quang',            'material' => 'Polyester',     'price' => 210000, 'stock_quantity' => 45, 'is_featured' => false, 'ratings' => 4.4, 'image' => 'https://images.unsplash.com/photo-1576633587382-13ddf37b1fc1?w=640&h=800&fit=crop'],
            ['category_id' => $ao_thun, 'name' => 'Áo Thun Chạy Bộ Thoát Nhiệt Nhanh',     'material' => 'Coolmax',       'price' => 240000, 'stock_quantity' => 38, 'is_featured' => true,  'ratings' => 4.9, 'image' => 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=640&h=800&fit=crop'],

            // ── Quần short P.T ───────────────────────────────────
            ['category_id' => $quan_short, 'name' => 'Quần Short Thể Thao Nam Lưng Thun',   'material' => 'Polyester',     'price' => 150000, 'stock_quantity' => 70, 'is_featured' => true,  'ratings' => 4.6, 'image' => 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=640&h=800&fit=crop'],
            ['category_id' => $quan_short, 'name' => 'Quần Short Chạy Bộ Nữ Lót Trong',     'material' => 'Nylon',         'price' => 165000, 'stock_quantity' => 55, 'is_featured' => false, 'ratings' => 4.5, 'image' => 'https://images.unsplash.com/photo-1565084888279-aca607bb8427?w=640&h=800&fit=crop'],
            ['category_id' => $quan_short, 'name' => 'Quần Short Gym Co Giãn 4 Chiều',       'material' => 'Spandex',       'price' => 175000, 'stock_quantity' => 60, 'is_featured' => true,  'ratings' => 4.8, 'image' => 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=640&h=800&fit=crop'],
            ['category_id' => $quan_short, 'name' => 'Quần Short Bơi Lội Chống Nước',        'material' => 'Polyester',     'price' => 190000, 'stock_quantity' => 40, 'is_featured' => false, 'ratings' => 4.4, 'image' => 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=640&h=800&fit=crop'],
            ['category_id' => $quan_short, 'name' => 'Quần Short Tennis Trắng Năng Động',    'material' => 'Polyester Pha', 'price' => 200000, 'stock_quantity' => 35, 'is_featured' => false, 'ratings' => 4.5, 'image' => 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=640&h=800&fit=crop'],
            ['category_id' => $quan_short, 'name' => 'Quần Short Đá Bóng Thoáng Khí',        'material' => 'Mesh',          'price' => 145000, 'stock_quantity' => 80, 'is_featured' => true,  'ratings' => 4.7, 'image' => 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=640&h=800&fit=crop'],

            // ── Quần dài P.T ─────────────────────────────────────
            ['category_id' => $quan_dai, 'name' => 'Quần Jogger Thể Thao Unisex',            'material' => 'Cotton Pha',    'price' => 250000, 'stock_quantity' => 60, 'is_featured' => true,  'ratings' => 4.8, 'image' => 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=640&h=800&fit=crop'],
            ['category_id' => $quan_dai, 'name' => 'Quần Legging Tập Gym Nữ Cạp Cao',        'material' => 'Spandex',       'price' => 220000, 'stock_quantity' => 70, 'is_featured' => true,  'ratings' => 4.9, 'image' => 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=640&h=800&fit=crop'],
            ['category_id' => $quan_dai, 'name' => 'Quần Track Pants Nam Có Sọc Bên',         'material' => 'Polyester',     'price' => 280000, 'stock_quantity' => 45, 'is_featured' => false, 'ratings' => 4.5, 'image' => 'https://images.unsplash.com/photo-1588117305388-c2631a279f82?w=640&h=800&fit=crop'],
            ['category_id' => $quan_dai, 'name' => 'Quần Yoga Nữ Lưng Cao Co Giãn',          'material' => 'Nylon Pha',     'price' => 235000, 'stock_quantity' => 55, 'is_featured' => false, 'ratings' => 4.7, 'image' => 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=640&h=800&fit=crop'],
            ['category_id' => $quan_dai, 'name' => 'Quần Chạy Bộ Dài Phản Quang',            'material' => 'Polyester',     'price' => 260000, 'stock_quantity' => 38, 'is_featured' => false, 'ratings' => 4.6, 'image' => 'https://images.unsplash.com/photo-1539794830467-1f1755804d13?w=640&h=800&fit=crop'],
            ['category_id' => $quan_dai, 'name' => 'Quần Sweatpants Nỉ Bông Ấm Áp',          'material' => 'Cotton Nỉ',     'price' => 295000, 'stock_quantity' => 42, 'is_featured' => true,  'ratings' => 4.8, 'image' => 'https://images.unsplash.com/photo-1580651315530-69c8e0026377?w=640&h=800&fit=crop'],

            // ── Thắt lưng ────────────────────────────────────────
            ['category_id' => $that_lung, 'name' => 'Thắt Lưng Da Bò Thật Khóa Ghim Nam',   'material' => 'Da Bò',         'price' => 380000, 'stock_quantity' => 30, 'is_featured' => true,  'ratings' => 4.9, 'image' => 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=640&h=800&fit=crop'],
            ['category_id' => $that_lung, 'name' => 'Thắt Lưng Da PU Công Sở Nữ',           'material' => 'Da PU',         'price' => 180000, 'stock_quantity' => 45, 'is_featured' => false, 'ratings' => 4.5, 'image' => 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=640&h=800&fit=crop'],
            ['category_id' => $that_lung, 'name' => 'Thắt Lưng Vải Canvas Khóa Tự Động',    'material' => 'Canvas',        'price' => 145000, 'stock_quantity' => 60, 'is_featured' => false, 'ratings' => 4.4, 'image' => 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=640&h=800&fit=crop'],
            ['category_id' => $that_lung, 'name' => 'Thắt Lưng Da Ghép Màu Thời Trang',     'material' => 'Da Tổng Hợp',   'price' => 220000, 'stock_quantity' => 35, 'is_featured' => true,  'ratings' => 4.7, 'image' => 'https://images.unsplash.com/photo-1611010344445-5f9e2a5f7db0?w=640&h=800&fit=crop'],
            ['category_id' => $that_lung, 'name' => 'Thắt Lưng Nữ Khóa Tròn Vàng Sang',    'material' => 'Da PU',         'price' => 195000, 'stock_quantity' => 28, 'is_featured' => false, 'ratings' => 4.6, 'image' => 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=640&h=800&fit=crop'],

            // ── Cà vạt ───────────────────────────────────────────
            ['category_id' => $ca_vat, 'name' => 'Cà Vạt Lụa Trơn Màu Navy Công Sở',        'material' => 'Lụa',           'price' => 250000, 'stock_quantity' => 35, 'is_featured' => true,  'ratings' => 4.8, 'image' => 'https://images.unsplash.com/photo-1589756823695-278bc923f962?w=640&h=800&fit=crop'],
            ['category_id' => $ca_vat, 'name' => 'Cà Vạt Kẻ Sọc Chéo Sang Trọng',           'material' => 'Polyester',     'price' => 180000, 'stock_quantity' => 40, 'is_featured' => false, 'ratings' => 4.5, 'image' => 'https://images.unsplash.com/photo-1598522325074-042db73aa4e6?w=640&h=800&fit=crop'],
            ['category_id' => $ca_vat, 'name' => 'Cà Vạt Họa Tiết Hoa Văn Độc Đáo',         'material' => 'Lụa Pha',       'price' => 210000, 'stock_quantity' => 28, 'is_featured' => false, 'ratings' => 4.4, 'image' => 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=640&h=800&fit=crop'],
            ['category_id' => $ca_vat, 'name' => 'Nơ Đeo Cổ Bow Tie Dự Tiệc Lịch Lãm',     'material' => 'Lụa',           'price' => 160000, 'stock_quantity' => 25, 'is_featured' => true,  'ratings' => 4.7, 'image' => 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=640&h=800&fit=crop'],
            ['category_id' => $ca_vat, 'name' => 'Cà Vạt Slim Tie Hiện Đại Trẻ Trung',      'material' => 'Microfiber',    'price' => 145000, 'stock_quantity' => 50, 'is_featured' => false, 'ratings' => 4.6, 'image' => 'https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=640&h=800&fit=crop'],

            // ── Logo ─────────────────────────────────────────────
            ['category_id' => $logo, 'name' => 'Áo Hoodie Logo Thêu Nổi Unisex',             'material' => 'Cotton Nỉ',     'price' => 420000, 'stock_quantity' => 40, 'is_featured' => true,  'ratings' => 4.9, 'image' => 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=640&h=800&fit=crop'],
            ['category_id' => $logo, 'name' => 'Mũ Lưỡi Trai Logo Thêu Phong Cách',          'material' => 'Cotton',        'price' => 150000, 'stock_quantity' => 60, 'is_featured' => false, 'ratings' => 4.6, 'image' => 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=640&h=800&fit=crop'],
            ['category_id' => $logo, 'name' => 'Túi Tote Vải Logo In Nổi',                   'material' => 'Canvas',        'price' => 95000,  'stock_quantity' => 80, 'is_featured' => false, 'ratings' => 4.4, 'image' => 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=640&h=800&fit=crop'],
            ['category_id' => $logo, 'name' => 'Áo Thun Logo In Chữ Đơn Giản',               'material' => 'Cotton',        'price' => 180000, 'stock_quantity' => 70, 'is_featured' => true,  'ratings' => 4.7, 'image' => 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=640&h=800&fit=crop'],
            ['category_id' => $logo, 'name' => 'Áo Khoác Bomber Logo Thêu Ngực',             'material' => 'Polyester',     'price' => 550000, 'stock_quantity' => 20, 'is_featured' => true,  'ratings' => 4.8, 'image' => 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=640&h=800&fit=crop'],

            // ── Tất ──────────────────────────────────────────────
            ['category_id' => $tat, 'name' => 'Tất Thể Thao Cổ Ngắn Chống Hôi',             'material' => 'Cotton Pha',    'price' => 35000,  'stock_quantity' => 150,'is_featured' => false, 'ratings' => 4.5, 'image' => 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=640&h=800&fit=crop'],
            ['category_id' => $tat, 'name' => 'Tất Cotton Dài Cổ Cao Giữ Ấm',                'material' => 'Cotton 80%',    'price' => 45000,  'stock_quantity' => 120,'is_featured' => false, 'ratings' => 4.4, 'image' => 'https://images.unsplash.com/photo-1580331451062-99ff652288d7?w=640&h=800&fit=crop'],
            ['category_id' => $tat, 'name' => 'Tất Lưới Mỏng Nữ Họa Tiết Xinh',             'material' => 'Nylon',         'price' => 28000,  'stock_quantity' => 200,'is_featured' => true,  'ratings' => 4.6, 'image' => 'https://images.unsplash.com/photo-1511556820780-d912e42b4980?w=640&h=800&fit=crop'],
            ['category_id' => $tat, 'name' => 'Tất No-Show Ẩn Giày Silicone Chống Tuột',    'material' => 'Cotton Pha',    'price' => 40000,  'stock_quantity' => 180,'is_featured' => true,  'ratings' => 4.8, 'image' => 'https://images.unsplash.com/photo-1607522370275-f6fd21f7b239?w=640&h=800&fit=crop'],
            ['category_id' => $tat, 'name' => 'Tất Họa Tiết Vui Nhộn Nhiều Màu',             'material' => 'Cotton',        'price' => 38000,  'stock_quantity' => 160,'is_featured' => false, 'ratings' => 4.7, 'image' => 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=640&h=800&fit=crop'],
            ['category_id' => $tat, 'name' => 'Tất Nén Y Khoa Chống Mỏi Chân',              'material' => 'Spandex Pha',   'price' => 85000,  'stock_quantity' => 80, 'is_featured' => false, 'ratings' => 4.9, 'image' => 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=640&h=800&fit=crop'],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
