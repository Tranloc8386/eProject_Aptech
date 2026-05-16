import React from "react";
import { NavLink } from "react-router-dom";
import {
  Search,
  Bell,
  HelpCircle,
  Paperclip,
  Smile,
  Image,
  Bold,
  Send,
  Phone,
  Video,
  MoreVertical,
  ShieldCheck,
  ExternalLink,
  Ban,
  CreditCard,
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

const conversations = [
  {
    name: "Sarah Jenkins",
    message:
      "Wait, can I change the shipping address to my office instead?",
    time: "2m ago",
    active: true,
    unread: false,
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    name: "Marcus Chen",
    message:
      "The item arrived damaged. I've attached photos.",
    time: "15m ago",
    unread: true,
    avatar: "https://i.pravatar.cc/100?img=15",
  },
  {
    name: "Elena Rodriguez",
    message: "Thank you for the quick resolution!",
    time: "1h ago",
    avatar: "https://i.pravatar.cc/100?img=20",
  },
  {
    name: "James Wilson",
    message:
      "When will the summer collection be back?",
    time: "4h ago",
    avatar: "https://i.pravatar.cc/100?img=25",
  },
];

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
    <aside className="fixed left-0 top-0 h-screen w-[260px] bg-[#f5f6ff] border-r border-gray-200 flex flex-col p-4 z-50">
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

export default function ChatPage() {
  return (
    <div className="bg-[#faf8ff] min-h-screen flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <main className="ml-[260px] flex flex-1 h-screen">
        {/* LEFT - Conversations */}
        <section className="w-[350px] bg-white border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="h-16 border-b border-gray-200 px-5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">
              Messages
            </h2>

            <div className="flex items-center gap-3">
              <button className="text-gray-500 hover:text-blue-600">
                <Bell size={20} />
              </button>

              <button className="text-gray-500 hover:text-blue-600">
                <HelpCircle size={20} />
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full bg-[#f5f6ff] border border-gray-200 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-2 p-4 border-b border-gray-100">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm">
              All
            </button>

            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm">
              Unread
            </button>

            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm">
              Assigned
            </button>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((chat, index) => (
              <div
                key={index}
                className={`p-4 border-b border-gray-100 cursor-pointer transition hover:bg-[#f8f9ff]
                ${
                  chat.active
                    ? "bg-blue-50 border-l-4 border-l-blue-600"
                    : ""
                }`}
              >
                <div className="flex gap-3">
                  <img
                    src={chat.avatar}
                    alt=""
                    className="w-12 h-12 rounded-full object-cover"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-800 truncate">
                        {chat.name}
                      </h3>

                      <span className="text-xs text-gray-400">
                        {chat.time}
                      </span>
                    </div>

                    <p className="text-sm text-gray-500 truncate mt-1">
                      {chat.message}
                    </p>
                  </div>

                  {chat.unread && (
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CENTER - Chat */}
        <section className="flex-1 flex flex-col bg-[#fafbff]">
          {/* Chat Header */}
          <div className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="https://i.pravatar.cc/100?img=12"
                alt=""
                className="w-10 h-10 rounded-full"
              />

              <div>
                <h3 className="font-semibold text-gray-800">
                  Sarah Jenkins
                </h3>

                <p className="text-sm text-green-500">
                  Active now
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
                <Phone size={20} />
              </button>

              <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
                <Video size={20} />
              </button>

              <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
                <MoreVertical size={20} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* User */}
            <div className="flex gap-3 max-w-[70%]">
              <img
                src="https://i.pravatar.cc/100?img=12"
                alt=""
                className="w-9 h-9 rounded-full"
              />

              <div>
                <div className="bg-white rounded-2xl rounded-tl-md px-5 py-3 shadow-sm border">
                  <p className="text-gray-700">
                    Hi, I'm checking on order #9421.
                  </p>
                </div>

                <span className="text-xs text-gray-400 mt-1 block">
                  10:42 AM
                </span>
              </div>
            </div>

            {/* Admin */}
            <div className="flex justify-end">
              <div className="max-w-[70%]">
                <div className="bg-blue-600 text-white rounded-2xl rounded-tr-md px-5 py-3 shadow">
                  <p>
                    Hello Sarah! Let me check that for
                    you.
                  </p>
                </div>

                <span className="text-xs text-gray-400 mt-1 block text-right">
                  10:44 AM
                </span>
              </div>
            </div>

            {/* User */}
            <div className="flex gap-3 max-w-[70%]">
              <img
                src="https://i.pravatar.cc/100?img=12"
                alt=""
                className="w-9 h-9 rounded-full"
              />

              <div>
                <div className="bg-white rounded-2xl rounded-tl-md px-5 py-3 shadow-sm border">
                  <p className="text-gray-700">
                    Can I change the shipping address to
                    my office instead?
                  </p>
                </div>

                <span className="text-xs text-gray-400 mt-1 block">
                  10:45 AM
                </span>
              </div>
            </div>

            {/* Typing */}
            <div className="text-sm text-gray-400 animate-pulse">
              Sarah is typing...
            </div>
          </div>

          {/* Input */}
          <div className="bg-white border-t border-gray-200 p-4">
            <div className="border border-gray-200 rounded-2xl p-3 bg-[#fafbff]">
              <textarea
                placeholder="Type your message..."
                className="w-full bg-transparent outline-none resize-none min-h-[80px]"
              />

              <div className="flex items-center justify-between pt-3 border-t mt-3">
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
                    <Paperclip size={18} />
                  </button>

                  <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
                    <Smile size={18} />
                  </button>

                  <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
                    <Image size={18} />
                  </button>

                  <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
                    <Bold size={18} />
                  </button>
                </div>

                <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl flex items-center gap-2 transition">
                  Send
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT - Customer Info */}
        <section className="w-[320px] bg-white border-l border-gray-200 flex flex-col">
          {/* Profile */}
          <div className="p-6 border-b border-gray-100 text-center">
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt=""
              className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white shadow"
            />

            <h3 className="text-xl font-bold text-gray-800 mt-4">
              Sarah Jenkins
            </h3>

            <p className="text-blue-600 font-medium">
              Pro Member
            </p>

            <p className="text-gray-500 text-sm mt-1">
              San Francisco, CA
            </p>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="bg-[#f5f6ff] rounded-xl p-4">
                <p className="text-xs text-gray-500 uppercase">
                  Total Spent
                </p>

                <h4 className="font-bold text-lg mt-1">
                  $2,450
                </h4>
              </div>

              <div className="bg-[#f5f6ff] rounded-xl p-4">
                <p className="text-xs text-gray-500 uppercase">
                  Orders
                </p>

                <h4 className="font-bold text-lg mt-1">
                  12
                </h4>
              </div>
            </div>
          </div>

          {/* Orders */}
          <div className="p-6 flex-1">
            <h4 className="font-semibold text-gray-800 mb-4">
              Order History
            </h4>

            <div className="space-y-4">
              <div className="border rounded-xl p-4">
                <div className="flex justify-between">
                  <div>
                    <h5 className="font-semibold">
                      #9421 - Processing
                    </h5>

                    <p className="text-sm text-gray-500">
                      Leather Chelsea Boots
                    </p>
                  </div>

                  <span className="font-semibold">
                    $340
                  </span>
                </div>
              </div>

              <div className="border rounded-xl p-4">
                <div className="flex justify-between">
                  <div>
                    <h5 className="font-semibold">
                      #9104 - Delivered
                    </h5>

                    <p className="text-sm text-gray-500">
                      Merino Wool Sweater
                    </p>
                  </div>

                  <span className="font-semibold">
                    $120
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 space-y-3">
              <button className="w-full border rounded-xl px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition">
                View Full Profile
                <ExternalLink size={18} />
              </button>

              <button className="w-full border rounded-xl px-4 py-3 flex items-center justify-between hover:bg-orange-50 hover:text-orange-600 transition">
                Issue Refund
                <CreditCard size={18} />
              </button>

              <button className="w-full border rounded-xl px-4 py-3 flex items-center justify-between hover:bg-red-50 hover:text-red-600 transition">
                Block Customer
                <Ban size={18} />
              </button>
            </div>
          </div>

          {/* Verify */}
          <div className="p-5 border-t border-gray-100 bg-[#f8f9ff]">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                <ShieldCheck size={22} />
              </div>

              <div>
                <h4 className="font-semibold text-gray-800">
                  Identity Verified
                </h4>

                <p className="text-sm text-gray-500">
                  Email & Phone Confirmed
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}