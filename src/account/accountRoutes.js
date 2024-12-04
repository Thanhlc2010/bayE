//Define routes

import express from 'express';
import { registerAccount } from './accountController.js';

const router = express.Router();

// [POST] /api/users/register
router.post('/register', registerAccount);

export default router;
