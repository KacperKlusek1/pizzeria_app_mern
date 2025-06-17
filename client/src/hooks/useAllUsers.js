import { useState, useEffect } from 'react';
import { useAuthContext } from "./useAuthContext.js";

const useAllUsers = () => {
    const { user } = useAuthContext();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:5000/api/users/', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                const data = await response.json();
                setUsers(data);
                setLoading(false);
            } catch (error) {
                console.error('Błąd podczas pobierania użytkowników:', error);
                setLoading(false);
            }
        };
        fetchUsers();
    }, [user.token]);

    const toggleUserStatus = async (userId, currentStatus) => {
        if (currentStatus === 2) {
            console.warn('Nie można zmienić statusu administratora.');
            return;
        }
        try {
            const newStatus = currentStatus === 1 ? 0 : 1;
            const response = await fetch(`http://localhost:5000/api/users/${userId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ status: newStatus }),
            });
            const updatedUser = await response.json();
            setUsers(users.map(user => (user._id === userId ? updatedUser : user)));
        } catch (error) {
            console.error('Błąd podczas zmiany statusu użytkownika:', error);
        }
    };

    return {
        users,
        loading,
        toggleUserStatus
    };
};

export default useAllUsers;