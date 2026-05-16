import React from "react";
import {
  Package,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Plus,
  Filter,
  Edit,
  Trash2,
} from "lucide-react";

const Products = () => {
  const products = [
    {
      id: 1,
      name: "Pro Audio Headphones X1",
      desc: "Electronics & Accessories",
      sku: "AUD-PRO-402",
      category: "Electronics",
      price: "$249.00",
      stock: 156,
      status: "In Stock",
      statusColor: "bg-green-100 text-green-600",
      dot: "bg-green-500",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    },
    {
      id: 2,
      name: "Summit Smartwatch Series 5",
      desc: "Wearables",
      sku: "WCH-SUM-005",
      category: "Electronics",
      price: "$399.50",
      stock: 8,
      status: "Low Stock",
      statusColor: "bg-red-100 text-red-600",
      dot: "bg-red-500",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    },
    {
      id: 3,
      name: "Urban Commuter Backpack",
      desc: "Bags & Travel",
      sku: "BAG-URB-771",
      category: "Fashion",
      price: "$120.00",
      stock: 0,
      status: "Out of Stock",
      statusColor: "bg-gray-100 text-gray-600",
      dot: "bg-gray-500",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    },
    {
      id: 4,
      name: "Aura Desk Lamp",
      desc: "Lighting & Decor",
      sku: "LMP-AUR-012",
      category: "Home & Decor",
      price: "$89.99",
      stock: 432,
      status: "In Stock",
      statusColor: "bg-green-100 text-green-600",
      dot: "bg-green-500",
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    },
  ];

  return (
    <div className="bg-[#f7f8fc] min-h-screen p-8">
      {/* HEADER */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <p className="text-sm text-blue-600 mb-2">
            Admin / Product Management
          </p>

          <h1 className="text-3xl font-bold text-gray-800">
            Product Inventory
          </h1>

          <p className="text-gray-500 mt-1">
            Manage your global product catalog and stock levels.
          </p>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2 font-medium transition">
          <Plus size={18} />
          Add New Product
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <Package />
          </div>

          <div>
            <p className="text-sm text-gray-500">Total Products</p>

            <h2 className="text-3xl font-bold text-gray-800">
              1,284
            </h2>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center text-red-600">
            <AlertTriangle />
          </div>

          <div>
            <p className="text-sm text-gray-500">Low Stock</p>

            <h2 className="text-3xl font-bold text-gray-800">
              42
            </h2>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-600">
            <TrendingUp />
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Active Categories
            </p>

            <h2 className="text-3xl font-bold text-gray-800">
              18
            </h2>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
            <DollarSign />
          </div>

          <div>
            <p className="text-sm text-gray-500">Total Value</p>

            <h2 className="text-3xl font-bold text-gray-800">
              $2.4M
            </h2>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        {/* TOP BAR */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div className="flex gap-6">
            <button className="text-blue-600 border-b-2 border-blue-600 pb-2 font-semibold">
              All Products
            </button>

            <button className="text-gray-500 hover:text-black transition">
              Electronics
            </button>

            <button className="text-gray-500 hover:text-black transition">
              Fashion
            </button>

            <button className="text-gray-500 hover:text-black transition">
              Home & Decor
            </button>
          </div>

          <button className="border border-gray-300 px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-gray-100 transition">
            <Filter size={16} />
            Filters
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-left text-xs uppercase text-gray-500">
                <th className="p-4">
                  <input type="checkbox" />
                </th>

                <th className="p-4">Product</th>

                <th>SKU</th>

                <th>Category</th>

                <th className="text-right pr-6">Price</th>

                <th className="text-right pr-6">Stock</th>

                <th>Status</th>

                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="p-4">
                    <input type="checkbox" />
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-14 h-14 rounded-xl object-cover"
                      />

                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {product.name}
                        </h3>

                        <p className="text-sm text-gray-500">
                          {product.desc}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="text-gray-500">
                    {product.sku}
                  </td>

                  <td>
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-md text-sm">
                      {product.category}
                    </span>
                  </td>

                  <td className="text-right pr-6 font-semibold text-gray-800">
                    {product.price}
                  </td>

                  <td className="text-right pr-6 text-gray-700">
                    {product.stock}
                  </td>

                  <td>
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${product.dot}`}
                      ></span>

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${product.statusColor}`}
                      >
                        {product.status}
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="flex justify-center gap-4">
                      <button className="text-gray-500 hover:text-blue-600 transition">
                        <Edit size={18} />
                      </button>

                      <button className="text-gray-500 hover:text-red-600 transition">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="p-5 border-t border-gray-200 flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Showing 1 to 10 of 1,284 entries
          </p>

          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border rounded-lg hover:bg-gray-100">
              Previous
            </button>

            <button className="w-8 h-8 rounded-lg bg-blue-600 text-white">
              1
            </button>

            <button className="w-8 h-8 rounded-lg hover:bg-gray-100">
              2
            </button>

            <button className="w-8 h-8 rounded-lg hover:bg-gray-100">
              3
            </button>

            <button className="px-3 py-1 border rounded-lg hover:bg-gray-100">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;