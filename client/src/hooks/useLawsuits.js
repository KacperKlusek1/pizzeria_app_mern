import { useState, useEffect } from 'react';
import { useAuthContext } from './useAuthContext.js';

export const useLawsuits = () => {
    const { user } = useAuthContext();
    const [lawsuits, setLawsuits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLawsuits = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch('http://localhost:5000/api/lawsuits/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Błąd podczas pobierania pozwów');
                }

                const data = await response.json();

                // Sortowanie pozwów od najnowszego do najstarszego
                const sortedLawsuits = (data || []).sort((a, b) => {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                });

                setLawsuits(sortedLawsuits);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (user?.token) {
            fetchLawsuits();
        }
    }, [user?.token]);

    const markLawsuitAsRead = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/api/messages/lawsuits/${id}/read`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) throw new Error('Nie udało się oznaczyć pozwu jako przeczytanego');

            setLawsuits((prev) =>
                prev.map((item) => (item._id === id ? { ...item, isRead: true } : item))
            );
        } catch (err) {
            alert(err.message);
        }
    };

    return {
        lawsuits,
        loading,
        error,
        markLawsuitAsRead
    };
};