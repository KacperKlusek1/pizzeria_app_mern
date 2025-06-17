import React from 'react';

const ErrorMessage = ({ message, onRetry }) => {
    return (
        <div className="error-message">
            <p>Błąd: {message}</p>
            {onRetry && (
                <button onClick={onRetry} className="btn btn-secondary">
                    Spróbuj ponownie
                </button>
            )}
        </div>
    );
};

export default ErrorMessage;