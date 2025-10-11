import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const whatsappNumber = "923133134555";

  const baseURL = import.meta.env.VITE_API_DEV;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        console.log("Fetching from:", `${baseURL}/api/images`);
        
        const response = await fetch(`${baseURL}/api/images`);
        
        console.log("Response status:", response.status);
        console.log("Response headers:", response.headers.get("content-type"));
        
        const text = await response.text();
        console.log("Raw response:", text.substring(0, 200));
        
        let data;
        try {
          data = JSON.parse(text);
        } catch (parseError) {
          console.error("JSON parse error:", parseError);
          throw new Error("Server returned invalid JSON. Check console for raw response.");
        }
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        setImages(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching images:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (baseURL) {
      fetchImages();
    } else {
      setError("VITE_API_DEV environment variable is not set");
      setLoading(false);
    }
  }, [baseURL]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h2>Loading images...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "50px", color: "red" }}>
        <h2>Error: {error}</h2>
        <p>API URL: {baseURL}/api/images</p>
        <p>Check browser console for more details</p>
      </div>
    );
  }

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

      {images.length === 0 ? (
        <p>No images found</p>
      ) : (
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
                  padding: "15px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontWeight: "600", color: "#333", fontSize: "14px" }}>
                  Image #{index + 1}
                </span>

                {/* ✅ WhatsApp button container with strip + icon */}
             <a   
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                    `👋 Hi! I'm interested in image #${index + 1} from your Zellbury catalog.\n\n📸 Image link:\n${img}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-container"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0",
                    textDecoration: "none",
                    position: "relative",
                  }}
                >
                  {/* Order Now Strip */}
                  <div
                    className="order-strip"
                    style={{
                      backgroundColor: "#1DA851",
                      color: "white",
                      padding: "8px 12px",
                      borderRadius: "20px 0 0 20px",
                      fontSize: "13px",
                      fontWeight: "600",
                      whiteSpace: "nowrap",
                      boxShadow: "0 3px 10px rgba(37, 211, 102, 0.3)",
                    }}
                  >
                    Order Now
                  </div>

                  {/* WhatsApp Icon */}
                  <div
                    className="whatsapp-icon-wrapper"
                    style={{
                      backgroundColor: "#25D366",
                      color: "white",
                      borderRadius: "0 50% 50% 0",
                      width: "45px",
                      height: "45px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "22px",
                      boxShadow: "0 3px 10px rgba(37, 211, 102, 0.4)",
                    }}
                  >
                    <FaWhatsapp className="whatsapp-icon" />
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✅ CSS for responsive grid + WhatsApp animation */}
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

          /* ✅ WhatsApp Container Hover Effect */
          .whatsapp-container:hover .order-strip {
            background-color: #188A42;
            box-shadow: 0 5px 15px rgba(37, 211, 102, 0.5);
          }

          .whatsapp-container:hover .whatsapp-icon-wrapper {
            background-color: #20BA5A;
            box-shadow: 0 5px 15px rgba(37, 211, 102, 0.6);
          }

          .whatsapp-container:hover {
            transform: translateY(-3px);
          }

          .whatsapp-container {
            transition: all 0.3s ease;
          }

          .order-strip, .whatsapp-icon-wrapper {
            transition: all 0.3s ease;
          }

          /* ✅ Icon Bounce Animation on Hover */
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-5px);
            }
          }

          .whatsapp-container:hover .whatsapp-icon {
            animation: bounce 0.6s ease infinite;
          }

          /* ✅ Pulse Animation */
          @keyframes pulse {
            0% {
              box-shadow: 0 3px 10px rgba(37, 211, 102, 0.3);
            }
            50% {
              box-shadow: 0 3px 20px rgba(37, 211, 102, 0.6);
            }
            100% {
              box-shadow: 0 3px 10px rgba(37, 211, 102, 0.3);
            }
          }

          .order-strip {
            animation: pulse 2s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
}