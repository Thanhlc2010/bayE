import path from 'path';
import multer from 'multer';


// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Path where files will be stored
  },
  filename: (req, file, cb) => {
    // Unique filename with timestamp
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

// Export the middleware
export const uploadMiddleware = upload.fields([
  { name: 'image', maxCount: 10 }, // Accept 'image'
  { name: 'images', maxCount: 10 }, // Accept 'images'
]);
