import {createAuctionService, getAuctionService, participateInAuctionService} from './auctionServices.js';
import prisma from '../prisma/prismaClient.js';

// Controller function to create an auction
export const createAuction = async (req, res) => {
    try {
        const { title, initialPrice, duration, startTime, carID } = req.body;

        // Validate input data
        if (!title || !initialPrice || !duration || !startTime || !carID) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if the car exists and belongs to the seller
        const car = await prisma.cars.findUnique({
            where: { CarID: carID },
        });

        if (!car) {
            return res.status(404).json({ error: 'Car not found' });
        }

        // You can add additional checks here, such as verifying the seller's ownership

        // Prepare auction data
        const auctionData = {
            Title: title,
            InitialPrice: parseFloat(initialPrice),
            Duration: parseInt(duration, 10),
            StartTime: startTime,
            CarID: parseInt(carID, 10),
        };

        // Call the service to create the auction
        const newAuction = await createAuctionService(auctionData);

        res.status(201).json({ message: 'Auction created successfully', data: newAuction });
    } catch (error) {
        console.error('Error in createAuction:', error.message);
        res.status(500).json({ error: 'Failed to create auction' });
    }
};

// Controller function to get auction details
export const getAuction = async (req, res) => {
    try {
        const { id } = req.params; // Auction ID from URL

        if (!id) {
            return res.status(400).json({ error: 'Auction ID is required' });
        }

        const auction = await getAuctionService(parseInt(id, 10));

        res.status(200).json({ message: 'Auction fetched successfully', data: auction });
    } catch (error) {
        console.error('Error in getAuction:', error.message);
        res.status(404).json({ error: error.message });
    }
};

export const participateInAuction = async (req, res) => {
    try {
        const { id } = req.params; // AuctionID from the URL
        const { userID } = req.body; // UserID from the request body

        if (!id || !userID) {
            return res.status(400).json({ error: 'Auction ID and UserID are required' });
        }

        // Call the service to handle participation
        const participation = await participateInAuctionService(parseInt(id, 10), parseInt(userID, 10));

        res.status(200).json({
            message: 'Successfully joined the auction',
            data: participation,
        });
    } catch (error) {
        console.error('Error in participateInAuction:', error.message);
        res.status(400).json({ error: error.message });
    }
};
