"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, FileText, Receipt, MessageSquare, ArrowRight, TrendingUp } from "lucide-react";

type Stats = {
  totalClients: number;
  pendingContents: number;
  unpaidInvoices: number;
  unreadMessages: number;
};

const quickActions = [
  { href: "/admin/musteriler/yeni", label: "Yeni Müşteri Ekle", icon: Users, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  { href: "/admin/icerikler", label: "İçerikleri İncele", icon: FileText, color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
  { href: "/admin/faturalar", label: "Fatura Oluştur", icon: Receipt, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
  { href: "/admin/mesajlar", label: "Mesajlara Git", icon: MessageSquare, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(() => setStats({ totalClients: 0, pendingContents: 0, unpaidInvoices: 0, unreadMessages: 0 }));
  }, []);

  const statCards = [
    {
      label: "Toplam Müşteri",
      value: stats?.totalClients ?? "—",
      icon: Users,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      href: "/admin/musteriler",
    },
    {
      label: "Bekleyen İçerik",
      value: stats?.pendingContents ?? "—",
      icon: FileText,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
      href: "/admin/icerikler",
      alert: stats && stats.pendingContents > 0,
    },
    {
      label: "Ödenmemiş Fatura",
      value: stats?.unpaidInvoices ?? "—",
      icon: Receipt,
      color: "text-red-400",
      bg: "bg-red-500/10",
      href: "/admin/faturalar",
      alert: stats && stats.unpaidInvoices > 0,
    },
    {
      label: "Okunmamış Mesaj",
      value: stats?.unreadMessages ?? "—",
      icon: MessageSquare,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      href: "/admin/mesajlar",
      alert: stats && stats.unreadMessages > 0,
    },
  ];

  return (
    <div className="max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-foreground/40 mt-1">Genel bakış ve hızlı erişim</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-emerald-400 font-medium">Sistem Aktif</span>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-10">
        {statCards.map(({ label, value, icon: Icon, color, bg, href, alert }) => (
          <Link
            key={label}
            href={href}
            className="group relative p-5 rounded-2xl border border-border bg-background hover:border-border/80 transition-all duration-200 hover:shadow-md cursor-pointer overflow-hidden"
          >
            {alert && (
              <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            )}
            <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-4`}>
              <Icon size={18} className={color} />
            </div>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            <p className="text-xs text-foreground/40 mt-1">{label}</p>
            <ArrowRight
              size={13}
              className="absolute bottom-4 right-4 text-foreground/15 group-hover:text-foreground/40 group-hover:translate-x-0.5 transition-all duration-200"
            />
          </Link>
        ))}
      </div>

      {/* Trend info */}
      <div className="p-5 rounded-2xl border border-border bg-background mb-8 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center shrink-0">
          <TrendingUp size={18} className="text-brand" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">Ortalama ROAS Artışı</p>
          <p className="text-xs text-foreground/40 mt-0.5">Aktif müşteriler genelinde son 30 günlük performans</p>
        </div>
        <div className="ml-auto text-2xl font-bold text-brand">%340</div>
      </div>

      {/* Hızlı Aksiyonlar */}
      <div>
        <h2 className="text-sm font-semibold text-foreground/50 mb-4 uppercase tracking-widest text-xs">
          Hızlı İşlemler
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickActions.map(({ href, label, icon: Icon, color, bg }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col items-center gap-3 p-5 rounded-2xl border border-border bg-background hover:border-border/80 transition-all duration-200 hover:shadow-md text-center cursor-pointer"
            >
              <div className={`w-10 h-10 rounded-xl border ${bg} flex items-center justify-center`}>
                <Icon size={17} className={color} />
              </div>
              <span className="text-xs text-foreground/60 group-hover:text-foreground transition-colors leading-snug">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
