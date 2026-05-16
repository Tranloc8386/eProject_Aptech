import React from "react";
import { Bell, Search } from "lucide-react";

const AdminHeader = () => {
  return (
    <header className="fixed top-0 left-[260px] right-0 h-16 bg-white border-b z-40 flex items-center justify-between px-6">
      {/* Left */}
      <div className="flex items-center gap-6 w-full">
        <h2 className="text-2xl font-bold text-blue-700">AdminCentral</h2>

        {/* Search */}
        <div className="relative w-full max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search data, orders, or users..."
            className="w-full bg-gray-100 rounded-full pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        <button className="relative">
          <Bell className="text-gray-600" size={22} />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 cursor-pointer">
          <img
            src="https://i.pravatar.cc/40"
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />

          <div>
            <h4 className="font-semibold text-sm">Alex Rivera</h4>

            <p className="text-xs text-gray-500">SUPER ADMIN</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
