import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import accountRoutes from './account/accountRoutes.js';
import sellingRoutes from './selling/sellingRoutes.js';
import addFavour from './favourites/favouritesAddController.js';
import delFavour from './favourites/favouriteDelController.js';
import { bigIntMiddleware } from './shared/middleware/bigIntMiddleware.js';

console.log(process.env.DATABASE_URL)
const app = express();
app.use(express.json());
app.use(bigIntMiddleware);
app.use(cors())
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/api/account', accountRoutes);
app.use('/api/favour', addFavour);
app.use('/api/favour', delFavour);

app.use('/api/', sellingRoutes);


// dataMake()
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
