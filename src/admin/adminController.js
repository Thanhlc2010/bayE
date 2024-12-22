import { getUserList, getCarList, removeCar, removeUser } from './adminService.js';
import { checkDatabaseConnection } from '../shared/daos/users.js';

export const userList = async (req, res) => {
    try {
        console.log('Received request to get user list');
        await checkDatabaseConnection();
        const users = await getUserList();
        res.status(200).json({ users });
    } catch (error) {
        console.error('Error getting user list:', error.message);
        res.status(500).json({ error: error.message });
    }
};

export const carList = async (req, res) => {
    try {
        console.log('Received request to get car list');
        await checkDatabaseConnection();
        const cars = await getCarList();
        res.status(200).json({ cars });
    } catch (error) {
        console.error('Error getting car list:', error.message);
        res.status(500).json({ error: error.message });
    }
};

export const deleteCar = async (req, res) => {
    try {
        console.log('Received request to delete car:', req.params);
        await checkDatabaseConnection();
        const { id } = req.params;
        const carId = parseInt(id, 10);
        const deletedCar = await removeCar(carId);
        res.status(200).json({ message: 'Car deleted successfully', deletedCar });
    } catch (error) {
        console.error('Error deleting car:', error.message);
        res.status(500).json({ error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        console.log('Received request to delete user:', req.params);
        await checkDatabaseConnection();
        const { id } = req.params;
        const userId = parseInt(id, 10);
        const deletedUser = await removeUser(userId);
        res.status(200).json({ message: 'User deleted successfully', deletedUser });
    } catch (error) {
        console.error('Error deleting user:', error.message);
        res.status(500).json({ error: error.message });
    }
};

