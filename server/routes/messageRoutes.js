const express = require('express');
const { authMiddleware, requireAdmin } = require('../middleware/authMiddleware');
const {getUnreadMessagesCount, markMessageAsRead} = require("../controllers/messageController");

const router = express.Router();

router.get('/unread-count', authMiddleware, requireAdmin, getUnreadMessagesCount);
router.patch('/:type/:id/read', authMiddleware, requireAdmin, markMessageAsRead);

module.exports = router;