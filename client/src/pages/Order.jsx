import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from "react-helmet-async";
import { useAuthContext } from "../hooks/useAuthContext.js";
import { useUserData } from "../hooks/useUserData.js";
import { useProducts } from "../hooks/useProducts.js";
import { usePostalCode } from "../hooks/usePostalCode.js";
import { usePizzaCart } from "../hooks/usePizzaCart.js";
import SectionHeader from "../components/SectionHeader.jsx";
import UserInfoForm from "../components/order/UserInfoForm.jsx";
import AddressForm from "../components/order/AddressForm.jsx";
import PizzaSelector from "../components/order/PizzaSelector.jsx";
import PizzaCart from "../components/order/PizzaCart.jsx";
import Swal from "sweetalert2";
import validator from 'validator';

export default function Order() {
    const { user } = useAuthContext();
    const { fullname, setFullname, email } = useUserData(user);
    const { products, loading: productsLoading } = useProducts();
    const {
        postalCode,
        setPostalCode,
        city,
        setCity,
        citySuggestions,
        handlePostalCodeChange
    } = usePostalCode();
    const {
        selectedPizza,
        pizzas,
        totalPrice,
        errors,
        handlePizzaSelect,
        handleSizeSelect,
        addPizza,
        removePizza,
        clearCart
    } = usePizzaCart();

    const [contactInfo, setContactInfo] = useState("");
    const [street, setStreet] = useState("");
    const [buildingNumber, setBuildingNumber] = useState("");

    useEffect(() => {
        if (user && email) {
            setContactInfo(email);
        }
    }, [user, email]);

    const validateForm = () => {
        // Sprawdzenie czy koszyk nie jest pusty
        if (pizzas.length === 0) {
            Swal.fire({
                icon: "error",
                title: 'Dodaj przynajmniej jedną pizzę do zamówienia.',
                text: "I spróbuj jeszcze raz",
                confirmButtonText: ":("
            });
            return false;
        }

        // Imię i nazwisko - nie puste i bez cyfr
        if (!fullname.trim()) {
            Swal.fire({
                icon: "error",
                title: 'Podaj imię i nazwisko',
                text: "To pole jest wymagane",
                confirmButtonText: "OK"
            });
            return false;
        }
        if (/\d/.test(fullname)) {
            Swal.fire({
                icon: "error",
                title: 'Imię i nazwisko nie mogą zawierać cyfr',
                confirmButtonText: "OK"
            });
            return false;
        }

        // Kontakt - niepusty i poprawny e-mail
        if (!contactInfo.trim()) {
            Swal.fire({
                icon: "error",
                title: 'Podaj dane kontaktowe',
                text: "Email lub telefon jest wymagany",
                confirmButtonText: "OK"
            });
            return false;
        }
        if (!validator.isEmail(contactInfo)) {
            Swal.fire({
                icon: "error",
                title: 'Podaj poprawny adres e-mail',
                confirmButtonText: "OK"
            });
            return false;
        }

        // Adres - wszystkie pola muszą być wypełnione
        if (!street.trim() || !buildingNumber.trim() || !postalCode.trim() || !city.trim()) {
            Swal.fire({
                icon: "error",
                title: 'Uzupełnij adres dostawy',
                text: "Wszystkie pola adresu są wymagane",
                confirmButtonText: "OK"
            });
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        // Walidacja podstawowa
        if (pizzas.length === 0) {
            Swal.fire({
                icon: "error",
                title: 'Dodaj przynajmniej jedną pizzę do zamówienia.',
                text: "I spróbuj jeszcze raz",
                confirmButtonText: ":("
            });
            return;
        }

        // Walidacja wymaganych pól
        if (!fullname.trim()) {
            Swal.fire({
                icon: "error",
                title: 'Podaj imię i nazwisko',
                text: "To pole jest wymagane",
                confirmButtonText: "OK"
            });
            return;
        }

        if (!contactInfo.trim()) {
            Swal.fire({
                icon: "error",
                title: 'Podaj dane kontaktowe',
                text: "Email lub telefon jest wymagany",
                confirmButtonText: "OK"
            });
            return;
        }

        if (!street.trim() || !buildingNumber.trim() || !postalCode.trim() || !city.trim()) {
            Swal.fire({
                icon: "error",
                title: 'Uzupełnij adres dostawy',
                text: "Wszystkie pola adresu są wymagane",
                confirmButtonText: "OK"
            });
            return;
        }

        // Złóż pełny adres
        const fullAddress = `${street} ${buildingNumber}, ${postalCode} ${city}`;

        // Dane zamówienia
        const orderData = {
            fullName: fullname,
            contactInfo,
            address: fullAddress,
            pizzas
        };

        try {
            // Przygotuj nagłówki - dodaj Authorization tylko jeśli użytkownik jest zalogowany
            const headers = {
                'Content-Type': 'application/json'
            };

            // Dodaj token tylko jeśli użytkownik jest zalogowany i ma prawidłowy token
            if (user && user.token) {
                headers['Authorization'] = `Bearer ${user.token}`;
            }

            const response = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(orderData)
            });

            // fetch używa response.ok do sprawdzania sukcesu (status 200-299)
            if (response.ok) {
                const result = await response.json(); // Parsuj odpowiedź JSON

                Swal.fire({
                    icon: "success",
                    title: 'Zamówienie zostało złożone!',
                    text: "Świeża pizza już niedługo do ciebie dojdzie!",
                    confirmButtonText: "OK"
                });

                // Wyczyść formularz
                clearCart();
                setPostalCode('');
                setCity('');
                setStreet('');
                setBuildingNumber('');
            } else {
                // Obsłuż błędy HTTP (4xx, 5xx)
                const errorData = await response.json().catch(() => ({}));
                throw new Error(`HTTP ${response.status}: ${errorData.message || response.statusText}`);
            }
        } catch (err) {
            console.error('Błąd składania zamówienia:', err);

            // Bardziej szczegółowe komunikaty błędów
            let errorMessage = "Spróbuj jeszcze raz";
            let errorTitle = 'Wystąpił problem przy składaniu zamówienia.';

            if (err.message.includes('HTTP')) {
                // Błędy HTTP
                if (err.message.includes('401')) {
                    errorTitle = 'Błąd autoryzacji';
                    errorMessage = 'Musisz być zalogowany, aby złożyć zamówienie';
                } else if (err.message.includes('403')) {
                    errorTitle = 'Brak uprawnień';
                    errorMessage = 'Nie masz uprawnień do złożenia zamówienia';
                } else if (err.message.includes('400')) {
                    errorTitle = 'Błędne dane';
                    errorMessage = 'Sprawdź wprowadzone dane';
                } else if (err.message.includes('500')) {
                    errorTitle = 'Błąd serwera';
                    errorMessage = 'Problem po stronie serwera, spróbuj później';
                }
            } else if (err.name === 'TypeError' && err.message.includes('fetch')) {
                // Błędy sieciowe
                errorTitle = 'Brak połączenia';
                errorMessage = 'Sprawdź połączenie internetowe';
            }

            Swal.fire({
                icon: "error",
                title: errorTitle,
                text: errorMessage,
                confirmButtonText: ":("
            });
        }
    };

    if (productsLoading) {
        return <div>Ładowanie produktów...</div>;
    }

    return (
        <>
            <Helmet>
                <title>Zamówienia - Pizzeria Misia Fryderyka</title>
                <meta name="description" content="Ciepła pizza już zaraz w twoim domu!" />
            </Helmet>

            <SectionHeader
                titleUpper="Nie możesz przyjść? Zjedz w domu!"
                titleLower="Złóż zamówienie z dowozem"
            >
                <form onSubmit={handleSubmit}>
                    {!user && (
                        <UserInfoForm
                            fullname={fullname}
                            setFullname={setFullname}
                            contactInfo={contactInfo}
                            setContactInfo={setContactInfo}
                        />
                    )}

                    <AddressForm
                        street={street}
                        setStreet={setStreet}
                        buildingNumber={buildingNumber}
                        setBuildingNumber={setBuildingNumber}
                        postalCode={postalCode}
                        handlePostalCodeChange={handlePostalCodeChange}
                        city={city}
                        setCity={setCity}
                        citySuggestions={citySuggestions}
                    />

                    <PizzaSelector
                        products={products}
                        selectedPizza={selectedPizza}
                        handlePizzaSelect={handlePizzaSelect}
                        handleSizeSelect={handleSizeSelect}
                        addPizza={addPizza}
                        errors={errors}
                    />

                    <PizzaCart
                        pizzas={pizzas}
                        removePizza={removePizza}
                        totalPrice={totalPrice}
                    />

                    <div className="form-group mt-4">
                        <button
                            type="submit"
                            className="btn btn-success"
                            disabled={pizzas.length === 0}
                        >
                            Złóż zamówienie
                        </button>
                    </div>
                </form>
            </SectionHeader>
        </>
    );
}