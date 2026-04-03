"use client";

import { motion } from "framer-motion";

const platforms = [
  { name: "Meta Ads" },
  { name: "Google Ads" },
  { name: "TikTok Ads" },
  { name: "Trendyol" },
  { name: "Shopify" },
  { name: "Amazon TR" },
  { name: "Hepsiburada" },
  { name: "Instagram" },
];

const items = [...platforms, ...platforms];

export default function PlatformPartners() {
  return (
    <section style={{ background: "#0B0F1A", padding: "40px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", marginBottom: "20px" }}>
        <p style={{ fontSize: "11px", fontWeight: 600, color: "#9CA3AF", letterSpacing: "0.15em", textTransform: "uppercase", textAlign: "center" }}>
          Çalıştığımız Platformlar
        </p>
      </div>

      <div style={{ position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: "80px",
          background: "linear-gradient(90deg, #0B0F1A, transparent)",
          zIndex: 10, pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", right: 0, top: 0, bottom: 0, width: "80px",
          background: "linear-gradient(270deg, #0B0F1A, transparent)",
          zIndex: 10, pointerEvents: "none",
        }} />

        <motion.div
          style={{ display: "flex", gap: "12px", width: "max-content" }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        >
          {items.map((p, i) => (
            <div
              key={i}
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                padding: "8px 18px", borderRadius: "8px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: "13px", fontWeight: 500, color: "#9CA3AF", whiteSpace: "nowrap" }}>
                {p.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
