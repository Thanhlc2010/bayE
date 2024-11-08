// Process request/response

import { registerUser } from './accountService.js';

export const registerAccount = async (req, res) => {
    try {
        const { email, password, name, role } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await registerUser({ email, password, name, role });
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
