import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function App() {
  const [images, setImages] = useState([]);
  const whatsappNumber = "923133134555";

  
  const baseURL = import.meta.env.DEV ? "http://localhost:5000" : "";
  useEffect(() => {
fetch(`${baseURL}/api/images`)
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch((err) => console.error("Error fetching images:", err));
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2 style={{ marginBottom: "20px", color: "#333" }}>
        👗 ZELLBURY Clothing Catalog
      </h2>

      {/* ✅ Image Grid */}
      <div className="image-grid">
        {images.map((img, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <img
              src={img}
              alt={`Cloth ${index + 1}`}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                objectFit: "cover",
              }}
            />
            <div
              style={{
                padding: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontWeight: "600", color: "#333" }}>
                Image #{index + 1}
              </span>

              {/* ✅ WhatsApp button with image number + URL */}
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                  `👋 Hi! I'm interested in image #${index + 1} from your Zellbury catalog.\n\n📸 Image link:\n${img}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: "#25D366",
                  color: "white",
                  borderRadius: "50%",
                  width: "42px",
                  height: "42px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  boxShadow: "0 3px 8px rgba(0,0,0,0.3)",
                  textDecoration: "none",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ CSS for responsive grid */}
      <style>
        {`
          .image-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            width: 100%;
            max-width: 1200px;
          }

          @media (max-width: 900px) {
            .image-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }

          @media (max-width: 500px) {
            .image-grid {
              grid-template-columns: repeat(1, 1fr);
            }
          }
        `}
      </style>
    </div>
  );
}
