"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown, Zap } from "lucide-react";
import KpiDashboard from "@/components/KpiDashboard";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
});

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden grid-bg"
      style={{ background: "#0B0F1A" }}
    >
      {/* ── Background depth glows ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {/* Purple blob left */}
        <div
          className="absolute"
          style={{
            top: "10%", left: "-5%",
            width: "500px", height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        {/* Green blob right */}
        <div
          className="absolute"
          style={{
            top: "20%", right: "0%",
            width: "400px", height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        {/* Scan line effect */}
        <div
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)",
            animation: "scan 6s linear infinite",
          }}
        />
      </div>

      {/* ── Main content ── */}
      <div className="relative flex-1 flex items-center pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto w-full">
          <div className="grid lg:grid-cols-[1fr,1fr] gap-12 lg:gap-16 items-center">

            {/* ── LEFT: Copy ── */}
            <div>
              {/* Badge */}
              <motion.div {...fadeUp(0)} className="mb-8">
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "6px 14px",
                    borderRadius: "99px",
                    background: "rgba(99,102,241,0.12)",
                    border: "1px solid rgba(99,102,241,0.25)",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#a5b4fc",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  <Zap size={11} style={{ color: "#22C55E" }} />
                  Performance Marketing
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                {...fadeUp(0.08)}
                style={{
                  fontSize: "clamp(36px, 5vw, 60px)",
                  fontWeight: 700,
                  lineHeight: 1.08,
                  letterSpacing: "-0.025em",
                  color: "#FFFFFF",
                  marginBottom: "20px",
                  fontFamily: "var(--font-heading)",
                }}
              >
                Performans reklamlarıyla{" "}
                <span className="gradient-text">satışlarını büyüt</span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                {...fadeUp(0.16)}
                style={{
                  fontSize: "clamp(16px, 1.8vw, 19px)",
                  color: "#9CA3AF",
                  lineHeight: 1.65,
                  maxWidth: "480px",
                  marginBottom: "36px",
                }}
              >
                Veri odaklı reklam stratejileriyle ROAS artırıyor, maliyetleri düşürüyoruz.
                Her karar ölçülür, her bütçe optimize edilir.
              </motion.p>

              {/* Trust signals */}
              <motion.div {...fadeUp(0.22)} style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "36px" }}>
                {[
                  { value: "50+", label: "Marka" },
                  { value: "6.4x", label: "Ort. ROAS" },
                  { value: "-38%", label: "Ort. CPA" },
                ].map((s) => (
                  <div key={s.label} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "20px", fontWeight: 700, color: "#22C55E", fontFamily: "var(--font-heading)" }}>
                      {s.value}
                    </div>
                    <div style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "2px" }}>{s.label}</div>
                  </div>
                ))}
              </motion.div>

              {/* CTA */}
              <motion.div {...fadeUp(0.3)} style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Link
                  href="/iletisim"
                  className="glow-orange"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "14px 28px",
                    borderRadius: "12px",
                    background: "#F97316",
                    color: "#FFFFFF",
                    fontWeight: 700,
                    fontSize: "15px",
                    textDecoration: "none",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    fontFamily: "var(--font-heading)",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.04)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                >
                  Reklam performansını analiz et
                  <ArrowRight size={16} />
                </Link>

                <Link
                  href="/roadmap"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "14px 22px",
                    borderRadius: "12px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#9CA3AF",
                    fontWeight: 500,
                    fontSize: "14px",
                    textDecoration: "none",
                    transition: "color 0.2s, background 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "#9CA3AF"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                >
                  Nasıl çalışır?
                </Link>
              </motion.div>
            </div>

            {/* ── RIGHT: KPI Dashboard ── */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="hidden lg:block"
            >
              <KpiDashboard />
            </motion.div>

            {/* Mobile: dashboard below copy */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="lg:hidden"
            >
              <KpiDashboard />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="relative flex flex-col items-center gap-2 pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        style={{ color: "#9CA3AF" }}
      >
        <span style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase" }}>Keşfet</span>
        <ChevronDown size={16} className="animate-bounce-slow" />
      </motion.div>
    </section>
  );
}
