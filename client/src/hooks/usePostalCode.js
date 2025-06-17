import { useState, useEffect } from 'react';
import axios from 'axios';

export const usePostalCode = () => {
    const [postalCode, setPostalCode] = useState("");
    const [citySuggestions, setCitySuggestions] = useState([]);
    const [city, setCity] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            if (postalCode.length === 6) {
                fetchCitiesByPostalCode(postalCode).then((cities) => {
                    setCitySuggestions(cities);
                    if (cities.length === 1) {
                        setCity(cities[0]);
                    } else {
                        setCity("");
                    }
                });
            } else {
                setCitySuggestions([]);
                setCity("");
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [postalCode]);

    const fetchCitiesByPostalCode = async (postalCode) => {
        try {
            const response = await axios.get(`https://kodpocztowy.intami.pl/api/${postalCode}`);

            const cities = response.data.map(entry => entry.miejscowosc)
                .filter((city, index, self) => city && self.indexOf(city) === index);

            return cities;
        } catch (error) {
            console.error("Błąd przy pobieraniu miast z intami.pl:", error);
            return [];
        }
    };

    const handlePostalCodeChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 5) value = value.slice(0, 5);
        if (value.length > 2) {
            value = `${value.slice(0, 2)}-${value.slice(2)}`;
        }
        setPostalCode(value);
    };

    return {
        postalCode,
        setPostalCode,
        city,
        setCity,
        citySuggestions,
        handlePostalCodeChange
    };
};