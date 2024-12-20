import prisma from '../../prisma/prismaClient.js';
import {MAX_PAGE_SIZE} from "../../util/constants.js";


// DAO function to get all cars
export const getAllCarsDAO = async ({ filter = {}, sortBy = 'CreatedAt', order = 'desc' }) => {
    try {
        // Prisma query to fetch cars with filtering and sorting
        // Page is 0-based index
        const { Page, MakeName, ModelName, min, max, ...params} = filter;
        const page = Page ? Page : 0;
        console.log(`Received filter params: ${filter}`);
        const priceFilter = {};
        if (min) {
            priceFilter.gte = parseFloat(min);
        }
        if (max) {
            priceFilter.lte = parseFloat(max);
        }

        const queryArgs = {
            where: {
                ...params, // Dynamic filtering
                carmakes: {
                    Name: {
                        contains: MakeName,
                    }
                },
                Price: priceFilter,
                carmodels: {
                    Name: {
                        contains: ModelName
                    }
                }
            },
            orderBy: {
                [sortBy]: order, // Dynamic sorting
            },
            skip: page * MAX_PAGE_SIZE,
            take: MAX_PAGE_SIZE,
            include: {
                carmakes: true,  // Include related car make details
                carmodels: true, // Include related car model details
                users_cars_SellerIDTousers: true // Include related Seller information details
            },
        }
        const totalCars = await prisma.cars.count({ where: queryArgs.where });
        const totalPage = Math.ceil(totalCars / MAX_PAGE_SIZE);
        const cars = await prisma.cars.findMany(queryArgs);
        return { cars, currentPage : parseInt(page), pageSize : MAX_PAGE_SIZE, totalPage};
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
                EngineCapacity: carData.engineCapacity,
                SeatNumber: carData.seatNumber,
                DoorNumber: carData.numberOfDoors,
                Weight: carData.weight,
                InstallmentLengthMin: carData.installmentLengthStart,
                InstallmentLengthMax: carData.installmentLengthEnd,
                MonthlyInstallmentMin: carData.monthlyInstallmentStart,
                MonthlyInstallmentMax: carData.monthlyInstallmentEnd,
                InterestRateMin: carData.interestRateStart,
                InterestRateMax: carData.interestRateEnd,
                users_cars_SellerIDTousers: {
                    connect: {
                        UserID: carData.sellerId,
                    },
                  },
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


        // console.log("Car created successfully:", car.CarID);
        return car.CarID; // Return the created car record if needed
    } catch (error) {
        console.error("Error creating car:", error);
        throw new Error("Error creating car: " + error.message);
    }
};

// Add images to existing car by CarID
export const addCarImages = async (carId, imageUrls) => {
    try {
        const car = await prisma.cars.update({
            where: { CarID: parseInt(carId) },
            data: { images: imageUrls },
        });
        return car;
    } catch (error) {
        console.error('Error saving car images (daos):', error.message);
        throw error;
    }
};

// DAO function to search for cars by keyword
export const searchCarsByKeywordDAO = async (keyword) => {
    return await prisma.cars.findMany({
        where: {
            OR: [
                {
                    carmakes: {
                        Name: {
                            contains: keyword, // Match car make
                        },
                    },
                },
                {
                    carmodels: {
                        Name: {
                            contains: keyword, // Match car model
                        },
                    },
                },
            ],
        },
        include: {
            carmakes: true, // Include related car make details
            carmodels: true, // Include related car model details
        },
    });
};

export const getCarBySellerDAO = async (seller_id) => {
    console.log({seller_id})
    return await prisma.cars.findMany({
        where: {
            SellerID: Number(seller_id),
        },
        include: {
            carmakes: true, // Include related car make details
            carmodels: true, // Include related car model details
        },  
    })
}