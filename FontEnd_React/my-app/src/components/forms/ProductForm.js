import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
} from '@mui/material';
import axios from 'axios';
import { API_BASE_URL } from '../../App';

function ProductForm({ product, onSubmit }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState(product?.image_url || null);
  const [formData, setFormData] = useState({
    name: product?.name || '',
    category_id: product?.category_id || '',
    price: product?.price || '',
    stock_quantity: product?.stock_quantity || '',
    material: product?.material || '',
    image: null,
    is_featured: product?.is_featured || false
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (type === 'file') {
      const file = files[0];
      setFormData({ ...formData, [name]: file });
      // Create preview
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => setPreviewUrl(e.target.result);
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('category_id', formData.category_id);
      data.append('price', formData.price);
      data.append('stock_quantity', formData.stock_quantity);
      data.append('material', formData.material);
      data.append('is_featured', formData.is_featured ? 1 : 0);
      if (formData.image) {
        data.append('image', formData.image);
      }

      if (product?.id) {
        await axios.put(`${API_BASE_URL}/products/${product.id}`, data);
      } else {
        await axios.post(`${API_BASE_URL}/products`, data);
      }
      onSubmit();
    } catch (error) {
      console.error('Error submitting product:', error);
      setError(error.response?.data?.message || 'Error submitting form');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        label="Product Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        fullWidth
        variant="outlined"
      />

      <FormControl fullWidth required>
        <InputLabel>Category</InputLabel>
        <Select
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
          label="Category"
        >
          <MenuItem value="">Select Category</MenuItem>
          {categories.map(cat => (
            <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
        <TextField
          label="Price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          inputProps={{ step: '0.01' }}
          required
          variant="outlined"
        />
        <TextField
          label="Stock Quantity"
          name="stock_quantity"
          type="number"
          value={formData.stock_quantity}
          onChange={handleChange}
          required
          variant="outlined"
        />
      </Box>

      <TextField
        label="Material"
        name="material"
        value={formData.material}
        onChange={handleChange}
        fullWidth
        variant="outlined"
      />

      <Box>
        <Button
          variant="outlined"
          component="label"
          fullWidth
          sx={{ py: 1 }}
        >
          Upload Image
          <input
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
            hidden
          />
        </Button>
        {previewUrl && (
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <img 
              src={previewUrl} 
              alt="Preview" 
              style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px' }}
            />
            {formData.image && (
              <Box sx={{ mt: 1, color: '#4caf50', fontSize: 12 }}>
                ✓ {formData.image.name}
              </Box>
            )}
          </Box>
        )}
      </Box>

      <FormControlLabel
        control={
          <Checkbox
            name="is_featured"
            checked={formData.is_featured}
            onChange={handleChange}
          />
        }
        label="Mark as Featured Product"
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
        {loading ? 'Saving...' : product?.id ? 'Update Product' : 'Create Product'}
      </Button>
    </Box>
  );
}

export default ProductForm;
