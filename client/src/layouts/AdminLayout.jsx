import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import AdminNavbar from "../components/admin/AdminNavbar.jsx";
import '../admin.css';
import { useAuthContext } from "../hooks/useAuthContext.js";
import AdminFooter from "../components/admin/AdminFooter.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

const AdminLayout = () => {
    const { user, loading } = useAuthContext();

    if (loading) {
        return <LoadingSpinner/>;
    }

    if (!user || user.status !== 2) {
        return <Navigate to="/" />;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <AdminNavbar />
            <div className="admin-dashboard-container">
                <Outlet />
                <AdminFooter/>
            </div>
        </div>
    );
};

export default AdminLayout;
