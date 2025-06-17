import React, { useState } from "react";
import { useRegister } from "../hooks/useRegister.js";
import validator from "validator/es";
import { Link } from "react-router-dom";
import {Helmet} from "react-helmet-async";
import FormItem from "../components/contact/FormItem.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import Swal from "sweetalert2";

export default function Register() {
    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const [errors, setErrors] = useState({});
    const { register, isLoading, error } = useRegister();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        const userNameRegex = /^[0-9A-Za-z_-]{2,25}$/;
        const fullNameRegex = /^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż ]{2,50}$/;

        if (!userNameRegex.test(username)) {
            newErrors.username = "Login musi mieć 2-25 znaków (litery, cyfry, _, -)";
        }
        if (!fullNameRegex.test(fullname)) {
            newErrors.fullname = "Podaj poprawne imię i nazwisko";
        }
        if (password.length < 6) {
            newErrors.password = "Hasło musi mieć co najmniej 6 znaków";
        }
        if (!validator.isEmail(email)) {
            newErrors.email = "Podaj poprawny adres email";
        }

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        const success = await register(username, fullname, password, email);
        if (success) {
            const result = await Swal.fire({
                icon: "success",
                title: "Sukces!",
                text: "Rejestracja zakończona pomyślnie. Czy chcesz się zalogować?",
                confirmButtonText: "OK"
            })
            if (result.isConfirmed) window.location.href = "/login";
        } else {
            await Swal.fire({
                icon: "error",
                title: error || "Błąd rejestracji",
                text: "Spróbuj ponownie.",
                confirmButtonText: ":("
            })
        }
    };

    return (
        <>
            <Helmet>
                <title>"Rejestracja - Pizzeria Misia Fryderyka"</title>
                <meta name="description" content="Zostań nowym członkiem naszej bandy!" />
            </Helmet>
            <SectionHeader titleLower="Zarejestruj się już dziś!">
                <form onSubmit={handleSubmit}>
                    <FormItem
                        label="Nazwa użytkownika:"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    {errors.username && <div className="alert alert-danger">{errors.username}</div>}

                    <FormItem
                        label="Imię i nazwisko:"
                        type="text"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        required
                    />
                    {errors.fullname && <div className="alert alert-danger">{errors.fullname}</div>}

                    <FormItem
                        label="Hasło:"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {errors.password && <div className="alert alert-danger">{errors.password}</div>}

                    <FormItem
                        label="Email:"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {errors.email && <div className="alert alert-danger">{errors.email}</div>}

                    {error && <div className="alert alert-danger">{error}</div>}

                    <div className="buttons d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                            Rejestruj
                        </button>
                        <button type="reset" className="btn btn-secondary" disabled={isLoading} onClick={() => {
                                setUsername('');
                                setFullname('');
                                setPassword('');
                                setEmail('');
                                setErrors({});
                        }}>
                            Anuluj
                        </button>
                    </div>
                </form>
                <p className="address mt-4 text-center">
                    <em><strong>Masz już konto?</strong><br />
                        <strong><Link to="/login">Zaloguj się!</Link></strong>
                    </em>
                </p>
            </SectionHeader>
        </>
    );
}
