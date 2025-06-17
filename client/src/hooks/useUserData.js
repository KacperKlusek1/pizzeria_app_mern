import { useState, useEffect } from 'react';

export const useUserData = (user) => {
    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/users/${user.username}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${user.token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    console.error("Server error:", errorData);

                    if (response.status === 403) {
                        setFullname(user.fullname || "");
                        setUsername(user.username || "");
                        setEmail(user.email || "");
                        setStatus(user.status || null);
                        return;
                    }
                    return;
                }

                const json = await response.json();
                setFullname(json.fullname || "");
                setUsername(json.username || "");
                setEmail(json.email || "");
                setStatus(json.status);
            } catch (err) {
                console.error("Błąd pobierania danych użytkownika:", err);
                setFullname(user.fullname || "");
                setUsername(user.username || "");
                setEmail(user.email || "");
                setStatus(user.status || null);
            }
        };

        if (user) {
            setFullname(user.fullname || "");
            setUsername(user.username || "");
            setEmail(user.email || "");
            setStatus(user.status || null);

            fetchData().catch(err => {
                console.error("Błąd fetchData:", err);
            });
        }
    }, [user]);

    return {
        fullname,
        setFullname,
        username,
        setUsername,
        email,
        setEmail,
        status
    };
};