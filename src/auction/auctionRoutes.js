import express from 'express';
import {createAuction, getAuction, participateInAuction} from "./auctionControllers.js";

const router = express.Router();

// Route to create an auction
router.post('/auctions', createAuction);
router.get('/auctions/:id', getAuction);
router.post('/auctions/:id/participate', participateInAuction);

export default router;