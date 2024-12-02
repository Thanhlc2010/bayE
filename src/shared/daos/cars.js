import prisma from '../../prisma/prismaClient.js';

// DAO function to get all cars
export const getAllCarsDAO = async ({ filter = {}, sortBy = 'CarID', order = 'asc' }) => {
    try {
        // Prisma query to fetch cars with filtering and sorting
        const cars = await prisma.cars.findMany({
            where: {
                ...filter, // Dynamic filtering
            },
            orderBy: {
                [sortBy]: order, // Dynamic sorting
            },
            include: {
                carmakes: true,  // Include related car make details
                carmodels: true, // Include related car model details
                users_cars_SellerIDTousers: true // Include related Seller information details
            },
        });

        return cars;
    } catch (error) {
        console.error('Error in carDAO.getAllCars:', error.message);
        throw error; // Pass the error back to the service layer
    } finally {
        await prisma.$disconnect(); // Disconnect Prisma client
    }
};

// DAO to get a car by ID
export const getCarByIdDAO = async (id) => {
    try {
        const car = await prisma.cars.findUnique({
            where: {
                CarID: id, // Match the CarID with the provided ID
            },
            include: {
                carmakes: true,  // Include car make details
                carmodels: true, // Include car model details
                users_cars_SellerIDTousers: true, // Include seller info
            },
        });

        return car; // Return the car if found
    } catch (error) {
        console.error('Error in getCarByIdDAO:', error.message);
        throw error; // Re-throw error to service layer
    } finally {
        await prisma.$disconnect(); // Disconnect Prisma client
    }
};
