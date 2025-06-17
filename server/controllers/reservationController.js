const Reservation = require('../models/Reservation');
const User = require('../models/User')

// Utwórz nową rezerwację
exports.createReservation = async (req, res) => {
    try {
        const { fullName, contactInfo, reservationDate, startTime, endTime, userId, details } = req.body;

        // Konwertuj datę string na Date object w UTC (bez przesunięcia czasowego)
        const parseLocalDate = (dateString) => {
            const [year, month, day] = dateString.split('-').map(Number);
            // Użyj Date.UTC() aby utworzyć datę w UTC, następnie przekonwertuj na Date object
            return new Date(Date.UTC(year, month - 1, day));
        };

        const reservationDateObj = parseLocalDate(reservationDate);

        // Sprawdź konflikty czasowe
        const conflictingReservation = await Reservation.findOne({
            reservationDate: reservationDateObj,
            $or: [
                {
                    startTime: { $lt: endTime },
                    endTime: { $gt: startTime }
                }
            ]
        });

        if (conflictingReservation) {
            return res.status(400).json({
                success: false,
                message: 'Wybrany termin koliduje z istniejącą rezerwacją'
            });
        }

        const reservation = await Reservation.create({
            fullName,
            contactInfo,
            reservationDate: reservationDateObj,
            startTime,
            endTime,
            userId: userId || null,
            details
        });

        res.status(201).json({
            success: true,
            data: reservation
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
};

// Pobierz wszystkie rezerwacje (dla admina)
exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find()
            .populate('userId', 'email')
            .sort({ reservationDate: 1, startTime: 1 });

        res.status(200).json({
            success: true,
            count: reservations.length,
            data: reservations
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Błąd serwera'
        });
    }
};

exports.getBookedDates = async (req, res) => {
    try {
        const reservations = await Reservation.find({})
            .select('reservationDate -_id')
            .distinct('reservationDate');

        // Format daty jako YYYY-MM-DD
        const bookedDates = reservations.map(date =>
            new Date(date).toISOString().split('T')[0]
        );

        res.status(200).json({
            success: true,
            data: bookedDates
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Błąd pobierania zajętych terminów'
        });
    }
};

// Pobierz rezerwacje użytkownika
exports.getReservations = async (req, res) => {
    try {

        const { username } = req.params;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ success: false, message: 'Użytkownik nie znaleziony' });
        }

        const currentDate = new Date();

        const reservations = await Reservation.find({
            userId: user._id,
            reservationDate: { $gte: currentDate }
        }).sort({ reservationDate: 1, startTime: 1 });

        res.status(200).json({
            success: true,
            count: reservations.length,
            data: reservations
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Błąd serwera'
        });
    }
};

// Pobierz dostępne terminy w danym dniu
exports.getAvailableSlots = async (req, res) => {
    try {
        const { date } = req.params;
        const reservationDate = new Date(date);
        const day = reservationDate.getDay();

        // Określ godziny otwarcia na podstawie dnia tygodnia
        let openingHour, closingHour;
        if (day >= 1 && day <= 5) { // Poniedziałek-Piątek
            openingHour = 9;
            closingHour = 22;
        } else if (day === 6) { // Sobota
            openingHour = 10;
            closingHour = 17;
        } else { // Niedziela
            return res.status(200).json({
                success: true,
                data: [],
                message: 'W niedzielę pizzeria jest zamknięta'
            });
        }

        // Pobierz istniejące rezerwacje na ten dzień
        const existingReservations = await Reservation.find({
            reservationDate: {
                $gte: new Date(date),
                $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1))
            }
        }).sort({ startTime: 1 });

        // Generuj dostępne sloty (co 30 minut)
        const allSlots = [];
        for (let hour = openingHour; hour < closingHour; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                allSlots.push(timeString);
            }
        }

        // Filtruj zajęte sloty
        const availableSlots = allSlots.filter(slot => {
            return !existingReservations.some(reservation => {
                return reservation.startTime <= slot && reservation.endTime > slot;
            });
        });

        res.status(200).json({
            success: true,
            data: availableSlots
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Błąd serwera'
        });
    }
};

// Usuń rezerwację
exports.deleteReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndDelete(req.params.id);

        if (!reservation) {
            return res.status(404).json({
                success: false,
                message: 'Nie znaleziono rezerwacji'
            });
        }

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Błąd serwera'
        });
    }
};