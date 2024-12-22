import express from 'express';
import { createDriveRequest, getDriveRequestsByCarId } from '../shared/daos/testDriveRequests.js';

const router = express.Router();

// Route to create a drive request
router.post('/driveRequest', async (req, res) => {
    const { FormData } = req.body;

    if (!FormData || !FormData.name || !FormData.surname || !FormData.email || !FormData.address) {
        return res.status(400).json({ error: 'FormData are required' });
    }

    try {
        const result = await createDriveRequest(FormData);
        res.status(200).json({ message: 'Create Drive Request successfully', data: result });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create Drive Request', details: error.message });
    }
});

// Route to get drive requests by car ID
router.get('/driveRequests/:carId', async (req, res) => {
    const { carId } = req.params;

    if (!carId) {
        return res.status(400).json({ error: 'Car ID is required' });
    }

    try {
        const driveRequests = await getDriveRequestsByCarId(carId);
        
        // Return an empty array instead of a 404 if no drive requests are found
        res.status(200).json({ data: driveRequests || [] });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch drive requests', details: error.message });
    }
});

export default router;
