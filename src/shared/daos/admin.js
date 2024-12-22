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
            include: {
                carmakes: {
                    select: {
                        Name: true, // Include car make name
                    },
                },
                carmodels: {
                    select: {
                        Name: true, // Include car model name
                    },
                },
                users_cars_SellerIDTousers: {
                    select: {
                        UserID: true,
                        Email: true,
                        Name: true,
                    },
                },
                users_cars_BuyerIDTousers: {
                    select: {
                        UserID: true,
                        Email: true,
                        Name: true,
                    },
                },
            },
        });
        return cars;
    } catch (error) {
        console.error('Error in adminDAO.findAllCars:', error.message);
        throw error; // Pass the error back to the service layer
    } finally {
        await prisma.$disconnect(); // Disconnect Prisma client
    }
};