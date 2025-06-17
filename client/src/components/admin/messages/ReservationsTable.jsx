import React from 'react';
import LoadingSpinner from "../../LoadingSpinner.jsx";

const ReservationsTable = ({ reservations, onMarkAsRead, loading }) => {
    if (loading) return <LoadingSpinner/>;

    return (
        <div className="admin-messages-table">
            <div className="admin-messages-table-container">
                <table className="admin-messages-table-element">
                    <thead className="admin-messages-table-head">
                    <tr>
                        <th className="admin-messages-table-header">Imię i nazwisko</th>
                        <th className="admin-messages-table-header">Kontakt</th>
                        <th className="admin-messages-table-header">Data rezerwacji</th>
                        <th className="admin-messages-table-header">Godzina rozpoczęcia</th>
                        <th className="admin-messages-table-header">Godzina zakończenia</th>
                    </tr>
                    </thead>
                    <tbody className="admin-messages-table-body">
                    {reservations.map((reservation) => (
                        <tr
                            key={reservation._id}
                            className={`admin-messages-table-row ${reservation.isRead ? 'read' : 'unread'}`}
                            onClick={() => onMarkAsRead(reservation._id)}
                            style={{ cursor: 'pointer' }}
                        >
                            <td className="admin-messages-table-cell">{reservation.fullName}</td>
                            <td className="admin-messages-table-cell">{reservation.contactInfo}</td>
                            <td className="admin-messages-table-cell">
                                {new Date(reservation.reservationDate).toLocaleDateString()}
                            </td>
                            <td className="admin-messages-table-cell">{reservation.startTime}</td>
                            <td className="admin-messages-table-cell">{reservation.endTime}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReservationsTable;