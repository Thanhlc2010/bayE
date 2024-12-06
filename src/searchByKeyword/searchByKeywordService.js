import { searchCarsByKeywordDAO } from '../shared/daos/cars.js';

// Service function to search for cars by keyword
export const searchCarsByKeywordService = async (keyword) => {
    const cars = await searchCarsByKeywordDAO(keyword);

    // Format the result: Combine car make and model into a single name
    return cars.map((car) => ({
        CarID: car.CarID,
        Name: `${car.carmakes.Name} ${car.carmodels.Name}`, // Combine make and model
        Price: car.Price,
        Status: car.Status,
    }));
};
