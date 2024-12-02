import {addCar as serviceAddCar} from './sellingService.js';

  
export async function addCar(req, res){
    try {
        const carData = JSON.parse(req.body.carData);
        const images = req.files;
 
        const newCarId = await serviceAddCar(carData, images);
        //TODO: return a id of car
        res.status(201).json({ message: 'Car added successfully', car: newCarId})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to add car' });
    }
}
