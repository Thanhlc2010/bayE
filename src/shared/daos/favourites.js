import prisma from '../prisma/prismaClient.js'; // import prismaClient

export const createFavour = async (favourData) => {
    try {
        const user = await prisma.favourites.create({
            data: {
                BuyerID: favourData.BuyerID,
                CarID: favourData.CarID,
            },
        });
        return user;
    } catch (error) {
        throw new Error('Error creating favour: ' + error.message);
    }
};

export const deleteFavour = async (favourData) => {
    try {
        const deletedFavour = await prisma.favourites.deleteMany({
            where: {
                BuyerID: favourData.BuyerID,
                CarID: favourData.CarID,
            },
        });
        return deletedFavour;
    } catch (error) {
        throw new Error('Error deleting favour: ' + error.message);
    }
};

// export default router;
