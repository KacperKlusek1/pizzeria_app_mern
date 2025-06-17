const User = require('../models/User');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

exports.getAllUsers = async (req, res) => {
    const users = await User.find().select('-password');
    res.json(users);
};

exports.updateProfile = async (req, res) => {
    const allowedUpdates = ['fullname', 'email', 'username', 'password'];
    const updates = {};

    // Przygotowanie aktualizowanych pól
    for (const key of allowedUpdates) {
        if (req.body[key] !== undefined) {
            updates[key] = req.body[key];
        }
    }

    try {
        // 1. Znajdź użytkownika (po username z URL)
        const userToUpdate = await User.findOne({ username: req.params.username });
        if (!userToUpdate) {
            return res.status(404).json({ message: 'Użytkownik nie znaleziony' });
        }

        // 2. Sprawdź uprawnienia (dwie możliwości - kompatybilność)
        const isOwner = (
            (req.user.userId && req.user.userId === userToUpdate._id.toString()) ||
            (req.user._id && req.user._id === userToUpdate._id.toString()) ||
            (req.user.username && req.user.username === userToUpdate.username)
        );

        if (!isOwner) {
            return res.status(403).json({ message: 'Możesz edytować tylko swój profil' });
        }

        // 3. Aktualizacja hasła (jeśli potrzebne)
        if (updates.password) {
            const salt = await bcrypt.genSalt(Number(process.env.SALT));
            updates.password = await bcrypt.hash(updates.password, salt);
        }

        // 4. Aktualizacja danych
        const updatedUser = await User.findOneAndUpdate(
            { _id: userToUpdate._id },
            updates,
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: 'Błąd podczas aktualizacji' });
        }

        // POPRAWIONE: Generuj nowy token tylko jeśli zmieniono username
        let token = null;
        if (updates.username) {
            token = jwt.sign(
                {
                    _id: updatedUser._id.toString(),
                    username: updatedUser.username
                },
                process.env.JWTPRIVATEKEY,
                { expiresIn: '24h' }
            );
        }

        // 5. Zwróć zaktualizowane dane (z tokenem jeśli został wygenerowany)
        const response = {
            ...updatedUser.toObject()
        };

        if (token) {
            response.token = token;
        }

        res.json(response);

    } catch (err) {
        console.error('Błąd updateProfile:', err);

        if (err.code === 11000) {
            const field = Object.keys(err.keyPattern)[0];
            return res.status(400).json({
                message: `${field} jest już zajęty`
            });
        }
        res.status(500).json({
            message: err.message || 'Błąd podczas aktualizacji profilu'
        });
    }
};

exports.changeUserStatus = async (req, res) => {
    const { status } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { status }, { new: true }).select('-password');
    res.json(user);
};

exports.getUserData = async (req, res) => {
    try {
        const isAuthorized = (
            req.user.username === req.params.username ||
            req.user._id?.toString() === req.params.username ||
            req.user.userId?.toString() === req.params.username
        );

        if (!isAuthorized) {
            return res.status(403).json({
                message: 'Brak dostępu do danych innego użytkownika',
                debug: {
                    userFromToken: req.user,
                    requestedUsername: req.params.username
                }
            });
        }

        const user = await User.findOne({ username: req.params.username }).select('-password -__v');

        if (!user) {
            return res.status(404).json({ message: 'Użytkownik nie znaleziony' });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error('Błąd getUserData:', err)
        res.status(500).json({ message: err.message });
    }
};

exports.getActiveUsersCount = async (req, res) => {
    try {
        const count = await User.countDocuments({ status: { $ne: 0 } });
        res.json({ count });
    } catch (error) {
        console.error('Błąd getActiveUsersCount:', error);
        res.status(500).json({ message: error.message });
    }
};