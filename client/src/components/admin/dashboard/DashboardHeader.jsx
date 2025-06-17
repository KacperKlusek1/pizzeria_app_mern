import React from 'react';
const DashboardHeader = ({ firstname }) => (
    <header className="admin-dashboard-header">
        <div className="admin-dashboard-header-content">
            <h1 className="admin-dashboard-page-title">Panel Zarządzania</h1>
            <p className="admin-dashboard-page-subtitle">
                Witaj, {firstname}! Wybierz sekcję aby rozpocząć zarządzanie.
            </p>
        </div>
    </header>
);

export default DashboardHeader;
