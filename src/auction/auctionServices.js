import {createAuctionDAO, getAuctionDAO} from '../shared/daos/auctions.js';

// Service function to create an auction
export const createAuctionService = async (auctionData) => {
    // Calculate EndTime based on StartTime and Duration
    const startTime = new Date(auctionData.StartTime);
    const durationInMinutes = auctionData.Duration;
    const endTime = new Date(startTime.getTime() + durationInMinutes * 60000);

    // Prepare data for DAO
    const auctionToCreate = {
        Title: auctionData.Title,
        CarID: auctionData.CarID,
        StartTime: startTime,
        Duration: durationInMinutes,
        EndTime: endTime,
        InitialPrice: auctionData.InitialPrice,
        Status: 'NOT_STARTED', // Set initial status
    };

    // Save the auction to the database
    return await createAuctionDAO(auctionToCreate);
};

// Service function to get auction details
export const getAuctionService = async (auctionID) => {
    const auction = await getAuctionDAO(auctionID);

    if (!auction) {
        throw new Error('Auction not found');
    }

    // Format response (optional)
    return {
        AuctionID: auction.AuctionID,
        Title: auction.Title,
        Car: auction.cars,
        StartTime: auction.StartTime,
        EndTime: auction.EndTime,
        InitialPrice: auction.InitialPrice,
        Status: auction.Status,
        Duration: auction.Duration, // Include the Duration field
        Participants: auction.usersAuction.map((ua) => ({
            UserID: ua.UserID,
            Name: ua.users.Name,
        })),
    };
};