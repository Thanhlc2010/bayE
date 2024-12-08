import { uploadImages } from "../imagesUpload/cloudinaryImageUpload.js";
import { createCar, getCarBySellerDAO } from "../shared/daos/cars.js";
import Car from "./carParser.js";
export const addCar = async (carData, files) => {

    const flattenData = new Car(carData);

    // Upload images to Cloudinary
    const imageUrls = await uploadImages(files);

    flattenData.images = imageUrls;
    
    const carId = await createCar(flattenData);
    //TODO: Delete image from uploads folder
    return carId;
};

export const getCarBySeller = async (id)  => {
    const cars = await getCarBySellerDAO(id);
    return cars;
}

