"use client";

import KpiDashboard from "@/components/KpiDashboard";
import { motion } from "framer-motion";

export default function KpiSection() {
  return (
    <section style={{ background: "#050505", padding: "80px 0 100px", position: "relative", overflow: "hidden" }}>
      {/* Background glows */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          width: "900px", height: "600px",
          background: "radial-gradient(ellipse, rgba(124,58,237,0.10) 0%, transparent 70%)",
          filter: "blur(60px)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }} />
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.3), rgba(6,182,212,0.2), transparent)",
        }} />
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
        <motion.div
          style={{ textAlign: "center", marginBottom: "48px" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            padding: "5px 14px", borderRadius: "99px",
            background: "rgba(124,58,237,0.10)", border: "1px solid rgba(124,58,237,0.25)",
            fontSize: "11px", fontWeight: 700, color: "#C084FC",
            letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px",
          }}>
            Canlı Dashboard
          </span>
          <h2 style={{
            fontSize: "clamp(26px, 3.5vw, 44px)", fontWeight: 700,
            color: "#FFFFFF", fontFamily: "var(--font-heading)",
            letterSpacing: "-0.02em",
          }}>
            Gerçek zamanlı performans görünümü
          </h2>
          <p style={{ fontSize: "15px", color: "#888899", marginTop: "10px" }}>
            Müşteri hesaplarında izlediğimiz metrikler — canlı veri görselleştirmesi
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <KpiDashboard />
        </motion.div>
      </div>
    </section>
  );
}
