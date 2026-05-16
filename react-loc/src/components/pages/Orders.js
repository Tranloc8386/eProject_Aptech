import React from "react";
import {
  Search,
  Bell,
  Download,
  Plus,
  ChevronLeft,
  ChevronRight,
  Eye,
  Filter,
  ShoppingBag,
  DollarSign,
  ClipboardList,
  RotateCcw,
} from "lucide-react";

const Orders = () => {
  const orders = [
    {
      id: "#ORD-90234",
      customer: "John Simmons",
      initials: "JS",
      date: "Oct 24, 2023, 14:32",
      payment: "Paid",
      paymentColor: "green",
      status: "Shipped",
      statusColor: "blue",
      total: "$249.99",
    },
    {
      id: "#ORD-90235",
      customer: "Maria Alvarez",
      initials: "MA",
      date: "Oct 24, 2023, 11:15",
      payment: "Pending",
      paymentColor: "gray",
      status: "Processing",
      statusColor: "yellow",
      total: "$1,120.00",
    },
    {
      id: "#ORD-90236",
      customer: "Liam Wilson",
      initials: "LW",
      date: "Oct 23, 2023, 18:50",
      payment: "Refunded",
      paymentColor: "red",
      status: "Cancelled",
      statusColor: "red",
      total: "$54.20",
    },
    {
      id: "#ORD-90237",
      customer: "Sarah Jenkins",
      initials: "SJ",
      date: "Oct 23, 2023, 09:12",
      payment: "Paid",
      paymentColor: "green",
      status: "Delivered",
      statusColor: "green",
      total: "$432.50",
    },
  ];

  const badgeStyles = {
    green: "bg-green-100 text-green-700",
    red: "bg-red-100 text-red-700",
    blue: "bg-blue-100 text-blue-700",
    yellow: "bg-yellow-100 text-yellow-700",
    gray: "bg-gray-100 text-gray-700",
  };

  return (
    <div className="bg-[#f6f7fb] min-h-screen text-gray-800">
      {/* HEADER */}
      <div className="bg-white border-b border-gray-200 px-8 h-16 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-bold text-blue-600">
            AdminCentral
          </h1>

          <div className="relative w-[400px]">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search orders, customers..."
              className="w-full bg-gray-100 rounded-full pl-11 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-5">
          <button className="relative">
            <Bell className="text-gray-600" />

            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500"></span>
          </button>

          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/100"
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />

            <span className="font-medium">
              Admin User
            </span>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-8">
        {/* TOP */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-4xl font-bold mb-2">
              Order Management
            </h2>

            <p className="text-gray-500">
              Monitor and manage all customer purchases in real-time.
            </p>
          </div>

          <div className="flex gap-4">
            <button className="border border-blue-600 text-blue-600 px-5 py-3 rounded-xl font-medium flex items-center gap-2 hover:bg-blue-50 transition">
              <Download size={18} />
              Export Data
            </button>

            <button className="bg-blue-600 text-white px-5 py-3 rounded-xl font-medium flex items-center gap-2 hover:bg-blue-700 transition">
              <Plus size={18} />
              Manual Order
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex gap-4">
            <div className="w-14 h-14 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <ShoppingBag />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Total Orders
              </p>

              <h3 className="text-3xl font-bold mt-1">
                1,284
              </h3>

              <span className="text-green-600 text-sm">
                +12.5% vs last month
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex gap-4">
            <div className="w-14 h-14 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
              <DollarSign />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Total Revenue
              </p>

              <h3 className="text-3xl font-bold mt-1">
                $42,905
              </h3>

              <span className="text-green-600 text-sm">
                +8.2% vs last month
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex gap-4">
            <div className="w-14 h-14 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center">
              <ClipboardList />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Pending Orders
              </p>

              <h3 className="text-3xl font-bold mt-1">
                48
              </h3>

              <span className="text-red-500 text-sm">
                Requires attention
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex gap-4">
            <div className="w-14 h-14 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
              <RotateCcw />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Returns / Refunds
              </p>

              <h3 className="text-3xl font-bold mt-1">
                12
              </h3>

              <span className="text-gray-500 text-sm">
                Stable month-over-month
              </span>
            </div>
          </div>
        </div>

        {/* FILTER */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm mb-6 flex items-center justify-between">
          <div className="flex gap-3">
            <button className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-medium">
              All Orders
            </button>

            <button className="px-5 py-2 rounded-full text-sm hover:bg-gray-100">
              Processing
            </button>

            <button className="px-5 py-2 rounded-full text-sm hover:bg-gray-100">
              Shipped
            </button>

            <button className="px-5 py-2 rounded-full text-sm hover:bg-gray-100">
              Delivered
            </button>

            <button className="px-5 py-2 rounded-full text-sm hover:bg-gray-100">
              Cancelled
            </button>
          </div>

          <div className="flex items-center gap-3">
            <select className="bg-gray-100 px-4 py-2 rounded-xl outline-none">
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
            </select>

            <button className="bg-gray-100 p-2.5 rounded-xl hover:bg-gray-200 transition">
              <Filter size={18} />
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-left text-xs uppercase text-gray-500">
                <th className="px-6 py-4">Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Payment</th>
                <th>Status</th>
                <th className="text-right pr-6">
                  Total
                </th>
                <th className="text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-5 font-semibold text-blue-600">
                    {order.id}
                  </td>

                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center">
                        {order.initials}
                      </div>

                      <span className="font-medium">
                        {order.customer}
                      </span>
                    </div>
                  </td>

                  <td className="text-gray-500">
                    {order.date}
                  </td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${badgeStyles[order.paymentColor]}`}
                    >
                      {order.payment}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${badgeStyles[order.statusColor]}`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="text-right pr-6 font-semibold">
                    {order.total}
                  </td>

                  <td>
                    <div className="flex justify-center">
                      <button className="p-2 rounded-lg hover:bg-gray-100 transition">
                        <Eye
                          size={18}
                          className="text-blue-600"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* PAGINATION */}
          <div className="flex justify-between items-center p-5 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Showing 1 to 4 of 1,284 results
            </p>

            <div className="flex items-center gap-2">
              <button className="w-9 h-9 border rounded-lg flex items-center justify-center hover:bg-gray-100">
                <ChevronLeft size={18} />
              </button>

              <button className="w-9 h-9 rounded-lg bg-blue-600 text-white">
                1
              </button>

              <button className="w-9 h-9 rounded-lg hover:bg-gray-100">
                2
              </button>

              <button className="w-9 h-9 rounded-lg hover:bg-gray-100">
                3
              </button>

              <button className="w-9 h-9 border rounded-lg flex items-center justify-center hover:bg-gray-100">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="grid grid-cols-3 gap-6 mt-8">
          {/* CHART */}
          <div className="col-span-2 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-xl font-bold mb-5">
              Quick Summary
            </h3>

            <div className="h-72 rounded-2xl bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl mb-3">
                  📈
                </div>

                <p className="text-gray-500">
                  Revenue visualizer loading...
                </p>
              </div>
            </div>
          </div>

          {/* NOTIFICATION */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-xl font-bold mb-5">
              Team Notifications
            </h3>

            <div className="space-y-5">
              <div className="flex gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 mt-2"></div>

                <div>
                  <h4 className="font-semibold">
                    Inventory Alert
                  </h4>

                  <p className="text-sm text-gray-500">
                    Item #P-102 is out of stock.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 mt-2"></div>

                <div>
                  <h4 className="font-semibold">
                    New Order Received
                  </h4>

                  <p className="text-sm text-gray-500">
                    #ORD-90238 placed an order.
                  </p>
                </div>
              </div>
            </div>

            <button className="w-full mt-8 border-t pt-5 text-blue-600 font-medium hover:text-blue-700">
              View Communication Logs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;