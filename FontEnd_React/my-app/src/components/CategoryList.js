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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Grid,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { API_BASE_URL } from '../App';
import CategoryForm from './forms/CategoryForm';

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null });

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/categories/${id}`);
      fetchCategories();
      setDeleteDialog({ open: false, id: null });
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Cannot delete category with products');
    }
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    setEditingCategory(null);
    fetchCategories();
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
              Style Collections
            </Typography>
            <Typography sx={{ color: '#6b7280' }}>
              Create and manage editorial categories for your fashion pieces.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => {
                setEditingCategory(null);
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
              Add Category
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {showForm && (
        <Card sx={{ p: 3, mb: 4, borderRadius: 4, boxShadow: '0 18px 50px rgba(0,0,0,0.08)' }}>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
            {editingCategory ? 'Edit category' : 'Add new collection'}
          </Typography>
          <CategoryForm category={editingCategory} onSubmit={handleFormSubmit} />
          <Button
            variant="text"
            onClick={() => {
              setShowForm(false);
              setEditingCategory(null);
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
            Category Overview
          </Typography>
          <Typography sx={{ color: '#6b7280', fontSize: 14, mt: 1 }}>
            Track every category and keep the collection structure refined.
          </Typography>
        </Box>
        <TableContainer>
          <Table sx={{ minWidth: 650, backgroundColor: '#fff' }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5e9ef' }}>
                <TableCell sx={{ fontWeight: 700, color: '#4a2c3a' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#4a2c3a' }}>Slug</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#4a2c3a' }}>Description</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, color: '#4a2c3a' }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow
                  key={category.id}
                  sx={{
                    '&:hover': { backgroundColor: '#fff3f6' },
                    transition: 'background-color 0.2s',
                  }}
                >
                  <TableCell sx={{ color: '#333', fontWeight: 600 }}>{category.name}</TableCell>
                  <TableCell>
                    <Chip label={category.slug} variant="outlined" size="small" sx={{ borderColor: '#e8a0c6', color: '#87375c' }} />
                  </TableCell>
                  <TableCell sx={{ maxWidth: 320, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#6b7280' }}>
                    {category.description}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => {
                        setEditingCategory(category);
                        setShowForm(true);
                      }}
                      sx={{ color: '#8e44ad', textTransform: 'none' }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      startIcon={<DeleteIcon />}
                      onClick={() => setDeleteDialog({ open: true, id: category.id })}
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
      </Paper>

      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, id: null })}>
        <DialogTitle>Delete Category</DialogTitle>
        <DialogContent>
          This will remove the collection category permanently. Continue?
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

export default CategoryList;
