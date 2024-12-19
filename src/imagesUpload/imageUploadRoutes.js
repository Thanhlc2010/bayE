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

router.post("users/:id/profilePicture", uploadMiddleware, async (req, res) => {
    try {
        const {id} = req.params;
        const {path} = req.file;

        // Upload image to Cloudinary
        const imageUrl = await uploadImages(path);
        res.status(200).json({ message: 'Image uploaded successfully', imageUrl });

        // Save image URL to the database
        await updateUser(id, { ProfilePicture: imageUrl });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Failed to upload image' });
    }
});

export default router;
