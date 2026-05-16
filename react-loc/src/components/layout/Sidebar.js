import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  MessageSquare,
  LogOut,
  PanelsTopLeft,
  Tags,
  Images,
} from "lucide-react";

const Sidebar = () => {
  const menuClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium
    ${
      isActive
        ? "bg-blue-600 text-white shadow-md"
        : "text-gray-700 hover:bg-white hover:shadow-sm"
    }`;

  const menus = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      name: "Users",
      path: "/users",
      icon: <Users size={18} />,
    },
    {
      name: "Products",
      path: "/products",
      icon: <Package size={18} />,
    },
    {
      name: "Categories",
      path: "/categories",
      icon: <Tags size={18} />,
    },
    {
      name: "Orders",
      path: "/orders",
      icon: <ShoppingCart size={18} />,
    },
    {
      name: "Banners",
      path: "/banners",
      icon: <Images size={18} />,
    },
    {
      name: "Chat",
      path: "/chat",
      icon: <MessageSquare size={18} />,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-[260px] bg-[#f5f6ff] border-r border-gray-200 flex flex-col p-4">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
          <PanelsTopLeft size={22} />
        </div>

        <div>
          <h1 className="font-bold text-lg text-blue-700">
            Store Manager
          </h1>

          <p className="text-sm text-gray-500">
            Global Administration
          </p>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-2 flex-1">
        {menus.map((menu, index) => (
          <NavLink
            key={index}
            to={menu.path}
            className={menuClass}
          >
            {menu.icon}
            {menu.name}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="border-t pt-4">
        <button className="w-full flex items-center gap-3 text-red-500 px-4 py-3 rounded-xl hover:bg-red-50 transition-all">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;