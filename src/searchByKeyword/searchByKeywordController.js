import { searchCarsByKeywordService } from './searchByKeywordService.js';

// Controller function to handle search requests
export const searchCarsByKeywordController = async (req, res) => {
    try {
        const { keyword = '' } = req.query; // Extract keyword from query parameters

        // Call the service layer to process the request
        const cars = await searchCarsByKeywordService(keyword);

        res.status(200).json({ data: cars }); // Send the result back to the client
    } catch (error) {
        console.error('Error in searchCarsByKeyword:', error.message);
        res.status(500).json({ error: 'Failed to search cars' });
    }
};
