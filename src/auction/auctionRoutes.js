import express from 'express';
import {createAuction, getAuction, getAuctionById, participateInAuction} from "./auctionControllers.js";

const router = express.Router();

// Route to create an auction
router.post('/auctions', createAuction);
router.get('/getAuctions', getAuction);
router.post('/auctions/:id/participate', participateInAuction);
router.get('/auctions/:id', getAuctionById);

export default router;