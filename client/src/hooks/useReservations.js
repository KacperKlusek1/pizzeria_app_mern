import { useState, useEffect } from 'react';
import { useAuthContext } from './useAuthContext.js';

export const useReservations = () => {
    const { user } = useAuthContext();
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReservations = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch('http://localhost:5000/api/reservations/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Błąd podczas pobierania rezerwacji');
                }

                const data = await response.json();

                // Sortowanie rezerwacji od najnowszej do najstarszej
                const sortedReservations = (data.data || []).sort((a, b) => {
                    return new Date(b.reservationDate) - new Date(a.reservationDate);
                });

                setReservations(sortedReservations);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (user?.token) {
            fetchReservations();
        }
    }, [user?.token]);

    const markReservationAsRead = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/api/messages/reservations/${id}/read`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) throw new Error('Nie udało się oznaczyć rezerwacji jako przeczytaną');

            setReservations((prev) =>
                prev.map((item) => (item._id === id ? { ...item, isRead: true } : item))
            );
        } catch (err) {
            alert(err.message);
        }
    };

    return {
        reservations,
        loading,
        error,
        markReservationAsRead
    };
};
