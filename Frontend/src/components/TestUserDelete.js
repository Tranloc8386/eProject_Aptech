import React, { useState, useEffect } from 'react';
import { apiEndpoints } from '../services/api';

const TestUserDelete = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await apiEndpoints.users.getAll();
      setUsers(response.data.data || response.data || []);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const testDelete = async (userId) => {
    try {
      setError(null);
      setSuccess(null);
      
      console.log('Attempting to delete user ID:', userId);
      
      const response = await apiEndpoints.users.delete(userId);
      
      console.log('Delete response:', response.data);
      
      setSuccess(`User ${userId} deleted successfully!`);
      await fetchUsers(); // Refresh list
      
    } catch (err) {
      console.error('Delete error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      const errorMessage = err.response?.data?.message || 
                          err.response?.statusText || 
                          err.message || 
                          'Unknown error';
      
      setError(`Error deleting user ${userId}: ${errorMessage}`);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Test User Delete</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.role}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => testDelete(user.id)}
                    className="text-red-600 hover:text-red-900 bg-red-100 hover:bg-red-200 px-3 py-1 rounded"
                  >
                    Test Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold mb-2">Debug Info:</h3>
        <p className="text-sm text-gray-600">
          API Base URL: http://127.0.0.1:8000/api<br/>
          Total Users: {users.length}<br/>
          Check browser console for detailed error logs
        </p>
      </div>
    </div>
  );
};

export default TestUserDelete;