import {getUserBalanceDAO, updateUserBalanceDAO} from "../shared/daos/users.js";

export const getUserBalanceService = async (userID) => {
    const user = await getUserBalanceDAO(userID);

    if (!user) {
        throw new Error('User not found');
    }

    return user.Balance;
};

export const updateUserBalanceService = async (userID, amount) => {
    if (amount === undefined || isNaN(amount)) {
        throw new Error('Amount is required and must be a number');
    }

    const updatedUser = await updateUserBalanceDAO(userID, amount);

    return updatedUser.Balance;
};
