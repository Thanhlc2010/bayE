import { getCarsService, getCarService } from './buyingService.js'

// Controller function to get all cars
export const getCars = async (req, res) => {
    try {
        // Extract query parameters for filtering and sorting
        const { sortBy = 'CreatedAt', order = 'desc', ...filter } = req.query;

        // Call the service layer with filter and sorting options
        const cars = await getCarsService({
            filter: filter, // Parse the filter object if provided
            // filter: {Year : parseInt(Year), CarID : parseInt(CarID)}, // Another way to handle query params
            sortBy,
            order,
        });

        // Return the cars as a response
        res.status(200).json(cars);
    } catch (error) {
        console.error('Error in getAllCars:', error.message);
        res.status(500).json({ error: error.message });
    }
};

// Controller to get a car by ID
export const getCar = async (req, res) => {
        try {
            const { id } = req.params; // Extract the car ID from the route parameter

            // Call the service layer to fetch the car
            const car = await getCarService(Number(id));

            if (!car) {
                return res.status(404).json({ error: 'Car not found' }); // Handle car not found
            }

            res.status(200).json(car); // Return the car data
        } catch (error) {
            console.error('Error in getCarById:', error.message);
            res.status(500).json({error: 'Failed to fetch car'}); // Handle server error
        }
};
