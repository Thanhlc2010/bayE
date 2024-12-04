// Process request/response

import { registerUser } from './accountService.js';
import { checkDatabaseConnection } from '../shared/daos/users.js';

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

        const user = await registerUser({ email, password, firstName, lastName, accountType, phone });
        console.log('User created successfully:', user);
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        console.error('Error registering account:', error.message);
        res.status(500).json({ error: error.message });
    }
};
