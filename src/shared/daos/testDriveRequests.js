import prisma from '../../prisma/prismaClient.js'; // import prismaClient

export const createDriveRequest = async (FormData) => {
    try {
        const testdriverequests = await prisma.testdriverequests.create({
            data: {
                name: FormData.name,
                surname: FormData.surname,
                email: FormData.email,
                address: FormData.address,
                buyerId: FormData.buyerId,
                carId: FormData.carId,
            },
        });
        return testdriverequests;
    } catch (error) {
        throw new Error('Error creating testdriverequests: ' + error.message);
    }
};