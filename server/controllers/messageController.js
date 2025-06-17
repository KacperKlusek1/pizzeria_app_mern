const Reservation = require('../models/Reservation');
const Lawsuit = require('../models/Lawsuit');

const models = {
    reservations: Reservation,
    lawsuits: Lawsuit,
};

exports.getUnreadMessagesCount = async (req, res) => {
    try {
        const unreadReservationsCount = await Reservation.countDocuments({ isRead: false });
        const unreadLawsuitsCount = await Lawsuit.countDocuments({ isRead: false });

        // Możesz zwrócić osobno albo sumę:
        res.json({
            unreadReservationsCount,
            unreadLawsuitsCount,
            totalUnread: unreadReservationsCount + unreadLawsuitsCount
        });
    } catch (err) {
        console.error('Błąd getUnreadMessagesCount:', err);
        res.status(500).json({ message: 'Błąd serwera' });
    }
};

exports.markMessageAsRead = async (req, res) => {
    const { type, id } = req.params;

    const Model = models[type];
    if (!Model) {
        return res.status(400).json({ message: 'Nieprawidłowy typ wiadomości' });
    }

    try {
        const updated = await Model.findByIdAndUpdate(
            id,
            { isRead: true },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ message: 'Nie znaleziono wiadomości' });
        }

        res.json({ success: true, message: 'Oznaczono jako przeczytane', data: updated });
    } catch (err) {
        console.error('Błąd markMessageAsRead:', err);
        res.status(500).json({ message: 'Błąd serwera' });
    }
};
