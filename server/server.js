import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { errorHandler } from "./middleware/auth.js";

import projectRoutes from "./routes/projectRoutes.js";
import experienceRoutes from "./routes/experienceRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";

dotenv.config();
connectDB();

const app = express();

const allowedOrigin = process.env.CLIENT_URL || "http://localhost:5173";

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. curl, server-to-server, Postman)
    if (!origin) return callback(null, true);

    const isExactMatch = origin === allowedOrigin;
    const isVercelPreview = /\.vercel\.app$/.test(new URL(origin).hostname);

    if (isExactMatch || isVercelPreview) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Portfolio API is running" });
});

app.use("/api/projects", projectRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/testimonials", testimonialRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
