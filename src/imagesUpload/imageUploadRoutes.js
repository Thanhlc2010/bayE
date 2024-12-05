import express from 'express';
import {uploadMiddleware} from "../shared/middleware/mutterMiddleware.js";
import {addCarImages} from "../shared/daos/cars.js";
import {uploadImages} from "./cloudinaryImageUpload.js";

const router = express.Router();

router.post("/cars/:id/images", uploadMiddleware, async (req, res) => {
    try {
        const {id} = req.params;

        const imageFiles = req.files['image'] || [];
        const imagesFiles = req.files['images'] || [];
        const files = [...imageFiles, ...imagesFiles].map((file) => file.path);
        // console.log({files})
        // Upload images to Cloudinary
        const imageUrls = await uploadImages(files);
        res.status(200).json({ message: 'Images uploaded successfully', imageUrls });

        // Save image URLs to the database
        await addCarImages(id, imageUrls);
    } catch (error) {
        console.error('Error uploading images:', error);
        res.status(500).json({ error: 'Failed to upload images' });
    }
});

export default router;
