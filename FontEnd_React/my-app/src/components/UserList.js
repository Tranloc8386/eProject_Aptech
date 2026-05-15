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
  Avatar,
  Grid,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { API_BASE_URL } from '../App';
import UserForm from './forms/UserForm';

function UserList() {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/users/${id}`);
      fetchUsers();
      setDeleteDialog({ open: false, id: null });
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    setEditingUser(null);
    fetchUsers();
  };

  const getAvatarColor = (role) => {
    return role === 'admin' ? '#c41e3a' : '#7b1fa2';
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
              Boutique Team
            </Typography>
            <Typography sx={{ color: '#6b7280' }}>
              Manage your boutique staff and customer accounts with premium control.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => {
                setEditingUser(null);
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
              Add User
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {showForm && (
        <Card sx={{ p: 3, mb: 4, borderRadius: 4, boxShadow: '0 18px 50px rgba(0,0,0,0.08)' }}>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
            {editingUser ? 'Edit user profile' : 'Create a new user'}
          </Typography>
          <UserForm user={editingUser} onSubmit={handleFormSubmit} />
          <Button
            variant="text"
            onClick={() => {
              setShowForm(false);
              setEditingUser(null);
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
            Account Directory
          </Typography>
          <Typography sx={{ color: '#6b7280', fontSize: 14, mt: 1 }}>
            Review and update your boutique team and customer accounts effortlessly.
          </Typography>
        </Box>
        <TableContainer>
          <Table sx={{ minWidth: 650, backgroundColor: '#fff' }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5e9ef' }}>
                <TableCell sx={{ fontWeight: 700, color: '#4a2c3a' }}>User</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#4a2c3a' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#4a2c3a' }}>Role</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, color: '#4a2c3a' }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{
                    '&:hover': { backgroundColor: '#fff3f6' },
                    transition: 'background-color 0.2s',
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: getAvatarColor(user.role) }}>
                        {user.name.charAt(0).toUpperCase()}
                      </Avatar>
                      <Typography sx={{ fontWeight: 600, color: '#333' }}>{user.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ color: '#6b7280' }}>{user.email}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.role}
                      color={user.role === 'admin' ? 'error' : 'primary'}
                      size="small"
                      variant="outlined"
                      sx={{ fontWeight: 700 }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => {
                        setEditingUser(user);
                        setShowForm(true);
                      }}
                      sx={{ color: '#8e44ad', textTransform: 'none' }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      startIcon={<DeleteIcon />}
                      onClick={() => setDeleteDialog({ open: true, id: user.id })}
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
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          Remove this account from the boutique roster? This action cannot be undone.
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

export default UserList;
