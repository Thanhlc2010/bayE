import express from 'express';
import { searchCarsByKeywordController } from './searchByKeywordController.js';

const router = express.Router();

// Define the search endpoint
router.get('/search', searchCarsByKeywordController);

export default router;
