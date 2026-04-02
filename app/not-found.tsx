import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sayfa Bulunamadı | Dijital Pazarlama Ajansı",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="text-brand text-sm font-medium tracking-widest uppercase mb-4">404</p>
      <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
        Sayfa Bulunamadı
      </h1>
      <p className="text-foreground/50 max-w-md mb-10 text-lg">
        Aradığınız sayfa taşınmış, silinmiş ya da hiç var olmamış olabilir.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="px-8 py-3.5 rounded-lg bg-brand text-[#0b1a12] font-medium hover:bg-brand/90 transition-colors duration-200"
        >
          Ana Sayfaya Dön
        </Link>
        <Link
          href="/iletisim"
          className="px-8 py-3.5 rounded-lg border border-border text-foreground/70 font-medium hover:border-brand/50 hover:text-brand transition-colors duration-200"
        >
          İletişime Geç
        </Link>
      </div>
    </div>
  );
}
