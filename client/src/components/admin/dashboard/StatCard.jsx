import React from 'react';

export default function StatCard({ icon: Icon, label, value, type }) {
    return (
        <div className={`admin-dashboard-stat-card admin-dashboard-stat-card-${type}`}>
            <div className="admin-dashboard-stat-content">
                <div>
                    <Icon className={`admin-dashboard-stat-icon admin-dashboard-stat-icon-${type}`} />
                </div>
                <div className="admin-dashboard-stat-text">
                    <p className="admin-dashboard-stat-label">{label}</p>
                    <p className="admin-dashboard-stat-value">{value !== null ? value : 'Ładuję...'}</p>
                </div>
            </div>
        </div>
    );
}