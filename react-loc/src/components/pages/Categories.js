import React from "react";
import {
  Plus,
  Filter,
  Download,
  Edit,
  Trash2,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  History,
  Image,
} from "lucide-react";

const categories = [
  {
    name: "Consumer Electronics",
    desc: "Laptops, Phones, Tablets",
    subs: "12 Sub-categories",
    products: 452,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600",
  },
  {
    name: "Fashion & Apparel",
    desc: "Men, Women, Accessories",
    subs: "24 Sub-categories",
    products: 812,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=600",
  },
  {
    name: "Home & Living",
    desc: "Furniture, Decor, Kitchen",
    subs: "8 Sub-categories",
    products: 195,
    status: "Hidden",
    image: "",
  },
  {
    name: "Beauty & Health",
    desc: "Skincare, Makeup, Wellness",
    subs: "15 Sub-categories",
    products: 320,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600",
  },
];

export default function Categories() {
  return (
    <div className="pb-12">
      {/* Top */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Categories Management
          </h1>

          <p className="text-gray-500 mt-2">
            Organize and structure your product catalog hierarchy.
          </p>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-3 rounded-xl flex items-center gap-2 shadow-md">
          <Plus size={18} />
          Add New Category
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
              <TrendingUp size={28} />
            </div>

            <div>
              <p className="text-sm text-gray-500 uppercase">
                Total Categories
              </p>

              <h2 className="text-3xl font-bold mt-1">42</h2>

              <p className="text-green-600 text-sm mt-2">
                +4 this month
              </p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex gap-4">
            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-green-600">
              <CheckCircle size={28} />
            </div>

            <div>
              <p className="text-sm text-gray-500 uppercase">
                Active Products
              </p>

              <h2 className="text-3xl font-bold mt-1">1,284</h2>

              <p className="text-green-600 text-sm mt-2">
                98.2% availability
              </p>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex gap-4">
            <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600">
              <AlertTriangle size={28} />
            </div>

            <div>
              <p className="text-sm text-gray-500 uppercase">
                Empty Categories
              </p>

              <h2 className="text-3xl font-bold mt-1">03</h2>

              <p className="text-gray-500 text-sm mt-2">
                Needs attention
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b bg-[#f9faff] flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            Category Directory
          </h3>

          <div className="flex items-center gap-2">
            <button className="p-2 border rounded-lg hover:bg-gray-50">
              <Filter size={18} />
            </button>

            <button className="p-2 border rounded-lg hover:bg-gray-50">
              <Download size={18} />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#f9faff] border-b">
              <tr className="text-left">
                <th className="px-6 py-4 text-sm text-gray-500 uppercase">
                  Category Name
                </th>

                <th className="px-6 py-4 text-sm text-gray-500 uppercase">
                  Sub Categories
                </th>

                <th className="px-6 py-4 text-sm text-gray-500 uppercase text-right">
                  Products
                </th>

                <th className="px-6 py-4 text-sm text-gray-500 uppercase">
                  Status
                </th>

                <th className="px-6 py-4 text-sm text-gray-500 uppercase text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {categories.map((item, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-[#fafbff] transition"
                >
                  {/* Name */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 border flex items-center justify-center">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Image
                            size={24}
                            className="text-gray-400"
                          />
                        )}
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {item.name}
                        </h4>

                        <p className="text-sm text-gray-500">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Subs */}
                  <td className="px-6 py-5 text-gray-700">
                    {item.subs}
                  </td>

                  {/* Products */}
                  <td className="px-6 py-5 text-right font-semibold">
                    {item.products}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 hover:bg-blue-50 rounded-lg text-blue-600">
                        <Edit size={18} />
                      </button>

                      <button className="p-2 hover:bg-red-50 rounded-lg text-red-500">
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
        <div className="px-6 py-4 flex items-center justify-between bg-[#f9faff]">
          <p className="text-sm text-gray-500">
            Showing 1 to 10 of 42 categories
          </p>

          <div className="flex gap-2">
            <button className="px-4 py-2 border rounded-lg text-sm hover:bg-white">
              Previous
            </button>

            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
              1
            </button>

            <button className="px-4 py-2 border rounded-lg text-sm hover:bg-white">
              2
            </button>

            <button className="px-4 py-2 border rounded-lg text-sm hover:bg-white">
              3
            </button>

            <button className="px-4 py-2 border rounded-lg text-sm hover:bg-white">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Tip */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4 text-blue-600">
            <Lightbulb size={22} />

            <h4 className="font-semibold uppercase tracking-wide">
              Optimization Tip
            </h4>
          </div>

          <p className="text-gray-700 leading-7">
            The "Home & Living" category currently has
            the highest bounce rate. Consider updating
            thumbnails or reorganizing products for
            better discoverability.
          </p>
        </div>

        {/* History */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <History size={22} />

            <h4 className="font-semibold uppercase tracking-wide">
              Recent Changes
            </h4>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-700">
                "Summer Collection" added to Fashion
              </span>

              <span className="text-gray-400">
                2 hours ago
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-700">
                Electronics status changed to Active
              </span>

              <span className="text-gray-400">
                Yesterday
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}