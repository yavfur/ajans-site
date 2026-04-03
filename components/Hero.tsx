"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown, Zap, TrendingUp, ShieldCheck } from "lucide-react";
import KpiDashboard from "@/components/KpiDashboard";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Hero() {
  return (
    <section style={{ background: "#0B0F1A", minHeight: "100vh", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>

      {/* ══ BACKGROUND DEPTH LAYERS ══ */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {/* Layer 1: grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }} />

        {/* Layer 2: purple glow — top right */}
        <div style={{
          position: "absolute", top: "-15%", right: "-10%",
          width: "700px", height: "700px",
          background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, rgba(99,102,241,0.05) 40%, transparent 70%)",
          filter: "blur(40px)",
        }} />

        {/* Layer 3: green glow — bottom left */}
        <div style={{
          position: "absolute", bottom: "-10%", left: "-5%",
          width: "600px", height: "600px",
          background: "radial-gradient(circle, rgba(34,197,94,0.12) 0%, rgba(34,197,94,0.03) 50%, transparent 70%)",
          filter: "blur(60px)",
        }} />

        {/* Layer 4: center vignette */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(11,15,26,0) 0%, rgba(11,15,26,0.6) 100%)",
        }} />

        {/* Layer 5: scan line */}
        <motion.div
          style={{
            position: "absolute", left: 0, right: 0, height: "1px",
            background: "linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.5) 30%, rgba(34,197,94,0.3) 70%, transparent 100%)",
            top: 0,
          }}
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
        />
      </div>

      {/* ══ CONTENT ══ */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", padding: "100px 24px 60px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>

          {/* Split: 40% / 60% */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }} className="hero-grid">

            {/* ══ LEFT (40%) — Copy ══ */}
            <div>
              {/* System badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease }}
                style={{ marginBottom: "28px" }}
              >
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: "7px",
                  padding: "7px 14px", borderRadius: "99px",
                  background: "rgba(99,102,241,0.1)",
                  border: "1px solid rgba(99,102,241,0.3)",
                  fontSize: "11px", fontWeight: 700, color: "#a5b4fc",
                  letterSpacing: "0.08em", textTransform: "uppercase",
                }}>
                  <Zap size={10} style={{ color: "#22C55E" }} />
                  Growth Operating System
                </span>
              </motion.div>

              {/* BIG Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.08, ease }}
                style={{
                  fontSize: "clamp(44px, 5.5vw, 72px)",
                  fontWeight: 800,
                  lineHeight: 1.04,
                  letterSpacing: "-0.035em",
                  color: "#FFFFFF",
                  fontFamily: "var(--font-heading)",
                  marginBottom: "20px",
                }}
              >
                Performans<br />
                Reklamlarıyla<br />
                <span style={{
                  background: "linear-gradient(135deg, #22C55E 0%, #6366F1 60%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  Satışlarını Ölçekle
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18, ease }}
                style={{
                  fontSize: "clamp(15px, 1.6vw, 18px)",
                  color: "#9CA3AF",
                  lineHeight: 1.7,
                  marginBottom: "32px",
                  maxWidth: "440px",
                }}
              >
                Veri odaklı reklam sistemleriyle ROAS artır,
                maliyetleri düşür, büyümeyi hızlandır.
              </motion.p>

              {/* Trust signals */}
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.26, ease }}
                style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginBottom: "36px" }}
              >
                {[
                  { icon: TrendingUp, label: "+32% ort. ROAS artışı", color: "#22C55E" },
                  { icon: ShieldCheck, label: "Şeffaf raporlama", color: "#6366F1" },
                  { icon: Zap, label: "48h içinde başla", color: "#F97316" },
                ].map((t) => (
                  <div key={t.label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <t.icon size={12} style={{ color: t.color, flexShrink: 0 }} />
                    <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>{t.label}</span>
                  </div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.34, ease }}
                style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
              >
                <Link
                  href="/iletisim"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    padding: "15px 28px", borderRadius: "12px",
                    background: "#F97316", color: "#FFFFFF",
                    fontWeight: 700, fontSize: "15px", textDecoration: "none",
                    fontFamily: "var(--font-heading)",
                    boxShadow: "0 0 24px rgba(249,115,22,0.4), 0 0 60px rgba(249,115,22,0.15)",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05) translateY(-1px)";
                    e.currentTarget.style.boxShadow = "0 0 40px rgba(249,115,22,0.6), 0 0 100px rgba(249,115,22,0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1) translateY(0)";
                    e.currentTarget.style.boxShadow = "0 0 24px rgba(249,115,22,0.4), 0 0 60px rgba(249,115,22,0.15)";
                  }}
                >
                  Reklam performansını analiz et
                  <ArrowRight size={16} />
                </Link>

                <Link
                  href="/roadmap"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    padding: "15px 22px", borderRadius: "12px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#9CA3AF", fontWeight: 500, fontSize: "14px", textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "#9CA3AF"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                >
                  Nasıl çalışır?
                </Link>
              </motion.div>

              {/* Social proof */}
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                style={{ marginTop: "36px", paddingTop: "28px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: "28px" }}
              >
                {[
                  { v: "50+", l: "Marka" },
                  { v: "6.4x", l: "ROAS" },
                  { v: "₺5M+", l: "Bütçe" },
                  { v: "%40", l: "CPA↓" },
                ].map((s) => (
                  <div key={s.l}>
                    <div style={{ fontSize: "18px", fontWeight: 700, color: "#22C55E", fontFamily: "var(--font-heading)" }}>{s.v}</div>
                    <div style={{ fontSize: "10px", color: "#9CA3AF", marginTop: "2px" }}>{s.l}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ══ RIGHT (60%) — KPI Dashboard ══ */}
            <motion.div
              initial={{ opacity: 0, x: 48, y: 16 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease }}
              className="hidden lg:block"
            >
              <KpiDashboard />
            </motion.div>
          </div>

          {/* Mobile dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="lg:hidden mt-12"
          >
            <KpiDashboard />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
        style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", paddingBottom: "28px", color: "#9CA3AF" }}
      >
        <span style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.5 }}>Keşfet</span>
        <ChevronDown size={15} className="animate-bounce-slow" style={{ opacity: 0.5 }} />
      </motion.div>

      {/* Responsive grid override */}
      <style>{`
        @media (max-width: 1023px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
