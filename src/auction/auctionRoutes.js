
import express from 'express';
import { getLeaderBoard, updateLeaderBoard } from './auctionController.js';

const router = express.Router();

// [POST] /api/users/register
router.get('/auction/:id', getLeaderBoard);
router.post('/auction/:id', updateLeaderBoard)
export default router;
