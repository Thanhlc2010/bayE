//Database access using Prisma client (CRUD)

import prisma from '../../prisma/prismaClient.js'; // import prismaClient

export const createUser = async (userData) => {
    try {
        const user = await prisma.users.create({
            data: {
                Email: userData.email,
                PasswordHash: userData.password,
                Name: userData.name,
                Role: userData.role,
                Phone: userData.phone,
                CreatedAt: userData.createdAt,
            },
        });
        return user;
    } catch (error) {
        throw new Error('Error creating user: ' + error.message);
    }
};

// Tìm user theo email
export const findUserByEmail = async (email) => {
    try {
        return await prisma.users.findUnique({
            where: { Email: email },
        });
    } catch (error) {
        throw new Error('Error finding user by email: ' + error.message);
    }
};

// Tìm user theo email
export const findUserByPhone = async (phone) => {
    try {
        return await prisma.users.findUnique({
            where: { Phone: phone },
        });
    } catch (error) {
        throw new Error('Error finding user by phone: ' + error.message);
    }
};


// Tìm user theo UserID
export const findUserById = async (userId) => {
    try {
        return await prisma.users.findUnique({
            where: { UserID: BigInt(userId) },
        });
    } catch (error) {
        throw new Error('Error finding user by ID: ' + error.message);
    }
};

// Cập nhật thông tin user
export const updateUser = async (userId, updateData) => {
    try {
        const updatedUser = await prisma.users.update({
            where: { UserID: BigInt(userId) },
            data: updateData,
        });
        return updatedUser;
    } catch (error) {
        throw new Error('Error updating user: ' + error.message);
    }
};

// Xóa user
export const deleteUser = async (userId) => {
    try {
        await prisma.users.delete({
            where: { UserID: BigInt(userId) },
        });
        return { message: 'User deleted successfully' };
    } catch (error) {
        throw new Error('Error deleting user: ' + error.message);
    }
};

// Check database connection status
export const checkDatabaseConnection = async () => {
    try {
        await prisma.$connect();
        console.log('Database connection successful');
    } catch (error) {
        console.error('Error connecting to the database: ' + error.message);
    } finally {
        await prisma.$disconnect();
    }
};


export const getUserBalanceDAO = async (userID) => {
    return prisma.users.findUnique({
        where: {UserID: parseInt(userID, 10)},
        select: {Balance: true},
    });
};

export const updateUserBalanceDAO = async (userID, amount) => {
    return prisma.users.update({
        where: {UserID: parseInt(userID, 10)},
        data: {Balance: amount},
    });
};
