import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  Typography,
  Chip,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { API_BASE_URL } from '../App';
import ProductForm from './forms/ProductForm';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching from:', `${API_BASE_URL}/products`);
      const response = await axios.get(`${API_BASE_URL}/products`);
      setProducts(response.data);
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || 'Failed to load products';
      console.error('Error fetching products:', error);
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/products/${id}`);
      fetchProducts();
      setDeleteDialog({ open: false, id: null });
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    setEditingProduct(null);
    fetchProducts();
  };

  return (
    <Box sx={{ pb: 4 }}>
      <Paper
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 4,
          backgroundColor: '#fff',
          boxShadow: '0 25px 50px rgba(196, 30, 58, 0.08)',
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h4" sx={{ fontWeight: 900, color: '#1c1c1c', mb: 1 }}>
              Boutique Inventory
            </Typography>
            <Typography sx={{ color: '#6b7280' }}>
              Curate premium product collections and update inventory details with a designer touch.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => {
                setEditingProduct(null);
                setShowForm(true);
              }}
              sx={{
                background: 'linear-gradient(135deg, #c41e3a 0%, #a01730 100%)',
                textTransform: 'none',
                fontWeight: 700,
                px: 4,
                py: 1.5,
              }}
            >
              Add Product
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {showForm && (
        <Card sx={{ p: 3, mb: 4, borderRadius: 4, boxShadow: '0 18px 50px rgba(0,0,0,0.08)' }}>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
            {editingProduct ? 'Edit product' : 'Create a new product'}
          </Typography>
          <ProductForm product={editingProduct} onSubmit={handleFormSubmit} />
          <Button
            variant="text"
            onClick={() => {
              setShowForm(false);
              setEditingProduct(null);
            }}
            sx={{ mt: 2, color: '#6b7280' }}
          >
            Cancel
          </Button>
        </Card>
      )}

      <Paper sx={{ borderRadius: 4, overflow: 'hidden', boxShadow: '0 18px 50px rgba(0,0,0,0.08)' }}>
        <Box sx={{ p: 3, backgroundColor: '#fbf3f6' }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#2a2a2a' }}>
            Product List
          </Typography>
          <Typography sx={{ color: '#6b7280', fontSize: 14, mt: 1 }}>
            Review inventory, pricing, and stock levels at a glance.
          </Typography>
        </Box>

        {loading && (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography sx={{ color: '#6b7280' }}>Loading products...</Typography>
          </Box>
        )}

        {error && (
          <Box sx={{ p: 3, backgroundColor: '#fee2e2', borderBottom: '1px solid #fecaca' }}>
            <Typography sx={{ color: '#991b1b', fontWeight: 600 }}>
              ❌ Error: {error}
            </Typography>
            <Typography sx={{ color: '#7f1d1d', fontSize: 13, mt: 1 }}>
              API URL: {API_BASE_URL}/products
            </Typography>
            <Button 
              onClick={fetchProducts}
              sx={{ mt: 2, color: '#991b1b' }}
            >
              Retry
            </Button>
          </Box>
        )}

        {!loading && !error && products.length === 0 && (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography sx={{ color: '#6b7280' }}>No products found. Create one to get started!</Typography>
          </Box>
        )}

        {!loading && !error && products.length > 0 && (
        <TableContainer>
          <Table sx={{ minWidth: 650, backgroundColor: '#fff' }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5e9ef' }}>
                <TableCell sx={{ fontWeight: 700, color: '#4a2c3a' }}>Image</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#4a2c3a' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#4a2c3a' }}>Category</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, color: '#4a2c3a' }}>
                  Price
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, color: '#4a2c3a' }}>
                  Stock
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#4a2c3a' }}>Status</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, color: '#4a2c3a' }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow
                  key={product.id}
                  sx={{
                    '&:hover': { backgroundColor: '#fff3f6' },
                    transition: 'background-color 0.2s',
                  }}
                >
                  <TableCell>
                    <Avatar
                      variant="rounded"
                      src={product.image_url}
                      sx={{ width: 56, height: 56, borderRadius: 2 }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: '#333', fontWeight: 600 }}>{product.name}</TableCell>
                  <TableCell>{product.category?.name || 'Uncategorized'}</TableCell>
                  <TableCell align="right" sx={{ color: '#c41e3a', fontWeight: 700 }}>
                    ${product.price}
                  </TableCell>
                  <TableCell align="right" sx={{ color: '#6b7280' }}>{product.stock_quantity}</TableCell>
                  <TableCell>
                    <Chip
                      label={product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
                      color={product.stock_quantity > 0 ? 'success' : 'error'}
                      size="small"
                      sx={{ fontWeight: 700 }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => {
                        setEditingProduct(product);
                        setShowForm(true);
                      }}
                      sx={{ color: '#8e44ad', textTransform: 'none' }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      startIcon={<DeleteIcon />}
                      onClick={() => setDeleteDialog({ open: true, id: product.id })}
                      sx={{ color: '#e74c3c', textTransform: 'none' }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        )}
      </Paper>

      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, id: null })}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to remove this product from the boutique inventory?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, id: null })} sx={{ color: '#6b7280' }}>
            Cancel
          </Button>
          <Button onClick={() => handleDelete(deleteDialog.id)} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ProductList;
