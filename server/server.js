import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

const app = express();
app.use(cors());

// ✅ Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ API route
app.get("/api/images", async (req, res) => {
  try {
    let allImages = [];
    let nextCursor = undefined;

    do {
      let query = cloudinary.search
        .expression("folder:zellbury")
        .sort_by("public_id", "desc")
        .max_results(100);

      // ✅ Add cursor only when it exists
      if (nextCursor) {
        query = query.next_cursor(nextCursor);
      }
      const result = await query.execute();
      console.log(result.resources.map(f => f.public_id));
      
      const urls = result.resources.map((file) => file.secure_url);
      allImages = [...allImages, ...urls];

      nextCursor = result.next_cursor;
    } while (nextCursor);

    // ✅ Debug log
    console.log("TOTAL IMAGES:", allImages.length);

    // ✅ Prevent caching issue (important for Vercel)
    res.setHeader("Cache-Control", "no-store");

    res.json(allImages);
  } catch (error) {
    console.error("Cloudinary Error:", error);
    res.status(500).json({ message: "Failed to fetch images" });
  }
});

// ✅ Local dev mode
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`✅ Local server running on port ${PORT}`)
  );
}

// ✅ Export for Vercel
export default app;