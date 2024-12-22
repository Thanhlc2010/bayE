import express from 'express';
import {
    createAuction,
    getAuction,
    getAuctionById,
    participateInAuction,
    updateAuctionStatus
} from "./auctionControllers.js";

const router = express.Router();

// Route to create an auction
router.post('/auctions', createAuction);
router.get('/getAuctions', getAuction);
router.post('/auctions/:id/participate', participateInAuction);
router.get('/auctions/:id', getAuctionById);
router.post('/auctions/:id/update', updateAuctionStatus);


export default router;