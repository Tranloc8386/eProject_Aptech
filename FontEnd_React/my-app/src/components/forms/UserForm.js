import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
} from '@mui/material';
import axios from 'axios';
import { API_BASE_URL } from '../../App';

function UserForm({ user, onSubmit }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    role: user?.role || 'user'
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
      const data = {
        name: formData.name,
        email: formData.email,
        role: formData.role
      };
      if (formData.password) {
        data.password = formData.password;
      }

      if (user?.id) {
        await axios.put(`${API_BASE_URL}/users/${user.id}`, data);
      } else {
        await axios.post(`${API_BASE_URL}/users`, {
          ...data,
          password: formData.password || 'Password123'
        });
      }
      onSubmit();
    } catch (error) {
      console.error('Error submitting user:', error);
      setError(error.response?.data?.message || 'Error submitting form');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        label="Full Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        fullWidth
        variant="outlined"
      />

      <TextField
        label="Email Address"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
        fullWidth
        variant="outlined"
      />

      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        fullWidth
        variant="outlined"
        helperText={user?.id ? 'Leave blank to keep current password' : ''}
        required={!user?.id}
      />

      <FormControl fullWidth required>
        <InputLabel>Role</InputLabel>
        <Select
          name="role"
          value={formData.role}
          onChange={handleChange}
          label="Role"
        >
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </Select>
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        disabled={loading}
        sx={{
          background: 'linear-gradient(135deg, #c41e3a 0%, #a01730 100%)',
          py: 1.5,
        }}
      >
        {loading ? 'Saving...' : user?.id ? 'Update User' : 'Create User'}
      </Button>
    </Box>
  );
}

export default UserForm;
