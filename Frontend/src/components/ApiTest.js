import React, { useState, useEffect } from 'react';
import { apiEndpoints } from '../services/api';

const ApiTest = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Test kết nối API
  const testConnection = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Testing API connection...');
      
      // Test lấy products
      const productsResponse = await apiEndpoints.products.getAll();
      setProducts(productsResponse.data.data || productsResponse.data);
      console.log('Products:', productsResponse.data);
      
      // Test lấy categories
      const categoriesResponse = await apiEndpoints.categories.getAll();
      setCategories(categoriesResponse.data.data || categoriesResponse.data);
      console.log('Categories:', categoriesResponse.data);
      
    } catch (err) {
      setError(err.message);
      console.error('API Test Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    testConnection();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">API Connection Test</h1>
      
      <div className="mb-4">
        <button 
          onClick={testConnection}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test API Connection'}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Products */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-3">Products ({products.length})</h2>
          <div className="max-h-60 overflow-y-auto">
            {products.length > 0 ? (
              products.map((product, index) => (
                <div key={product.id || index} className="border-b py-2">
                  <p className="font-medium">{product.name || 'No name'}</p>
                  <p className="text-sm text-gray-600">{product.description || 'No description'}</p>
                  <p className="text-sm text-green-600">${product.price || 'No price'}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No products found</p>
            )}
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-3">Categories ({categories.length})</h2>
          <div className="max-h-60 overflow-y-auto">
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <div key={category.id || index} className="border-b py-2">
                  <p className="font-medium">{category.name || 'No name'}</p>
                  <p className="text-sm text-gray-600">{category.description || 'No description'}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No categories found</p>
            )}
          </div>
        </div>
      </div>

      {/* API Status */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold mb-2">API Status:</h3>
        <p>Backend URL: http://127.0.0.1:8000/api</p>
        <p>Status: {loading ? 'Testing...' : error ? 'Error' : 'Connected'}</p>
      </div>
    </div>
  );
};

export default ApiTest;