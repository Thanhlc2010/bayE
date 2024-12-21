import { findAllUsers, findAllCars } from '../shared/daos/admin.js';

export const getUserList = async () => {
    try {
        const users = await findAllUsers();
        return users;
    } catch (error) {
        throw new Error('Error getting user list: ' + error.message);
    }
};

export const getCarList = async () => {
    try {
        const cars = await findAllCars();
        return cars;
    } catch (error) {
        throw new Error('Error getting car list: ' + error.message);
    }
};