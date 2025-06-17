import React from 'react';
import {useAuthContext} from "../hooks/useAuthContext.js";
import {useUserData} from "../hooks/useUserData.js";
import {useDashboardStats} from "../hooks/useDashboardStats.js";
import DashboardHeader from "../components/admin/dashboard/DashboardHeader.jsx";
import DashboardSections from "../components/admin/dashboard/DashboardSections.jsx";
import DashboardStats from "../components/admin/dashboard/DashboardStats.jsx";
import {Helmet} from "react-helmet-async";

const AdminDashboard = () => {
    const { user } = useAuthContext();
    const firstname = useUserData(user).fullname.split(' ')[0];
    const stats = useDashboardStats(user);

    return (
        <>
            <Helmet>
                <title>PANEL ADMINISTRATORSKI</title>
                <meta name="description"
                      content="GŁÓWNE MENU ZARZĄDZANIA."/>
            </Helmet>
            <DashboardHeader firstname={firstname} />
            <main className="admin-dashboard-main">
                <DashboardSections />
                <DashboardStats stats={stats} />
            </main>
        </>
    );
};

export default AdminDashboard;