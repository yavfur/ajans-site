"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BarChart2, Lightbulb, RefreshCw } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: BarChart2,
    title: "Data Analizi",
    description: "Mevcut kampanyalar, rakipler ve hedef kitle derinlemesine analiz edilir. Fırsat boşlukları tespit edilir.",
    accent: "#6366F1",
    glow: "rgba(99,102,241,0.3)",
  },
  {
    num: "02",
    icon: Lightbulb,
    title: "Strateji & Kreatif",
    description: "Veriye dayalı büyüme haritası hazırlanır. Her kanal, bütçe ve kreatif konsept yazılı olarak belirlenir.",
    accent: "#22C55E",
    glow: "rgba(34,197,94,0.3)",
  },
  {
    num: "03",
    icon: RefreshCw,
    title: "Sürekli Optimizasyon",
    description: "Haftalık raporlar ve anlık dashboard. Neyin işe yaradığını çoğaltıyor, yaramayanı kesiyoruz.",
    accent: "#F97316",
    glow: "rgba(249,115,22,0.3)",
  },
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section style={{ background: "#0B0F1A", padding: "100px 0", position: "relative", overflow: "hidden" }}>
      {/* ── BACKGROUND LAYERS ── */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {/* Purple glow — top right */}
        <div style={{
          position: "absolute", top: "-20%", right: "-10%",
          width: "700px", height: "700px",
          background: "radial-gradient(circle, rgba(99,102,241,0.14) 0%, rgba(99,102,241,0.05) 40%, transparent 70%)",
          filter: "blur(60px)",
        }} />
        {/* Green glow — bottom left */}
        <div style={{
          position: "absolute", bottom: "-15%", left: "-8%",
          width: "600px", height: "600px",
          background: "radial-gradient(circle, rgba(34,197,94,0.10) 0%, rgba(34,197,94,0.03) 50%, transparent 70%)",
          filter: "blur(70px)",
        }} />
        {/* Center ellipse */}
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          width: "800px", height: "350px",
          background: "radial-gradient(ellipse, rgba(99,102,241,0.06) 0%, transparent 70%)",
        }} />
        {/* Grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }} />
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <motion.div
          style={{ textAlign: "center", marginBottom: "64px" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span style={{
            display: "inline-block", padding: "5px 14px", borderRadius: "99px",
            background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)",
            fontSize: "11px", fontWeight: 600, color: "#a5b4fc",
            letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px",
          }}>
            Süreç
          </span>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700,
            color: "#FFFFFF", fontFamily: "var(--font-heading)",
            letterSpacing: "-0.02em",
          }}>
            3 adımda büyüme sistemi
          </h2>
        </motion.div>

        {/* Timeline container */}
        <div ref={ref} style={{ position: "relative" }}>
          {/* Horizontal connector line — desktop */}
          <div className="hidden md:block" style={{
            position: "absolute",
            top: "44px",
            left: "calc(16.66% + 44px)",
            right: "calc(16.66% + 44px)",
            height: "1px",
            background: "linear-gradient(90deg, rgba(99,102,241,0.4), rgba(34,197,94,0.4), rgba(249,115,22,0.4))",
            zIndex: 0,
          }}>
            {/* Animated progress */}
            <motion.div
              style={{
                height: "100%",
                background: "linear-gradient(90deg, #6366F1, #22C55E, #F97316)",
                transformOrigin: "left",
              }}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.4, ease: "easeInOut" }}
            />
          </div>

          {/* Steps */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 32 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                  style={{ position: "relative", zIndex: 1 }}
                >
                  {/* Node circle */}
                  <div style={{
                    width: "56px", height: "56px",
                    borderRadius: "50%",
                    background: "#111827",
                    border: `2px solid ${step.accent}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: "24px",
                    boxShadow: `0 0 20px ${step.glow}`,
                    position: "relative",
                  }}>
                    <Icon size={20} style={{ color: step.accent }} />
                    {/* Pulse ring */}
                    <motion.div
                      style={{
                        position: "absolute", inset: "-8px",
                        borderRadius: "50%",
                        border: `1px solid ${step.accent}`,
                        opacity: 0,
                      }}
                      animate={inView ? { opacity: [0, 0.4, 0], scale: [1, 1.3, 1.3] } : {}}
                      transition={{ duration: 2, delay: 0.5 + i * 0.3, repeat: Infinity, repeatDelay: 2 }}
                    />
                  </div>

                  {/* Card */}
                  <div style={{
                    background: "#111827",
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: "14px",
                    padding: "24px",
                    position: "relative",
                    overflow: "hidden",
                  }}>
                    {/* Top accent */}
                    <div style={{
                      position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                      background: `linear-gradient(90deg, ${step.accent}, transparent)`,
                    }} />

                    <div style={{ fontSize: "11px", fontWeight: 700, color: step.accent, fontFamily: "var(--font-mono)", marginBottom: "8px", letterSpacing: "0.1em" }}>
                      {step.num}
                    </div>
                    <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#FFFFFF", fontFamily: "var(--font-heading)", marginBottom: "10px" }}>
                      {step.title}
                    </h3>
                    <p style={{ fontSize: "14px", color: "#9CA3AF", lineHeight: 1.6 }}>
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
