import express from 'express';
import { createFavour, deleteFavour } from '../shared/daos/favourites.js';

const router = express.Router();

// Route to add a favourite
router.post('/addFavour', async (req, res) => {
    const { favourData } = req.body;

    if (!favourData || !favourData.BuyerID || !favourData.CarID) {
        return res.status(400).json({ error: 'BuyerID and CarID are required' });
    }

    try {
        const result = await createFavour(favourData);
        res.status(201).json({ message: 'Favour added successfully', data: result });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add favour', details: error.message });
    }
});

// // Route to delete a favourite
// router.post('/deleteFavour', async (req, res) => {
//     const { favourData } = req.body;

//     if (!favourData || !favourData.BuyerID || !favourData.CarID) {
//         return res.status(400).json({ error: 'BuyerID and CarID are required' });
//     }

//     try {
//         const result = await deleteFavour(favourData);
//         if (result.count === 0) {
//             return res.status(404).json({ message: 'Favour not found' });
//         }
//         res.status(200).json({ message: 'Favour deleted successfully', data: result });
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to delete favour', details: error.message });
//     }
// });

export default router;
