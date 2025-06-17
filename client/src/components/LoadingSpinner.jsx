import React from 'react';

const LoadingSpinner = () => {
    return (
        <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div className="spinner"></div>
            <p>Ładowanie...</p>
        </div>
    );
};

export default LoadingSpinner;