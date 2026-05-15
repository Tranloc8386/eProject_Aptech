import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Alert,
} from '@mui/material';
import axios from 'axios';
import { API_BASE_URL } from '../../App';

function CategoryForm({ category, onSubmit }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: category?.name || '',
    description: category?.description || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (category?.id) {
        await axios.put(`${API_BASE_URL}/categories/${category.id}`, formData);
      } else {
        await axios.post(`${API_BASE_URL}/categories`, formData);
      }
      onSubmit();
    } catch (error) {
      console.error('Error submitting category:', error);
      setError(error.response?.data?.message || 'Error submitting form');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        label="Category Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        fullWidth
        variant="outlined"
      />

      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        variant="outlined"
        multiline
        rows={4}
      />

      <Button
        type="submit"
        variant="contained"
        disabled={loading}
        sx={{
          background: 'linear-gradient(135deg, #c41e3a 0%, #a01730 100%)',
          py: 1.5,
        }}
      >
        {loading ? 'Saving...' : category?.id ? 'Update Category' : 'Create Category'}
      </Button>
    </Box>
  );
}

export default CategoryForm;
