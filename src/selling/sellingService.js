import { uploadImages } from "../imagesUpload/cloudinaryImageUpload.js";
import { createCar } from "../shared/daos/cars.js";
import { imageToBase64 } from "../util/imageToB64.js";
import Car from "./carParser.js";
export const addCar = async (carData, files) => {

    const flattenData = new Car(carData);

    // Upload images to Cloudinary
    const imageUrls = await uploadImages(files);
    console.log({imageUrls})

    flattenData.images = imageUrls;
    
    const carId = await createCar(flattenData);
    //TODO: Delete image from uploads folder
    return carId;
};

