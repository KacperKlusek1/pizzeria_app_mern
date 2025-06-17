import React from 'react';

export default function SectionCard({ icon: Icon, title, description, type, onClick }) {
    return (
        <div
            onClick={onClick}
            className={`admin-dashboard-section-card admin-dashboard-section-card-${type}`}
            style={{ cursor: 'pointer' }}
        >
            <Icon className={`admin-dashboard-section-icon admin-dashboard-section-icon-${type}`} />
            <h3 className={`admin-dashboard-section-title admin-dashboard-section-title-${type}`}>
                {title}
            </h3>
            <p className={`admin-dashboard-section-description admin-dashboard-section-description-${type}`}>
                {description}
            </p>
        </div>
    );
}
