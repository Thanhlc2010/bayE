import prisma from '../../prisma/prismaClient.js';

// DAO function to create an auction
export const createAuctionDAO = async (auctionData) => {
    return prisma.auctions.create({
        data: auctionData,
    });
};

export const getAuctionDAO = async () => {
    return prisma.auctions.findMany({
        where: {
            Status: {
                in: ['NOT_STARTED', 'OPEN'], // Lọc trạng thái là NOT_STARTED hoặc OPEN
            },
        },
        include: {
            cars: true, // Bao gồm chi tiết xe
            usersAuction: {
                include: {
                    users: true, // Bao gồm chi tiết người tham gia
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

// export const getAuctionByIdDAO = async (auctionID) => {
//     return prisma.auctions.findUnique({
//         where: {
//             AuctionID: auctionID,
//         },
//         include: {
//             cars: true, // Include car details
//             usersAuction: {
//                 include: {
//                     users: true, // Include participant details
//                 },
//             },
//         },
//     });
// };