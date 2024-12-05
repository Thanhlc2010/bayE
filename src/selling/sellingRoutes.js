import { addCar } from './sellingController.js'
import { uploadMiddleware } from '../shared/middleware/mutterMiddleware.js';
import express from 'express'
const router = express.Router();

// Route: POST /api/cars
router.post('/cars', uploadMiddleware, addCar);

export default router;
