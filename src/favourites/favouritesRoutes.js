//Define routes

import express from 'express';
import { favour } from './favouritesController.js';

const router = express.Router();

// Định nghĩa route cho việc đăng ký tài khoản mới
router.post('/register', favour);

export default router;
