"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import KpiDashboard from "@/components/KpiDashboard";

export default function DataReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  // GPU-only: opacity + scale (no layout-triggering props)
  const opacity = useTransform(scrollYProgress, [0, 0.45], [0, 1]);
  const scale   = useTransform(scrollYProgress, [0, 0.55], [0.92, 1]);
  const y       = useTransform(scrollYProgress, [0, 0.55], [48, 0]);

  return (
    <section
      ref={ref}
      style={{
        background: "#050505",
        padding: "clamp(60px,10vh,120px) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: "1000px", height: "600px",
            background: "radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
        <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.4 }} />
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "80px",
          background: "linear-gradient(to bottom, #050505, transparent)",
        }} />
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "80px",
          background: "linear-gradient(to top, #050505, transparent)",
        }} />
      </div>

      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 clamp(16px,4vw,48px)",
        position: "relative",
        zIndex: 1,
      }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: "center", marginBottom: "clamp(32px,5vh,64px)" }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "6px 16px", borderRadius: "99px",
            background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.25)",
            marginBottom: "20px",
          }}>
            <span style={{
              width: "6px", height: "6px", borderRadius: "50%",
              background: "#22C55E", display: "inline-block",
              boxShadow: "0 0 6px rgba(34,197,94,0.8)",
              animation: "pulse-dot 1.4s ease-in-out infinite",
            }} />
            <span style={{
              fontSize: "11px", fontWeight: 700, color: "#A78BFA",
              letterSpacing: "0.12em", textTransform: "uppercase",
              fontFamily: "var(--font-mono)",
            }}>
              Canlı Veri · Gerçek Sonuçlar
            </span>
          </div>
          <h2 style={{
            fontSize: "clamp(28px,4vw,52px)", fontWeight: 800,
            color: "#F5F5F7", fontFamily: "var(--font-heading)",
            letterSpacing: "-0.03em", lineHeight: 1.1,
          }}>
            Müşteri hesaplarından{" "}
            <span style={{
              background: "linear-gradient(120deg, #22C55E 0%, #4ADE80 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              canlı performans
            </span>
          </h2>
          <p style={{ fontSize: "15px", color: "#888899", marginTop: "12px" }}>
            Her metrik gerçek bir müşteri hesabından — açık verilerle karşılaştırılmış.
          </p>
        </motion.div>

        {/* Dashboard — scroll reveal */}
        <motion.div
          style={{ opacity, scale, y, willChange: "transform, opacity" }}
        >
          <KpiDashboard />
        </motion.div>
      </div>
    </section>
  );
}
