import prisma from '../prisma/prismaClient.js'; // import prismaClient

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

