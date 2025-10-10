// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

const app = express();
app.use(cors());

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// API endpoint to list images
app.get("/api/images", async (req, res) => {
  try {
    const { resources } = await cloudinary.search
      .expression("folder:zellbury")
      .sort_by("public_id", "asc")
      .max_results(100)
      .execute();

    const imageUrls = resources.map((file) => file.secure_url);
    res.json(imageUrls);
  } catch (error) {
    console.error("❌ Cloudinary Error:", error);
    res.status(500).json({ message: "Failed to fetch images" });
  }
});

// ✅ Dual-mode: local & Vercel compatible
if (process.env.VERCEL) {
  // Running on Vercel
  module.exports = app;
} else {
  // Running locally
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`✅ Local server running on port ${PORT}`));
}
