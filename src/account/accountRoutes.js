//Define routes

import express from 'express';
import { uploadMiddleware } from '../shared/middleware/mutterMiddleware.js';
import { registerAccount, loginAccount, userProfile, updateUser } from './accountController.js';

const router = express.Router();

// [POST] /api/users/register
router.post('/register', registerAccount);
router.post('/login', loginAccount);
router.post('/update-profile/:id', uploadMiddleware, updateUser);
router.get('/profile', userProfile);

export default router;
