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
    <section className="py-16 lg:py-20 px-4 sm:px-6" style={{ background: "#F9F9F9" }}>
      <div className="max-w-[1200px] mx-auto">
        <motion.p
          className="text-xs font-semibold text-muted-foreground tracking-[0.2em] uppercase text-center mb-10"
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
              className="flex items-center gap-3 px-6 py-4 rounded-xl bg-white border border-border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default"
            >
              {/* Placeholder logo badge */}
              <div className="w-8 h-8 rounded-md bg-brand/10 flex items-center justify-center shrink-0">
                <span className="text-[10px] font-bold text-brand">{c.abbr}</span>
              </div>
              <span className="text-sm font-semibold text-foreground whitespace-nowrap">{c.name}</span>
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
              <span className="text-2xl font-bold text-foreground">{m.value} </span>
              <span className="text-sm text-muted-foreground">{m.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
