//Business Logic

import bcrypt from 'bcrypt';
import { createUser, findUserByEmail } from '../shared/daos/users.js';

export const registerUser = async (userData) => {
    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        // Chuẩn bị dữ liệu user với password đã được hash
        const user = await createUser({
            email: userData.email,
            password: hashedPassword,
            name: userData.name,
            role: userData.role,
            phone: userData.phone,
            createdAt: userData.createdAt,
        });

        return user;
    } catch (error) {
        throw new Error('Error registering user: ' + error.message);
    }
};

export const loginUser = async (email, password) => {
    try {
        // Find user by email
        const user = await findUserByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }

        // Compare password with hashed password
        const isPasswordValid = await bcrypt.compare(password, user.PasswordHash);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        // Return user data (excluding password hash)
        return {
            id: user.UserID,
            email: user.Email,
            name: user.Name,
            role: user.Role,
            phone: user.Phone,
        };
    } catch (error) {
        throw new Error('Error logging in user: ' + error.message);
    }
};
