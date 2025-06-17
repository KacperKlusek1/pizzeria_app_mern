const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1]; // "Bearer xyz"

    if (!token) return res.status(401).json({ message: 'Brak tokenu, dostęp zabroniony' });

    try {
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
        req.user = decoded;
        if (decoded._id && !req.user.userId) {
            req.user.userId = decoded._id;
        }
        next();
    } catch (err) {
        res.status(403).json({ message: 'Nieprawidłowy token' });
    }
}

function optionalAuthMiddleware(req, res, next) {
    const authHeader = req.header('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        try {
            const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
            req.user = decoded;
            return next();
        } catch (err) {
            console.error("JWT verify error:", err.message);
            return res.status(403).json({ message: 'Nieprawidłowy token' })
        }
    } else {
        req.user = null;
        return next();
    }
}


function requireAdmin(req, res, next) {
    if (req.user?.status !== 2) {
        return res.status(403).json({ message: 'Dostęp tylko dla administratora' });
    }
    next();
}

module.exports = { authMiddleware, requireAdmin, optionalAuthMiddleware };
