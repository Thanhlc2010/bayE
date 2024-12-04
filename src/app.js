import express from 'express';
import accountRoutes from './account/accountRoutes.js';
import { bigIntMiddleware } from './shared/middleware/bigIntMiddleware.js';


const app = express();
app.use(express.json());
app.use(bigIntMiddleware);

// Gắn route account vào /api/users
app.use('/api/users', accountRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
