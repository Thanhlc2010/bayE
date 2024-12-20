import express from 'express';
import {createAuction, getAuction} from "./auctionControllers.js";

const router = express.Router();

// Route to create an auction
router.post('/auctions', createAuction);
router.get('/auctions/:id', getAuction);


export default router;