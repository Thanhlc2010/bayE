import prisma from '../../prisma/prismaClient.js'; // import prismaClient

export const createDriveRequest = async (FormData) => {
    const intCarId = parseInt(FormData.carId, 10);
    try {
        const testdriverequests = await prisma.testdriverequests.create({
            data: {
                name: FormData.name,
                surname: FormData.surname,
                email: FormData.email,
                address: FormData.address,
                buyerId: FormData.buyerId,
                carId: intCarId,
            },
        });
        return testdriverequests;
    } catch (error) {
        throw new Error('Error creating testdriverequests: ' + error.message);
    }
};

export const getDriveRequestsByCarId = async (carId) => {
    try {
        const intCarId = parseInt(carId, 10);
        const driveRequests = await prisma.testdriverequests.findMany({
            where: {
                carId: intCarId, // Lọc theo carId
            },
        });
        return driveRequests;
    } catch (error) {
        throw new Error('Error fetching test drive requests by carId: ' + error.message);
    }
};
