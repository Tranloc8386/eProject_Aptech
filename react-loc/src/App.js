import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

// Layout
import Sidebar from "./components/layout/Sidebar";
import AdminHeader from "./components/layout/AdminHeader";
import AdminFooter from "./components/layout/AdminFooter";
import "./App.css";

// Pages
import Dashboard from "./components/pages/Dashboard";
import Users from "./components/pages/Users";
import Products from "./components/pages/Products";
import Orders from "./components/pages/Orders";
import Chat from "./components/pages/Chat";
import Categories from "./components/pages/Categories";
import Banners from "./components/pages/Banners";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="flex-1 ml-[260px] flex flex-col">
        {/* Header */}
        <AdminHeader />

        {/* Content */}
        <main className="flex-1 p-6 mt-16">
          <Outlet />
        </main>

        {/* Footer */}
        <AdminFooter />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout */}
        <Route element={<AdminLayout />}>
          {/* Redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} /> 
          <Route path="/chat" element={<Chat />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/banners" element={<Banners />} />
         
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
