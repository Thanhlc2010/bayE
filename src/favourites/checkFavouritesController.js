import express from 'express';
import { isFavourExists } from '../shared/daos/favourites.js';

const router = express.Router();

router.get('/checkFavour', async (req, res) => {
    try {
        const { carId, buyerId } = req.query;

        // Kiểm tra nếu thiếu tham số
        if (!carId || !buyerId) {
            return res.status(400).json({ error: 'Missing carId or buyerId' });
        }

        // Chuyển đổi carId và buyerId thành số
        const carIdInt = parseInt(carId, 10);
        const buyerIdInt = parseInt(buyerId, 10);

        // Kiểm tra nếu không phải số hợp lệ
        if (isNaN(carIdInt) || isNaN(buyerIdInt)) {
            return res.status(400).json({ error: 'Invalid carId or buyerId' });
        }

        // Kiểm tra sự tồn tại của bản ghi
        const exists = await isFavourExists(carIdInt, buyerIdInt);

        // Trả về kết quả
        res.status(200).json({ exists });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error: ' + error.message });
    }
});


export default router;
