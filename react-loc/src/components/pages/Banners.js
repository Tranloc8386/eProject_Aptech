import React from "react";
import {
  Search,
  Bell,
  HelpCircle,
  Plus,
  Edit,
  Trash2,
  TrendingUp,
  ImagePlus,
} from "lucide-react";

const banners = [
  {
    title: "Summer Sale 2024",
    location: "Homepage Hero",
    impressions: "124.5k",
    ctr: "4.2%",
    growth: "+1.2%",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200",
  },
  {
    title: "Tech Week Flash Sale",
    location: "Electronics Sub-header",
    impressions: "0",
    ctr: "--",
    growth: "",
    status: "Scheduled",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200",
  },
  {
    title: "Autumn Essentials",
    location: "Sidebar Widget",
    impressions: "45.2k",
    ctr: "2.8%",
    growth: "-0.4%",
    status: "Inactive",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200",
  },
  {
    title: "Zero Fee Week",
    location: "Checkout Footer",
    impressions: "28.9k",
    ctr: "5.1%",
    growth: "+2.3%",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1200",
  },
];

export default function Banners() {
  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Left */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Banner Management
            </h1>

            <p className="text-gray-500 mt-2">
              Oversee and manage your store promotional assets.
            </p>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search banners..."
                className="w-[260px] bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <button className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50">
              <Bell size={18} />
            </button>

            <button className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50">
              <HelpCircle size={18} />
            </button>

            <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-3 rounded-xl flex items-center gap-2 shadow-md">
              <Plus size={18} />
              Add Banner
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {banners.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 group"
          >
            {/* Image */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={item.image}
                alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />

              {/* Actions */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow hover:bg-blue-50 text-blue-600">
                  <Edit size={18} />
                </button>

                <button className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow hover:bg-red-50 text-red-500">
                  <Trash2 size={18} />
                </button>
              </div>

              {/* Status */}
              <div className="absolute bottom-4 left-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    item.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : item.status === "Scheduled"
                      ? "bg-orange-100 text-orange-600"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="mb-5">
                <h3 className="text-xl font-bold text-gray-900">
                  {item.title}
                </h3>

                <p className="text-gray-500 text-sm mt-1">
                  {item.location}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-5 border-t pt-5">
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-400">
                    Impressions
                  </p>

                  <h4 className="text-2xl font-bold mt-1">
                    {item.impressions}
                  </h4>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-400">
                    CTR
                  </p>

                  <div className="flex items-center gap-2 mt-1">
                    <h4 className="text-2xl font-bold">
                      {item.ctr}
                    </h4>

                    {item.growth && (
                      <span
                        className={`text-sm font-medium ${
                          item.growth.includes("+")
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        {item.growth}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Add Card */}
        <div className="border-2 border-dashed border-gray-300 rounded-2xl bg-white flex flex-col items-center justify-center p-10 hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer min-h-[420px]">
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-5">
            <ImagePlus size={38} className="text-blue-600" />
          </div>

          <h3 className="text-xl font-bold text-gray-800">
            Create New Banner
          </h3>

          <p className="text-gray-500 text-center mt-2">
            Upload assets and configure placements
          </p>
        </div>
      </div>

      {/* Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <p className="text-sm uppercase tracking-wider text-gray-400">
            Total Impressions
          </p>

          <h2 className="text-4xl font-bold mt-2 text-blue-600">
            1.2M
          </h2>

          <p className="text-green-600 text-sm mt-3 flex items-center gap-1">
            <TrendingUp size={16} />
            14% vs last month
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <p className="text-sm uppercase tracking-wider text-gray-400">
            Avg. Click Rate
          </p>

          <h2 className="text-4xl font-bold mt-2 text-blue-600">
            3.8%
          </h2>

          <p className="text-green-600 text-sm mt-3 flex items-center gap-1">
            <TrendingUp size={16} />
            0.5% increase
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <p className="text-sm uppercase tracking-wider text-gray-400">
            Active Slots
          </p>

          <h2 className="text-4xl font-bold mt-2 text-blue-600">
            12/15
          </h2>

          <p className="text-gray-500 text-sm mt-3">
            3 placements available
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <p className="text-sm uppercase tracking-wider text-gray-400">
            Conversions
          </p>

          <h2 className="text-4xl font-bold mt-2 text-blue-600">
            4,281
          </h2>

          <p className="text-green-600 text-sm mt-3 flex items-center gap-1">
            <TrendingUp size={16} />
            8% growth
          </p>
        </div>
      </div>
    </div>
  );
}