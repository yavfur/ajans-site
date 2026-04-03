"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Layers, BarChart2, Zap, Eye } from "lucide-react";

const reasons = [
  {
    num: "01",
    icon: Layers,
    title: "360° Entegre Hizmet",
    description:
      "Reklamdan içeriğe, Shopify geliştirmeden marketplace yönetimine kadar tüm kanalları tek elden yönetiyoruz. Çoklu ajans karmaşası yok, tek iletişim noktası var.",
    glow: "rgba(124,58,237,0.5)",
    color: "#7C3AED",
  },
  {
    num: "02",
    icon: BarChart2,
    title: "Veri Odaklı Kararlar",
    description:
      "Vanity metrikler değil; ROAS, CPA ve gerçek gelir büyümesini ölçüyoruz. Her karar veriye, her harcama ROI analizine dayanıyor.",
    glow: "rgba(6,182,212,0.5)",
    color: "#06B6D4",
  },
  {
    num: "03",
    icon: Eye,
    title: "Şeffaf Raporlama",
    description:
      "Haftalık raporlar ve anlık dashboard erişimi. Ne yaptığımızı, neden yaptığımızı her zaman bilirsiniz. Sürpriz fatura, sürpriz karar yok.",
    glow: "rgba(245,158,11,0.5)",
    color: "#F59E0B",
  },
  {
    num: "04",
    icon: Zap,
    title: "Hızlı Karar Alma",
    description:
      "Küçük ve çevik yapımız sayesinde kampanya değişikliklerine saatler içinde müdahale edebiliyoruz. Bürokratik yavaşlık yok.",
    glow: "rgba(244,63,94,0.5)",
    color: "#F43F5E",
  },
];

function ReasonRow({ reason, index }: { reason: typeof reasons[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const Icon = reason.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="group relative flex gap-8 py-10 border-b last:border-b-0"
      style={{ borderColor: "rgba(255,255,255,0.05)" }}
    >
      {/* Big semi-transparent number */}
      <div
        className="hidden lg:block absolute -left-2 top-1/2 -translate-y-1/2 text-[120px] font-bold leading-none select-none pointer-events-none transition-opacity duration-500"
        style={{
          color: reason.color,
          opacity: 0.04,
          fontFamily: "var(--font-heading)",
        }}
      >
        {reason.num}
      </div>

      {/* Accent line */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-px"
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ duration: 0.6, delay: index * 0.12 + 0.3 }}
        style={{
          background: `linear-gradient(to bottom, transparent, ${reason.color}, transparent)`,
          transformOrigin: "top",
          opacity: 0.6,
        }}
      />

      {/* Icon */}
      <div className="shrink-0 pl-6 lg:pl-12">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
          style={{
            background: `${reason.color}18`,
            border: `1px solid ${reason.color}30`,
          }}
        >
          <Icon size={22} style={{ color: reason.color }} />
        </div>
      </div>

      {/* Text */}
      <div className="flex-1 pt-1">
        <div className="flex items-center gap-4 mb-3">
          <span className="text-xs font-bold font-mono tabular-nums"
            style={{ color: reason.color, opacity: 0.7 }}>
            {reason.num}
          </span>
          <h3 className="text-xl lg:text-2xl font-bold text-white tracking-tight">{reason.title}</h3>
        </div>
        <p className="text-[#888899] leading-relaxed max-w-[600px]">{reason.description}</p>
      </div>

      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(ellipse at 20% 50%, ${reason.glow.replace("0.5", "0.04")}, transparent 60%)` }}
      />
    </motion.div>
  );
}

export default function WhyUs() {
  return (
    <section className="py-28 px-4 sm:px-6 relative overflow-hidden" style={{ background: "#050505" }}>
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-cyan-900/10 blur-[160px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto">
        <div className="lg:grid lg:grid-cols-[380px,1fr] lg:gap-24">
          {/* Sticky left */}
          <div className="lg:sticky lg:top-32 lg:self-start mb-16 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase text-cyan-300"
                style={{ border: "1px solid rgba(6,182,212,0.3)", background: "rgba(6,182,212,0.08)" }}>
                Farkımız
              </span>
              <h2 className="text-[clamp(32px,4vw,52px)] font-bold text-white mt-2 tracking-tight leading-[1.1]">
                Neden<br />
                <span className="gradient-text">Biz?</span>
              </h2>
              <p className="text-[#888899] mt-5 leading-relaxed">
                E-ticaret sektörüne özel derin uzmanlık ve hesap verebilir bir iş ortağı.
              </p>

              {/* Mini stat */}
              <div className="mt-10 p-5 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="text-4xl font-bold text-white mb-1">50<span className="gradient-text">+</span></div>
                <div className="text-sm text-[#888899]">Büyüyen marka ile birlikte çalıştık</div>
              </div>
            </motion.div>
          </div>

          {/* Right: scrolling list */}
          <div>
            {reasons.map((r, i) => (
              <ReasonRow key={r.title} reason={r} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
