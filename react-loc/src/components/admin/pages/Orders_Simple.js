import React, { useState, useEffect } from "react";
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
  Loader,
  AlertTriangle,
  Edit,
  Trash2,
} from "lucide-react";
import { apiEndpoints } from "../../../services/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await apiEndpoints.orders.getAll();
      console.log('Orders API Response:', response.data);
      
      // Handle different response structures
      const ordersData = response.data.data || response.data || [];
      
      // Process orders data to match expected format
      const processedOrders = ordersData.map(order => {
        const shippingInfo = order.shipping_info || {};
        const items = order.items || [];

        return {
          ...order,
          order_number: `#ORD-${order.id}`,
          customer_name: shippingInfo.name || 'Unknown Customer',
          customer_email: shippingInfo.email || 'N/A',
          customer_address: shippingInfo.address || 'N/A',
          payment_status: order.payment_method ? 'paid' : 'pending',
          items: items,
          shipping_info: shippingInfo
        };
      });
      
      setOrders(processedOrders);
      setError(null);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err.message);
      // Fallback to demo data if API fails
      setOrders([
        {
          id: 1,
          order_number: "#ORD-90234",
          customer_name: "John Simmons",
          customer_email: "john@example.com",
          total_amount: 249.99,
          status: "shipped",
          payment_status: "paid",
          created_at: "2023-10-24T14:32:00Z",
        },
        {
          id: 2,
          order_number: "#ORD-90235",
          customer_name: "Maria Alvarez",
          customer_email: "maria@example.com",
          total_amount: 1120.00,
          status: "processing",
          payment_status: "pending",
          created_at: "2023-10-24T11:15:00Z",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Helper functions
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getInitials = (name) => {
    if (!name) return 'N/A';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatCurrency = (amount) => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) {
      return '$0.00';
    }
    return `$${numAmount.toFixed(2)}`;
  };

  const getStatusColor = (status) => {
    const statusColors = {
      'pending': 'gray',
      'processing': 'yellow',
      'shipped': 'blue',
      'delivered': 'green',
      'cancelled': 'red',
      'refunded': 'red',
      'paid': 'green',
    };
    return statusColors[status?.toLowerCase()] || 'gray';
  };

  const badgeStyles = {
    green: "bg-green-100 text-green-700",
    red: "bg-red-100 text-red-700",
    blue: "bg-blue-100 text-blue-700",
    yellow: "bg-yellow-100 text-yellow-700",
    gray: "bg-gray-100 text-gray-700",
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader className="animate-spin mx-auto mb-4" size={48} />
          <p className="text-gray-500">Loading orders...</p>
        </div>
      </div>
    );
  }

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
            <span className="font-medium">Admin User</span>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-8">
        {/* API Connection Status */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-red-700">
              <AlertTriangle size={20} />
              <span className="font-medium">API Connection Issue</span>
            </div>
            <p className="text-red-600 text-sm mt-1">
              {error} - Showing demo data instead
            </p>
            <button 
              onClick={fetchOrders}
              className="mt-2 text-sm bg-red-100 hover:bg-red-200 px-3 py-1 rounded"
            >
              Retry Connection
            </button>
          </div>
        )}

        {/* TOP */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-4xl font-bold mb-2">Order Management</h2>
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
              <p className="text-sm text-gray-500">Total Orders</p>
              <h3 className="text-3xl font-bold mt-1">{orders.length}</h3>
              <span className="text-green-600 text-sm">+12.5% vs last month</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex gap-4">
            <div className="w-14 h-14 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
              <DollarSign />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <h3 className="text-3xl font-bold mt-1">
                ${(orders.reduce((sum, order) => {
                  const amount = parseFloat(order.total_amount) || 0;
                  return sum + amount;
                }, 0) || 0).toFixed(2)}
              </h3>
              <span className="text-green-600 text-sm">+8.2% vs last month</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex gap-4">
            <div className="w-14 h-14 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center">
              <ClipboardList />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending Orders</p>
              <h3 className="text-3xl font-bold mt-1">
                {orders.filter(order => order.status === 'pending' || order.status === 'processing').length}
              </h3>
              <span className="text-red-500 text-sm">Requires attention</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex gap-4">
            <div className="w-14 h-14 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
              <RotateCcw />
            </div>
            <div>
              <p className="text-sm text-gray-500">Returns / Refunds</p>
              <h3 className="text-3xl font-bold mt-1">
                {orders.filter(order => order.status === 'cancelled' || order.payment_status === 'refunded').length}
              </h3>
              <span className="text-gray-500 text-sm">Stable month-over-month</span>
            </div>
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
                <th className="text-right pr-6">Total</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={order.id || index}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-5 font-semibold text-blue-600">
                    {order.order_number || `#ORD-${order.id}`}
                  </td>

                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center">
                        {getInitials(order.customer_name)}
                      </div>
                      <div>
                        <div className="font-medium">{order.customer_name}</div>
                        <div className="text-sm text-gray-500">{order.customer_email}</div>
                      </div>
                    </div>
                  </td>

                  <td className="text-gray-500">
                    {formatDate(order.created_at)}
                  </td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${badgeStyles[getStatusColor(order.payment_status)]}`}
                    >
                      {(order.payment_status || 'pending').charAt(0).toUpperCase() + (order.payment_status || 'pending').slice(1)}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${badgeStyles[getStatusColor(order.status)]}`}
                    >
                      {(order.status || 'pending').charAt(0).toUpperCase() + (order.status || 'pending').slice(1)}
                    </span>
                  </td>

                  <td className="text-right pr-6 font-semibold">
                    {formatCurrency(order.total_amount)}
                  </td>

                  <td>
                    <div className="flex justify-center gap-2">
                      <button className="p-2 rounded-lg hover:bg-gray-100 transition" title="View Details">
                        <Eye size={18} className="text-gray-600" />
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
              Showing 1 to {orders.length} of {orders.length} results
            </p>

            <div className="flex items-center gap-2">
              <button className="w-9 h-9 border rounded-lg flex items-center justify-center hover:bg-gray-100">
                <ChevronLeft size={18} />
              </button>
              <button className="w-9 h-9 rounded-lg bg-blue-600 text-white">1</button>
              <button className="w-9 h-9 rounded-lg hover:bg-gray-100">2</button>
              <button className="w-9 h-9 rounded-lg hover:bg-gray-100">3</button>
              <button className="w-9 h-9 border rounded-lg flex items-center justify-center hover:bg-gray-100">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;