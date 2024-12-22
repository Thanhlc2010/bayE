import {getAllCarsDAO, getCarByIdDAO} from "../shared/daos/cars.js";

// Service function to get all cars
export const getCarsService = async ({ filter = {}, sortBy, order}) => {
    try {
        // Call the DAO layer to fetch data
        const cars = await getAllCarsDAO({ filter, sortBy, order });
        // Perform any additional business logic here (if needed)
        return cars;
    } catch (error) {
        console.error('Error in carService:', error.message);
        throw new Error('Failed to fetch cars');
    }
};

// Service to get a car by ID
export const getCarService = async (id) => {
    try {
        // Call the DAO layer to fetch the car
        const car = await getCarByIdDAO(id);

        return car; // Return the car data
    } catch (error) {
        console.error('Error in getCarByIdService:', error.message);
        throw new Error('Failed to fetch car'); // Re-throw error to controller
    }
};
