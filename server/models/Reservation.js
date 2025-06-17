const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Pełne imię i nazwisko jest wymagane'],
        trim: true
    },
    contactInfo: {
        type: String,
        required: [true, 'Dane kontaktowe są wymagane'],
        trim: true,
        validate: {
            validator: function(v) {
                // Walidacja emaila lub numeru telefonu
                const phoneRegex = /^(\+?[0-9]{1,3})?([0-9]{9})$/;
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return phoneRegex.test(v) || emailRegex.test(v);
            },
            message: 'Podaj poprawny email lub numer telefonu'
        }
    },
    reservationDate: {
        type: Date,
        required: [true, 'Data rezerwacji jest wymagana'],
        min: [new Date(), 'Data rezerwacji nie może być z przeszłości']
    },
    startTime: {
        type: String,
        required: [true, 'Godzina rozpoczęcia jest wymagana'],
        match: [/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Podaj poprawny format godziny (HH:MM)']
    },
    endTime: {
        type: String,
        required: [true, 'Godzina zakończenia jest wymagana'],
        match: [/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Podaj poprawny format godziny (HH:MM)'],
        validate: {
            validator: function(v) {
                return v > this.startTime;
            },
            message: 'Godzina zakończenia musi być późniejsza niż rozpoczęcia'
        }
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
        required: false
    },
    details: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isRead: { type: Boolean, default: false }
});

// Indeks dla unikania duplikatów rezerwacji
reservationSchema.index({ reservationDate: 1, startTime: 1, endTime: 1 }, { unique: true });

// Walidacja godzin otwarcia
reservationSchema.pre('save', function(next) {
    const day = this.reservationDate.getDay(); // 0 - niedziela, 6 - sobota
    const [startHour, startMinute] = this.startTime.split(':').map(Number);
    const [endHour, endMinute] = this.endTime.split(':').map(Number);

    // Niedziela - zamknięte
    if (day === 0) {
        return next(new Error('Rezerwacje w niedzielę są niedostępne'));
    }

    // Poniedziałek-Piątek (9:00-22:00)
    if (day >= 1 && day <= 5) {
        if (startHour < 9 || (startHour === 22 && startMinute > 0) || endHour > 22 ||
            (endHour === 22 && endMinute > 0)) {
            return next(new Error('W dni robocze godziny otwarcia to 9:00-22:00'));
        }
    }

    // Sobota (10:00-17:00)
    if (day === 6) {
        if (startHour < 10 || (startHour === 17 && startMinute > 0) || endHour > 17 ||
            (endHour === 17 && endMinute > 0)) {
            return next(new Error('W soboty godziny otwarcia to 10:00-17:00'));
        }
    }

    next();
});

module.exports = mongoose.model('Reservation', reservationSchema);