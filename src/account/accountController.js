// Process request/response

import { registerUser, loginUser, getUserProfile } from './accountService.js';
import { checkDatabaseConnection } from '../shared/daos/users.js';
import jwt from 'jsonwebtoken';
import { updateUserProfile } from './accountService.js';
import { uploadProfilePicture } from '../imagesUpload/cloudinaryImageUpload.js';
import { parse } from 'dotenv';

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

export const userProfile = async (req, res) => {
    try {
        console.log('Received request to get user profile');
        await checkDatabaseConnection();
        const userId = req.userId; // Get user ID from the token

        const user = await getUserProfile(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error('Error getting user profile:', error.message);
        res.status(500).json({ error: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        await checkDatabaseConnection();
        const { id } = req.params;
        const { email, name, address } = req.body;
        let profilePicture;

        if (req.files && req.files['image']) {
            const img = req.files['image'][0];
            // Upload profile picture to Cloudinary
            const result = await uploadProfilePicture(img.path);
            console.log('Profile picture uploaded successfully:', result);
            profilePicture = result;
        }


        const UserId = parseInt(id, 10);

        const user = await updateUserProfile(UserId, { Address: address, ProfilePicture: profilePicture });
        console.log('User updated successfully:', user);
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error('Error updating user profile:', error.message);
        res.status(500).json({ error: error.message });
    }
}

export const getProfilePicture = async (req, res) => {
    try {
        console.log('Received request to get profile picture');
        const { id } = req.params; // Get user ID from the param

        const userId = parseInt(id, 10);

        const user = await getUserProfile(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ profilePicture: user.profilePicture });
    } catch (error) {
        console.error('Error getting profile picture:', error.message);
        res.status(500).json({ error: error.message });
    }
}

export const getUserBidding = async (req, res) => {
    try {
        console.log('Received request to get user profile - bidding');
        const { id } = req.params; // Get user ID from the token

        const userId = parseInt(id, 10);

        const user = await getUserProfile(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error('Error getting user profile:', error.message);
        res.status(500).json({ error: error.message });
    }
};