import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { FileText, Clock, CheckCircle, XCircle, MessageSquare, Receipt, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();
  const userId = (session!.user as { id: string }).id;
  const userName = (session!.user as { name?: string | null }).name ?? "Kullanıcı";

  const [pending, approved, rejected, unreadCount] = await Promise.all([
    prisma.content.count({ where: { clientService: { userId }, status: "PENDING" } }),
    prisma.content.count({ where: { clientService: { userId }, status: "APPROVED" } }),
    prisma.content.count({ where: { clientService: { userId }, status: "REJECTED" } }),
    prisma.message.count({ where: { receiverId: userId, isRead: false } }),
  ]);

  const stats = [
    { label: "Bekleyen İçerik", value: pending, icon: Clock, color: "text-yellow-400", bg: "bg-yellow-500/10" },
    { label: "Onaylanan İçerik", value: approved, icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { label: "Reddedilen İçerik", value: rejected, icon: XCircle, color: "text-red-400", bg: "bg-red-500/10" },
    { label: "Toplam İçerik", value: pending + approved + rejected, icon: FileText, color: "text-brand", bg: "bg-brand/10" },
  ];

  const quickLinks = [
    { href: "/dashboard/mesajlar", label: "Mesajlar", icon: MessageSquare, color: "text-sky-400", bg: "bg-sky-500/10 border-sky-500/20", badge: unreadCount > 0 ? unreadCount : null },
    { href: "/dashboard/faturalar", label: "Faturalar", icon: Receipt, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20", badge: null },
  ];

  return (
    <div className="max-w-4xl">
      {/* Hoş geldin */}
      <div className="mb-8">
        <p className="text-sm text-foreground/40 mb-1">Hoş geldiniz 👋</p>
        <h1 className="text-2xl font-bold text-foreground">{userName}</h1>
      </div>

      {/* İçerik Stats */}
      <div className="mb-3">
        <h2 className="text-xs font-semibold text-foreground/35 uppercase tracking-widest mb-4">İçerik Durumu</h2>
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-10">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <div
            key={label}
            className="p-5 rounded-2xl border border-border bg-background flex flex-col gap-3"
          >
            <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center`}>
              <Icon size={18} className={color} />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{value}</p>
              <p className="text-xs text-foreground/40 mt-1">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Onay bekleyen uyarısı */}
      {pending > 0 && (
        <div className="mb-8 p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse shrink-0" />
            <p className="text-sm text-foreground/70">
              <span className="font-semibold text-yellow-400">{pending} içerik</span> onayınızı bekliyor
            </p>
          </div>
          <Link
            href="/dashboard"
            className="text-xs text-yellow-400 hover:text-yellow-300 flex items-center gap-1 shrink-0 cursor-pointer"
          >
            İncele <ArrowRight size={12} />
          </Link>
        </div>
      )}

      {/* Hızlı Erişim */}
      <h2 className="text-xs font-semibold text-foreground/35 uppercase tracking-widest mb-4">Hızlı Erişim</h2>
      <div className="grid grid-cols-2 gap-4">
        {quickLinks.map(({ href, label, icon: Icon, color, bg, badge }) => (
          <Link
            key={href}
            href={href}
            className="group relative flex items-center gap-4 p-5 rounded-2xl border border-border bg-background hover:border-border/80 transition-all duration-200 hover:shadow-md cursor-pointer"
          >
            <div className={`w-10 h-10 rounded-xl border ${bg} flex items-center justify-center shrink-0`}>
              <Icon size={17} className={color} />
            </div>
            <span className="text-sm font-medium text-foreground/70 group-hover:text-foreground transition-colors">{label}</span>
            {badge !== null && badge !== undefined && (
              <span className="ml-auto px-2 py-0.5 rounded-full bg-brand text-white text-xs font-bold min-w-[20px] text-center">
                {badge}
              </span>
            )}
            <ArrowRight
              size={13}
              className="ml-auto text-foreground/15 group-hover:text-foreground/40 group-hover:translate-x-0.5 transition-all duration-200"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
