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
  Avatar,
  Grid,
  Chip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { API_BASE_URL } from '../App';
import BannerForm from './forms/BannerForm';

function BannerList() {
  const [banners, setBanners] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null });

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/banners`);
      setBanners(response.data);
    } catch (error) {
      console.error('Error fetching banners:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/banners/${id}`);
      fetchBanners();
      setDeleteDialog({ open: false, id: null });
    } catch (error) {
      console.error('Error deleting banner:', error);
    }
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    setEditingBanner(null);
    fetchBanners();
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
              Marketing Banners
            </Typography>
            <Typography sx={{ color: '#6b7280' }}>
              Showcase your seasonal campaigns and feature hero visuals for the boutique.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => {
                setEditingBanner(null);
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
              Add Banner
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {showForm && (
        <Card sx={{ p: 3, mb: 4, borderRadius: 4, boxShadow: '0 18px 50px rgba(0,0,0,0.08)' }}>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
            {editingBanner ? 'Edit banner' : 'Create a new hero banner'}
          </Typography>
          <BannerForm banner={editingBanner} onSubmit={handleFormSubmit} />
          <Button
            variant="text"
            onClick={() => {
              setShowForm(false);
              setEditingBanner(null);
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
            Banner Gallery
          </Typography>
          <Typography sx={{ color: '#6b7280', fontSize: 14, mt: 1 }}>
            Keep hero visuals fresh and aligned with current fashion campaigns.
          </Typography>
        </Box>
        <TableContainer>
          <Table sx={{ minWidth: 650, backgroundColor: '#fff' }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5e9ef' }}>
                <TableCell sx={{ fontWeight: 700, color: '#4a2c3a' }}>Preview</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#4a2c3a' }}>Title</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#4a2c3a' }}>Status</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, color: '#4a2c3a' }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {banners.map((banner) => (
                <TableRow
                  key={banner.id}
                  sx={{
                    '&:hover': { backgroundColor: '#fff3f6' },
                    transition: 'background-color 0.2s',
                  }}
                >
                  <TableCell>
                    <Avatar
                      variant="rounded"
                      src={banner.image_url}
                      sx={{ width: 72, height: 72, borderRadius: 3 }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: '#333', fontWeight: 600 }}>{banner.title}</TableCell>
                  <TableCell>
                    <Chip
                      label={banner.is_active ? 'Active' : 'Inactive'}
                      color={banner.is_active ? 'success' : 'default'}
                      size="small"
                      sx={{ fontWeight: 700 }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => {
                        setEditingBanner(banner);
                        setShowForm(true);
                      }}
                      sx={{ color: '#8e44ad', textTransform: 'none' }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      startIcon={<DeleteIcon />}
                      onClick={() => setDeleteDialog({ open: true, id: banner.id })}
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
        <DialogTitle>Remove Banner</DialogTitle>
        <DialogContent>
          This banner will be deleted from the campaign lineup. Do you want to proceed?
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

export default BannerList;
