import { v2 as cloudinary } from "cloudinary";

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { resources } = await cloudinary.search
      .expression("folder:zellbury")
      .sort_by("public_id", "asc")
      .max_results(100)
      .execute();

    const imageUrls = resources.map((file) => file.secure_url);
    res.json(imageUrls);
  } catch (error) {
    console.error("Cloudinary Error:", error);
    res.status(500).json({ message: "Failed to fetch images" });
  }
}
