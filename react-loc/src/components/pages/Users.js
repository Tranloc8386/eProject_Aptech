import React from "react";
import {
  Users as UsersIcon,
  UserCheck,
  ShieldAlert,
  UserCog,
  TrendingUp,
  TrendingDown,
  Filter,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
  UserPlus,
} from "lucide-react";

const Users = () => {
  const users = [
    {
      name: "Alex Durand",
      email: "alex.durand@company.com",
      role: "Admin",
      status: "Active",
      joined: "Oct 12, 2023",
    },
    {
      name: "Sarah Chen",
      email: "s.chen@creative.org",
      role: "Editor",
      status: "Active",
      joined: "Jan 05, 2024",
    },
    {
      name: "Michael Knight",
      email: "m.knight@gmail.com",
      role: "Customer",
      status: "Blocked",
      joined: "Nov 22, 2023",
    },
    {
      name: "Emma Brown",
      email: "emma.b@outlook.com",
      role: "Customer",
      status: "Active",
      joined: "Feb 14, 2024",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-sm text-gray-500 mb-1">Admin / Users</p>

          <h1 className="text-3xl font-bold">User Management</h1>

          <p className="text-gray-500 mt-2">
            Manage administrator roles and customer accounts
          </p>
        </div>

        <button className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-700">
          <UserPlus size={18} />
          Add New User
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Total */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <UsersIcon className="text-blue-600" />
            </div>

            <div className="flex items-center text-green-600 text-sm font-semibold">
              +4%
              <TrendingUp size={16} />
            </div>
          </div>

          <p className="text-sm text-gray-500 uppercase mt-4">Total Users</p>

          <h2 className="text-4xl font-bold mt-2">12,842</h2>
        </div>

        {/* Active */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <UserCheck className="text-green-600" />
            </div>

            <div className="flex items-center text-green-600 text-sm font-semibold">
              +2%
              <TrendingUp size={16} />
            </div>
          </div>

          <p className="text-sm text-gray-500 uppercase mt-4">Active Users</p>

          <h2 className="text-4xl font-bold mt-2">1,402</h2>
        </div>

        {/* Blocked */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between">
            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
              <ShieldAlert className="text-red-600" />
            </div>

            <div className="flex items-center text-red-500 text-sm font-semibold">
              -1%
              <TrendingDown size={16} />
            </div>
          </div>

          <p className="text-sm text-gray-500 uppercase mt-4">Blocked Users</p>

          <h2 className="text-4xl font-bold mt-2">42</h2>
        </div>

        {/* Admin */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between">
            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
              <UserCog className="text-orange-600" />
            </div>

            <span className="text-gray-500 text-sm">Stable</span>
          </div>

          <p className="text-sm text-gray-500 uppercase mt-4">Admin Seats</p>

          <h2 className="text-4xl font-bold mt-2">8 / 10</h2>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* Top */}
        <div className="p-6 border-b flex justify-between items-center">
          <div className="flex gap-3">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
              All Users
            </button>

            <button className="px-4 py-2 rounded-lg border">
              Administrators
            </button>

            <button className="px-4 py-2 rounded-lg border">Customers</button>
          </div>

          <button className="border px-4 py-2 rounded-lg flex items-center gap-2">
            <Filter size={18} />
            Filters
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">User</th>

                <th className="p-4 text-left">Role</th>

                <th className="p-4 text-left">Status</th>

                <th className="p-4 text-left">Joined</th>

                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="p-4">
                    <div>
                      <p className="font-semibold">{user.name}</p>

                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </td>

                  <td className="p-4">
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                      {user.role}
                    </span>
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td className="p-4 text-gray-500">{user.joined}</td>

                  <td className="p-4">
                    <div className="flex justify-end gap-3">
                      <button className="text-blue-600">
                        <Pencil size={18} />
                      </button>

                      <button className="text-red-500">
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
        <div className="p-4 border-t flex justify-between items-center">
          <button className="border px-4 py-2 rounded-lg flex items-center gap-2">
            <ChevronLeft size={18} />
            Previous
          </button>

          <div className="flex gap-2">
            <button className="w-9 h-9 rounded-lg bg-blue-600 text-white">
              1
            </button>

            <button className="w-9 h-9 rounded-lg border">2</button>

            <button className="w-9 h-9 rounded-lg border">3</button>
          </div>

          <button className="border px-4 py-2 rounded-lg flex items-center gap-2">
            Next
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Users;
