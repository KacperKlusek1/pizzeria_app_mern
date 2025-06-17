import React, {useState} from "react";
import {useLogout} from "../hooks/useLogout.js";
import {Helmet} from "react-helmet-async";
import {useAuthContext} from '../hooks/useAuthContext.js';
import {useUserData} from '../hooks/useUserData.js';
import {useOrdersAndReservations} from '../hooks/useOrdersAndReservations.js';
import EditableField from '../components/account/EditableField.jsx';
import PasswordField from '../components/account/PasswordField.jsx';
import OrderHistory from '../components/account/OrderHistory.jsx';
import ReservationsList from '../components/account/ReservationHistory.jsx';
import ActionButtons from '../components/account/ActionButtons.jsx';
import MessageDisplay from '../components/account/MessageDisplay.jsx';
import validator from 'validator';

export default function Account() {
    const {user, updateUser} = useAuthContext();
    const logout = useLogout();

    const {
        fullname, setFullname,
        username, setUsername,
        email, setEmail,
        status
    } = useUserData(user);

    const {
        orders,
        reservations,
        showOrderHistory,
        setShowOrderHistory,
        showReservations,
        setShowReservations
    } = useOrdersAndReservations(user);

    const [editingField, setEditingField] = useState(null);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const startEdit = (field) => {
        setMessage("");
        setError("");
        setEditingField(field);
        if (field === "password") {
            setPassword("");
            setConfirmPassword("");
        }
    };

    const cancelEdit = () => {
        setEditingField(null);
        setConfirmPassword("");
        setPassword("");
        setMessage("");
        setError("");
    };

    const handleSubmit = async () => {
        setMessage("");
        setError("");

        let valueToUpdate;

        if (editingField === "password") {
            if (password !== confirmPassword) {
                setError("Hasła nie są zgodne.");
                return;
            }
            if (!password) {
                setError("Podaj nowe hasło.");
                return;
            }
            if (password.length < 6) {
                setError("Hasło powinno mieć co najmniej 6 znaków.");
                return;
            }
            valueToUpdate = password;
        } else {
            if (editingField === "fullname" && !fullname.trim()) {
                setError("Imię i nazwisko nie może być puste.");
                return;
            }
            if (editingField === "username" && !username.trim()) {
                setError("Nazwa użytkownika nie może być pusta.");
                return;
            }
            if (editingField === "email") {
                if (!email.trim()) {
                    setError("Email nie może być pusty.");
                    return;
                }
                if (!validator.isEmail(email)) {
                    setError("Email nie jest poprawnym adresem.");
                    return;
                }
            }

            if (editingField === "fullname") valueToUpdate = fullname.trim();
            if (editingField === "username") valueToUpdate = username.trim();
            if (editingField === "email") valueToUpdate = email.trim();
        }

        try {
            const payload = {[editingField]: valueToUpdate};

            const response = await fetch(`http://localhost:5000/api/users/${user.username}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || "Błąd zapisu");
            }

            const updatedData = await response.json();

            const updatePayload = {};
            if (updatedData.fullname !== undefined) {
                updatePayload.fullname = updatedData.fullname;
                setFullname(updatedData.fullname);
            }
            if (updatedData.username !== undefined) {
                updatePayload.username = updatedData.username;
                setUsername(updatedData.username);
            }
            if (updatedData.email !== undefined) {
                updatePayload.email = updatedData.email;
                setEmail(updatedData.email);
            }
            if (updatedData.token) {
                updatePayload.token = updatedData.token;
            }

            updateUser(updatePayload);

            setMessage("Dane zostały zapisane.");
            setTimeout(() => {
                setEditingField(null);
                setMessage("");
            }, 2000);
        } catch (err) {
            console.error("Błąd aktualizacji:", err);
            setError(err.message || "Coś poszło nie tak.");
        }
    };

    const isAdmin = status === 2;

    return (
        <>
            <Helmet>
                <title>Twój profil – Pizzeria Misia Fryderyka</title>
                <meta name="description" content="Wszystko o tobie!"/>
            </Helmet>

            <section className="page-section cta">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-9 mx-auto">
                            <div className="cta-inner bg-faded text-center rounded">
                                <h2 className="section-heading mb-5">
                                    <span className="section-heading-upper">Witamy!</span>
                                    <span className="section-heading-lower">Twój profil</span>
                                </h2>

                                <EditableField
                                    label="Imię i nazwisko"
                                    value={fullname}
                                    isEditing={editingField === "fullname"}
                                    onStartEdit={() => startEdit("fullname")}
                                    onSave={handleSubmit}
                                    onCancel={cancelEdit}
                                    onChange={(e) => setFullname(e.target.value)}
                                    placeholder="Podaj imię i nazwisko"
                                    required
                                />

                                <EditableField
                                    label="Nazwa użytkownika"
                                    value={username}
                                    isEditing={editingField === "username"}
                                    onStartEdit={() => startEdit("username")}
                                    onSave={handleSubmit}
                                    onCancel={cancelEdit}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Podaj nowy login"
                                    required
                                />

                                <EditableField
                                    label="Email"
                                    value={email}
                                    isEditing={editingField === "email"}
                                    onStartEdit={() => startEdit("email")}
                                    onSave={handleSubmit}
                                    onCancel={cancelEdit}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Podaj nowy adres email"
                                    type="email"
                                    required
                                />

                                <PasswordField
                                    isEditing={editingField === "password"}
                                    onStartEdit={() => startEdit("password")}
                                    onSave={handleSubmit}
                                    onCancel={cancelEdit}
                                    password={password}
                                    confirmPassword={confirmPassword}
                                    onPasswordChange={(e) => setPassword(e.target.value)}
                                    onConfirmPasswordChange={(e) => setConfirmPassword(e.target.value)}
                                />

                                <ActionButtons
                                    isAdmin={isAdmin}
                                    showOrderHistory={showOrderHistory}
                                    setShowOrderHistory={setShowOrderHistory}
                                    showReservations={showReservations}
                                    setShowReservations={setShowReservations}
                                    logout={logout}
                                />

                                <MessageDisplay message={message} error={error}/>

                                <div id="contentContainer" style={{marginTop: "20px"}}>
                                    {showOrderHistory && <OrderHistory orders={orders}/>}
                                    {showReservations && <ReservationsList reservations={reservations}/>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}