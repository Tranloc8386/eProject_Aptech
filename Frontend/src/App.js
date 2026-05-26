import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import "./App.css";

// ── Protected routes ──────────────────────────────────────
import { CustomerRoute, AdminRoute } from "./components/shared/ProtectedRoute";

// ── Admin layout ──────────────────────────────────────────
import Sidebar     from "./components/admin/layout/Sidebar";
import AdminHeader from "./components/admin/layout/AdminHeader";
import AdminFooter from "./components/admin/layout/AdminFooter";

// ── Admin pages ───────────────────────────────────────────
import AdminLogin from "./components/admin/pages/AdminLogin";
import Dashboard  from "./components/admin/pages/Dashboard";
import Users      from "./components/admin/pages/Users";
import Admins     from "./components/admin/pages/Admins";
import Customers  from "./components/admin/pages/Customers";
import Products   from "./components/admin/pages/Products";
import Orders     from "./components/admin/pages/Orders";
import Feedbacks  from "./components/admin/pages/Feedbacks";
import Categories from "./components/admin/pages/Categories";
import Banners    from "./components/admin/pages/Banners";

// ── Client layout ─────────────────────────────────────────
import ClientHeader from "./components/client/layout/Header";
import ClientFooter from "./components/client/layout/Footer";

// ── Client pages ──────────────────────────────────────────
import Home          from "./components/client/pages/Home";
import ClientProducts from "./components/client/pages/Products";
import ProductDetail from "./components/client/pages/ProductDetail";
import Cart          from "./components/client/pages/Cart";
import Checkout      from "./components/client/pages/Checkout";
import VnpayResult   from "./components/client/pages/VnpayResult";
import Login         from "./components/client/pages/Login";
import Register      from "./components/client/pages/Register";
import MyOrders      from "./components/client/pages/MyOrders";
import Contact       from "./components/client/pages/Contact";

// ── Layouts ───────────────────────────────────────────────
const AdminLayout = () => (
  <AdminRoute>
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 ml-[260px] flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-6 mt-16">
          <Outlet />
        </main>
        <AdminFooter />
      </div>
    </div>
  </AdminRoute>
);

const ClientLayout = () => (
  <div className="min-h-screen flex flex-col" style={{ background: "#faf8f5" }}>
    <ClientHeader />
    <main className="flex-1">
      <Outlet />
    </main>
    <ClientFooter />
  </div>
);

// ── App ───────────────────────────────────────────────────
const App = () => (
  <BrowserRouter>
    <Routes>

      {/* ── ADMIN LOGIN ── */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* ── ADMIN: yêu cầu đăng nhập admin ── */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard"  element={<Dashboard />} />
        <Route path="users"      element={<Users />} />
        <Route path="admins"     element={<Admins />} />
        <Route path="customers"  element={<Customers />} />
        <Route path="products"   element={<Products />} />
        <Route path="orders"     element={<Orders />} />
        <Route path="feedbacks"  element={<Feedbacks />} />
        <Route path="categories" element={<Categories />} />
        <Route path="banners"    element={<Banners />} />
      </Route>

      {/* ── CLIENT ── */}
      <Route path="/" element={<ClientLayout />}>
        {/* Tự do — không cần đăng nhập */}
        <Route index                element={<Home />} />
        <Route path="products"      element={<ClientProducts />} />
        <Route path="products/:id"  element={<ProductDetail />} />
        <Route path="login"         element={<Login />} />
        <Route path="register"      element={<Register />} />
        <Route path="contact"       element={<Contact />} />
        <Route path="vnpay-result"  element={<VnpayResult />} />

        {/* Yêu cầu đăng nhập customer */}
        <Route path="cart"     element={<CustomerRoute><Cart /></CustomerRoute>} />
        <Route path="checkout" element={<CustomerRoute><Checkout /></CustomerRoute>} />
        <Route path="orders"   element={<CustomerRoute><MyOrders /></CustomerRoute>} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  </BrowserRouter>
);

export default App;
