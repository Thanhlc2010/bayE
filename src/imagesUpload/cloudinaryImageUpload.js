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

export const deleteImage = async (imageId) => {
    try {
        const result = await cloudinary.uploader.destroy(imageId);
        return result;
    } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
        throw error;
    }
};  

export const uploadProfilePicture = async (filePath) => {
    try {
        console.log(filePath);
        const result = await cloudinary.uploader.upload(filePath, { folder: 'profilePictures' });
        return result.secure_url;
    } catch (error) {
        console.error('Error uploading profile picture to Cloudinary:', error);
        throw error;
    }
}
