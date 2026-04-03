"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import DashboardMockup from "@/components/DashboardMockup";
import RippleButton from "@/components/RippleButton";

const trust = ["İlk görüşme ücretsiz", "Sözleşmesiz başlangıç", "Haftalık raporlama"];

const dur = (delay: number) => ({ duration: 0.5, delay, ease: "easeOut" as const });

export default function Hero() {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Spec: spacingTop 120px desktop / 80px mobile */}
      <div className="pt-[120px] pb-20 lg:pt-[160px] lg:pb-28 px-4 sm:px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/20 pointer-events-none" />

        <div className="relative max-w-[1200px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

            {/* Sol: Metin */}
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={dur(0)}>
                <span className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded-full border border-brand/20 bg-brand/5 text-brand text-xs font-semibold tracking-wide uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                  E-ticaret Büyüme Ajansı
                </span>
              </motion.div>

              {/* Spec: desktop 56px bold / mobile 32px bold */}
              <motion.h1
                className="text-[32px] lg:text-[56px] font-bold leading-[1.12] tracking-tight text-[#111111] mb-6"
                style={{ marginBottom: "24px" }}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={dur(0.08)}
              >
                E-ticaret markalarına{" "}
                <span className="text-brand">ölçülebilir büyüme</span>{" "}
                sağlıyoruz
              </motion.h1>

              {/* Spec: desktop 24px / mobile 18px, color #666666 */}
              <motion.p
                className="text-[18px] lg:text-[24px] text-[#666666] font-medium leading-relaxed max-w-[480px]"
                style={{ marginBottom: "40px" }}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={dur(0.16)}
              >
                Google & Meta Ads, sosyal medya ve kreatif optimizasyon ile
                satışlarınızı artırıyoruz
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-x-6 gap-y-2 mb-10"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={dur(0.22)}
              >
                {trust.map((t) => (
                  <span key={t} className="flex items-center gap-2 text-sm text-[#666666]">
                    <CheckCircle size={14} className="text-brand shrink-0" />
                    {t}
                  </span>
                ))}
              </motion.div>

              {/* Spec: padding "20px 48px" desktop, hover scale+shadow, onClick ripple */}
              <motion.div
                className="flex flex-col sm:flex-row gap-3"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={dur(0.28)}
              >
                <RippleButton href="/iletisim" variant="primary" size="md" fullWidthMobile>
                  Ücretsiz Reklam Analizi Al
                  <ArrowRight size={16} />
                </RippleButton>

                <Link
                  href="/roadmap"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 sm:px-12 sm:py-5 rounded-xl border border-border text-foreground font-semibold text-sm hover:border-brand hover:text-brand transition-all duration-200"
                >
                  Nasıl Çalışır?
                </Link>
              </motion.div>
            </div>

            {/* Sağ: Dashboard Mockup — spec: subtle_slide_fade */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="hidden lg:block"
            >
              <DashboardMockup />
            </motion.div>
          </div>

          {/* Micro-stats bar */}
          <motion.div
            className="mt-16 lg:mt-20 pt-8 border-t border-border flex flex-wrap gap-x-12 gap-y-6"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={dur(0.36)}
          >
            {[
              { value: "50+", label: "Büyüyen e-ticaret markası" },
              { value: "6.4x", label: "Ortalama ROAS" },
              { value: "₺10M+", label: "Yönetilen reklam bütçesi" },
              { value: "%54", label: "Ortalama CPA düşüşü" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-bold text-[#111111]">{s.value}</div>
                <div className="text-sm text-[#666666] mt-0.5">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
