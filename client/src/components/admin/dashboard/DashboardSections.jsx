import React from 'react';
import { ChefHat, Users, MessageSquare } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import SectionCard from './SectionCard.jsx';

export default function DashboardSections() {
    const navigate = useNavigate();

    const dashboardSections = [
        {
            title: 'Kuchnia',
            description: 'Zarządzaj zamówieniami i menu',
            icon: ChefHat,
            type: 'kitchen',
            path: '/admin/kitchen'
        },
        {
            title: 'Użytkownicy',
            description: 'Zarządzaj kontami użytkowników',
            icon: Users,
            type: 'users',
            path: '/admin/users'
        },
        {
            title: 'Wiadomości',
            description: 'Przeglądaj rezerwacje i pozwy',
            icon: MessageSquare,
            type: 'messages',
            path: '/admin/msg'
        }
    ];

    const handleSectionClick = (path) => {
        navigate(path);
    };

    return (
        <div className="admin-dashboard-sections-grid">
            {dashboardSections.map(({ icon, title, description, type, path }, idx) => (
                <SectionCard
                    key={idx}
                    icon={icon}
                    title={title}
                    description={description}
                    type={type}
                    onClick={() => handleSectionClick(path)}
                />
            ))}
        </div>
    );
}