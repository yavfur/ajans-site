"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/* ── Curtain line reveal ── */
function RevealLine({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <div style={{ overflow: "hidden" }}>
      <motion.div
        initial={{ y: "108%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.0, delay, ease: [0.22, 1, 0.36, 1] }}
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
    const start = Date.now();
    const dur = 2000;
    function tick() {
      const p = Math.min((Date.now() - start) / dur, 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
      else setVal(target);
    }
    const t = setTimeout(() => requestAnimationFrame(tick), 800);
    return () => clearTimeout(t);
  }, [target]);
  return <>{val}{suffix}</>;
}

const STATS = [
  { val: 50,  suffix: "+",   label: "Büyüyen Marka" },
  { val: 6,   suffix: ".4×", label: "En Yüksek ROAS" },
  { val: 5,   suffix: "M+₺", label: "Yönetilen Bütçe" },
  { val: 40,  suffix: "%↓",  label: "Ortalama CPA Düşüşü" },
];

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      style={{
        height: "100svh",
        minHeight: "600px",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        background: "#050505",
      }}
    >
      {/* ══ CSS GRADIENT MESH BACKGROUND ══ */}
      <div
        aria-hidden
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        {/* Purple blob top-right — CSS animated */}
        <div
          className="animate-blob-1"
          style={{
            position: "absolute",
            top: "-10%",
            right: "-5%",
            width: "clamp(400px, 55vw, 800px)",
            height: "clamp(400px, 55vw, 800px)",
            background:
              "radial-gradient(circle, rgba(124,58,237,0.30) 0%, rgba(124,58,237,0.08) 45%, transparent 70%)",
            filter: "blur(80px)",
            willChange: "transform",
          }}
        />
        {/* Green blob bottom-left — CSS animated */}
        <div
          className="animate-blob-2"
          style={{
            position: "absolute",
            bottom: "-15%",
            left: "-8%",
            width: "clamp(350px, 45vw, 650px)",
            height: "clamp(350px, 45vw, 650px)",
            background:
              "radial-gradient(circle, rgba(34,197,94,0.18) 0%, rgba(34,197,94,0.04) 50%, transparent 70%)",
            filter: "blur(90px)",
            willChange: "transform",
          }}
        />
        {/* Blue accent center — static */}
        <div
          className="animate-blob-3"
          style={{
            position: "absolute",
            top: "40%",
            left: "30%",
            width: "400px",
            height: "400px",
            background:
              "radial-gradient(circle, rgba(59,130,246,0.09) 0%, transparent 70%)",
            filter: "blur(70px)",
            willChange: "transform",
          }}
        />
        {/* Subtle grid */}
        <div
          className="grid-bg"
          style={{ position: "absolute", inset: 0, opacity: 0.55 }}
        />
        {/* Edge vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 25%, rgba(5,5,5,0.65) 100%)",
          }}
        />
        {/* Scan line */}
        <motion.div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: "1px",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(124,58,237,0.55) 35%, rgba(59,130,246,0.4) 65%, transparent 100%)",
          }}
          animate={{ y: ["0vh", "100vh"] }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear", repeatDelay: 10 }}
        />
      </div>

      {/* ══ TOP STATS BAR — subtle, minimal ══ */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "clamp(16px, 3vw, 40px)",
          padding: "14px clamp(16px, 4vw, 48px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          flexWrap: "wrap",
        }}
      >
        {STATS.map((s, i) => (
          <div
            key={s.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
            }}
          >
            <span
              style={{
                fontSize: "clamp(13px, 1.6vw, 17px)",
                fontWeight: 800,
                color: "#22C55E",
                fontFamily: "var(--font-heading)",
                letterSpacing: "-0.02em",
              }}
            >
              <Counter target={s.val} suffix={s.suffix} />
            </span>
            <span
              style={{
                fontSize: "11px",
                color: "rgba(136,136,153,0.65)",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.05em",
                whiteSpace: "nowrap",
              }}
            >
              {s.label}
            </span>
            {i < STATS.length - 1 && (
              <span
                style={{
                  color: "rgba(255,255,255,0.08)",
                  marginLeft: "clamp(8px, 1.5vw, 20px)",
                  fontSize: "10px",
                }}
              >
                ·
              </span>
            )}
          </div>
        ))}
      </motion.div>

      {/* ══ MAIN CONTENT ══ */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 clamp(20px, 6vw, 100px)",
          position: "relative",
          zIndex: 2,
          maxWidth: "1280px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "clamp(20px, 3vh, 40px)",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#22C55E",
              boxShadow: "0 0 8px rgba(34,197,94,0.8)",
              animation: "pulse-dot 1.4s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontSize: "11px",
              fontWeight: 600,
              color: "#888899",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontFamily: "var(--font-mono)",
            }}
          >
            Performance Marketing · Türkiye
          </span>
        </motion.div>

        {/* ── BIG HEADLINE — curtain reveal ── */}
        <div style={{ marginBottom: "clamp(24px, 4vh, 52px)" }}>
          <RevealLine delay={0.2}>
            <span
              style={{
                display: "block",
                fontSize: "clamp(52px, 10.5vw, 152px)",
                fontWeight: 800,
                lineHeight: 0.93,
                letterSpacing: "-0.04em",
                color: "#F5F5F7",
                fontFamily: "var(--font-heading)",
              }}
            >
              Büyüme
            </span>
          </RevealLine>
          <RevealLine delay={0.32}>
            <span
              style={{
                display: "block",
                fontSize: "clamp(52px, 10.5vw, 152px)",
                fontWeight: 800,
                lineHeight: 0.93,
                letterSpacing: "-0.04em",
                fontFamily: "var(--font-heading)",
                background:
                  "linear-gradient(110deg, #A78BFA 0%, #7C3AED 38%, #3B82F6 72%, #60A5FA 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Sistemi
            </span>
          </RevealLine>
          <RevealLine delay={0.44}>
            <span
              style={{
                display: "block",
                fontSize: "clamp(52px, 10.5vw, 152px)",
                fontWeight: 800,
                lineHeight: 0.93,
                letterSpacing: "-0.04em",
                color: "#F5F5F7",
                fontFamily: "var(--font-heading)",
              }}
            >
              Kuruyoruz
            </span>
          </RevealLine>
        </div>

        {/* Sub + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.78, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(16px, 3vw, 40px)",
            flexWrap: "wrap",
          }}
        >
          <p
            style={{
              fontSize: "clamp(15px, 1.5vw, 18px)",
              color: "#888899",
              lineHeight: 1.65,
              maxWidth: "440px",
              margin: 0,
            }}
          >
            Veri odaklı reklam sistemleriyle ROAS artır,
            maliyetleri düşür, büyümeyi hızlandır.
          </p>

          {/* CTA — breathing glow */}
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
              position: "relative",
              overflow: "hidden",
              flexShrink: 0,
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              animation: "cta-breathe 3s ease-in-out infinite",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05) translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 0 60px rgba(59,130,246,0.7), 0 0 140px rgba(59,130,246,0.32)";
              e.currentTarget.style.animationPlayState = "paused";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = "";
              e.currentTarget.style.animationPlayState = "running";
            }}
          >
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

      {/* ══ SCROLL INDICATOR ══ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          paddingBottom: "24px",
          color: "#888899",
        }}
      >
        <span
          style={{
            fontSize: "9px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontFamily: "var(--font-mono)",
            opacity: 0.4,
          }}
        >
          Keşfet
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={16} style={{ opacity: 0.3 }} />
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes cta-breathe {
          0%, 100% { box-shadow: 0 0 28px rgba(59,130,246,0.4), 0 0 70px rgba(59,130,246,0.16); }
          50%       { box-shadow: 0 0 48px rgba(59,130,246,0.65), 0 0 120px rgba(59,130,246,0.28); }
        }
      `}</style>
    </section>
  );
}
