import { createCar } from "../shared/daos/cars.js";
import { imageToBase64 } from "../util/imageToB64.js";
import Car from "./carParser.js";
import Compressor from "compressorjs";

function compressImage(file) {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      quality: 0.6, // Tùy chỉnh mức nén (0.1 - 1)
      success: resolve,
      error: reject,
    });
  });
}
export const addCar = async (carData, images) => {

    const flattenData = new Car(carData);

    //TODO: base64 parser with images
    const base64Images = await Promise.all(
        images.map(async (imageFile) => {
            const base64String = await imageToBase64(imageFile.path);
            return base64String;
            // const base64String = await compressImage(imageFile.path);
            // return base64String
        })
    )
    // console.log(flattenData)
    flattenData.images = base64Images;
    const carId = await createCar(flattenData);
    return carId;
};

