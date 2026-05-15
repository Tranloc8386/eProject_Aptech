import React, { useEffect, useState } from "react";
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Avatar,
  Paper,
  InputBase,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CategoryIcon from "@mui/icons-material/Category";
import ImageIcon from "@mui/icons-material/Image";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";

import Dashboard from "./components/Dashboard";
import BannerList from "./components/BannerList";
import ProductList from "./components/ProductList";
import CategoryList from "./components/CategoryList";
import UserList from "./components/UserList";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import HomePage from "./components/user/homePage";

const API_BASE_URL = "http://localhost:8000/api";

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [authMode, setAuthMode] = useState("login");
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("authUser");
    return stored ? JSON.parse(stored) : null;
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem("authUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("authUser");
    }
  }, [user]);

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentPage(userData.role === "admin" ? "dashboard" : "home");
    setAuthMode("login");
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage("dashboard");
    setAuthMode("login");
  };

  const switchToRegister = () => setAuthMode("register");
  const switchToLogin = () => setAuthMode("login");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { id: "dashboard", label: "Collections", icon: DashboardIcon },
    { id: "products", label: "Inventory", icon: ShoppingBagIcon },
    { id: "categories", label: "Categories", icon: CategoryIcon },
    { id: "banners", label: "Style Profiles", icon: ImageIcon },
    { id: "users", label: "Customers", icon: PeopleIcon },
  ];

  const handleMenuClick = (id) => {
    setCurrentPage(id);
    setMobileOpen(false);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "banners":
        return <BannerList />;
      case "products":
        return <ProductList />;
      case "categories":
        return <CategoryList />;
      case "users":
        return <UserList />;
      default:
        return <Dashboard />;
    }
  };

  if (!user) {
    return authMode === "login" ? (
      <Login
        onLoginSuccess={handleLogin}
        onSwitchToRegister={switchToRegister}
      />
    ) : (
      <Register
        onRegisterSuccess={handleLogin}
        onSwitchToLogin={switchToLogin}
      />
    );
  }

  if (user.role === "user") {
    return <HomePage onLogout={handleLogout} />;
  }

  const drawerContent = (
    <Box
      sx={{
        width: 280,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box
        sx={{
          p: 3,
          mb: 2,
          borderRadius: 3,
          backgroundColor: "#fff",
          boxShadow: "0 16px 50px rgba(196, 30, 58, 0.08)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
          <Box
            sx={{
              width: 46,
              height: 46,
              borderRadius: 3,
              backgroundColor: "#c41e3a",
              display: "grid",
              placeItems: "center",
            }}
          >
            <ShoppingBagIcon sx={{ color: "#fff" }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: "#1c1c1c" }}>
              La Robe Boutique
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Editorial Dashboard
            </Typography>
          </Box>
        </Box>
      </Box>

      <List sx={{ px: 1 }}>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.id}
            onClick={() => handleMenuClick(item.id)}
            selected={currentPage === item.id}
            sx={{
              mb: 1,
              borderRadius: 3,
              backgroundColor:
                currentPage === item.id
                  ? "rgba(196, 30, 58, 0.12)"
                  : "transparent",
              color: currentPage === item.id ? "#c41e3a" : "#4a4a4a",
              "&:hover": {
                backgroundColor: "rgba(196, 30, 58, 0.08)",
              },
              transition: "all 0.3s ease",
            }}
          >
            <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
              <item.icon />
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>

      <Box sx={{ mt: "auto", px: 3, py: 4 }}>
        <Box
          sx={{
            p: 2,
            borderRadius: 3,
            backgroundColor: "#fdf4f6",
            boxShadow: "0 10px 30px rgba(196, 30, 58, 0.08)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar sx={{ bgcolor: "#c41e3a" }}>E</Avatar>
            <Box>
              <Typography sx={{ fontWeight: 700, color: "#1c1c1c" }}>
                Elena Rossi
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Creative Director
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f4f1f6" }}
    >
      <CssBaseline />

      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          zIndex: 1200,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton
              color="inherit"
              onClick={handleDrawerToggle}
              sx={{ display: { xs: "block", sm: "none" }, color: "#333" }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ color: "#1c1c1c", fontWeight: 800 }}>
              Boutique Management
            </Typography>
          </Box>

          <Paper
            component="form"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              px: 2,
              py: 0.8,
              flex: 1,
              maxWidth: 520,
              backgroundColor: "#fff",
              boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
            }}
          >
            <SearchIcon color="action" />
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search boutique inventory..."
              inputProps={{ "aria-label": "search boutique inventory" }}
            />
          </Paper>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {user && (
              <Typography
                sx={{ color: "#4a4a4a", fontSize: 14, fontWeight: 600 }}
              >
                {user.name} • {user.role === "admin" ? "Admin" : "Khách"}
              </Typography>
            )}
            <IconButton sx={{ color: "#4a4a4a" }}>
              <NotificationsNoneIcon />
            </IconButton>
            <IconButton sx={{ color: "#4a4a4a" }}>
              <SettingsIcon />
            </IconButton>
            {user && user.role === "admin" && (
              <IconButton sx={{ color: "#4a4a4a" }} onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          width: 280,
          "& .MuiDrawer-paper": {
            width: 280,
            mt: 9,
            backgroundColor: "#f8f4f7",
            borderRight: "1px solid rgba(0,0,0,0.08)",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            width: 280,
            backgroundColor: "#fff",
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Menu
          </Typography>
          <IconButton onClick={handleDrawerToggle}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        {drawerContent}
      </Drawer>

      <Box
        sx={{
          flexGrow: 1,
          mt: 10,
          ml: { xs: 0, sm: "280px" },
          p: { xs: 2, sm: 3, md: 4 },
          transition: "all 0.3s ease",
        }}
      >
        {renderPage()}
      </Box>
    </Box>
  );
}

export default App;
export { API_BASE_URL };
