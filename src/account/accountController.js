// Process request/response

import { registerUser, loginUser } from './accountService.js';
import { checkDatabaseConnection } from '../shared/daos/users.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET; // Replace with your actual secret key

export const registerAccount = async (req, res) => {
    try {
        console.log('Received request to register account:', req.body);
        await checkDatabaseConnection();
        const { email, password, firstName, lastName, accountType, phone } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!email || !password) {
            console.log('Validation failed: Email and password are required');
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const name = `${firstName} ${lastName}`;
        let role;
        if (accountType === 'Seller') {
            role = 'SELLER';
        } else if (accountType === 'Buyer') {
            role = 'BUYER';
        } else {
            console.log('Validation failed: Invalid account type');
            return res.status(400).json({ error: 'Invalid account type' });
        }
        const createdAt = new Date();

        const user = await registerUser({ email, password, name, role, phone, createdAt });
        console.log('User created successfully:', user);
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        console.error('Error registering account:', error.message);
        res.status(500).json({ error: error.message });
    }
};

export const loginAccount = async (req, res) => {
    try {
        console.log('Received request to login:', req.body);
        await checkDatabaseConnection();
        const { email, password } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!email || !password) {
            console.log('Validation failed: Email and password are required');
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await loginUser(email, password);
        console.log('User logged in successfully:', user);

        // Generate access token
        const accessToken = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'User logged in successfully', user, accessToken });
    } catch (error) {
        console.error('Error logging in:', error.message);
        res.status(500).json({ error: error.message });
    }
};
