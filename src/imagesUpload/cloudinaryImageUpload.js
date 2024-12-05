import cloudinary from "./cloudinaryConfig.js";

export const uploadImages = async (filePaths) => {
    try {
        const uploadPromises = filePaths.map((filePath) =>
            cloudinary.uploader.upload(filePath, { folder: 'cars' })
        );
        const results = await Promise.all(uploadPromises);
        return results.map((result) => result.secure_url); // Return URLs of all uploaded images
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw error;
    }
};
