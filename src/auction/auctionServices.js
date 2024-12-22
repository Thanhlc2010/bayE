import {
    addBuyerToAuctionDAO,
    createAuctionDAO,
    getAuctionByIdDAO,
    getAuctionDAO,
    updateAuctionStatusDAO
} from '../shared/daos/auctions.js';
import prisma from "../prisma/prismaClient.js";
import { getUserProfile } from '../account/accountService.js';

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
    await addBuyerToAuctionDAO(auctionID, userID);
    const userInfo = await getUserProfile(userID)

    // Add the buyer to the auction
    return {userInfo: userInfo, auctionID: auctionID}
};

export const getAuctionByIdService = async (auctionID) => {
    const auction = await getAuctionByIdDAO(auctionID);

    if (!auction) {
        throw new Error('Auction not found');
    }
    const participants = auction.usersAuction.map((ua) => ({
        UserID: ua.UserID,
        Name: ua.users.Name,
    }))
    const participantsInfo = await Promise.all(
        participants.map((participant) => getUserProfile(participant.UserID))
    );
    
    return {
        AuctionID: auction.AuctionID,
        Title: auction.Title,
        Car: auction.cars,
        StartTime: auction.StartTime,
        EndTime: auction.EndTime,
        InitialPrice: auction.InitialPrice,
        Status: auction.Status,
        Duration: auction.Duration,
        Participants: participantsInfo,
    };
};

export const updateAuctionStatusService = async (auctionID, status) => {
    const validStatuses = ['NOT_STARTED', 'OPEN', 'CLOSED', 'FAILED'];

    if (!validStatuses.includes(status)) {
        throw new Error(`Invalid status. Valid statuses are: ${validStatuses.join(', ')}`);
    }

    const updatedAuction = await updateAuctionStatusDAO(auctionID, status);

    if (!updatedAuction) {
        throw new Error('Auction not found');
    }

    return updatedAuction;
};