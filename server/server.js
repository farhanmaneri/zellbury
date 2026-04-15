import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

const app = express();
app.use(cors());

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// API route
app.get("/api/images", async (req, res) => {
  try {
    let allImages = [];
    let nextCursor = undefined;

    do {
      let query = cloudinary.search
        .expression("folder:zellbury")
        .sort_by("public_id", "asc")
        .max_results(100);

      // ✅ ONLY add next_cursor if it exists
      if (nextCursor) {
        query = query.next_cursor(nextCursor);
      }

      const result = await query.execute();

      const urls = result.resources.map((file) => file.secure_url);
      allImages = [...allImages, ...urls];

      nextCursor = result.next_cursor;
    } while (nextCursor);

    console.log("TOTAL IMAGES:", allImages.length); // 👈 ADD THIS

    res.json(allImages);
  } catch (error) {
    console.error("Cloudinary Error:", error);
    res.status(500).json({ message: "Failed to fetch images" });
  }
});
console.log("TOTAL IMAGES:", allImages.length);
// ✅ Local dev mode (run manually)
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`✅ Local server running on port ${PORT}`));
}

// ✅ Export for Vercel
export default app;
