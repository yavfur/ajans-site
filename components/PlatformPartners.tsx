"use client";

import { motion } from "framer-motion";

const platforms = [
  { name: "Meta Ads" },
  { name: "Google Ads" },
  { name: "TikTok Ads" },
  { name: "Trendyol" },
  { name: "Shopify" },
  { name: "Amazon TR" },
  { name: "Hepsiburada" },
  { name: "Instagram" },
];

const items = [...platforms, ...platforms];

export default function PlatformPartners() {
  return (
    <section className="py-12 border-t border-b border-border bg-muted/50">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 mb-6 text-center">
        <p className="text-xs font-medium text-muted-foreground tracking-[0.2em] uppercase">
          Çalıştığımız Platformlar
        </p>
      </div>

      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-muted/50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-muted/50 to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-4 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{ willChange: "transform" }}
        >
          {items.map((p, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-lg border border-border bg-white shrink-0"
            >
              <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                {p.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
