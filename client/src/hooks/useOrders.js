import { useState, useEffect } from 'react';
import { useAuthContext } from './useAuthContext';

export const useOrders = () => {
    const { user } = useAuthContext();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Custom sorting function
    const sortOrders = (ordersArray) => {
        return [...ordersArray].sort((a, b) => {
            // First, separate by status - ready orders go last
            const aIsReady = a.status === 'ready';
            const bIsReady = b.status === 'ready';

            if (aIsReady && !bIsReady) return 1;  // a goes after b
            if (!aIsReady && bIsReady) return -1; // a goes before b

            // If both have same status priority, sort by date (oldest first)
            const aDate = new Date(a.createdAt || a.orderDate || a.date);
            const bDate = new Date(b.createdAt || b.orderDate || b.date);

            return aDate - bDate; // Ascending order (oldest first)
        });
    };

    const fetchOrders = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('http://localhost:5000/api/orders/', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });

            if (!res.ok) {
                throw new Error('Błąd podczas pobierania zamówień');
            }

            const data = await res.json();
            const sortedOrders = sortOrders(data);
            setOrders(sortedOrders);
        } catch (error) {
            console.error('Błąd podczas pobierania zamówień:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const changeOrderStatus = async (orderId, currentStatus) => {
        const nextStatus = {
            waiting: 'prepared',
            prepared: 'ready',
            ready: 'ready',
        }[currentStatus];

        try {
            const res = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ status: nextStatus })
            });

            if (!res.ok) {
                throw new Error('Błąd podczas aktualizacji statusu');
            }

            const updatedOrder = await res.json();
            setOrders(prevOrders => {
                const updatedOrders = prevOrders.map(order =>
                    order._id === updatedOrder._id ? updatedOrder : order
                );
                // Re-sort after status change
                return sortOrders(updatedOrders);
            });
            return true;
        } catch (error) {
            console.error('Błąd przy zmianie statusu:', error);
            setError('Nie udało się zaktualizować statusu zamówienia.');
            return false;
        }
    };

    useEffect(() => {
        if (user?.token) {
            fetchOrders();
        }
    }, [user?.token]);

    return {
        orders,
        loading,
        error,
        changeOrderStatus,
        refetchOrders: fetchOrders
    };
};