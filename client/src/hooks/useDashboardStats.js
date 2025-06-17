import { useState, useEffect } from 'react';

export function useDashboardStats(user) {
    const [stats, setStats] = useState({
        notReadyOrdersCount: null,
        activeUsersCount: null,
        unreadMessagesCount: null
    });

    useEffect(() => {
        if (!user) return;

        const fetchStats = async () => {
            try {
                const [ordersRes, usersRes, messagesRes] = await Promise.all([
                    fetch('http://localhost:5000/api/orders/not-ready', {
                        headers: { 'Authorization': `Bearer ${user.token}` }
                    }),
                    fetch('http://localhost:5000/api/users/active-count', {
                        headers: { 'Authorization': `Bearer ${user.token}` }
                    }),
                    fetch('http://localhost:5000/api/messages/unread-count', {
                        headers: { 'Authorization': `Bearer ${user.token}` }
                    })
                ]);

                const [ordersData, usersData, messagesData] = await Promise.all([
                    ordersRes.json(),
                    usersRes.json(),
                    messagesRes.json()
                ]);

                setStats({
                    notReadyOrdersCount: ordersData.count,
                    activeUsersCount: usersData.count,
                    unreadMessagesCount: messagesData.totalUnread
                });
            } catch (err) {
                console.error('Błąd pobierania statystyk:', err);
            }
        };

        fetchStats();
    }, [user]);

    return stats;
}
