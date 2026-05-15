import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Paper,
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Chip,
} from '@mui/material';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CategoryIcon from '@mui/icons-material/Category';
import PeopleIcon from '@mui/icons-material/People';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import axios from 'axios';
import { API_BASE_URL } from '../App';

const highlightCards = [
  {
    title: 'Total Sales',
    value: '$142,850',
    description: '12.5% increase vs last month',
    color: '#d81b60',
    icon: <ShoppingBagIcon sx={{ color: '#fff' }} />,
  },
  {
    title: 'Active Orders',
    value: '48',
    description: '36 processing, 12 in transit',
    color: '#9c27b0',
    icon: <CategoryIcon sx={{ color: '#fff' }} />,
  },
  {
    title: 'Top Selling',
    value: 'Silk Midi Gowns',
    description: '240 units sold',
    color: '#7b1fa2',
    icon: <StarBorderIcon sx={{ color: '#fff' }} />,
  },
];

const activityItems = [
  { title: 'Sophia Chen', subtitle: 'Added “Azure Silk Wrap” to wishlist', color: '#f48fb1' },
  { title: 'Private Fitting', subtitle: 'Isabella M. tomorrow at 2:00 PM', color: '#ce93d8' },
  { title: 'Order #8821', subtitle: 'Shipped to Beverly Hills, CA', color: '#e57373' },
  { title: 'New Review', subtitle: '“The fit is impeccable...” — Marcella', color: '#81d4fa' },
];

const chartData = [
  { name: 'Mon', sales: 2200, users: 1400 },
  { name: 'Tue', sales: 2800, users: 1700 },
  { name: 'Wed', sales: 2000, users: 1200 },
  { name: 'Thu', sales: 2900, users: 1900 },
  { name: 'Fri', sales: 3200, users: 2200 },
  { name: 'Sat', sales: 3600, users: 2500 },
  { name: 'Sun', sales: 3100, users: 2300 },
];

const COLORS = ['#c41e3a', '#ff6b6b', '#ffa500', '#4caf50', '#2196f3'];

function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    users: 0,
    orders: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [products, categories, users, orders] = await Promise.all([
        axios.get(`${API_BASE_URL}/products`),
        axios.get(`${API_BASE_URL}/categories`),
        axios.get(`${API_BASE_URL}/users`),
        axios.get(`${API_BASE_URL}/orders`),
      ]);

      setStats({
        products: products.data.length,
        categories: categories.data.length,
        users: users.data.length,
        orders: orders.data.length,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const categoryDistribution = [
    { name: 'Men', value: stats.products * 0.4 },
    { name: 'Women', value: stats.products * 0.35 },
    { name: 'Kids', value: stats.products * 0.15 },
    { name: 'Accessories', value: stats.products * 0.1 },
  ];

  return (
    <Box sx={{ pb: 4 }}>
      <Box sx={{ mb: 4, px: 2, py: 3, borderRadius: 4, backgroundColor: '#fff', boxShadow: '0 20px 60px rgba(0,0,0,0.06)' }}>
        <Typography variant="h3" sx={{ fontWeight: 900, color: '#2a2a2a', mb: 1 }}>
          Evening Editorial
        </Typography>
        <Typography sx={{ color: '#6b7280', maxWidth: 620, lineHeight: 1.8 }}>
          A curated overview of your boutique's performance and trending bridal and evening couture selections for the current season.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            {highlightCards.map((card) => (
              <Grid item xs={12} md={4} key={card.title}>
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    background: '#fff',
                    border: `1px solid ${card.color}22`,
                    boxShadow: '0 16px 40px rgba(196, 30, 58, 0.08)',
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                      <Typography sx={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9e3f65' }}>
                        {card.title}
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 800, mt: 1, color: '#1c1c1c' }}>
                        {card.value}
                      </Typography>
                    </Box>
                    <Avatar sx={{ bgcolor: card.color, width: 50, height: 50 }}>
                      {card.icon}
                    </Avatar>
                  </Box>
                  <Typography sx={{ color: '#6b7280', fontSize: 13 }}>
                    {card.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 4, backgroundColor: '#fff', boxShadow: '0 20px 60px rgba(0,0,0,0.06)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1c1c1c' }}>
                Client Activity
              </Typography>
              <Chip label="Live" color="secondary" size="small" />
            </Box>
            <List disablePadding>
              {activityItems.map((item) => (
                <Box key={item.title} sx={{ mb: 1.5 }}>
                  <ListItem sx={{ p: 0 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: item.color, width: 42, height: 42, fontSize: 14 }}>
                        {item.title.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.title}
                      secondary={item.subtitle}
                      primaryTypographyProps={{ fontWeight: 700, color: '#1c1c1c' }}
                      secondaryTypographyProps={{ color: 'text.secondary', fontSize: 13 }}
                    />
                  </ListItem>
                  <Divider sx={{ mt: 1 }} />
                </Box>
              ))}
            </List>
            <Button variant="contained" sx={{ mt: 2, backgroundColor: '#c41e3a', '&:hover': { backgroundColor: '#a01730' } }}>
              View all activity
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 0 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 4, backgroundColor: '#fff', boxShadow: '0 20px 60px rgba(0,0,0,0.06)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1c1c1c' }}>
                  Revenue Trajectory
                </Typography>
                <Typography sx={{ color: '#6b7280', fontSize: 14 }}>
                  Weekly sales performance across all channels
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button size="small" variant="contained" sx={{ backgroundColor: '#f8bbd0', color: '#8e224c', '&:hover': { backgroundColor: '#f48fb1' } }}>
                  Weekly
                </Button>
                <Button size="small" variant="text" sx={{ color: '#6b7280' }}>
                  Monthly
                </Button>
              </Box>
            </Box>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="4 4" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#9ca3af" tickLine={false} axisLine={false} />
                <YAxis stroke="#9ca3af" tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: 12,
                    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                  }}
                />
                <Bar dataKey="sales" fill="#c41e3a" radius={[12, 12, 0, 0]} barSize={20} />
                <Bar dataKey="users" fill="#7b1fa2" radius={[12, 12, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 4, backgroundColor: '#fff', boxShadow: '0 20px 60px rgba(0,0,0,0.06)' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#1c1c1c' }}>
              Sales Insights
            </Typography>
            <Box sx={{ display: 'grid', gap: 2 }}>
              <Box sx={{ p: 2, borderRadius: 3, backgroundColor: '#fdf4f6' }}>
                <Typography sx={{ fontWeight: 700, color: '#1c1c1c' }}>Inventory Capacity</Typography>
                <Typography sx={{ color: '#6b7280', fontSize: 13, mt: 1 }}>85% stocked across featured collections</Typography>
              </Box>
              <Box sx={{ p: 2, borderRadius: 3, backgroundColor: '#fff3e0' }}>
                <Typography sx={{ fontWeight: 700, color: '#1c1c1c' }}>Customer Growth</Typography>
                <Typography sx={{ color: '#6b7280', fontSize: 13, mt: 1 }}>Up 18% in returning shoppers</Typography>
              </Box>
              <Box sx={{ p: 2, borderRadius: 3, backgroundColor: '#e8f4fd' }}>
                <Typography sx={{ fontWeight: 700, color: '#1c1c1c' }}>Top Seller</Typography>
                <Typography sx={{ color: '#6b7280', fontSize: 13, mt: 1 }}>Luxe Satin Gown set</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
