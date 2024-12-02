import express from 'express';
import cors from 'cors';
// import dotenv from 'dotenv';
import 'dotenv/config';
import accountRoutes from './account/accountRoutes.js';
import favour from './favourites/favouritesController.js'
import { bigIntMiddleware } from './shared/middleware/bigIntMiddleware.js';


const app = express();
app.use(express.json());
app.use(bigIntMiddleware);
// app.use(dotenv);
// app.use(cors);

// Gắn route account vào /api/account
app.use('/api/account', accountRoutes);

app.use('/api/favour', favour);

console.log(process.env.PORT);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// console.log(process.env.PORT);