import { findAllUsers, findAllCars } from '../shared/daos/admin.js';
import { deleteCar } from '../shared/daos/cars.js';
import { deleteUser } from '../shared/daos/users.js';

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

export const removeCar = async (carId) => {
    try {
        const deletedCar = await deleteCar(carId);
        return deletedCar;
    } catch (error) {
        throw new Error('Error deleting car: ' + error.message);
    }
};

export const removeUser = async (userId) => {
    try {
        const deletedUser = await deleteUser(userId);
        return deletedUser;
    } catch (error) {
        throw new Error('Error deleting user: ' + error.message);
    }
};  