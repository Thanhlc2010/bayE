import {getUserBalanceService, updateUserBalanceService} from "./balanceServices.js";

export const getBalance = async (req, res) => {
    try {
        const { userID } = req.params;

        if (!userID) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const balance = await getUserBalanceService(userID);

        res.status(200).json({ balance });
    } catch (error) {
        console.error('Error in getBalance:', error.message);
        res.status(404).json({ error: error.message });
    }
};

export const updateBalance = async (req, res) => {
    try {
        const { userID, amount } = req.body;

        if (!userID || amount === undefined) {
            return res.status(400).json({ error: 'User ID and amount are required' });
        }

        const updatedBalance = await updateUserBalanceService(userID, parseFloat(amount));

        res.status(200).json({ message: 'Balance updated successfully', balance: updatedBalance });
    } catch (error) {
        console.error('Error in updateBalance:', error.message);
        res.status(400).json({ error: error.message });
    }
};
