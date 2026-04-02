"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Layers } from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import toast from "react-hot-toast";

type Service = {
  id: string;
  name: string;
  description: string;
  icon: string;
  isActive: boolean;
};

export default function AdminHizmetlerPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", icon: "" });
  const [submitting, setSubmitting] = useState(false);

  const fetchServices = async () => {
    const res = await fetch("/api/admin/hizmetler");
    if (res.ok) setServices(await res.json());
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await fetch("/api/admin/hizmetler", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSubmitting(false);
    if (res.ok) {
      toast.success("Hizmet oluşturuldu.");
      setShowForm(false);
      setForm({ name: "", description: "", icon: "" });
      fetchServices();
    } else {
      toast.error("Hizmet oluşturulamadı.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu hizmeti silmek istediğinize emin misiniz? Bağlı müşteri hizmetleri de etkilenebilir.")) return;
    const res = await fetch("/api/admin/hizmetler", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      toast.success("Hizmet silindi.");
      fetchServices();
    } else {
      toast.error("Silme işlemi başarısız.");
    }
  };

  return (
    <div className="max-w-3xl">
      <PageHeader
        title="Hizmetler"
        description={`${services.length} hizmet tanımlı`}
        action={
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand text-white text-sm font-medium hover:bg-brand/90 transition-colors cursor-pointer"
          >
            <Plus size={15} />
            Hizmet Ekle
          </button>
        }
      />

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-5 rounded-xl border border-brand/30 bg-brand/5 grid sm:grid-cols-3 gap-4">
          <div className="sm:col-span-3">
            <h2 className="text-sm font-semibold text-foreground">Yeni Hizmet</h2>
          </div>
          <div>
            <label className="block text-xs text-foreground/50 mb-1.5">İkon (emoji) </label>
            <input
              type="text"
              value={form.icon}
              onChange={(e) => setForm({ ...form, icon: e.target.value })}
              placeholder="🎯"
              className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:border-brand/60 transition-colors"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs text-foreground/50 mb-1.5">Hizmet Adı <span className="text-brand">*</span></label>
            <input
              required
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Paid Advertising"
              className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:border-brand/60 transition-colors"
            />
          </div>
          <div className="sm:col-span-3">
            <label className="block text-xs text-foreground/50 mb-1.5">Açıklama <span className="text-brand">*</span></label>
            <input
              required
              type="text"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Meta & Google Ads yönetimi"
              className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:border-brand/60 transition-colors"
            />
          </div>
          <div className="sm:col-span-3 flex gap-3">
            <button type="submit" disabled={submitting}
              className="px-5 py-2.5 rounded-lg bg-brand text-white text-sm font-medium hover:bg-brand/90 disabled:opacity-50 transition-colors">
              {submitting ? "Oluşturuluyor..." : "Oluştur"}
            </button>
            <button type="button" onClick={() => setShowForm(false)}
              className="px-5 py-2.5 rounded-lg border border-border text-foreground/60 text-sm hover:text-foreground transition-colors">
              İptal
            </button>
          </div>
        </form>
      )}

      {/* Liste */}
      {loading ? (
        <div className="text-foreground/40 text-sm">Yükleniyor...</div>
      ) : services.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-border rounded-2xl">
          <Layers size={36} className="mx-auto mb-3 text-foreground/20" />
          <p className="text-foreground/30 text-sm">Henüz hizmet eklenmemiş.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-border overflow-hidden bg-background">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-5 py-3.5 text-xs text-foreground/40 font-semibold uppercase tracking-widest">Hizmet</th>
                <th className="text-left px-5 py-3.5 text-xs text-foreground/40 font-semibold uppercase tracking-widest">Açıklama</th>
                <th className="px-5 py-3.5" />
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{service.icon}</span>
                      <span className="font-medium text-foreground">{service.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-foreground/55">{service.description}</td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleDelete(service.id)}
                        className="p-2 rounded-lg text-foreground/30 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
                        title="Sil"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
