"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { BarChart2, Lightbulb, RefreshCw, ChevronRight, Terminal } from "lucide-react";

const STEPS = [
  {
    num: "01",
    icon: BarChart2,
    title: "Data Analizi",
    short: "Fırsat boşluklarını tespit ediyoruz",
    accent: "#7C3AED",
    glow: "rgba(124,58,237,0.3)",
    terminal: [
      "$ scanning campaigns...",
      "  → competitors: 12 analyzed",
      "  → audience gaps: 4 found",
      "  → budget waste: ₺2,840/mo",
      "  → opportunity score: 87/100",
      "✓ analysis complete",
    ],
    details: [
      "Mevcut kampanyalar derinlemesine incelenir",
      "Rakip stratejileri ve açık kanallar tespit edilir",
      "Bütçe verimsizlikleri ve kayıplar raporlanır",
      "Growth fırsatları önceliklendirilir",
    ],
  },
  {
    num: "02",
    icon: Lightbulb,
    title: "Strateji & Kreatif",
    short: "Veriye dayalı büyüme haritası çiziyoruz",
    accent: "#22C55E",
    glow: "rgba(34,197,94,0.3)",
    terminal: [
      "$ building growth map...",
      "  → channels selected: 3",
      "  → budget allocation: optimized",
      "  → creative concept: drafted",
      "  → A/B variants: 6 ready",
      "✓ strategy locked",
    ],
    details: [
      "Her kanal için özelleştirilmiş strateji",
      "Bütçe dağılımı ve ROAS hedefleri yazılı belirlenir",
      "Kreatif konsept ve mesaj mimarisi",
      "İlk 30 gün aksiyon planı hazırlanır",
    ],
  },
  {
    num: "03",
    icon: RefreshCw,
    title: "Sürekli Optimizasyon",
    short: "Neyin işe yaradığını çoğaltıyoruz",
    accent: "#3B82F6",
    glow: "rgba(59,130,246,0.3)",
    terminal: [
      "$ optimization loop running...",
      "  → weekly reports: automated",
      "  → underperformers: paused",
      "  → winners: scaled 2.4×",
      "  → ROAS delta: +38%",
      "✓ system self-improving",
    ],
    details: [
      "Haftalık raporlar ve anlık dashboard erişimi",
      "Kazanan reklamlar otomatik ölçeklenir",
      "Kötü performanslı kreatifleri kesiyoruz",
      "Sürekli A/B test döngüsü aktif tutulur",
    ],
  },
];

function TerminalLine({ line, delay }: { line: string; delay: number }) {
  const isSuccess = line.startsWith("✓");
  const isCommand = line.startsWith("$");
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
      style={{
        fontSize: "11px",
        fontFamily: "var(--font-mono)",
        color: isSuccess
          ? "#22C55E"
          : isCommand
          ? "#A78BFA"
          : "rgba(156,163,175,0.7)",
        padding: "1px 0",
        display: "flex",
        alignItems: "center",
        gap: "6px",
      }}
    >
      {isSuccess && (
        <span style={{ color: "#22C55E", flexShrink: 0 }}>✓</span>
      )}
      {line.replace("✓ ", "")}
      {isSuccess && (
        <span
          style={{
            display: "inline-block",
            width: "6px",
            height: "12px",
            background: "#22C55E",
            animation: "cursor-blink 1s steps(1) infinite",
            marginLeft: "2px",
          }}
        />
      )}
    </motion.div>
  );
}

export default function Process() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
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
            top: "-20%",
            right: "-8%",
            width: "600px",
            height: "600px",
            background:
              "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="grid-bg"
          style={{ position: "absolute", inset: 0, opacity: 0.5 }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(124,58,237,0.35), transparent)",
          }}
        />
      </div>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 clamp(16px,4vw,48px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "clamp(40px,7vh,80px)" }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "5px 14px",
              borderRadius: "99px",
              background: "rgba(124,58,237,0.1)",
              border: "1px solid rgba(124,58,237,0.25)",
              fontSize: "11px",
              fontWeight: 700,
              color: "#A78BFA",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontFamily: "var(--font-mono)",
              marginBottom: "20px",
            }}
          >
            Süreç
          </div>
          <h2
            style={{
              fontSize: "clamp(32px,5vw,62px)",
              fontWeight: 800,
              color: "#F5F5F7",
              fontFamily: "var(--font-heading)",
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
            }}
          >
            3 adımda büyüme sistemi
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "#888899",
              marginTop: "12px",
              maxWidth: "480px",
            }}
          >
            Veriden strateji, stratejiden sonuç. Her adım yazılı, her metrik takip
            altında.
          </p>
        </motion.div>

        {/* Interactive layout */}
        <div
          ref={ref}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(24px,4vw,64px)",
            alignItems: "start",
          }}
          className="process-grid"
        >
          {/* Left: Step buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const isActive = active === i;
              return (
                <motion.button
                  key={step.num}
                  onClick={() => setActive(i)}
                  initial={{ opacity: 0, x: -24 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "20px 24px",
                    borderRadius: "14px",
                    background: isActive
                      ? `${step.accent}10`
                      : "rgba(255,255,255,0.025)",
                    border: `1px solid ${
                      isActive ? step.accent + "35" : "rgba(255,255,255,0.07)"
                    }`,
                    cursor: "pointer",
                    textAlign: "left",
                    width: "100%",
                    transition: "all 0.3s ease",
                    boxShadow: isActive ? `0 0 32px ${step.glow}` : "none",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Active left accent */}
                  {isActive && (
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: "3px",
                        background: step.accent,
                        borderRadius: "0 2px 2px 0",
                      }}
                    />
                  )}

                  {/* Icon */}
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "10px",
                      background: `${step.accent}15`,
                      border: `1px solid ${step.accent}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      transition: "transform 0.3s",
                      transform: isActive ? "scale(1.1)" : "scale(1)",
                    }}
                  >
                    <Icon size={18} style={{ color: step.accent }} />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: "9px",
                        fontWeight: 700,
                        color: step.accent,
                        fontFamily: "var(--font-mono)",
                        letterSpacing: "0.12em",
                        marginBottom: "4px",
                      }}
                    >
                      STEP {step.num}
                    </div>
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: 700,
                        color: "#F5F5F7",
                        fontFamily: "var(--font-heading)",
                        marginBottom: "4px",
                      }}
                    >
                      {step.title}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#888899",
                        lineHeight: 1.4,
                      }}
                    >
                      {step.short}
                    </div>
                  </div>

                  <ChevronRight
                    size={16}
                    style={{
                      color: isActive ? step.accent : "rgba(255,255,255,0.15)",
                      transform: isActive ? "rotate(90deg)" : "rotate(0deg)",
                      transition: "transform 0.3s, color 0.3s",
                      flexShrink: 0,
                    }}
                  />
                </motion.button>
              );
            })}
          </div>

          {/* Right: Detail panel */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Terminal window */}
                <div
                  style={{
                    background: "rgba(10,10,15,0.9)",
                    border: `1px solid ${STEPS[active].accent}25`,
                    borderRadius: "14px",
                    overflow: "hidden",
                    marginBottom: "16px",
                    boxShadow: `0 0 40px ${STEPS[active].glow}`,
                  }}
                >
                  {/* Terminal header */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "12px 16px",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                      background: "rgba(255,255,255,0.02)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "5px",
                      }}
                    >
                      {["#FF5F57", "#FEBC2E", "#28C840"].map((c, ci) => (
                        <div
                          key={ci}
                          style={{
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            background: c,
                            opacity: 0.8,
                          }}
                        />
                      ))}
                    </div>
                    <Terminal
                      size={11}
                      style={{ color: "#888899", marginLeft: "4px" }}
                    />
                    <span
                      style={{
                        fontSize: "10px",
                        color: "#888899",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      growth-os · step {STEPS[active].num}
                    </span>
                  </div>

                  {/* Terminal body */}
                  <div style={{ padding: "16px 20px", minHeight: "120px" }}>
                    {STEPS[active].terminal.map((line, li) => (
                      <TerminalLine
                        key={line}
                        line={line}
                        delay={li * 0.12}
                      />
                    ))}
                  </div>
                </div>

                {/* Detail bullets */}
                <div
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "14px",
                    padding: "20px 24px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: STEPS[active].accent,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      fontFamily: "var(--font-mono)",
                      marginBottom: "14px",
                    }}
                  >
                    Ne yapıyoruz
                  </div>
                  {STEPS[active].details.map((d, di) => (
                    <motion.div
                      key={d}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: di * 0.08, duration: 0.3 }}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                        padding: "8px 0",
                        borderBottom:
                          di < STEPS[active].details.length - 1
                            ? "1px solid rgba(255,255,255,0.04)"
                            : "none",
                      }}
                    >
                      <div
                        style={{
                          width: "4px",
                          height: "4px",
                          borderRadius: "50%",
                          background: STEPS[active].accent,
                          flexShrink: 0,
                          marginTop: "6px",
                        }}
                      />
                      <span
                        style={{
                          fontSize: "13px",
                          color: "#9CA3AF",
                          lineHeight: 1.5,
                        }}
                      >
                        {d}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .process-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
