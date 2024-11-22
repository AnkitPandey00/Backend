import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./routes/userRouter.js";
import blogRouter from "./routes/blogRouter.js";
import fileUpload from "express-fileupload";

// Initialize express app
const app = express();
dotenv.config({ path: "./config/config.env" });

// Allowed Origins for CORS
const allowedOrigins = [
  'http://localhost:5173',  // Development URL
  'https://frontend-theta-brown-31.vercel.app', // Production URL
];

// CORS middleware configuration
app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {  // Allows requests from allowed origins
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow these methods
  credentials: true, // Allow cookies to be sent with requests
}));

// Middleware for JSON and URL-encoded data parsing
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// Middleware for cookie parsing
app.use(cookieParser());

// Middleware for file upload (if required)
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/",
}));

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/blog", blogRouter);

// Connect to the database
dbConnection();

// Error handling middleware
app.use(errorMiddleware);

// Basic test route
app.get('/', (req, res) => {
  res.send("Hello World");
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

export default app;
