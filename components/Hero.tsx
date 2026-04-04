"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

/* ── Curtain-reveal line ── */
function RevealLine({
  children,
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div style={{ overflow: "hidden", lineHeight: 1.0 }}>
      <motion.div
        initial={{ y: "105%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.0, delay, ease: [0.22, 1, 0.36, 1] }}
        style={style}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ── Animated counter ── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const dur = 1800;
    const start = Date.now();
    function tick() {
      const p = Math.min((Date.now() - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(ease * target));
      if (p < 1) requestAnimationFrame(tick);
      else setVal(target);
    }
    const t = setTimeout(() => requestAnimationFrame(tick), 1200);
    return () => clearTimeout(t);
  }, [target]);
  return <>{val}{suffix}</>;
}

const STATS = [
  { val: 50,  suffix: "+",  label: "Büyüyen Marka" },
  { val: 38,  suffix: "×",  label: "Ort. ROAS (×10)" },
  { val: 40,  suffix: "%↓", label: "CPA Düşüşü" },
  { val: 5,   suffix: "M+₺",label: "Yönetilen Bütçe" },
];

export default function Hero() {
  return (
    <section
      style={{
        height: "100svh",
        minHeight: "640px",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        background: "#050505",
      }}
    >
      {/* ══ BACKGROUND AURORA ══ */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {/* Purple aurora — top right */}
        <div
          className="animate-blob-1"
          style={{
            position: "absolute",
            top: "-15%",
            right: "-10%",
            width: "clamp(500px,60vw,900px)",
            height: "clamp(500px,60vw,900px)",
            background:
              "radial-gradient(circle, rgba(124,58,237,0.28) 0%, rgba(124,58,237,0.08) 40%, transparent 70%)",
            filter: "blur(80px)",
            willChange: "transform",
          }}
        />
        {/* Green pulse — bottom left */}
        <div
          className="animate-blob-2"
          style={{
            position: "absolute",
            bottom: "-20%",
            left: "-8%",
            width: "clamp(400px,50vw,700px)",
            height: "clamp(400px,50vw,700px)",
            background:
              "radial-gradient(circle, rgba(34,197,94,0.16) 0%, rgba(34,197,94,0.04) 50%, transparent 70%)",
            filter: "blur(90px)",
            willChange: "transform",
          }}
        />
        {/* Blue accent — bottom right */}
        <div
          className="animate-blob-3"
          style={{
            position: "absolute",
            bottom: "5%",
            right: "5%",
            width: "300px",
            height: "300px",
            background:
              "radial-gradient(circle, rgba(59,130,246,0.14) 0%, transparent 70%)",
            filter: "blur(60px)",
            willChange: "transform",
          }}
        />
        {/* Grid */}
        <div
          className="grid-bg"
          style={{ position: "absolute", inset: 0, opacity: 0.6 }}
        />
        {/* Vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(5,5,5,0.7) 100%)",
          }}
        />
        {/* Scanline */}
        <motion.div
          style={{
            position: "absolute",
            left: 0, right: 0,
            height: "1px",
            top: 0,
            background:
              "linear-gradient(90deg, transparent 0%, rgba(124,58,237,0.6) 30%, rgba(59,130,246,0.4) 70%, transparent 100%)",
          }}
          animate={{ y: ["0vh", "100vh"] }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear", repeatDelay: 8 }}
        />
      </div>

      {/* ══ MAIN CONTENT ══ */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 clamp(20px, 5vw, 80px)",
          position: "relative",
          zIndex: 1,
          maxWidth: "1400px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "clamp(24px, 4vh, 48px)",
          }}
        >
          <span
            className="animate-pulse-dot"
            style={{
              display: "inline-block",
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#22C55E",
              boxShadow: "0 0 8px rgba(34,197,94,0.8)",
            }}
          />
          <span
            style={{
              fontSize: "11px",
              fontWeight: 600,
              color: "#888899",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontFamily: "var(--font-mono)",
            }}
          >
            Growth Operating System · 2024
          </span>
        </motion.div>

        {/* ── HERO HEADLINE — curtain reveal ── */}
        <div style={{ marginBottom: "clamp(24px, 4vh, 48px)" }}>
          {/* Line 1 */}
          <RevealLine delay={0.15}>
            <span
              style={{
                display: "block",
                fontSize: "clamp(60px, 11.5vw, 168px)",
                fontWeight: 800,
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
                color: "#F5F5F7",
                fontFamily: "var(--font-heading)",
              }}
            >
              BÜYÜME
            </span>
          </RevealLine>

          {/* Line 2 — with gradient split */}
          <RevealLine delay={0.28}>
            <span
              style={{
                display: "block",
                fontSize: "clamp(60px, 11.5vw, 168px)",
                fontWeight: 800,
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
                fontFamily: "var(--font-heading)",
              }}
            >
              <span
                style={{
                  background:
                    "linear-gradient(120deg, #A78BFA 0%, #7C3AED 45%, #3B82F6 80%, #60A5FA 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                SİSTEMİ
              </span>
            </span>
          </RevealLine>

          {/* Line 3 */}
          <RevealLine delay={0.41}>
            <span
              style={{
                display: "block",
                fontSize: "clamp(60px, 11.5vw, 168px)",
                fontWeight: 800,
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
                color: "#F5F5F7",
                fontFamily: "var(--font-heading)",
              }}
            >
              KURUYORUZ
            </span>
          </RevealLine>
        </div>

        {/* Sub + CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "24px",
            flexWrap: "wrap",
          }}
        >
          <p
            style={{
              fontSize: "clamp(15px, 1.6vw, 19px)",
              color: "#888899",
              lineHeight: 1.6,
              maxWidth: "480px",
              margin: 0,
            }}
          >
            Veri odaklı reklam sistemleriyle ROAS artır,
            maliyetleri düşür, büyümeyi hızlandır.
          </p>

          <Link
            href="/iletisim"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "16px 32px",
              borderRadius: "12px",
              background: "#3B82F6",
              color: "#fff",
              fontWeight: 700,
              fontSize: "16px",
              textDecoration: "none",
              fontFamily: "var(--font-heading)",
              boxShadow:
                "0 0 32px rgba(59,130,246,0.45), 0 0 80px rgba(59,130,246,0.18)",
              position: "relative",
              overflow: "hidden",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.04) translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 0 56px rgba(59,130,246,0.65), 0 0 120px rgba(59,130,246,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1) translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 0 32px rgba(59,130,246,0.45), 0 0 80px rgba(59,130,246,0.18)";
            }}
          >
            {/* Shimmer */}
            <span
              className="animate-shimmer"
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.28) 50%, transparent 100%)",
                pointerEvents: "none",
              }}
            />
            Ücretsiz growth analizi
            <ArrowRight size={17} />
          </Link>
        </motion.div>
      </div>

      {/* ══ BOTTOM STATS BAR ══ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        style={{
          position: "relative",
          zIndex: 1,
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "clamp(16px,2.5vh,28px) clamp(20px,5vw,80px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
          background: "rgba(5,5,5,0.6)",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "clamp(24px,4vw,64px)",
            flexWrap: "wrap",
          }}
        >
          {STATS.map((s, i) => (
            <div key={s.label}>
              <div
                style={{
                  fontSize: "clamp(22px, 2.8vw, 38px)",
                  fontWeight: 800,
                  color: "#22C55E",
                  fontFamily: "var(--font-heading)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                }}
              >
                <Counter target={s.val} suffix={s.suffix} />
              </div>
              <div
                style={{
                  fontSize: "10px",
                  color: "#888899",
                  marginTop: "3px",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontSize: "10px",
              color: "#888899",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontFamily: "var(--font-mono)",
            }}
          >
            Keşfet
          </span>
          <div
            style={{
              width: "1px",
              height: "32px",
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <motion.div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "50%",
                background: "linear-gradient(to bottom, #3B82F6, transparent)",
              }}
              animate={{ y: ["−100%", "200%"] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
