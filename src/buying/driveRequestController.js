import express from 'express';
import { createDriveRequest } from '../shared/daos/testDriveRequests.js';

const router = express.Router();

// Route to delete a favourite
router.post('/driveRequest', async (req, res) => {
    const { FormData } = req.body;

    if (!FormData || !FormData.name || !FormData.surname || !FormData.email || !FormData.address) {
        return res.status(400).json({ error: 'FormData are required' });
    }

    try {
        const result = await createDriveRequest(FormData);
        res.status(200).json({ message: 'create Drive Request successfully', data: result });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create Drive Request', details: error.message });
    }
});

export default router;