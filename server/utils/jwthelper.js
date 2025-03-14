// utils/jwthelper.js
const jwt = require('jsonwebtoken');

// Replace with a secure secret key stored in environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const generateToken = (userId, email) => {
    try {
        const token = jwt.sign(
            { userId, email },
            JWT_SECRET,
            { expiresIn: '24h' } // Token expires in 24 hours
        );
        return token;
    } catch (error) {
        throw new Error('Error generating token');
    }
};

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (error) {
        throw new Error('Invalid token');
    }
};

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({ error: 'Access token is required' });
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
};

module.exports = {
    generateToken,
    verifyToken,
    authenticateToken
};