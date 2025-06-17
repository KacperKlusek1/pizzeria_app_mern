import React from 'react';

const TitleCard = ({ icon: Icon, title }) => {
    return (
        <nav className="admin-messages-nav">
            <div className="admin-messages-nav-container">
                <div className="admin-messages-nav-content">
                    <div className="admin-messages-nav-items">
                        <div className="admin-messages-nav-title">
                            <Icon className="admin-messages-nav-icon"/>
                            <h1 className="admin-messages-nav-title-text">{title}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default TitleCard;