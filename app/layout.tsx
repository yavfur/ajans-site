import type { Metadata } from "next";
import "./globals.css";
import PublicShell from "@/components/PublicShell";
import Toaster from "@/components/Toaster";

export const metadata: Metadata = {
  title: {
    default: "Dijital Pazarlama Ajansı | E-ticaret Büyüme Ortağınız",
    template: "%s | Dijital Pazarlama Ajansı",
  },
  description:
    "E-ticaret markalarına özel 360° dijital pazarlama: Meta & Google Ads, Shopify geliştirme, içerik üretimi, marketplace yönetimi. Veri odaklı, şeffaf, hızlı.",
  keywords: [
    "dijital pazarlama ajansı",
    "e-ticaret pazarlama",
    "Meta Ads yönetimi",
    "Google Ads ajansı",
    "Shopify geliştirme",
    "ROAS optimizasyonu",
    "Trendyol reklam yönetimi",
  ],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Dijital Pazarlama Ajansı",
    title: "E-ticaret için 360° Dijital Pazarlama",
    description:
      "Meta & Google Ads, Shopify geliştirme ve marketplace yönetimi ile markanızı büyütüyoruz. Ücretsiz danışmanlık için iletişime geçin.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark">
      <body className="min-h-screen antialiased flex flex-col">
        <PublicShell>{children}</PublicShell>
        <Toaster />
      </body>
    </html>
  );
}
