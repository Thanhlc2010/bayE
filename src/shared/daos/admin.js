import prisma from '../../prisma/prismaClient.js'; // Ensure this import is correct

export const findAllUsers = async () => {
    try {
        const users = await prisma.users.findMany({
            select: {
                UserID: true,
                Email: true,
                Name: true,
                Role: true,
                Phone: true,
                ProfilePicture: true,
                Address: true,
                CreatedAt: true,
            },
        });
        return users;
    } catch (error) {
        throw new Error('Error getting user list: ' + error.message);
    }
};

export const findAllCars = async () => {
    try {
        const cars = await prisma.cars.findMany({
            select: {
                CarID: true,
                MakeID: true,
                ModelID: true,
                FactoryYear: true,
                Price: true,
                SellerID: true,
                BuyerID: true,
                CreatedAt: true,
            },
        });
        return cars;
    } catch (error) {
        throw new Error('Error getting car list: ' + error.message);
    }
};