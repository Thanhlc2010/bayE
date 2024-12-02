//Define routes

import express from 'express';
import {getCars, getCar} from './buyingController.js';

const router = express.Router();

// Get all cars route
router.get('/cars', getCars);

// Get car route
router.get('/cars/:id', getCar);

export default router;
