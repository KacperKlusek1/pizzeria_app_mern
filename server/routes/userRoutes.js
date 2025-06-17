const express = require('express');
const {
    getAllUsers,
    changeUserStatus,
    updateProfile,
    getUserData,
    getActiveUsersCount
} = require('../controllers/userController');
const { authMiddleware, requireAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, requireAdmin, getAllUsers);
router.get('/active-count', authMiddleware, requireAdmin, getActiveUsersCount);
router.get('/:username', authMiddleware, getUserData);
router.put('/:username', authMiddleware, updateProfile);
router.put('/:id/status', authMiddleware, requireAdmin, changeUserStatus);

module.exports = router;
