"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle, Clock, Shield } from "lucide-react";

export default function CtaSection() {
  return (
    <section style={{ background: "#0B0F1A", padding: "120px 0", position: "relative", overflow: "hidden" }}>

      {/* ── BACKGROUND LAYERS ── */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {/* Deep purple center radial */}
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          width: "900px", height: "500px",
          background: "radial-gradient(ellipse, rgba(99,102,241,0.18) 0%, rgba(99,102,241,0.06) 40%, transparent 70%)",
          filter: "blur(40px)",
        }} />
        {/* Purple glow top-left */}
        <div style={{
          position: "absolute", top: "-20%", left: "-10%",
          width: "700px", height: "700px",
          background: "radial-gradient(circle, rgba(99,102,241,0.14) 0%, transparent 65%)",
          filter: "blur(60px)",
        }} />
        {/* Animated orange glow bottom-right — breathing */}
        <motion.div
          style={{
            position: "absolute", bottom: "-15%", right: "-10%",
            width: "600px", height: "600px",
            background: "radial-gradient(circle, rgba(249,115,22,0.18) 0%, rgba(249,115,22,0.06) 45%, transparent 70%)",
            filter: "blur(70px)",
          }}
          animate={{ scale: [1, 1.18, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Secondary orange inner */}
        <motion.div
          style={{
            position: "absolute", bottom: "5%", right: "5%",
            width: "300px", height: "300px",
            background: "radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)",
            filter: "blur(30px)",
          }}
          animate={{ scale: [1, 1.25, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        />
        {/* Grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }} />
        {/* Top separator */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.4), rgba(249,115,22,0.3), transparent)",
        }} />
      </div>

      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 24px", textAlign: "center", position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          {/* Badge */}
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            padding: "7px 16px", borderRadius: "99px",
            background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.28)",
            fontSize: "11px", fontWeight: 700, color: "#FB923C",
            letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: "28px",
          }}>
            <motion.span
              style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#F97316", display: "inline-block", boxShadow: "0 0 8px rgba(249,115,22,0.9)" }}
              animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.4, repeat: Infinity }}
            />
            Büyüme Fırsatı
          </span>

          {/* Headline */}
          <h2 style={{
            fontSize: "clamp(32px, 5.5vw, 62px)", fontWeight: 800,
            color: "#FFFFFF", fontFamily: "var(--font-heading)",
            letterSpacing: "-0.03em", lineHeight: 1.08, marginBottom: "20px",
          }}>
            Markanın{" "}
            <span style={{
              background: "linear-gradient(120deg, #F97316 0%, #FBBF24 50%, #F97316 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              textShadow: "none",
            }}>
              büyüme potansiyelini
            </span>
            {" "}birlikte keşfedelim
          </h2>

          {/* Subtext */}
          <p style={{ fontSize: "17px", color: "#9CA3AF", lineHeight: 1.7, maxWidth: "500px", margin: "0 auto 44px" }}>
            Ücretsiz growth analizi ile rakiplerine kıyasla nerede durduğunu görelim. Büyüme fırsatları, açık kanallar ve aksiyon planı — 48 saat içinde.
          </p>

          {/* Primary CTA button with shimmer */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
            <Link
              href="/iletisim"
              style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                padding: "18px 36px", borderRadius: "14px",
                background: "#F97316", color: "#FFFFFF",
                fontWeight: 700, fontSize: "17px", textDecoration: "none",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                fontFamily: "var(--font-heading)",
                boxShadow: "0 0 28px rgba(249,115,22,0.5), 0 0 70px rgba(249,115,22,0.2)",
                position: "relative", overflow: "hidden",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05) translateY(-2px)"; e.currentTarget.style.boxShadow = "0 0 50px rgba(249,115,22,0.7), 0 0 120px rgba(249,115,22,0.35)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1) translateY(0)"; e.currentTarget.style.boxShadow = "0 0 28px rgba(249,115,22,0.5), 0 0 70px rgba(249,115,22,0.2)"; }}
            >
              {/* Shimmer sweep */}
              <motion.span
                aria-hidden
                style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)",
                  skewX: "-20deg",
                }}
                initial={{ x: "-100%" }}
                animate={{ x: ["−100%", "200%"] }}
                transition={{ duration: 1.2, delay: 1.8, repeat: Infinity, repeatDelay: 3.5, ease: "easeInOut" }}
              />
              Ücretsiz growth analizi al
              <ArrowRight size={18} />
            </Link>

            {/* Trust chips */}
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px" }}>
              {[
                { icon: CheckCircle, text: "Kredi kartı gerekmez" },
                { icon: Clock,        text: "48 saat içinde yanıt" },
                { icon: Shield,       text: "İlk görüşme ücretsiz" },
              ].map((chip) => (
                <div key={chip.text} style={{
                  display: "inline-flex", alignItems: "center", gap: "5px",
                  padding: "5px 12px", borderRadius: "99px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  fontSize: "11px", color: "#9CA3AF",
                }}>
                  <chip.icon size={10} style={{ color: "#22C55E" }} />
                  {chip.text}
                </div>
              ))}
            </div>
          </div>

          {/* Mini stats */}
          <div style={{
            marginTop: "64px", paddingTop: "36px",
            borderTop: "1px solid rgba(255,255,255,0.07)",
            display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "48px",
          }}>
            {[
              { value: "50+",  label: "Büyüyen Marka" },
              { value: "6.4x", label: "En Yüksek ROAS" },
              { value: "₺5M+", label: "Yönetilen Bütçe" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                style={{ textAlign: "center" }}
              >
                <div style={{ fontSize: "24px", fontWeight: 800, color: "#22C55E", fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}>
                  {s.value}
                </div>
                <div style={{ fontSize: "12px", color: "#9CA3AF", marginTop: "3px" }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
