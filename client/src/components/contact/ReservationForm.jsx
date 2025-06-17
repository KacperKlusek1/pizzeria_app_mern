import React, { useState, useEffect, useRef } from 'react';
import FormItem from "./FormItem.jsx";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/confetti.css";
import { Polish } from "flatpickr/dist/l10n/pl.js";
import Swal from "sweetalert2";
import validator from 'validator';

export default function ReservationForm({ user, userData, userID }) {
    const startPickerRef = useRef(null);
    const endPickerRef = useRef(null);
    const [reservedDates, setReservedDates] = useState([]);
    const [availableHours, setAvailableHours] = useState({ min: "09:00", max: "22:00" });

    const [reservDate, setReservDate] = useState("")
    const [reservStart, setReservStart] = useState("")
    const [reservEnd, setReservEnd] = useState("")
    const [reservName, setReservName] = useState("")
    const [reservSurname, setReservSurname] = useState("")
    const [reservContact, setReservContact] = useState("")
    const [reservDetails, setReservDetails] = useState("")

    const formatDateForServer = (date) => {
        if (!date || !(date instanceof Date) || isNaN(date)) {
            throw new Error('Invalid date');
        }
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Automatyczne wypełnianie dla niezalogowanych użytkowników
    useEffect(() => {
        if (user && userData) {
            const [name, surname] = (userData.fullname || '').split(' ');
            setReservName(name || '');
            setReservSurname(surname || '');
            setReservContact(userData.email || '');
        }
    }, [user, userData]);

    // Pobieranie zajętych dat
    useEffect(() => {
        const fetchBookedDates = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/reservations/booked-dates');
                if (!response.ok) throw new Error('Błąd pobierania danych');
                const data = await response.json();
                setReservedDates(data.data || []);
            } catch (error) {
                console.error('Error fetching booked dates:', error);
            }
        };
        fetchBookedDates();
    }, []);

    // Ograniczenia czasowe
    useEffect(() => {
        const startPicker = startPickerRef.current?.flatpickr;
        const endPicker = endPickerRef.current?.flatpickr;

        if (startPicker && endPicker) {
            if (reservStart) {
                const h = reservStart.getHours().toString().padStart(2, '0');
                const m = reservStart.getMinutes().toString().padStart(2, '0');
                endPicker.set('minTime', `${h}:${m}`);
            } else {
                endPicker.set('minTime', availableHours.min);
            }

            if (reservEnd) {
                const h = reservEnd.getHours().toString().padStart(2, '0');
                const m = reservEnd.getMinutes().toString().padStart(2, '0');
                startPicker.set('maxTime', `${h}:${m}`);
            } else {
                startPicker.set('maxTime', availableHours.max);
            }
        }
    }, [reservStart, reservEnd, availableHours]);

    const updateTimeLimits = (day) => {
        let startHour = "09:00";
        let endHour = "22:00";

        if (day === 6) {
            startHour = "10:00";
            endHour = "17:00";
        } else if (day === 0) {
            startHour = "00:00";
            endHour = "00:00";
        }

        setAvailableHours({ min: startHour, max: endHour });

        const startPicker = startPickerRef.current?.flatpickr;
        const endPicker = endPickerRef.current?.flatpickr;

        if (startPicker && endPicker) {
            startPicker.set("minTime", startHour);
            startPicker.set("maxTime", endHour);
            endPicker.set("minTime", startHour);
            endPicker.set("maxTime", endHour);
        }
    };

    const handleStartChange = ([date]) => {
        if (!date) return;
        setReservStart(date);
        if (reservEnd && date > reservEnd) {
            setReservEnd(date);
        }
    };

    const handleEndChange = ([date]) => {
        if (!date) return;
        setReservEnd(date);
        if (reservStart && date < reservStart) {
            setReservStart(date);
        }
    };

    const validateForm = () => {
        if (!reservDate || !(reservDate instanceof Date)) {
            alert("Proszę wybrać poprawną datę rezerwacji.");
            return false;
        }

        const day = reservDate.getDay();
        if (day === 0) {
            alert("Rezerwacje w niedziele są niedostępne.");
            return false;
        }

        if (!reservStart || !reservEnd) {
            alert("Proszę wybrać godzinę rozpoczęcia i zakończenia.");
            return false;
        }

        if (reservStart >= reservEnd) {
            alert("Godzina zakończenia musi być po godzinie rozpoczęcia.");
            return false;
        }

        if (!user) {
            // Sprawdź, czy imię i nazwisko nie są puste
            if (!reservName.trim()) {
                alert("Proszę wpisać imię.");
                return false;
            }
            if (!reservSurname.trim()) {
                alert("Proszę wpisać nazwisko.");
                return false;
            }

            // Sprawdź, czy imię i nazwisko nie zawierają cyfr
            const containsDigits = (str) => /\d/.test(str);
            if (containsDigits(reservName)) {
                alert("Imię nie może zawierać cyfr.");
                return false;
            }
            if (containsDigits(reservSurname)) {
                alert("Nazwisko nie może zawierać cyfr.");
                return false;
            }

            // Sprawdź dane kontaktowe (email)
            if (!reservContact.trim()) {
                alert("Proszę wpisać dane kontaktowe.");
                return false;
            }

            if (!validator.isEmail(reservContact)) {
                alert("Proszę podać poprawny adres e-mail.");
                return false;
            }
        }

        return true;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        if (!reservDate || !reservStart || !reservEnd) {
            alert("Proszę wybrać datę oraz godziny rozpoczęcia i zakończenia rezerwacji");
            return;
        }

        const fullName = user ? userData?.fullname : `${reservName || ''} ${reservSurname || ''}`.trim();
        if (!fullName) {
            alert("Proszę podać imię i nazwisko");
            return;
        }

        const contactInfo = user ? userData?.email : reservContact;
        if (!contactInfo) {
            alert("Proszę podać dane kontaktowe (email lub telefon)");
            return;
        }

        let formattedDate;
        try {
            formattedDate = formatDateForServer(reservDate);
        } catch (error) {
            alert("Nieprawidłowy format daty");
            console.error('Date formatting error:', error);
            return;
        }

        const reservationData = {
            fullName,
            contactInfo,
            reservationDate: formattedDate,
            startTime: reservStart.toTimeString().slice(0, 5),
            endTime: reservEnd.toTimeString().slice(0, 5),
            details: reservDetails || undefined,
            userId: userID
        };

        try {
            const response = await fetch('http://localhost:5000/api/reservations/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(user ? { 'Authorization': `Bearer ${user.token}` } : {})
                },
                body: JSON.stringify(reservationData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Nie udało się dokonać rezerwacji');
            }

            Swal.fire({
                icon: "success",
                title: "Rezerwacja udana!",
                text: `Twoja rezerwacja na ${formattedDate} została przyjęta, odezwiemy się niedługo`,
                confirmButtonText: "OK"
            }).then(() => {
                setReservDate("");
                setReservStart("");
                setReservEnd("");
                setReservDetails("");
                if (!user) {
                    setReservName("");
                    setReservSurname("");
                    setReservContact("");
                }
            });

        } catch (error) {
            console.error('Błąd podczas rezerwacji:', error);
            alert(`Błąd rezerwacji: ${error.message}`);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group mb-3 text-center">
                <label>Data rezerwacji:</label>
                <div className="flatpickr-center">
                    <Flatpickr
                        value={reservDate}
                        onChange={([date]) => {
                            console.log('Flatpickr date selected:', date);
                            setReservDate(date);
                        }}
                        options={{
                            locale: Polish,
                            dateFormat: "Y-m-d",
                            minDate: "today",
                            static: true,
                            position: "below",
                            disable: [
                                function (date) {
                                    const dateStr = date.getFullYear() + "-" +
                                        ("0" + (date.getMonth() + 1)).slice(-2) + "-" +
                                        ("0" + date.getDate()).slice(-2);
                                    return reservedDates.includes(dateStr) || date.getDay() === 0;
                                }
                            ],
                            inline: true,
                            onChange: function ([selected]) {
                                updateTimeLimits(selected?.getDay?.());
                            }
                        }}
                        className="flatpickr-hidden-input"
                    />
                </div>
            </div>

            <div className="form-group mb-3">
                <label>Godzina rozpoczęcia:</label>
                <div className="flatpickr-center">
                    <Flatpickr
                        ref={startPickerRef}
                        value={reservStart}
                        onChange={handleStartChange}
                        options={{
                            locale: Polish,
                            enableTime: true,
                            noCalendar: true,
                            dateFormat: "H:i",
                            time_24hr: true,
                            inline: true,
                            minTime: availableHours.min,
                            maxTime: availableHours.max,
                        }}
                        className="flatpickr-hidden-input"
                    />
                </div>
            </div>

            <div className="form-group mb-3">
                <label>Godzina zakończenia:</label>
                <div className="flatpickr-center">
                    <Flatpickr
                        ref={endPickerRef}
                        value={reservEnd}
                        onChange={handleEndChange}
                        options={{
                            locale: Polish,
                            enableTime: true,
                            noCalendar: true,
                            dateFormat: "H:i",
                            time_24hr: true,
                            inline: true,
                            minTime: availableHours.min,
                            maxTime: availableHours.max,
                        }}
                        className="flatpickr-hidden-input"
                    />
                </div>
            </div>

            {!user && (
                <>
                    <FormItem
                        label="Imię:"
                        type="text"
                        value={reservName}
                        onChange={(e) => setReservName(e.target.value)}
                        required={true}
                    />
                    <FormItem
                        label="Nazwisko:"
                        type="text"
                        value={reservSurname}
                        onChange={(e) => setReservSurname(e.target.value)}
                        required={true}
                    />
                    <FormItem
                        label="Dane kontaktowe:"
                        type="email"
                        value={reservContact}
                        onChange={(e) => setReservContact(e.target.value)}
                        required={true}
                    />
                </>
            )}

            <FormItem
                label="Specjalne uwagi:"
                type="textarea"
                value={reservDetails}
                onChange={(e) => setReservDetails(e.target.value)}
                placeholder="Jest coś na co powinniśmy zwrócić uwagę?"
                required={false}
                rows={5}
            />

            <button type="submit" className="btn btn-success">
                Zarezerwuj dzień
            </button>
        </form>
    );
}