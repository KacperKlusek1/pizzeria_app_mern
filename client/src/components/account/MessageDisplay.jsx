import React from 'react';

const MessageDisplay = ({ message, error }) => {
    return (
        <>
            {message && <p className="text-success">{message}</p>}
            {error && <p className="text-danger">{error}</p>}
        </>
    );
};

export default MessageDisplay;