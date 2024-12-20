import prisma from '../../prisma/prismaClient.js';

// DAO function to create an auction
export const createAuctionDAO = async (auctionData) => {
    return prisma.auctions.create({
        data: auctionData,
    });
};

export const getAuctionDAO = async (auctionID) => {
    return prisma.auctions.findUnique({
        where: {
            AuctionID: auctionID,
        },
        include: {
            cars: true, // Include car details
            usersAuction: {
                include: {
                    users: true, // Include participant details
                },
            },
        },
    });
};

// DAO function to add a buyer to an auction
export const addBuyerToAuctionDAO = async (auctionID, userID) => {
    return prisma.usersAuction.create({
        data: {
            AuctionID: auctionID,
            UserID: userID,
        },
    });
};