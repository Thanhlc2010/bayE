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
export const uploadMiddleware = upload.array('image', 10); // 'images' is the field name for multiple files, adjust the limit as needed
