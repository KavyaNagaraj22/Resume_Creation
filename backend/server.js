// server.js (or index.js)
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import resumeRoutes from "./routes/resumeRoutes.js";
import aiHelperRoutes from "./routes/aiHelperRoutes.js";
import admin from "firebase-admin"; // Import admin SDK
// Corrected: Use require() for JSON import for broader compatibility
import { createRequire } from 'module'; // Import createRequire for ES Modules
const require = createRequire(import.meta.url); // Create a require function for current module
const serviceAccountKey = require("./serviceAccountKey.json"); // Adjust path and filename


dotenv.config();
const app = express();

// Initialize Firebase Admin SDK
admin.initializeApp({
  // Corrected: Use serviceAccountKey here, matching the import name
  credential: admin.credential.cert(serviceAccountKey)
});

// app.use(cors()); // You can remove this commented line
app.use(cors({
  origin: 'http://localhost:3000' // Your React app's development URL
}));
app.use(express.json());
app.use("/api/resumes", resumeRoutes);
app.use("/api/ai", aiHelperRoutes);

// API routes placeholder
app.get("/", (req, res) => res.send("API Running"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(5000, () => console.log("Server running on port 5000")))
  .catch(err => console.log(err));