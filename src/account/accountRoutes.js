//Define routes

import express from 'express';
import { uploadMiddleware } from '../shared/middleware/mutterMiddleware.js';
import { registerAccount, loginAccount, userProfile, updateUser, getProfilePicture, getUserBidding } from './accountController.js';
import { verifyToken } from '../shared/middleware/authMiddleware.js';

const router = express.Router();

// [POST] /api/users/register
router.post('/register', registerAccount);
router.post('/login', loginAccount);
router.post('/update-profile/:id', uploadMiddleware, updateUser);
router.get('/profile', verifyToken, userProfile);
router.get('/profile-picture/:id', getProfilePicture);

// [GET] /api/users/user (for bidding)
router.get('/user/:id', getUserBidding);

export default router;
