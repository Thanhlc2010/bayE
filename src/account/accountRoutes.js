//Define routes

import express from 'express';
import { uploadMiddleware } from '../shared/middleware/mutterMiddleware.js';
import { registerAccount, loginAccount, userProfile, updateUser } from './accountController.js';
import { verifyToken } from '../shared/middleware/authMiddleware.js';

const router = express.Router();

// [POST] /api/users/register
router.post('/register', registerAccount);
router.post('/login', loginAccount);
router.post('/update-profile/:id', uploadMiddleware, updateUser);
router.get('/profile', verifyToken, userProfile);

export default router;
