//Business Logic

import bcrypt from 'bcrypt';
import { createUser, findUserByEmail, findUserById, updateUser, deleteUser } from '../shared/daos/users.js';
import { uploadProfilePicture } from '../imagesUpload/cloudinaryImageUpload.js';

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
            address: user.Address || null,
            profilePicture: user.ProfilePicture || null,
        };
    } catch (error) {
        throw new Error('Error logging in user: ' + error.message);
    }
};

export const getUserProfile = async (userId) => {
    try {
        // Find user by ID
        const user = await findUserById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Return user data (excluding password hash)
        return {
            id: user.UserID,
            email: user.Email,
            name: user.Name,
            role: user.Role,
            phone: user.Phone,
            address: user.Address,
            profilePicture: user.ProfilePicture || 'https://res.cloudinary.com/dhgwdfhcf/image/upload/v1734632425/profilePictures/wvk5hiy5xtwydttzqxa3.jpg',
        };
    } catch (error) {
        throw new Error('Error getting user profile: ' + error.message);
    }
}

export const updateUserProfile = async (UserID, updateData) => {
    try {        
        // Update user data
        const updatedUser = await updateUser(UserID, updateData);
        if (!updatedUser) {
            throw new Error('User not found');
        }

        // Return user data (excluding password hash)
        return {
            id: updatedUser.UserID,
            email: updatedUser.Email,
            name: updatedUser.Name,
            role: updatedUser.Role,
            phone: updatedUser.Phone,
            profilePicture: updatedUser.ProfilePicture || null,
        };
    } catch (error) {
        throw new Error('Error updating user profile: ' + error.message);
    }
}

export const updatePassword = async (userId, oldPassword, newPassword) => {
    try {
        // Find user by ID
        const user = await findUserById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Compare old password with hashed password
        const isPasswordValid = await bcrypt.compare(oldPassword, user.PasswordHash);
        if (!isPasswordValid) {
            throw new Error('Invalid old password');
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user password
        const updatedUser = await updateUser(userId, { PasswordHash: hashedPassword });
        if (!updatedUser) {
            throw new Error('User not found');
        }

        return {
            id: updatedUser.UserID,
            email: updatedUser.Email,
            name: updatedUser.Name,
            role: updatedUser.Role,
            phone: updatedUser.Phone,
            // profilePicture: updatedUser.ProfilePicture || null,
        };
    } catch (error) {
        throw new Error('Error updating user password: ' + error.message);
    }
}

// export const deleteUser = async (userId) => {
//     try {
//         // Delete user by ID
//         const deletedUser = await prisma.users.delete({
//             where: { UserID: BigInt(userId) },
//         });

//         return {
//             id: deletedUser.UserID,
//             email: deletedUser.Email,
//             name: deletedUser.Name,
//             role: deletedUser.Role,
//             phone: deletedUser.Phone,
//             profilePicture: deletedUser.ProfilePicture || null,
//         };
//     } catch (error) {
//         throw new Error('Error deleting user: ' + error.message);
//     }
// }

// export const uploadProfilePicture = async (userId, file) => {
//     try {
//         // Update user profile picture
//         const updatedUser = await updateUser(userId, { ProfilePicture: file.path });
//         if (!updatedUser) {
//             throw new Error('User not found');
//         }

//         return {
//             id: updatedUser.UserID,
//             email: updatedUser.Email,
//             name: updatedUser.Name,
//             role: updatedUser.Role,
//             phone: updatedUser.Phone,
//             // profilePicture: updatedUser.ProfilePicture || null,
//         };
//     } catch (error) {
//         throw new Error('Error uploading profile picture: ' + error.message);
//     }
// }
