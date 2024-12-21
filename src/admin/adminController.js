import { getUserList, getCarList } from './adminService.js';
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