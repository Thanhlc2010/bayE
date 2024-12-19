import express from 'express';
import { getCarsFavour } from '../shared/daos/favourites.js';

const router = express.Router();

// Route to get favourite cars
router.get('/getfavourcars/:BuyerID', async (req, res) => {
    const { BuyerID } = req.params; // Lấy userID từ route parameters

    // Kiểm tra nếu userID không được cung cấp
    if (!BuyerID) {
        return res.status(400).json({ error: 'userID is required' });
    }

    try {
        // Gọi hàm getCarsFavour để lấy danh sách xe yêu thích
        const result = await getCarsFavour(BuyerID);

        // Kiểm tra nếu không có xe yêu thích
        if (!result.cars || result.cars.length === 0) {
            return res.status(404).json({ message: 'No favourite cars found for this user.' });
        }

        // Trả về danh sách xe yêu thích
        res.status(200).json({ message: 'Favourite cars retrieved successfully', data: result });
    } catch (error) {
        // Xử lý lỗi
        console.error('Error fetching favourite cars:', error.message);
        res.status(500).json({ error: 'Failed to fetch favourite cars', details: error.message });
    }
});

export default router;

