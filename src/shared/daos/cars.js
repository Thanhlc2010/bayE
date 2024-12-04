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

export const createCar = async (carData) => {
    try {
        // await createCarModelIfNotExist(carData.brand, carData.carLine);

        const car = await prisma.cars.create({
            data: {
                Title: carData.title,
                Price: parseFloat(carData.price),
                Gearbox: carData.gearbox,
                FuelType: carData.fuelType,
                Description: carData.description,
                Condition: carData.status.toUpperCase(),
                Status: "selling",
                KilometersCount: carData.kilometersCount,
                NumberOwners: carData.previousOwners,
                LicensePlate: carData.licensePlate,
                RegistrationStatus: carData.registrationStatus.toLowerCase(),
                MadeIn: carData.madeIn,
                // Brand: carData.brand,
                // CarLine: carData.carLine,
                FactoryYear: parseInt(carData.factoryYear),
                EngineCapacity: parseFloat(carData.engineCapacity),
                SeatNumber: carData.seatNumber,
                DoorNumber: carData.numberOfDoors,
                Weight: parseFloat(carData.weight),
                InstallmentLengthMin: carData.installmentLengthStart,
                InstallmentLengthMax: carData.installmentLengthEnd,
                MonthlyInstallmentMin: carData.monthlyInstallmentStart,
                MonthlyInstallmentMax: carData.monthlyInstallmentEnd,
                InterestRateMin: carData.interestRateStart,
                InterestRateMax: carData.interestRateEnd,
                // Include relationships if applicable (example below)
                carmakes: carData.brand
                    ? {
                          connect: {
                              Name: carData.brand, // Assuming 'Name' is the unique field for carmakes
                          },
                      }
                    : undefined,
                carmodels: carData.carLine
                    ? {
                          connect: {
                              Name: carData.carLine, // Assuming 'Name' is the unique field for carmodels
                          },
                      }
                    : undefined,
                // Optional image or related data handling if required
                images: carData.images.map((imagePath) => (imagePath)),
                
            },
        });
        console.log({carData})

        // console.log("Car created successfully:", car.CarID);
        return car.CarID; // Return the created car record if needed
    } catch (error) {
        console.error("Error creating car:", error);
        throw new Error("Error creating car: " + error.message);
    }
};

