import { addCar, getCarBySeller } from './sellingController.js'
import { uploadMiddleware } from '../shared/middleware/mutterMiddleware.js';
import express from 'express'
const router = express.Router();

// Route: POST /api/cars
router.post('/cars', uploadMiddleware, addCar);
router.get('/cars/:id', getCarBySeller)
export default router;
