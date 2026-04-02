"use client";

import { useEffect, useState } from "react";
import { Plus, Clock, CheckCircle, XCircle, Filter, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

type Content = {
  id: string;
  title: string;
  description: string | null;
  status: "PENDING" | "APPROVED" | "REJECTED";
  feedback: string | null;
  createdAt: string;
  files: string[];
  clientService: {
    user: { id: string; name: string; company: string | null };
    service: { name: string };
  };
};

type Client = { id: string; name: string };

const statusConfig = {
  PENDING: { label: "Bekliyor", icon: Clock, color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20" },
  APPROVED: { label: "Onaylandı", icon: CheckCircle, color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" },
  REJECTED: { label: "Reddedildi", icon: XCircle, color: "text-red-400 bg-red-400/10 border-red-400/20" },
};

export default function IceriklerPage() {
  const [contents, setContents] = useState<Content[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterUser, setFilterUser] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [clientServices, setClientServices] = useState<{ id: string; label: string }[]>([]);
  const [form, setForm] = useState({ clientServiceId: "", title: "", description: "", files: "" });
  const [submitting, setSubmitting] = useState(false);
  const [rejectId, setRejectId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");

  const fetchContents = async () => {
    const params = new URLSearchParams();
    if (filterUser) params.set("userId", filterUser);
    if (filterStatus) params.set("status", filterStatus);
    const res = await fetch(`/api/admin/icerikler?${params}`);
    if (res.ok) setContents(await res.json());
    setLoading(false);
  };

  useEffect(() => {
    fetch("/api/admin/musteriler").then((r) => r.json()).then(setClients);
  }, []);

  useEffect(() => {
    fetchContents();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterUser, filterStatus]);

  const loadClientServices = async (userId: string) => {
    if (!userId) return;
    const res = await fetch(`/api/admin/musteriler/${userId}`);
    const data = await res.json();
    setClientServices(
      (data.clientServices ?? []).map((cs: { id: string; service: { name: string } }) => ({
        id: cs.id,
        label: cs.service.name,
      }))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const files = form.files ? form.files.split(",").map((f) => f.trim()).filter(Boolean) : [];
    const res = await fetch("/api/admin/icerikler", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, files }),
    });
    setSubmitting(false);
    if (res.ok) {
      toast.success("İçerik müşteriye sunuldu.");
      setShowForm(false);
      setForm({ clientServiceId: "", title: "", description: "", files: "" });
      fetchContents();
    } else {
      toast.error("İçerik oluşturulamadı.");
    }
  };

  const handleApprove = async (id: string) => {
    const res = await fetch(`/api/admin/icerikler/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "APPROVED" }),
    });
    if (res.ok) {
      toast.success("İçerik onaylandı.");
      fetchContents();
    }
  };

  const handleReject = async () => {
    if (!rejectId) return;
    const res = await fetch(`/api/admin/icerikler/${rejectId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "REJECTED", feedback }),
    });
    if (res.ok) {
      toast.success("İçerik reddedildi.");
      setRejectId(null);
      setFeedback("");
      fetchContents();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu içeriği silmek istediğinize emin misiniz?")) return;
    const res = await fetch(`/api/admin/icerikler/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("İçerik silindi.");
      fetchContents();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-foreground">İçerikler</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-brand text-white text-sm font-medium hover:bg-brand/90 transition-colors"
        >
          <Plus size={16} />
          İçerik Yükle
        </button>
      </div>

      {/* Yükleme Formu */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 p-6 rounded-xl border border-brand/30 bg-brand/5 flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-foreground">Yeni İçerik Yükle</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-foreground/50 mb-1.5">Müşteri <span className="text-brand">*</span></label>
              <select
                required
                onChange={(e) => loadClientServices(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:border-brand/60 transition-colors"
              >
                <option value="">Müşteri seçin...</option>
                {clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-foreground/50 mb-1.5">Hizmet <span className="text-brand">*</span></label>
              <select
                required
                value={form.clientServiceId}
                onChange={(e) => setForm({ ...form, clientServiceId: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:border-brand/60 transition-colors"
              >
                <option value="">Hizmet seçin...</option>
                {clientServices.map((cs) => <option key={cs.id} value={cs.id}>{cs.label}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs text-foreground/50 mb-1.5">Başlık <span className="text-brand">*</span></label>
            <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:border-brand/60 transition-colors" />
          </div>
          <div>
            <label className="block text-xs text-foreground/50 mb-1.5">Açıklama</label>
            <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:border-brand/60 transition-colors resize-none" />
          </div>
          <div>
            <label className="block text-xs text-foreground/50 mb-1.5">Dosya URL&apos;leri (virgülle ayırın)</label>
            <input value={form.files} onChange={(e) => setForm({ ...form, files: e.target.value })} placeholder="https://..."
              className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:border-brand/60 transition-colors" />
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={submitting}
              className="px-5 py-2.5 rounded-lg bg-brand text-white text-sm font-medium hover:bg-brand/90 disabled:opacity-50 transition-colors">
              {submitting ? "Gönderiliyor..." : "Müşteriye Sun"}
            </button>
            <button type="button" onClick={() => setShowForm(false)}
              className="px-5 py-2.5 rounded-lg border border-border text-foreground/60 text-sm hover:text-foreground transition-colors">
              İptal
            </button>
          </div>
        </form>
      )}

      {/* Reddet Modal */}
      {rejectId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-background border border-border rounded-2xl p-6 w-full max-w-md mx-4">
            <h3 className="text-base font-semibold text-foreground mb-3">İçeriği Reddet</h3>
            <p className="text-xs text-foreground/50 mb-3">Müşteriye gönderilecek geri bildirim (isteğe bağlı):</p>
            <textarea
              rows={3}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Revizyon açıklaması..."
              className="w-full px-3 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:border-red-500/60 resize-none transition-colors"
            />
            <div className="flex gap-3 mt-4">
              <button onClick={handleReject}
                className="flex-1 py-2.5 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors">
                Reddet
              </button>
              <button onClick={() => { setRejectId(null); setFeedback(""); }}
                className="flex-1 py-2.5 rounded-lg border border-border text-foreground/60 text-sm hover:text-foreground transition-colors">
                Vazgeç
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filtreler */}
      <div className="flex gap-3 mb-6">
        <div className="flex items-center gap-2 text-foreground/40">
          <Filter size={14} />
        </div>
        <select value={filterUser} onChange={(e) => setFilterUser(e.target.value)}
          className="px-3 py-2 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none">
          <option value="">Tüm Müşteriler</option>
          {clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none">
          <option value="">Tüm Durumlar</option>
          <option value="PENDING">Bekliyor</option>
          <option value="APPROVED">Onaylandı</option>
          <option value="REJECTED">Reddedildi</option>
        </select>
      </div>

      {/* Liste */}
      {loading ? (
        <div className="text-foreground/40 text-sm">Yükleniyor...</div>
      ) : contents.length === 0 ? (
        <div className="text-center py-16 text-foreground/30 text-sm">İçerik bulunamadı.</div>
      ) : (
        <div className="flex flex-col gap-3">
          {contents.map((content) => {
            const { label, icon: Icon, color } = statusConfig[content.status];
            return (
              <div key={content.id} className="p-5 rounded-xl border border-border bg-background">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs text-foreground/40 bg-muted px-2 py-0.5 rounded-full">
                        {content.clientService.user.name} · {content.clientService.service.name}
                      </span>
                    </div>
                    <p className="font-medium text-foreground text-sm">{content.title}</p>
                    {content.description && (
                      <p className="text-xs text-foreground/50 mt-1">{content.description}</p>
                    )}
                    {content.feedback && (
                      <p className="text-xs text-red-400/70 mt-1.5 italic">Geri bildirim: {content.feedback}</p>
                    )}
                    <p className="text-xs text-foreground/30 mt-2">
                      {new Date(content.createdAt).toLocaleDateString("tr-TR")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${color}`}>
                      <Icon size={12} />
                      {label}
                    </span>
                  </div>
                </div>

                {/* Aksiyon Butonları */}
                {content.status === "PENDING" && (
                  <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                    <button onClick={() => handleApprove(content.id)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-medium hover:bg-emerald-500/20 transition-colors">
                      <CheckCircle size={13} /> Onayla
                    </button>
                    <button onClick={() => setRejectId(content.id)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-medium hover:bg-red-500/20 transition-colors">
                      <XCircle size={13} /> Reddet
                    </button>
                    <button onClick={() => handleDelete(content.id)}
                      className="ml-auto p-2 rounded-lg text-foreground/30 hover:text-red-400 hover:bg-red-500/10 transition-all">
                      <Trash2 size={13} />
                    </button>
                  </div>
                )}
                {content.status !== "PENDING" && (
                  <div className="flex justify-end mt-3">
                    <button onClick={() => handleDelete(content.id)}
                      className="p-2 rounded-lg text-foreground/25 hover:text-red-400 hover:bg-red-500/10 transition-all">
                      <Trash2 size={13} />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
