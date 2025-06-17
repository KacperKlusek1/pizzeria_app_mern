const express = require('express');
const { createOrder, getMyOrders, getAllOrders, updateOrderStatus, cancelOrder, getNotReadyOrders} = require('../controllers/orderController');
const { authMiddleware, requireAdmin, optionalAuthMiddleware} = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', optionalAuthMiddleware, createOrder);
router.get('/', authMiddleware, requireAdmin, getAllOrders);
router.get('/not-ready', authMiddleware, requireAdmin, getNotReadyOrders);
router.put('/:id/status', authMiddleware, requireAdmin, updateOrderStatus);
router.get('/:userId', authMiddleware, getMyOrders);
router.delete('/:id', authMiddleware, cancelOrder);

module.exports = router;