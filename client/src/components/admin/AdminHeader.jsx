import React from 'react';

const AdminHeader = ({ title, subtitle }) => {
    return (
        <header className="page-header">
            <div className="header-container">
                <h1 className="header-title">{title}</h1>
                <p className="header-subtitle">{subtitle}</p>
            </div>
        </header>
    );
};

export default AdminHeader;