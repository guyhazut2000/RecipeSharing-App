import express, { NextFunction, Response, Request } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/error.middleware";
// DB
import connectToMongoDB from "./config/database";
// Routes
import usersRoute from "./routes/users.routes";
import recipesRoute from "./routes/recipes.routes";

// Load environment variables from .env file
dotenv.config();

// Create a new Express.js app
const app = express();

// Middleware
// Use morgan to log HTTP requests to the console
app.use(morgan("dev"));
// Use helmet to add security-related HTTP headers
app.use(helmet());
// Use body-parser to parse JSON-encoded request bodies
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/recipes", recipesRoute);

// Global Error handler
app.use(errorHandler);

// Start the Express.js app
async function startServer() {
  await connectToMongoDB(); // Connect to the MongoDB database

  const PORT = process.env.PORT || 8000; // Start listening for HTTP requests
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

// Call the startServer function to start the app
startServer();
