"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronDown, TrendingUp, Target, MousePointerClick, ShoppingCart, ArrowRight } from "lucide-react";
import ScrambleText from "@/components/ScrambleText";

const metrics = [
  {
    icon: TrendingUp,
    label: "ROAS",
    title: "Reklam Harcama Getirisi",
    color: "text-brand",
    bg: "bg-brand/10 border-brand/20",
    desc: "Harcadığınız bütçenin size ne kadar kazanç sağladığını gösterir.",
    goal: "Amaç: Karlılığı artırmak.",
    detail: "ROAS = Reklam Geliri ÷ Reklam Harcaması. Örneğin 5x ROAS, 1 TL harcayıp 5 TL kazanmak demektir. Hedef ROAS sektöre ve ürüne göre değişir; e-ticarette 4x üzeri güçlü kabul edilir.",
    example: "₺10.000 harcama → ₺64.000 gelir = 6.4x ROAS",
  },
  {
    icon: Target,
    label: "CPA",
    title: "Müşteri Edinme Maliyeti",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
    desc: "Bir müşteri kazanmanın ortalama maliyeti.",
    goal: "Amaç: Daha düşük maliyetle büyümek.",
    detail: "CPA = Toplam Reklam Harcaması ÷ Dönüşüm Sayısı. CPA ne kadar düşükse, aynı bütçeyle o kadar fazla müşteri kazanırsınız. Hedef CPA ürün marjınıza göre belirlenir.",
    example: "₺4.200 harcama ÷ 100 satış = ₺42 CPA",
  },
  {
    icon: MousePointerClick,
    label: "CTR",
    title: "Tıklama Oranı",
    color: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/20",
    desc: "Reklamın ne kadar ilgi çektiğini gösterir.",
    goal: "Amaç: Daha fazla potansiyel müşteri çekmek.",
    detail: "CTR = Tıklama ÷ Gösterim × 100. Yüksek CTR, reklamın hedef kitleye uygun ve ilgi çekici olduğunu gösterir. Meta reklamlarında %2-3 üzeri iyi, Google arama'da %5 üzeri güçlüdür.",
    example: "10.000 gösterim → 380 tıklama = %3.8 CTR",
  },
  {
    icon: ShoppingCart,
    label: "Conversion Rate",
    title: "Dönüşüm Oranı",
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
    desc: "Trafiğin satışa dönüşme oranı.",
    goal: "Amaç: Daha fazla satış elde etmek.",
    detail: "CVR = Satış ÷ Ziyaretçi × 100. Site hızı, ürün sayfası kalitesi, fiyatlandırma ve güven unsurları dönüşüm oranını doğrudan etkiler. E-ticarette %2-4 aralığı sektör ortalamasıdır.",
    example: "1.000 ziyaretçi → 41 satış = %4.1 CVR",
  },
];

function AccordionItem({ m, open, onToggle }: {
  m: typeof metrics[0];
  open: boolean;
  onToggle: () => void;
}) {
  const Icon = m.icon;
  return (
    <div className={`rounded-2xl border transition-all duration-200 overflow-hidden ${open ? m.bg : "border-border bg-background"}`}>
      <button
        className="w-full flex items-center gap-4 px-6 py-5 text-left"
        onClick={onToggle}
      >
        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${m.bg}`}>
          <Icon size={17} className={m.color} />
        </div>
        <div className="flex-1 min-w-0">
          <span className={`text-[10px] font-bold tracking-widest uppercase ${m.color}`}>{m.label}</span>
          <p className="text-sm font-semibold text-foreground">{m.title}</p>
        </div>
        <ChevronDown
          size={16}
          className={`text-foreground/40 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-3">
              <p className="text-sm text-foreground/70 leading-relaxed">{m.desc}</p>
              <p className={`text-xs font-semibold ${m.color}`}>{m.goal}</p>
              <p className="text-xs text-foreground/50 leading-relaxed">{m.detail}</p>
              <div className={`inline-flex items-center px-3 py-1.5 rounded-lg border text-xs font-mono ${m.bg}`}>
                <span className={m.color}>{m.example}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function KpiPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">

        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block mb-3 px-3 py-1 rounded-full border border-brand/30 bg-brand/10 text-brand text-xs font-medium tracking-widest uppercase">
            Metrikler
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4 leading-tight">
            <ScrambleText text="Reklam performansını" delay={200} duration={700} trigger={true} />{" "}
            <span className="bg-gradient-to-r from-brand to-violet-400 bg-clip-text text-transparent">
              <ScrambleText text="nasıl ölçüyoruz?" delay={450} duration={700} trigger={true} />
            </span>
          </h1>
          <p className="text-foreground/50 text-base leading-relaxed">
            4 temel metrik — ne anlama geldiği, nasıl hesaplandığı, neden önemli olduğu.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col gap-3 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {metrics.map((m, i) => (
            <AccordionItem
              key={m.label}
              m={m}
              open={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </motion.div>

        <motion.div
          className="text-center p-6 rounded-2xl border border-border bg-muted/30"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-sm text-foreground/50 mb-4">
            Bu metrikler tek başına değil, <strong className="text-foreground/70">birlikte analiz edilir.</strong>
          </p>
          <Link
            href="/iletisim"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand text-[#0b1a12] text-sm font-semibold hover:bg-brand/90 transition-all hover:shadow-lg hover:shadow-brand/30"
          >
            Markanızı Analiz Edelim
            <ArrowRight size={15} />
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
