"use client";

import { useEffect, useState } from "react";
import { Receipt } from "lucide-react";

type Invoice = {
  id: string;
  amount: number;
  description: string | null;
  status: "PENDING" | "PAID" | "OVERDUE";
  dueDate: string;
};

const statusConfig = {
  PENDING: { label: "Bekliyor", color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20" },
  PAID: { label: "Ödendi", color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" },
  OVERDUE: { label: "Gecikmiş", color: "text-red-400 bg-red-400/10 border-red-400/20" },
};

export default function DashboardFaturalarPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard/faturalar")
      .then((r) => r.json())
      .then((data) => { setInvoices(data); setLoading(false); });
  }, []);

  if (loading) return <div className="text-foreground/40 text-sm">Yükleniyor...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-8">Faturalar</h1>

      {invoices.length === 0 ? (
        <div className="text-center py-16 text-foreground/30">
          <Receipt size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">Henüz fatura bulunmuyor.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {invoices.map((inv) => {
            const { label, color } = statusConfig[inv.status];
            return (
              <div key={inv.id} className="p-5 rounded-xl border border-border bg-background flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-foreground">₺{inv.amount.toLocaleString("tr-TR")}</p>
                  {inv.description && <p className="text-sm text-foreground/50 mt-0.5">{inv.description}</p>}
                  <p className="text-xs text-foreground/30 mt-1">
                    Son tarih: {new Date(inv.dueDate).toLocaleDateString("tr-TR")}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 rounded-full border text-xs font-medium ${color}`}>{label}</span>
                  {inv.status === "PENDING" && (
                    <button className="px-4 py-2 rounded-lg bg-brand text-[#0b1a12] text-sm hover:bg-brand/90 transition-colors">
                      Öde
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
