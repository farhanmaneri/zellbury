import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import Footer from "./Footer";

// ✅ Secure agent mapping
const AGENT_CODES = {
  SD2024: { name: "saeed", number: "923159088751" },
  AD2024: { name: "arshid", number: "923319382831" },
  KD2024: { name: "khadija", number: "923320926641" },
  SH2024: { name: "shaheen", number: "923168802164" },
  DEFAULT: { name: "Sales Team", number: "923133134555" },
};

export default function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [agent, setAgent] = useState(AGENT_CODES.DEFAULT);

  const baseURL = import.meta.env.VITE_API_DEV;

  useEffect(() => {
    // ✅ Get agent code from URL
    const params = new URLSearchParams(window.location.search);
    const refCode = params.get("ref");

    // ✅ Look up agent by code (secure)
    if (refCode && AGENT_CODES[refCode.toUpperCase()]) {
      setAgent(AGENT_CODES[refCode.toUpperCase()]);
    } else {
      setAgent(AGENT_CODES.DEFAULT); // Use default if invalid code
    }

    const fetchImages = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${baseURL}/api/images`);
        const text = await response.text();
        const data = JSON.parse(text);
        
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
        <h2>Loading data...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "50px", color: "red" }}>
        <h2>Error: {error}</h2>
        <p>API URL: {baseURL}/api/images</p>
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
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h2 style={{ color: "#333", marginBottom: "5px" }}>
          👗 ZELLBURY Clothing Catalog
        </h2>
        <p style={{ color: "#666", fontSize: "14px" }}>
          {/* Your Agent: {agent.name} */}
        </p>
      </div>

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

            <a    
                  href={`https://wa.me/${agent.number}?text=${encodeURIComponent(
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
<Footer/>
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