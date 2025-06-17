const express = require('express');
const { getAllReservations, getAvailableSlots, getReservations, createReservation, deleteReservation, getBookedDates} = require('../controllers/reservationController');
const { authMiddleware, requireAdmin, optionalAuthMiddleware} = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', optionalAuthMiddleware, createReservation);
router.get('/booked-dates', getBookedDates);
router.get('/', authMiddleware, requireAdmin, getAllReservations);
router.get('/:userId', authMiddleware, getReservations);
router.get('/available/:date', getAvailableSlots);
router.delete('/:id', authMiddleware, deleteReservation);

module.exports = router;