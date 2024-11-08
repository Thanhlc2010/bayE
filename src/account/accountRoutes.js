//Define routes

import express from 'express';
import { registerAccount } from './accountController.js';

const router = express.Router();

// Định nghĩa route cho việc đăng ký tài khoản mới
router.post('/register', registerAccount);

export default router;
