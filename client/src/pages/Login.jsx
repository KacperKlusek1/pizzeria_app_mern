import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin.js";
import { Helmet } from "react-helmet-async";
import SectionHeader from "../components/SectionHeader.jsx";
import FormItem from "../components/contact/FormItem.jsx";
import Swal from "sweetalert2";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login, isLoading, error } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(username, password);
        if (success) {
            const result = await Swal.fire({
                    title: "Sukces!",
                    text: "Logowanie zakończone pomyślnie. Gdzie chcesz przejść?",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonText: "Idź do konta",
                    cancelButtonText: "Strona główna"
                })
            if (result.isConfirmed) {
                navigate("/account");
            } else if (result.isDismissed) {
                navigate("/");
            }
        } else {
            await Swal.fire({
                icon: "error",
                title: "Coś poszło nie tak",
                text: error || "Spróbuj ponownie.",
                confirmButtonText: ":("
            })
        }
    };

    return (
        <>
            <Helmet>
                <title>Logowanie - Pizzeria Misia Fryderyka</title>
                <meta name="description" content="Przyłącz się do naszej ferajny!" />
            </Helmet>

            <SectionHeader
                headingUpper=""
                headingLower="Zaloguj się"
            >
                <form onSubmit={handleSubmit}>
                    <FormItem
                        label="Login:"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <FormItem
                        label="Hasło:"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {error && <div className="alert alert-danger">{error}</div>}

                    <div className="buttons d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                            Zaloguj
                        </button>
                    </div>
                </form>
                <p className="address mt-4 text-center">
                    <em>
                        <strong>Jeszcze nie masz konta?</strong><br/>
                        <strong><a href="/register">Załóż je już teraz!</a></strong>
                    </em>
                </p>
            </SectionHeader>
        </>
    );
}
