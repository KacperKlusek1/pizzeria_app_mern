import React from 'react';

const SubNavigation = ({ activeView, setActiveView, views }) => {
    return (
        <nav className="sub-nav">
            <div className="sub-nav-container">
                <div className="sub-nav-content">
                    {views.map(view => (
                        <button
                            key={view.key}
                            onClick={() => setActiveView(view.key)}
                            className={`sub-nav-btn ${activeView === view.key ? 'active' : ''}`}
                        >
                            {view.label}
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default SubNavigation;