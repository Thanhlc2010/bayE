import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import path from 'path'
import accountRoutes from './account/accountRoutes.js';
import buyingRoutes from './buying/buyingRoutes.js';
import sellingRoutes from './selling/sellingRoutes.js';
import imageRoutes from './imagesUpload/imageUploadRoutes.js';
import addFavour from './favourites/favouritesAddController.js';
import delFavour from './favourites/favouriteDelController.js';
import driveRequest from './buying/driveRequestController.js'
import searchByKeywordRoutes from "./searchByKeyword/searchByKeywordRoutes.js";
import { bigIntMiddleware } from './shared/middleware/bigIntMiddleware.js';

import dotenv from 'dotenv';
dotenv.config();
const __dirname = path.resolve(path.dirname('')); 
const app = express();
app.use(bigIntMiddleware);
app.use(cors())

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'src/dist')));

app.use('/api/users', accountRoutes);
app.use('/api', buyingRoutes);
app.use('/api/favour', addFavour);
app.use('/api/favour', delFavour);
app.use('/api/', driveRequest);
app.use('/api/seller', sellingRoutes);
app.use('/api', searchByKeywordRoutes);

app.use('/api', imageRoutes);
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "src/dist", "index.html"));
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
