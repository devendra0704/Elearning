import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDb } from "./database/db.js";

// Load environment variables
dotenv.config();

// Create an instance of express
const app = express();

// Use CORS middleware to enable CORS requests
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
}));

app.options('*', cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
}));

// Middleware to parse JSON
app.use(express.json());

// Serve static files from the uploads directory
app.use("/uploads", express.static("uploads"));

// Port configuration
const port = process.env.PORT || 5000;

// Basic route
app.get('/', (req, res) => {
  res.send("Server is Working");
});

// Importing routes
import userRoutes from './routes/user.js';
import courseRoutes from './routes/course.js';
import adminRoutes from './routes/admin.js';

// Using routes
app.use("/api", userRoutes);
app.use("/api", courseRoutes);
app.use("/api", adminRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDb();
});
