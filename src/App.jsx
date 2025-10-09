import React from "react";
import { FaWhatsapp, FaArrowUp } from "react-icons/fa";

export default function App() {
  const googleDriveLink =
    "https://drive.google.com/file/d/1B3H86h8QSLWT4pKs5gI_LgHAh5Fqc-Tz/view?usp=drivesdk";

  const whatsappNumber = "923133134555"; // your WhatsApp number
  const message =
    "👋 Hello! I saw your clothing catalog and would like to place an order or ask for details.";
  const embedLink = googleDriveLink.replace("/view", "/preview");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#f8f9fa",
      }}
    >
      {/* ✅ Full-screen PDF viewer */}
      <iframe
        src={embedLink}
        title="PDF Viewer"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: "none",
        }}
        allowFullScreen
      ></iframe>

      {/* ✅ Floating WhatsApp button + message */}
      <div
        style={{
          position: "fixed",
          bottom: "60px", // 👈 moved up from 20px
          right: "20px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          zIndex: 1000,
        }}
      >
        {/* Message bubble */}
        <div
          className="whatsapp-message"
          style={{
            backgroundColor: "#25D366",
            color: "white",
            padding: "7px 12px",
            borderRadius: "20px",
            fontSize: "14px",
            fontWeight: "500",
            boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
            animation: "fadeIn 1.5s ease-in-out",
            whiteSpace: "nowrap",
          }}
        >
          💬 for Order Please Click
        </div>

        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
            message
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            backgroundColor: "#25D366",
            color: "white",
            borderRadius: "50%",
            width: "48px",
            height: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "22px",
            boxShadow: "0 3px 8px rgba(0,0,0,0.3)",
            textDecoration: "none",
            animation: "pulse 2s infinite",
          }}
        >
          <FaWhatsapp />
        </a>
      </div>

      {/* ✅ Back to Top button */}
      {/* <button
        onClick={scrollToTop}
        style={{
          position: "fixed",
          bottom: "120px", // 👈 also moved up a bit
          right: "22px",
          backgroundColor: "#007bff",
          color: "white",
          borderRadius: "50%",
          width: "44px",
          height: "44px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
          zIndex: 999,
          transition: "transform 0.2s ease-in-out",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <FaArrowUp />
      </button> */}

      {/* ✅ Animations + responsive design */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.6); }
            70% { transform: scale(1.1); box-shadow: 0 0 0 12px rgba(37, 211, 102, 0); }
            100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
          }

          @keyframes fadeIn {
            0% { opacity: 0; transform: translateX(20px); }
            100% { opacity: 1; transform: translateX(0); }
          }

          /* ✅ Make everything smaller on mobile */
          @media (max-width: 600px) {
            .whatsapp-message {
              font-size: 11px !important;
              padding: 4px 7px !important;
              max-width: 130px;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            a, button {
              width: 38px !important;
              height: 38px !important;
              font-size: 18px !important;
            }
          }

          @media (max-width: 400px) {
            .whatsapp-message {
              display: none; /* 👈 hide message on very small screens for cleanliness */
            }
          }
        `}
      </style>
    </div>
  );
}
