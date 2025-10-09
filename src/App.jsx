import React from "react";
import { FaWhatsapp, FaArrowUp } from "react-icons/fa";

export default function App() {
  const googleDriveLink =
    "https://drive.google.com/file/d/1B3H86h8QSLWT4pKs5gI_LgHAh5Fqc-Tz/view?usp=drivesdk";

  const whatsappNumber = "923133134555";
  const message =
    "👋 Hello! I saw your clothing catalog and would like to place an order or ask for details.";
  const embedLink = googleDriveLink.replace("/view", "/preview");

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

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
      {/* ✅ Full-screen responsive PDF viewer */}
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

      {/* ✅ Floating WhatsApp Button + message */}
      <div
        style={{
          position: "fixed",
          bottom: "70px",
          right: "18px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          zIndex: 1000,
        }}
      >
        {/* Message bubble */}
       <div className="whatsapp-message">
  <span>💬 For Order — Tap WhatsApp</span>
</div>


        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
            message
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-btn"
        >
          <FaWhatsapp />
        </a>
      </div>

      {/* ✅ Back to Top button */}
      {/* <button onClick={scrollToTop} className="top-button">
        <FaArrowUp />
      </button> */}

      {/* ✅ Animations + responsiveness */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.6); }
            70% { transform: scale(1.1); box-shadow: 0 0 0 10px rgba(37, 211, 102, 0); }
            100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
          }

          @keyframes fadeIn {
            0% { opacity: 0; transform: translateX(20px); }
            100% { opacity: 1; transform: translateX(0); }
          }

          .whatsapp-message {
            background-color: #25D366;
            color: white;
            padding: 6px 10px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 500;
            box-shadow: 0 3px 6px rgba(0,0,0,0.2);
            animation: fadeIn 1.5s ease-in-out;
            white-space: nowrap;
          }

          .whatsapp-btn {
            background-color: #25D366;
            color: white;
            border-radius: 50%;
            width: 46px;
            height: 46px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
            box-shadow: 0 3px 8px rgba(0,0,0,0.3);
            text-decoration: none;
            animation: pulse 2s infinite;
          }

          .top-button {
            position: fixed;
            bottom: 130px;
            right: 22px;
            background-color: #007bff;
            color: white;
            border-radius: 50%;
            width: 42px;
            height: 42px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 6px rgba(0,0,0,0.3);
            z-index: 999;
            transition: transform 0.2s ease-in-out;
          }

          .top-button:hover {
            transform: scale(1.1);
          }

          /* ✅ Responsive Tweaks */
         /* ✅ Responsive Tweaks */
@media (max-width: 700px) {
  .whatsapp-message {
    font-size: 12px;
    padding: 5px 8px;
    max-width: 150px;
  }
  .whatsapp-btn, .top-button {
    width: 40px;
    height: 40px;
    font-size: 18px;
  }
}

@media (max-width: 500px) {
  .whatsapp-message {
    font-size: 10px;
    padding: 4px 6px;
    max-width: 120px;
  }
  .whatsapp-btn, .top-button {
    width: 36px;
    height: 36px;
    font-size: 16px;
  }
}

/* ✅ Tiny screens — show shorter text instead of hiding */
@media (max-width: 350px) {
  .whatsapp-message {
    font-size: 9px;
    padding: 3px 5px;
    max-width: 90px;
    white-space: normal;
    line-height: 1.2;
  }
  .whatsapp-message::before {
    content: "Order → WhatsApp";
  }
  .whatsapp-message span {
    display: none;
  }
}

        `}
      </style>
    </div>
  );
}
