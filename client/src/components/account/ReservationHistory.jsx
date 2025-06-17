import React from 'react';

const ReservationHistory = ({ reservations }) => {
    return (
        <div id="reservationsContainer">
            <h4>Twoje rezerwacje</h4>
            {reservations.length === 0 ? (
                <p>Brak rezerwacji.</p>
            ) : (
                <table className="table table-sm table-bordered">
                    <thead>
                    <tr>
                        <th>Data</th>
                        <th>Godzina</th>
                        <th>Liczba osób</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {reservations.map((res) => (
                        <tr key={res._id}>
                            <td>{new Date(res.date).toLocaleDateString()}</td>
                            <td>{res.time}</td>
                            <td>{res.people}</td>
                            <td>{res.status}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ReservationHistory;