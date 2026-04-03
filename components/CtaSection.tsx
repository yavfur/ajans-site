"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

export default function CtaSection() {
  return (
    <section style={{ background: "#0B0F1A", padding: "100px 0", position: "relative", overflow: "hidden" }}>
      {/* Background gradient */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(99,102,241,0.1) 0%, rgba(249,115,22,0.04) 40%, transparent 70%)",
      }} />

      {/* Grid pattern */}
      <div className="grid-bg" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.5 }} />

      {/* Floating glows */}
      <div style={{
        position: "absolute", top: "20%", left: "15%",
        width: "300px", height: "300px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "20%", right: "10%",
        width: "250px", height: "250px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 24px", textAlign: "center", position: "relative" }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            padding: "6px 14px", borderRadius: "99px",
            background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.25)",
            fontSize: "12px", fontWeight: 600, color: "#FB923C",
            letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "24px",
          }}>
            <Zap size={11} />
            Harekete Geç
          </span>

          <h2 style={{
            fontSize: "clamp(32px, 5.5vw, 60px)", fontWeight: 700,
            color: "#FFFFFF", fontFamily: "var(--font-heading)",
            letterSpacing: "-0.025em", lineHeight: 1.1, marginBottom: "20px",
          }}>
            Markanın reklam performansını{" "}
            <span className="gradient-text-cta">analiz edelim</span>
          </h2>

          <p style={{ fontSize: "17px", color: "#9CA3AF", lineHeight: 1.65, maxWidth: "520px", margin: "0 auto 40px" }}>
            Ücretsiz growth planını al. Rakiplerine kıyasla nerede durduğunu görelim ve büyüme fırsatlarını ortaya çıkaralım.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "center" }}>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
              <Link
                href="/iletisim"
                className="glow-orange"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "10px",
                  padding: "16px 32px", borderRadius: "14px",
                  background: "#F97316", color: "#FFFFFF",
                  fontWeight: 700, fontSize: "16px", textDecoration: "none",
                  transition: "transform 0.2s ease",
                  fontFamily: "var(--font-heading)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
              >
                Reklam performansını analiz et
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/iletisim"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  padding: "16px 28px", borderRadius: "14px",
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                  color: "#9CA3AF", fontWeight: 500, fontSize: "14px", textDecoration: "none",
                  transition: "color 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "#9CA3AF"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
              >
                Ücretsiz growth planını al
              </Link>
            </div>

            <p style={{ fontSize: "12px", color: "#6B7280", marginTop: "8px" }}>
              Kredi kartı gerekmez • İlk görüşme ücretsiz • 48 saat içinde yanıt
            </p>
          </div>

          {/* Mini stats */}
          <div style={{
            marginTop: "56px", paddingTop: "32px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "40px",
          }}>
            {[
              { value: "50+", label: "Büyüyen Marka" },
              { value: "6.4x", label: "En Yüksek ROAS" },
              { value: "₺5M+", label: "Yönetilen Bütçe" },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "22px", fontWeight: 700, color: "#22C55E", fontFamily: "var(--font-heading)" }}>{s.value}</div>
                <div style={{ fontSize: "12px", color: "#9CA3AF", marginTop: "3px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
