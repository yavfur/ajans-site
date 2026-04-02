"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Camera, Briefcase, AtSign, MessageCircle, CheckCircle, ChevronDown, Clock } from "lucide-react";

const serviceOptions = [
  "Paid Advertising (Meta & Google)",
  "E-commerce Development (Shopify)",
  "Content & Creative",
  "Marketplace Yönetimi",
  "Sosyal Medya Yönetimi",
];

const budgets = [
  "0 - 10.000 TL",
  "10.000 - 50.000 TL",
  "50.000 - 100.000 TL",
  "100.000 TL+",
];

const faqs = [
  {
    q: "İlk görüşme ücretli mi?",
    a: "Hayır, ilk 30 dakikalık strateji görüşmesi tamamen ücretsizdir. Bu görüşmede markanızı ve hedeflerinizi dinleyerek size özel bir yol haritası sunuyoruz.",
  },
  {
    q: "Sözleşme süresi ne kadar?",
    a: "Minimum 3 aylık hizmet anlaşması yapıyoruz. Dijital pazarlamada sürdürülebilir sonuçlar için en az 3 ay gerekiyor. Uzun vadeli iş birliklerinde özel indirimler uyguluyoruz.",
  },
  {
    q: "Raporlama nasıl yapılıyor?",
    a: "Starter pakette aylık, Growth pakette haftalık detaylı raporlar sunuyoruz. Premium pakette anlık dashboard erişimi sağlıyoruz. Tüm raporlar Türkçe ve anlaşılır formattadır.",
  },
  {
    q: "Hangi sektörlerde çalışıyorsunuz?",
    a: "Ağırlıklı olarak e-ticaret, kozmetik ve moda sektörlerinde uzmanlaşıyoruz. Türkiye pazarındaki tüketici davranışlarını ve platform dinamiklerini yakından tanıyoruz.",
  },
  {
    q: "Reklam bütçesi ajans ücretine dahil mi?",
    a: "Hayır, reklam bütçesi (ad spend) ajans hizmet ücretine dahil değildir. Meta veya Google hesabınızdan doğrudan ödenir. Bütçenizi nasıl yöneteceğinizi birlikte planlıyoruz.",
  },
];

export default function IletisimPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    website: "",
    budget: "",
    message: "",
  });

  const toggleService = (s: string) =>
    setSelected((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ ...form, services: selected });
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Başlık */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block mb-3 px-3 py-1 rounded-full border border-brand/30 bg-brand/10 text-brand text-xs font-medium tracking-widest uppercase">
            İletişim
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mt-2">
            Projenizi Konuşalım
          </h1>
          <p className="text-foreground/50 mt-4 max-w-xl mx-auto">
            Size özel teklif hazırlamamız için formu doldurun, en kısa sürede dönelim.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-12 mb-24">
          {/* Sol: İletişim Bilgileri */}
          <motion.div
            className="md:col-span-2 flex flex-col gap-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-5">
                Bize Ulaşın
              </h2>
              <div className="flex flex-col gap-4">
                <a
                  href="mailto:info@ajans.com"
                  className="flex items-center gap-3 text-foreground/60 hover:text-brand transition-colors duration-200 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-muted border border-border flex items-center justify-center group-hover:border-brand/50 transition-colors">
                    <Mail size={16} />
                  </div>
                  <span className="text-sm">info@ajans.com</span>
                </a>
                <a
                  href="tel:+905001234567"
                  className="flex items-center gap-3 text-foreground/60 hover:text-brand transition-colors duration-200 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-muted border border-border flex items-center justify-center group-hover:border-brand/50 transition-colors">
                    <Phone size={16} />
                  </div>
                  <span className="text-sm">+90 500 123 45 67</span>
                </a>
              </div>
            </div>

            {/* Çalışma Saatleri */}
            <div className="p-5 rounded-2xl border border-border bg-muted">
              <div className="flex items-center gap-2 mb-3">
                <Clock size={16} className="text-brand" />
                <h3 className="text-sm font-semibold text-foreground">Çalışma Saatleri</h3>
              </div>
              <div className="flex flex-col gap-2 text-sm text-foreground/50">
                <div className="flex justify-between">
                  <span>Pazartesi – Cuma</span>
                  <span className="text-foreground/70">09:00 – 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Cumartesi</span>
                  <span className="text-foreground/70">10:00 – 14:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Pazar</span>
                  <span className="text-foreground/40">Kapalı</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-5">
                Sosyal Medya
              </h2>
              <div className="flex gap-3">
                {[
                  { icon: Camera, label: "Instagram" },
                  { icon: Briefcase, label: "LinkedIn" },
                  { icon: AtSign, label: "Twitter/X" },
                ].map(({ icon: Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="w-10 h-10 rounded-lg bg-muted border border-border flex items-center justify-center text-foreground/60 hover:border-brand/50 hover:text-brand transition-all duration-200"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-brand/20 bg-brand/5">
              <p className="text-sm text-foreground/60 leading-relaxed">
                Hızlı yanıt için WhatsApp'tan ulaşabilirsiniz. Genellikle{" "}
                <span className="text-brand font-medium">1 saat içinde</span>{" "}
                geri dönüyoruz.
              </p>
              <a
                href="https://wa.me/905001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium transition-colors duration-200"
              >
                <MessageCircle size={16} />
                WhatsApp ile Yaz
              </a>
            </div>
          </motion.div>

          {/* Sağ: Form */}
          <motion.div
            className="md:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center gap-4 p-12 rounded-2xl border border-border bg-muted text-center">
                <div className="w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center">
                  <CheckCircle size={32} className="text-brand" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Teşekkürler!</h3>
                <p className="text-foreground/50 max-w-sm">
                  Mesajınızı aldık. En kısa sürede size dönüş yapacağız.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-8 rounded-2xl border border-border bg-muted flex flex-col gap-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs text-foreground/50 mb-1.5">
                      Ad Soyad <span className="text-brand">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Adınız Soyadınız"
                      className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground text-sm placeholder:text-foreground/30 focus:outline-none focus:border-brand/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-foreground/50 mb-1.5">
                      Firma Adı <span className="text-brand">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder="Firma Adınız"
                      className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground text-sm placeholder:text-foreground/30 focus:outline-none focus:border-brand/60 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs text-foreground/50 mb-1.5">
                      E-posta <span className="text-brand">*</span>
                    </label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="ornek@firma.com"
                      className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground text-sm placeholder:text-foreground/30 focus:outline-none focus:border-brand/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-foreground/50 mb-1.5">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="0500 000 00 00"
                      className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground text-sm placeholder:text-foreground/30 focus:outline-none focus:border-brand/60 transition-colors"
                    />
                  </div>
                </div>

                {/* Website */}
                <div>
                  <label className="block text-xs text-foreground/50 mb-1.5">
                    Web Sitesi / Mağaza URL
                  </label>
                  <input
                    type="url"
                    value={form.website}
                    onChange={(e) => setForm({ ...form, website: e.target.value })}
                    placeholder="https://maganizin.com"
                    className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground text-sm placeholder:text-foreground/30 focus:outline-none focus:border-brand/60 transition-colors"
                  />
                </div>

                {/* Hizmet Seçimi */}
                <div>
                  <label className="block text-xs text-foreground/50 mb-2">
                    İlgilendiğiniz Hizmetler
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {serviceOptions.map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => toggleService(s)}
                        className={`px-3 py-2.5 rounded-lg border text-xs text-left transition-all duration-200 ${
                          selected.includes(s)
                            ? "border-brand bg-brand/10 text-brand"
                            : "border-border text-foreground/50 hover:border-brand/40"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bütçe */}
                <div>
                  <label className="block text-xs text-foreground/50 mb-1.5">
                    Tahmini Aylık Bütçe
                  </label>
                  <select
                    value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:border-brand/60 transition-colors"
                  >
                    <option value="">Seçiniz...</option>
                    {budgets.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                {/* Mesaj */}
                <div>
                  <label className="block text-xs text-foreground/50 mb-1.5">
                    Mesajınız
                  </label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Projeniz hakkında kısaca bilgi veriniz..."
                    className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground text-sm placeholder:text-foreground/30 focus:outline-none focus:border-brand/60 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-brand text-white font-medium hover:bg-brand/90 transition-colors duration-200"
                >
                  Teklif Talebi Gönder
                </button>
              </form>
            )}
          </motion.div>
        </div>

        {/* SSS / FAQ Accordion */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-foreground">Sık Sorulan Sorular</h2>
            <p className="text-foreground/50 mt-2 text-sm">Aklınızdaki soruların cevapları burada olabilir</p>
          </div>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-muted overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <span className="text-sm font-medium text-foreground">{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`text-foreground/40 shrink-0 ml-4 transition-transform duration-200 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-4 text-sm text-foreground/50 leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WhatsApp Sabit Buton */}
      <a
        href="https://wa.me/905001234567"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 flex items-center justify-center text-white shadow-lg hover:shadow-emerald-500/30 transition-all duration-200"
        aria-label="WhatsApp"
      >
        <MessageCircle size={24} />
      </a>
    </div>
  );
}
