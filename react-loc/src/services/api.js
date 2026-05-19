import axios from 'axios';

// Cấu hình base URL cho Laravel API
const API_BASE_URL = 'http://127.0.0.1:8000/api';

// Tạo axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// API endpoints
export const apiEndpoints = {
  // Products
  products: {
    getAll: () => api.get('/products'),
    getById: (id) => api.get(`/products/${id}`),
    create: (data) => api.post('/products', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
    update: (id, data) => api.post(`/products/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-HTTP-Method-Override': 'PUT'
      },
    }),
    delete: (id) => api.delete(`/products/${id}`),
  },
  
  // Categories
  categories: {
    getAll: () => api.get('/categories'),
    getById: (id) => api.get(`/categories/${id}`),
    create: (data) => api.post('/categories', data),
    update: (id, data) => api.put(`/categories/${id}`, data),
    delete: (id) => api.delete(`/categories/${id}`),
  },
  
  // Admins
  users: {
    getAll: () => api.get('/admins'),
    getById: (id) => api.get(`/admins/${id}`),
    create: (data) => api.post('/admins', data),
    update: (id, data) => api.put(`/admins/${id}`, data),
    delete: (id) => api.delete(`/admins/${id}`),
  },
  
  // Customers
  customers: {
    getAll: () => api.get('/customers'),
    getById: (id) => api.get(`/customers/${id}`),
    create: (data) => api.post('/customers', data),
    update: (id, data) => api.put(`/customers/${id}`, data),
    delete: (id) => api.delete(`/customers/${id}`),
  },

  // Orders
  orders: {
    getAll: () => api.get('/orders'),
    getById: (id) => api.get(`/orders/${id}`),
    create: (data) => api.post('/orders', data),
    update: (id, data) => api.put(`/orders/${id}`, data),
    delete: (id) => api.delete(`/orders/${id}`),
  },
  
  // Banners
  banners: {
    getAll: () => api.get('/banners'),
    getById: (id) => api.get(`/banners/${id}`),
    create: (data) => api.post('/banners', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
    update: (id, data) => api.post(`/banners/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-HTTP-Method-Override': 'PUT'
      },
    }),
    delete: (id) => api.delete(`/banners/${id}`),
  },
  
  // Feedbacks
  feedbacks: {
    getAll: () => api.get('/feedbacks'),
    getById: (id) => api.get(`/feedbacks/${id}`),
    create: (data) => api.post('/feedbacks', data),
    reply: (id, data) => api.post(`/feedbacks/${id}/reply`, data),
    delete: (id) => api.delete(`/feedbacks/${id}`),
  },
};

// Interceptor để xử lý response
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    
    // Trả về error với thông tin chi tiết
    if (error.response?.data?.message) {
      error.message = error.response.data.message;
    }
    
    return Promise.reject(error);
  }
);

export default api;