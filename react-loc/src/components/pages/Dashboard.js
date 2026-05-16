import React from "react";
import {
  DollarSign,
  ShoppingBag,
  UserPlus,
  TrendingUp,
  TrendingDown,
  MoreVertical,
  CheckCircle,
  AlertTriangle,
  Star,
  Plus,
  Filter,
  Download,
} from "lucide-react";

const Dashboard = () => {
  return (
    <div className="w-full">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Revenue */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between">
            <div>
              <p className="text-sm uppercase text-gray-500">
                Total Revenue
              </p>

              <h2 className="text-4xl font-bold mt-2">
                $124,592
              </h2>
            </div>

            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <DollarSign className="text-blue-600" />
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <span className="flex items-center text-green-600 text-sm font-semibold">
              <TrendingUp size={16} />
              +14.2%
            </span>

            <span className="text-gray-500 text-sm">
              vs last month
            </span>
          </div>
        </div>

        {/* Orders */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between">
            <div>
              <p className="text-sm uppercase text-gray-500">
                Active Orders
              </p>

              <h2 className="text-4xl font-bold mt-2">
                1,842
              </h2>
            </div>

            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <ShoppingBag className="text-green-600" />
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <span className="flex items-center text-green-600 text-sm font-semibold">
              <TrendingUp size={16} />
              +5.8%
            </span>

            <span className="text-gray-500 text-sm">
              vs last month
            </span>
          </div>
        </div>

        {/* Customers */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between">
            <div>
              <p className="text-sm uppercase text-gray-500">
                New Customers
              </p>

              <h2 className="text-4xl font-bold mt-2">
                412
              </h2>
            </div>

            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
              <UserPlus className="text-orange-600" />
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <span className="flex items-center text-red-500 text-sm font-semibold">
              <TrendingDown size={16} />
              -2.1%
            </span>

            <span className="text-gray-500 text-sm">
              vs last month
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-6 mb-6">
        {/* Chart */}
        <div className="col-span-12 lg:col-span-8 bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-bold">
                Weekly Sales Trend
              </h3>

              <p className="text-gray-500 text-sm">
                Comparative analysis of sales volume
              </p>
            </div>

            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              View Details
            </button>
          </div>

          <div className="flex items-end justify-between h-[300px] gap-4 border-b pb-2">
            {[
              ["Mon", "65%"],
              ["Tue", "80%"],
              ["Wed", "45%"],
              ["Thu", "95%"],
              ["Fri", "70%"],
              ["Sat", "30%"],
              ["Sun", "55%"],
            ].map((item) => (
              <div
                key={item[0]}
                className="flex flex-col items-center flex-1 h-full justify-end"
              >
                <div
                  className="w-full bg-blue-500 rounded-t-xl"
                  style={{ height: item[1] }}
                ></div>

                <span className="text-sm text-gray-500 mt-2">
                  {item[0]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Activities */}
        <div className="col-span-12 lg:col-span-4 bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">
              Recent Activities
            </h3>

            <MoreVertical />
          </div>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="text-green-600" />
              </div>

              <div>
                <p className="text-sm">
                  <span className="font-bold">
                    Order #8429
                  </span>{" "}
                  completed successfully
                </p>

                <span className="text-xs text-gray-500">
                  2 minutes ago
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="text-red-500" />
              </div>

              <div>
                <p className="text-sm">
                  Inventory Alert: MacBook low stock
                </p>

                <span className="text-xs text-gray-500">
                  2 hours ago
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <Star className="text-orange-500" />
              </div>

              <div>
                <p className="text-sm">
                  New 5-star review received
                </p>

                <span className="text-xs text-gray-500">
                  5 hours ago
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="text-xl font-bold">
            Top Selling Products
          </h3>

          <div className="flex gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Filter size={18} />
            </button>

            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Download size={18} />
            </button>
          </div>
        </div>

        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Stock</th>
              <th className="p-4 text-right">Price</th>
              <th className="p-4 text-right">Orders</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t">
              <td className="p-4">MacBook Pro M3</td>
              <td className="p-4">Electronics</td>
              <td className="p-4">Low Stock</td>
              <td className="p-4 text-right">$2,499</td>
              <td className="p-4 text-right">124</td>
            </tr>

            <tr className="border-t">
              <td className="p-4">QuietComfort Ultra</td>
              <td className="p-4">Audio</td>
              <td className="p-4">In Stock</td>
              <td className="p-4 text-right">$429</td>
              <td className="p-4 text-right">856</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* FAB */}
      <button className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg">
        <Plus />
      </button>
    </div>
  );
};

export default Dashboard;