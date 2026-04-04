"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import KpiDashboard from "@/components/KpiDashboard";

/* ── Preview overlay — shown when card is small (phase 1) ── */
function PreviewOverlay({ opacity }: { opacity: MotionValue<number> }) {
  const PREVIEW = [
    { label: "ROAS",    value: "3.8×",  accent: "#22C55E" },
    { label: "Gelir",   value: "+187%", accent: "#22C55E" },
    { label: "CPA",     value: "−40%",  accent: "#A78BFA" },
  ];

  return (
    <motion.div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        zIndex: 10,
        opacity,
        pointerEvents: "none",
        padding: "24px",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "8px" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          padding: "4px 12px", borderRadius: "99px",
          background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)",
          marginBottom: "10px",
        }}>
          <span style={{
            width: "5px", height: "5px", borderRadius: "50%",
            background: "#22C55E", display: "inline-block",
            boxShadow: "0 0 6px rgba(34,197,94,0.8)",
            animation: "pulse-dot 1.4s ease-in-out infinite",
          }} />
          <span style={{
            fontSize: "9px", fontWeight: 700, color: "#22C55E",
            letterSpacing: "0.14em", textTransform: "uppercase",
            fontFamily: "var(--font-mono)",
          }}>Canlı · Gerçek Hesaplar</span>
        </div>
        <div style={{
          fontSize: "clamp(18px,2.5vw,28px)", fontWeight: 800,
          color: "#F5F5F7", fontFamily: "var(--font-heading)",
          letterSpacing: "-0.02em",
        }}>
          Performance Dashboard
        </div>
      </div>

      {/* KPI chips */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
        {PREVIEW.map((kpi) => (
          <div key={kpi.label} style={{
            background: "rgba(255,255,255,0.06)",
            border: `1px solid ${kpi.accent}30`,
            borderRadius: "12px",
            padding: "14px 20px",
            textAlign: "center",
            minWidth: "100px",
          }}>
            <div style={{
              fontSize: "9px", color: "rgba(156,163,175,0.6)",
              fontFamily: "var(--font-mono)", letterSpacing: "0.1em",
              textTransform: "uppercase", marginBottom: "6px",
            }}>
              {kpi.label}
            </div>
            <div style={{
              fontSize: "26px", fontWeight: 800,
              color: kpi.accent, fontFamily: "var(--font-heading)",
              letterSpacing: "-0.03em", lineHeight: 1,
              textShadow: `0 0 16px ${kpi.accent}60`,
            }}>
              {kpi.value}
            </div>
          </div>
        ))}
      </div>

      <div style={{
        fontSize: "11px", color: "rgba(156,163,175,0.4)",
        fontFamily: "var(--font-mono)", marginTop: "8px",
      }}>
        Tam görünüm için aşağı kaydırın ↓
      </div>
    </motion.div>
  );
}

export default function DataReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Spring smoothing for all transforms
  const smooth = { stiffness: 80, damping: 20 };
  const sp = useSpring(scrollYProgress, smooth);

  // Phase 1 (0–30%): small tilted card
  // Phase 2 (30–70%): expanding, straightening
  // Phase 3 (70–100%): full screen

  const scale      = useTransform(sp, [0, 0.5, 1], [0.62, 0.84, 1]);
  const borderRadius = useTransform(sp, [0, 0.7, 1], [24, 12, 0]);
  const rotateX    = useTransform(sp, [0, 0.4], [8, 0]);
  const rotateY    = useTransform(sp, [0, 0.4], [-6, 0]);
  const glow       = useTransform(sp, [0, 0.5, 1], [0.3, 0.7, 0]);

  // Overlay: visible in phase 1, fades out through phase 2
  const previewOpacity = useTransform(sp, [0, 0.35, 0.55], [1, 1, 0]);
  // Dashboard: blurred in phase 1, clear by phase 2
  const dashBlur   = useTransform(sp, [0, 0.45], [8, 0]);
  const dashOpacity = useTransform(sp, [0, 0.25, 0.5], [0.25, 0.6, 1]);

  // Scroll hint arrow fades out
  const hintOpacity = useTransform(sp, [0, 0.2], [1, 0]);

  return (
    /* Sticky container — 280vh creates scroll room */
    <div
      ref={containerRef}
      style={{ height: "280vh", position: "relative" }}
      className="reveal-container"
    >
      {/* Sticky frame */}
      <div style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "#050505",
      }}>

        {/* Background glows */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: "900px", height: "600px",
            background: "radial-gradient(ellipse, rgba(124,58,237,0.14) 0%, transparent 65%)",
            filter: "blur(80px)",
          }} />
          <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.4 }} />
          {/* Top fade from hero */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "100px",
            background: "linear-gradient(to bottom, #050505, transparent)",
          }} />
        </div>

        {/* Scroll hint — fades out */}
        <motion.div
          style={{
            position: "absolute",
            top: "32px",
            left: "50%",
            transform: "translateX(-50%)",
            opacity: hintOpacity,
            zIndex: 20,
            textAlign: "center",
          }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "6px 16px", borderRadius: "99px",
            background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)",
          }}>
            <span style={{
              fontSize: "11px", color: "#A78BFA",
              fontFamily: "var(--font-mono)", letterSpacing: "0.1em",
            }}>
              Performansı görmek için kaydır
            </span>
          </div>
        </motion.div>

        {/* ── THE EXPANDING CARD ── */}
        <motion.div
          style={{
            width: "100%",
            maxWidth: "100vw",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            perspective: "1200px",
          }}
        >
          <motion.div
            style={{
              width: "100%",
              maxWidth: "1200px",
              scale,
              borderRadius,
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
              position: "relative",
              overflow: "hidden",
              willChange: "transform",
              boxShadow: useTransform(
                glow,
                (v) => `0 0 ${Math.round(v * 120)}px rgba(124,58,237,${(v * 0.4).toFixed(2)}), 0 0 ${Math.round(v * 60)}px rgba(59,130,246,${(v * 0.2).toFixed(2)}), 0 32px 80px rgba(0,0,0,0.6)`
              ),
              border: useTransform(
                glow,
                (v) => `1px solid rgba(124,58,237,${(v * 0.5).toFixed(2)})`
              ),
              background: "#050505",
              padding: useTransform(sp, [0, 0.7, 1], ["8px", "4px", "0px"]),
            }}
          >
            {/* Glow border top */}
            <div style={{
              position: "absolute", top: 0, left: "10%", right: "10%", height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.7), rgba(59,130,246,0.5), transparent)",
              zIndex: 5,
            }} />

            {/* Phase 1: preview overlay */}
            <PreviewOverlay opacity={previewOpacity} />

            {/* Phase 2-3: actual dashboard, blurred then sharp */}
            <motion.div
              style={{
                opacity: dashOpacity,
                filter: useTransform(dashBlur, (v) => `blur(${v}px)`),
              }}
            >
              <KpiDashboard />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Phase-progress dots */}
        <motion.div
          style={{
            position: "absolute",
            bottom: "28px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "6px",
            alignItems: "center",
            opacity: useTransform(sp, [0.85, 1], [1, 0]),
          }}
        >
          {[0.15, 0.5, 0.85].map((threshold, i) => (
            <motion.div
              key={i}
              style={{
                width: useTransform(sp,
                  [threshold - 0.15, threshold, threshold + 0.15],
                  [6, 18, 6]
                ),
                height: "4px",
                borderRadius: "2px",
                background: useTransform(sp,
                  [threshold - 0.1, threshold, threshold + 0.1],
                  ["rgba(255,255,255,0.15)", "#7C3AED", "rgba(255,255,255,0.15)"]
                ),
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
