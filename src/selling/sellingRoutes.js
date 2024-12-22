import { addCar, getCarBySeller } from './sellingController.js'
import { uploadMiddleware } from '../shared/middleware/mutterMiddleware.js';
import express from 'express'
const router = express.Router();

// Route: POST /api/cars
router.post('/cars', uploadMiddleware, addCar);
router.get('/cars/user/:id', getCarBySeller)
router.get('/helloworld/', (req, res) => {
    console.log("HEllo world")    
    res.send("Hello world")

})
export default router;
