import {addCar as serviceAddCar, getCarBySeller as serviceSellerCar} from './sellingService.js';

export async function getCarBySeller(req, res) {
    try {
        // console.log(req)
        const {id} = req.params;
        console.log(id)
        const sellerCars = await serviceSellerCar(id);

        res.status(200).json({message: sellerCars, length: sellerCars.length})
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Failed to get seller car' });

    }
}
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
