import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Alert,
} from '@mui/material';
import axios from 'axios';
import { API_BASE_URL } from '../../App';

function BannerForm({ banner, onSubmit }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState(banner?.image_url || null);
  const [formData, setFormData] = useState({
    title: banner?.title || '',
    image: null,
    bg: banner?.bg || '',
    order: banner?.order || '',
    is_active: banner?.is_active || false
  });

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
      data.append('title', formData.title);
      data.append('bg', formData.bg);
      data.append('order', formData.order);
      data.append('is_active', formData.is_active ? 1 : 0);
      if (formData.image) {
        data.append('image', formData.image);
      }

      if (banner?.id) {
        await axios.put(`${API_BASE_URL}/banners/${banner.id}`, data);
      } else {
        await axios.post(`${API_BASE_URL}/banners`, data);
      }
      onSubmit();
    } catch (error) {
      console.error('Error submitting banner:', error);
      setError(error.response?.data?.message || 'Error submitting form');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        label="Banner Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
        fullWidth
        variant="outlined"
      />

      <TextField
        label="Background Color/Image"
        name="bg"
        value={formData.bg}
        onChange={handleChange}
        fullWidth
        variant="outlined"
      />

      <TextField
        label="Display Order"
        name="order"
        type="number"
        value={formData.order}
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
          Upload Banner Image
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
              alt="Banner Preview" 
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
            name="is_active"
            checked={formData.is_active}
            onChange={handleChange}
          />
        }
        label="Activate This Banner"
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
        {loading ? 'Saving...' : banner?.id ? 'Update Banner' : 'Create Banner'}
      </Button>
    </Box>
  );
}

export default BannerForm;
