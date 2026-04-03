"use client";

import { motion } from "framer-motion";

const platforms = [
  { name: "Meta Ads", icon: "M" },
  { name: "Google Ads", icon: "G" },
  { name: "TikTok Ads", icon: "T" },
  { name: "Trendyol", icon: "TR" },
  { name: "Shopify", icon: "S" },
  { name: "Amazon TR", icon: "A" },
  { name: "Hepsiburada", icon: "H" },
  { name: "Instagram", icon: "IG" },
];

// Duplicate for seamless loop
const items = [...platforms, ...platforms];

export default function PlatformPartners() {
  return (
    <section className="py-12 px-4 sm:px-6 border-t border-b border-border/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0d2018]/50 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto mb-6 text-center">
        <p className="text-[10px] font-mono text-foreground/20 tracking-[0.4em] uppercase">
          Çalıştığımız Platformlar
        </p>
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden">
        {/* Fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0b1a12] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0b1a12] to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-6 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{ willChange: "transform" }}
        >
          {items.map((p, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-5 py-3 rounded-xl border border-border/40 bg-background/40 backdrop-blur-sm shrink-0 group hover:border-brand/30 transition-colors duration-200"
            >
              <div className="w-7 h-7 rounded-lg bg-foreground/8 flex items-center justify-center">
                <span className="text-[10px] font-bold text-foreground/40 group-hover:text-brand transition-colors duration-200">
                  {p.icon}
                </span>
              </div>
              <span className="text-sm text-foreground/40 group-hover:text-foreground/60 transition-colors duration-200 whitespace-nowrap font-medium">
                {p.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
