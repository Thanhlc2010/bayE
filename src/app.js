import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import accountRoutes from './account/accountRoutes.js';
import sellingRoutes from './selling/sellingRoutes.js';
import addFavour from './favourites/favouritesAddController.js';
import delFavour from './favourites/favouriteDelController.js';
import { bigIntMiddleware } from './shared/middleware/bigIntMiddleware.js';

console.log(process.env.DATABASE_URL);
console.log("hihi");
const app = express();
app.use(express.json());
app.use(bigIntMiddleware);
// app.use(dotenv);
// app.use(cors);

// Gắn route account vào /api/account
app.use('/api/account', accountRoutes);

app.use('/api/favour', addFavour);
app.use('/api/favour', delFavour);

console.log(process.env.PORT);


// dataMake()
const PORT = process.env.PORT || 3306;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// console.log(process.env.PORT);