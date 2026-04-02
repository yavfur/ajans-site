"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, CheckCircle, XCircle, ChevronDown } from "lucide-react";

type Content = {
  id: string;
  title: string;
  description: string | null;
  status: "PENDING" | "APPROVED" | "REJECTED";
  feedback: string | null;
  createdAt: string;
  files: string[];
  clientService: { service: { name: string } };
};

const statusConfig = {
  PENDING: { label: "Bekliyor", icon: Clock, color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20" },
  APPROVED: { label: "Onaylandı", icon: CheckCircle, color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" },
  REJECTED: { label: "Reddedildi", icon: XCircle, color: "text-red-400 bg-red-400/10 border-red-400/20" },
};

export default function HizmetPage() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Record<string, string>>({});

  const fetchContents = async () => {
    const res = await fetch(`/api/dashboard/icerikler?serviceId=${serviceId}`);
    if (res.ok) setContents(await res.json());
    setLoading(false);
  };

  useEffect(() => { fetchContents(); }, [serviceId]);

  const handleAction = async (id: string, status: "APPROVED" | "REJECTED") => {
    await fetch(`/api/dashboard/icerikler/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, feedback: feedback[id] ?? null }),
    });
    fetchContents();
    setOpenId(null);
  };

  if (loading) return <div className="text-foreground/40 text-sm">Yükleniyor...</div>;

  const serviceName = contents[0]?.clientService.service.name ?? "Hizmet";

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-2">{serviceName}</h1>
      <p className="text-foreground/40 text-sm mb-8">Size sunulan içerikleri onaylayın veya reddedin.</p>

      {contents.length === 0 ? (
        <div className="text-center py-16 text-foreground/30 text-sm">Henüz içerik yüklenmemiş.</div>
      ) : (
        <div className="flex flex-col gap-4">
          {contents.map((content) => {
            const { label, icon: Icon, color } = statusConfig[content.status];
            const isOpen = openId === content.id;

            return (
              <motion.div
                key={content.id}
                layout
                className="rounded-xl border border-border bg-background overflow-hidden"
              >
                <div
                  className="p-5 flex items-start justify-between gap-4 cursor-pointer"
                  onClick={() => setOpenId(isOpen ? null : content.id)}
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground">{content.title}</p>
                    {content.description && (
                      <p className="text-sm text-foreground/50 mt-1 line-clamp-2">{content.description}</p>
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
                    <ChevronDown size={16} className={`text-foreground/30 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </div>
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 border-t border-border pt-4 flex flex-col gap-4">
                        {content.files.length > 0 && (
                          <div>
                            <p className="text-xs text-foreground/40 mb-2">Dosyalar</p>
                            <div className="flex flex-wrap gap-2">
                              {content.files.map((f, i) => (
                                <a key={i} href={f} target="_blank" rel="noreferrer"
                                  className="text-xs text-brand underline underline-offset-2">
                                  Dosya {i + 1}
                                </a>
                              ))}
                            </div>
                          </div>
                        )}

                        {content.status === "PENDING" && (
                          <div className="flex flex-col gap-3">
                            <div>
                              <label className="block text-xs text-foreground/40 mb-1.5">Yorum (reddetme durumunda)</label>
                              <textarea
                                rows={2}
                                value={feedback[content.id] ?? ""}
                                onChange={(e) => setFeedback({ ...feedback, [content.id]: e.target.value })}
                                placeholder="Neden reddediyorsunuz?"
                                className="w-full px-3 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:border-brand/60 transition-colors resize-none"
                              />
                            </div>
                            <div className="flex gap-3">
                              <button
                                onClick={() => handleAction(content.id, "APPROVED")}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 transition-colors"
                              >
                                <CheckCircle size={15} /> Onayla
                              </button>
                              <button
                                onClick={() => handleAction(content.id, "REJECTED")}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/20 transition-colors"
                              >
                                <XCircle size={15} /> Reddet
                              </button>
                            </div>
                          </div>
                        )}

                        {content.feedback && (
                          <div className="p-3 rounded-lg bg-muted border border-border">
                            <p className="text-xs text-foreground/40 mb-1">Yorum</p>
                            <p className="text-sm text-foreground">{content.feedback}</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
