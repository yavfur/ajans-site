"use client";

import { motion } from "framer-motion";

const clients = [
  { name: "Marka A", abbr: "MA" },
  { name: "Marka B", abbr: "MB" },
  { name: "Marka C", abbr: "MC" },
  { name: "Marka D", abbr: "MD" },
  { name: "Marka E", abbr: "ME" },
];

const metrics = [
  { value: "20+", label: "markayla çalıştık" },
  { value: "5M+ TL", label: "reklam yönettik" },
];

export default function PlatformPartners() {
  return (
    <section className="py-16 lg:py-20 px-4 sm:px-6" style={{ background: "#0A0A0F", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
      <div className="max-w-[1200px] mx-auto">
        <motion.p
          className="text-xs font-semibold tracking-[0.2em] uppercase text-center mb-10"
          style={{ color: "#888899" }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          Güvendikleri Markalar
        </motion.p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {clients.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07, ease: "easeOut" }}
              className="flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-200 cursor-default hover:-translate-y-0.5"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              {/* Placeholder logo badge */}
              <div className="w-8 h-8 rounded-md flex items-center justify-center shrink-0"
                style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.2)" }}>
                <span className="text-[10px] font-bold" style={{ color: "#C084FC" }}>{c.abbr}</span>
              </div>
              <span className="text-sm font-semibold text-white whitespace-nowrap">{c.name}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="flex flex-wrap justify-center gap-8 lg:gap-16"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.35, ease: "easeOut" }}
        >
          {metrics.map((m) => (
            <div key={m.label} className="text-center">
              <span className="text-2xl font-bold text-white">{m.value} </span>
              <span className="text-sm" style={{ color: "#888899" }}>{m.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
