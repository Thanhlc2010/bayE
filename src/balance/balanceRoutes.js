import express from 'express';
import {getBalance, updateBalance} from "./balanceControllers.js";

const router = express.Router();

router.get('/:userID/balance', getBalance);
router.post('/update-balance', updateBalance);

export default router;
