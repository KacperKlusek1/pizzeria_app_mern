import React from 'react';
import { ChefHat, Users, MessageSquare } from 'lucide-react';
import StatCard from './StatCard.jsx';

export default function DashboardStats({ stats }) {
    const { notReadyOrdersCount, activeUsersCount, unreadMessagesCount } = stats;

    const statsData = [
        {
            icon: ChefHat,
            label: "Oczekujące zamówienia",
            value: notReadyOrdersCount,
            type: "kitchen"
        },
        {
            icon: Users,
            label: "Aktywni użytkownicy",
            value: activeUsersCount,
            type: "users"
        },
        {
            icon: MessageSquare,
            label: "Nowe wiadomości",
            value: unreadMessagesCount,
            type: "messages"
        }
    ];

    return (
        <div className="admin-dashboard-stats-grid">
            {statsData.map((stat, idx) => (
                <StatCard
                    key={idx}
                    icon={stat.icon}
                    label={stat.label}
                    value={stat.value}
                    type={stat.type}
                />
            ))}
        </div>
    );
}