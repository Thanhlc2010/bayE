import express from 'express';
import accountRoutes from './account/accountRoutes.js';
import buyingRoutes from './buying/buyingRoutes.js';
import cors from 'cors';
import { bigIntMiddleware } from './shared/middleware/bigIntMiddleware.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use(bigIntMiddleware);
app.use(cors());

// Gắn route account vào /api/account
app.use('/api/account', accountRoutes);
app.use('/api', buyingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
