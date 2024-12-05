import prisma from '../../prisma/prismaClient.js'; // import prismaClient

export const createFavour = async (favourData) => {
    try {
        // Kiểm tra xem BuyerID có tồn tại trong bảng Buyer không
        const checkBuyer = await prisma.users.findUnique({
            where: { UserID: favourData.BuyerID },
        });

        if (!checkBuyer) {
            throw new Error('Buyer not found');
        }

        // Kiểm tra xem CarID có tồn tại trong bảng Car không
        // const checkCar = await prisma.cars.findUnique({
        //     where: { CarID: favourData.CarID },
        // });

        // if (!checkCar) {
        //     throw new Error('Car not found');
        // }

        // Nếu mọi thứ hợp lệ, tạo bản ghi mới trong bảng favourites
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
        // Xóa bản ghi yêu thích theo BuyerID và CarID
        const deletedFavour = await prisma.favourites.deleteMany({
            where: {
                BuyerID: favourData.BuyerID,
                CarID: favourData.CarID,
            },
        });

        // Kiểm tra nếu không có bản ghi nào bị xóa
        if (deletedFavour.count === 0) {
            throw new Error('No favour found to delete');
        }

        // Trả về thông tin đã xóa
        return {
            message: 'Favour deleted successfully',
            deletedFavour: deletedFavour,
        };
    } catch (error) {
        throw new Error('Error deleting favour: ' + error.message);
    }
};
