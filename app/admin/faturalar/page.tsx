"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

type Invoice = {
  id: string;
  amount: number;
  description: string | null;
  status: "PENDING" | "PAID" | "OVERDUE";
  dueDate: string;
  createdAt: string;
  user: { name: string; company: string | null };
};

type Client = { id: string; name: string };

const statusConfig = {
  PENDING: { label: "Bekliyor", color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20" },
  PAID: { label: "Ödendi", color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" },
  OVERDUE: { label: "Gecikmiş", color: "text-red-400 bg-red-400/10 border-red-400/20" },
};

export default function AdminFaturalarPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ userId: "", amount: "", description: "", dueDate: "" });
  const [submitting, setSubmitting] = useState(false);

  const fetchInvoices = async () => {
    const res = await fetch("/api/admin/faturalar");
    if (res.ok) setInvoices(await res.json());
  };

  useEffect(() => {
    fetch("/api/admin/musteriler").then((r) => r.json()).then(setClients);
    fetchInvoices();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await fetch("/api/admin/faturalar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSubmitting(false);
    setShowForm(false);
    setForm({ userId: "", amount: "", description: "", dueDate: "" });
    fetchInvoices();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-foreground">Faturalar</h1>
        <button onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-brand text-white text-sm font-medium hover:bg-brand/90 transition-colors">
          <Plus size={16} /> Fatura Oluştur
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 p-5 rounded-xl border border-brand/30 bg-brand/5 grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2"><h2 className="text-sm font-semibold text-foreground">Yeni Fatura</h2></div>
          {[
            { key: "amount", label: "Tutar (TL)", type: "number", required: true },
            { key: "dueDate", label: "Son Ödeme Tarihi", type: "date", required: true },
            { key: "description", label: "Açıklama", colSpan: true },
          ].map(({ key, label, type = "text", required, colSpan }) => (
            <div key={key} className={colSpan ? "sm:col-span-2" : ""}>
              <label className="block text-xs text-foreground/50 mb-1.5">{label} {required && <span className="text-brand">*</span>}</label>
              <input required={required} type={type} value={form[key as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:border-brand/60 transition-colors" />
            </div>
          ))}
          <div className="sm:col-span-2">
            <label className="block text-xs text-foreground/50 mb-1.5">Müşteri <span className="text-brand">*</span></label>
            <select required value={form.userId} onChange={(e) => setForm({ ...form, userId: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:border-brand/60 transition-colors">
              <option value="">Seçin...</option>
              {clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="sm:col-span-2 flex gap-3">
            <button type="submit" disabled={submitting}
              className="px-5 py-2.5 rounded-lg bg-brand text-white text-sm font-medium hover:bg-brand/90 disabled:opacity-50 transition-colors">
              {submitting ? "Oluşturuluyor..." : "Fatura Oluştur"}
            </button>
            <button type="button" onClick={() => setShowForm(false)}
              className="px-5 py-2.5 rounded-lg border border-border text-foreground/60 text-sm hover:text-foreground transition-colors">
              İptal
            </button>
          </div>
        </form>
      )}

      <div className="rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-background/50">
              {["Müşteri", "Tutar", "Açıklama", "Son Tarih", "Durum"].map((h) => (
                <th key={h} className="text-left px-5 py-3.5 text-foreground/50 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {invoices.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-10 text-foreground/30 text-sm">Fatura bulunamadı.</td></tr>
            ) : invoices.map((inv) => {
              const { label, color } = statusConfig[inv.status];
              return (
                <tr key={inv.id} className="border-b border-border last:border-0 hover:bg-background/30 transition-colors">
                  <td className="px-5 py-4 font-medium text-foreground">{inv.user.name}</td>
                  <td className="px-5 py-4 text-foreground">₺{inv.amount.toLocaleString("tr-TR")}</td>
                  <td className="px-5 py-4 text-foreground/60">{inv.description ?? "-"}</td>
                  <td className="px-5 py-4 text-foreground/60">{new Date(inv.dueDate).toLocaleDateString("tr-TR")}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 rounded-full border text-xs font-medium ${color}`}>{label}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
