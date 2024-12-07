import {addCar as serviceAddCar} from './sellingService.js';

  
export async function addCar(req, res){
    try {
        const carData = JSON.parse(req.body.carData);
        const id = req.body.user_id;
        const imageFiles = req.files['image'] || [];
        const imagesFiles = req.files['images'] || [];

        carData.sellerId = parseInt(id);
        const files = [...imageFiles, ...imagesFiles].map((file) => file.path);

        // console.log(JSON.stringify(images))
        const newCarId = await serviceAddCar(carData, files);
        
        //TODO: return a id of car
        res.status(201).json({ message: 'Car added successfully', car: newCarId})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to add car' });
    }
}
