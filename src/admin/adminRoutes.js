import express from 'express';
import { uploadMiddleware } from '../shared/middleware/mutterMiddleware.js';
import { verifyToken, verifyAdminRole } from '../shared/middleware/authMiddleware.js';
import { userList, carList } from './adminController.js';

const router = express.Router();

// [GET] /api/admin/users
router.get('/users', verifyToken, verifyAdminRole, userList);

// [GET] /api/admin/cars
router.get('/cars', verifyToken, verifyAdminRole, carList);

export default router;
