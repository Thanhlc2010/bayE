import {addBuyerToAuctionDAO, createAuctionDAO, getAuctionDAO} from '../shared/daos/auctions.js';
import prisma from "../prisma/prismaClient.js";

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
export const getAuctionService = async () => {
    const auctions = await getAuctionDAO();

    if (!auctions || auctions.length === 0) {
        throw new Error('No auctions found');
    }

    console.log('Fetched auctions:', auctions);

    // Định dạng lại danh sách đấu giá
    return auctions.map((auction) => ({
        AuctionID: auction.AuctionID,
        Title: auction.Title,
        Car: auction.cars,
        StartTime: auction.StartTime,
        EndTime: auction.EndTime,
        InitialPrice: auction.InitialPrice,
        Status: auction.Status,
        Duration: auction.Duration,
        Participants: auction.usersAuction.map((ua) => ({
            UserID: ua.UserID,
            Name: ua.users.Name,
        })),
    }));
};

export const participateInAuctionService = async (auctionID, userID) => {
    // Check if the auction exists and is open
    const auction = await prisma.auctions.findUnique({
        where: { AuctionID: auctionID },
    });

    if (!auction) {
        throw new Error('Auction not found');
    }

    // if (auction.Status === 'OPEN') {
    //     throw new Error('Cannot participate in an auction that is ongoing');
    // }

    // Check if the buyer is already participating
    const existingParticipant = await prisma.usersAuction.findUnique({
        where: {
            AuctionID_UserID: {
                AuctionID: auctionID,
                UserID: userID,
            },
        },
    });

    if (existingParticipant) {
        throw new Error('You are already participating in this auction');
    }

    // Add the buyer to the auction
    return await addBuyerToAuctionDAO(auctionID, userID);
};

export const getAuctionByIdService = async (auctionID) => {
    const auction = await getAuctionByIdDAO(auctionID);

    if (!auction) {
        throw new Error('Auction not found');
    }

    return {
        AuctionID: auction.AuctionID,
        Title: auction.Title,
        Car: auction.cars,
        StartTime: auction.StartTime,
        EndTime: auction.EndTime,
        InitialPrice: auction.InitialPrice,
        Status: auction.Status,
        Duration: auction.Duration,
        Participants: auction.usersAuction.map((ua) => ({
            UserID: ua.UserID,
            Name: ua.users.Name,
        })),
    };
};