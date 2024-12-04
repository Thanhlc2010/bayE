//Business Logic

import bcrypt from 'bcrypt';
import { createUser } from '../shared/daos/users.js';

export const registerUser = async (userData) => {
    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        // Chuẩn bị dữ liệu user với password đã được hash
        const user = await createUser({
            email: userData.email,
            easswordHash: hashedPassword,
            firstName: userData.firstName,
            lastName: userData.lastName,
            accountType: userData.accountType,
            phone: userData.phone,
        });

        return user;
    } catch (error) {
        throw new Error('Error registering user: ' + error.message);
    }
};
