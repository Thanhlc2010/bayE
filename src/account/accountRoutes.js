//Define routes

import express from 'express';
import { registerAccount, loginAccount } from './accountController.js';

const router = express.Router();

// [POST] /api/users/register
router.post('/register', registerAccount);
router.post('/login', loginAccount);

export default router;
