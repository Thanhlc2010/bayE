import express from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET; // Ensure this is set in your environment variables

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        console.log('No token provided');
        return res.status(403).json({ isValid: false,  error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1]; // Extract the token from the Bearer prefix

    if (!token) {
        console.log('Token format is incorrect');
        return res.status(403).json({ isValid: false,  error: 'Token format is incorrect' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log('Failed to authenticate token:', err.message);
            return res.status(500).json({ isValid: false,  error: 'Failed to authenticate token' });
        }

        // If everything is good, save the decoded token to request for use in other routes
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    });
};

export const verifyAdminRole = (req, res, next) => {
    if (req.userRole !== 'ADMIN') {
        console.log('Access denied: User is not an admin');
        return res.status(403).json({ error: 'Access denied: User is not an admin' });
    }
    next();
};
