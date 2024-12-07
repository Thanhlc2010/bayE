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

export const getCarsFavour = async (BuyerID) => {
    try {
        // Kiểm tra nếu BuyerID không hợp lệ
        if (!BuyerID) {
            throw new Error('Buyer ID is required');
        }

        // Truy vấn danh sách xe yêu thích với các thông tin title, price, và images từ bảng cars
        const favouriteCars = await prisma.favourites.findMany({
            where: { BuyerID: parseInt(BuyerID, 10) },
            include: {
                cars: { // Truy vấn quan hệ `cars`
                    select: {
                        CarID: true,
                        Title: true,
                        Price: true,
                        images: true,
                    },
                },
            },
        });

        // Kiểm tra nếu không có bản ghi nào
        if (favouriteCars.length === 0) {
            return {
                success: true,
                message: 'No favourite cars found for the given user.',
                cars: [],
            };
        }

        // Map kết quả để lấy thông tin title, price, và images
        const cars = favouriteCars.map((fav) => ({
            CarID: fav.cars.CarID,
            title: fav.cars.Title,
            price: fav.cars.Price,
            images: fav.cars.images,
        }));

        // Trả về danh sách xe
        return {
            success: true,
            cars,
        };
    } catch (error) {
        console.error('Error fetching favourites:', error.message);
        throw new Error('Internal Server Error: ' + error.message);
    }
};

