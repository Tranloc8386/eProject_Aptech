import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Chặn trang yêu cầu đăng nhập khách hàng
export const CustomerRoute = ({ children }) => {
    const { isLoggedIn, isCustomer } = useAuth();
    const location = useLocation();

    if (!isLoggedIn || !isCustomer) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
};

// Chặn trang yêu cầu đăng nhập admin
export const AdminRoute = ({ children }) => {
    const { isLoggedIn, isAdmin } = useAuth();

    if (!isLoggedIn || !isAdmin) {
        return <Navigate to="/admin/login" replace />;
    }
    return children;
};
