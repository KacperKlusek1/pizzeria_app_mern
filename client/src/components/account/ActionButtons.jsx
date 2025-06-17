import React from 'react';

const ActionButtons = ({
                           isAdmin,
                           showOrderHistory,
                           setShowOrderHistory,
                           showReservations,
                           setShowReservations,
                           logout
                       }) => {
    return (
        <div className="form-group mt-4">
            {isAdmin && (
                <button
                    id="adminPanelButton"
                    className="btn btn-warning mb-2"
                    onClick={() => (window.location.href = "/admin")}
                >
                    Panel Zarządzania
                </button>
            )}

            <div>
                <button
                    id="toggleOrderHistoryButton"
                    className="btn btn-info me-2"
                    onClick={() => {
                        setShowOrderHistory(!showOrderHistory);
                        setShowReservations(false);
                    }}
                >
                    Wyświetl Historię Zamówień
                </button>

                <button
                    id="toggleReservationsButton"
                    className="btn btn-secondary me-2"
                    onClick={() => {
                        setShowReservations(!showReservations);
                        setShowOrderHistory(false);
                    }}
                >
                    Wyświetl Swoje Rezerwacje
                </button>

                <button
                    className="btn btn-danger"
                    onClick={logout}
                >
                    Wyloguj
                </button>
            </div>
        </div>
    );
};

export default ActionButtons;