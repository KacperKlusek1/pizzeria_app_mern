import { useState, useEffect } from 'react';

export const useOrdersAndReservations = (user) => {
    const [orders, setOrders] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [showOrderHistory, setShowOrderHistory] = useState(false);
    const [showReservations, setShowReservations] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const userId = user.id || user._id;
                const res = await fetch(`http://localhost:5000/api/orders/${userId}`, {
                    headers: {
                        "Authorization": `Bearer ${user.token}`
                    }
                });
                if (!res.ok) {
                    if (res.status === 404) {
                        setOrders([]);
                        return;
                    }
                    throw new Error("Nie udało się pobrać zamówień.");
                }
                const data = await res.json();
                setOrders(data);
            } catch (err) {
                console.error(err);
                setOrders([]);
            }
        };

        if (showOrderHistory  && (user?.id || user?._id) && user?.token) {
            fetchOrders();
        }
    }, [showOrderHistory, user?.id, user?._id, user?.token]);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const userId = user.id || user._id;
                const res = await fetch(`http://localhost:5000/api/reservations/${userId}`, {
                    headers: {
                        "Authorization": `Bearer ${user.token}`
                    }
                });
                if (!res.ok) {
                    if (res.status === 404) {
                        setReservations([]);
                        return;
                    }
                    throw new Error("Nie udało się pobrać rezerwacji.");
                }
                const data = await res.json();
                setReservations(data);
            } catch (err) {
                console.error(err);
                setReservations([]);
            }
        };

        if (showReservations && (user?.id || user?._id) && user?.token) {
            fetchReservations();
        }
    }, [showReservations, user?.id, user?._id, user?.token]);

    return {
        orders,
        reservations,
        showOrderHistory,
        setShowOrderHistory,
        showReservations,
        setShowReservations
    };
};