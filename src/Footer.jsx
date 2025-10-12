import React from "react";
import { FaWhatsapp, FaGlobe } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#2c3e50",
        color: "white",
        padding: "25px 20px",
        marginTop: "40px",
        width: "100%", // ✅ Full width
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "15px",
        }}
      >
        {/* Developer Info */}
        <div style={{ textAlign: "center" }}>
          <p style={{ margin: "0", fontSize: "14px", color: "#ecf0f1" }}>
            Designed & Developed by{" "}
            <a
              href="https://farhanportfolio-eight.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#3498db",
                textDecoration: "none",
                fontWeight: "600",
                transition: "color 0.3s",
              }}
              className="portfolio-link"
            >
              Farhan Maneri
            </a>{" "}
            | Full Stack Developer
          </p>
        </div>

        {/* Contact Links */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {/* Portfolio Link */}
          {/* <a
            href="https://your-portfolio-link.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#ecf0f1",
              textDecoration: "none",
              fontSize: "14px",
              transition: "color 0.3s",
            }}
            className="footer-link"
          >
            <FaGlobe style={{ fontSize: "18px" }} />
            <span>Portfolio</span>
          </a> */}

          {/* WhatsApp Link */}
          <a
            href="https://wa.me/923133134555"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#ecf0f1",
              textDecoration: "none",
              fontSize: "14px",
              transition: "color 0.3s",
            }}
            className="footer-link"
          >
            <FaWhatsapp style={{ fontSize: "18px" }} />
            <span>+92 313 3134555</span>
          </a>
        </div>

        {/* Copyright */}
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <p style={{ margin: "0", fontSize: "12px", color: "#95a5a6" }}>
            © {new Date().getFullYear()} ZELLBURY. All rights reserved.
          </p>
        </div>
      </div>

      {/* Footer Styles */}
      <style>
        {`
          .portfolio-link:hover {
            color: #5dade2 !important;
          }

          .footer-link:hover {
            color: #25D366 !important;
          }
        `}
      </style>
    </footer>
  );
}