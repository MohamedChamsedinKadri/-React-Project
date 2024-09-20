import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';  // <-- Import cors
import bookRoutes from './routes/books';

const app: Application = express();
const PORT = 3000;

// Enable CORS to allow requests from the frontend
app.use(cors({
  origin: 'http://localhost:3001',  // <-- Frontend URL
}));

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/books', bookRoutes); // Ensure this is correct

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
