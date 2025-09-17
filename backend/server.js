// server.js (or index.js)
import { sequelize } from "./config/db.js";
import Resume from "./models/Resume.js"; // ensure models are registered

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import { createRequire } from "module";
import admin from "firebase-admin";
import resumeRoutes from "./routes/resumeRoutes.js";
import aiHelperRoutes from "./routes/aiHelperRoutes.js";


dotenv.config();
const app = express();

// ✅ Helmet CSP setup
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://www.gstatic.com", "https://apis.google.com"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https://firebasestorage.googleapis.com"],
      connectSrc: ["'self'", "https://firebase.googleapis.com", "https://firestore.googleapis.com"],
      frameSrc: ["'self'", "https://*.firebaseapp.com"],
    },
  })
);

// ✅ Firebase Admin SDK
const require = createRequire(import.meta.url);
const serviceAccountKey = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
});

// ✅ CORS setup
app.use(
  cors({
    origin: [
      "http://localhost:3000", // React local dev
      process.env.FRONTEND_URL, // optional frontend URL
    ],
    credentials: true,
  })
);

app.use(express.json());

// ✅ Routes
app.use("/api/resumes", resumeRoutes);
app.use("/api/ai", aiHelperRoutes);

// ✅ API test route
app.get("/", (req, res) => res.send("API Running"));

// ✅ PostgreSQL connection & sync
sequelize.authenticate()
  .then(() => console.log("✅ PostgreSQL connected successfully"))
  .catch((err) => console.error("❌ PostgreSQL connection failed:", err.message));

sequelize.sync({ alter: true })
  .then(() => console.log("✅ Tables synced"))
  .catch((err) => console.error("❌ Sync failed:", err));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
