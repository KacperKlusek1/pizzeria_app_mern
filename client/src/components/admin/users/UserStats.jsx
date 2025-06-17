import React from 'react';
import { Users, Check, Ban } from 'lucide-react';

const UserStats = ({ users }) => {
    const allUsersCount = users.length;
    const activeUsersCount = users.filter(u => u.status !== 0).length;
    const blockedUsersCount = users.filter(u => u.status === 0).length;

    return (
        <div className="admin-users-stats-grid">
            <div className="admin-users-stat-card">
                <div className="admin-users-stat-content">
                    <div className="admin-users-stat-icon">
                        <Users className="admin-users-icon admin-users-icon-blue" />
                    </div>
                    <div className="admin-users-stat-text">
                        <p className="admin-users-stat-label">Wszyscy użytkownicy</p>
                        <p className="admin-users-stat-value">{allUsersCount}</p>
                    </div>
                </div>
            </div>

            <div className="admin-users-stat-card">
                <div className="admin-users-stat-content">
                    <div className="admin-users-stat-icon">
                        <Check className="admin-users-icon admin-users-icon-green" />
                    </div>
                    <div className="admin-users-stat-text">
                        <p className="admin-users-stat-label">Aktywni użytkownicy</p>
                        <p className="admin-users-stat-value">{activeUsersCount}</p>
                    </div>
                </div>
            </div>

            <div className="admin-users-stat-card">
                <div className="admin-users-stat-content">
                    <div className="admin-users-stat-icon">
                        <Ban className="admin-users-icon admin-users-icon-red" />
                    </div>
                    <div className="admin-users-stat-text">
                        <p className="admin-users-stat-label">Zablokowani użytkownicy</p>
                        <p className="admin-users-stat-value">{blockedUsersCount}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserStats;