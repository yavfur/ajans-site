"use client";

import { useEffect, useState } from "react";
import { Send, RefreshCw } from "lucide-react";

type Message = {
  id: string;
  content: string;
  isRead: boolean;
  createdAt: string;
  from: { id: string; name: string; role: string };
  to: { id: string; name: string; role: string };
};

type Client = { id: string; name: string };

export default function AdminMesajlarPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [toUserId, setToUserId] = useState("");
  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);

  const fetchMessages = async () => {
    const res = await fetch("/api/mesajlar");
    if (res.ok) setMessages(await res.json());
  };

  useEffect(() => {
    fetch("/api/admin/musteriler").then((r) => r.json()).then(setClients);
    fetchMessages();
  }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!toUserId || !content.trim()) return;
    setSending(true);
    await fetch("/api/mesajlar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ toUserId, content }),
    });
    setSending(false);
    setContent("");
    fetchMessages();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-foreground">Mesajlar</h1>
        <button onClick={fetchMessages} className="p-2 rounded-lg text-foreground/40 hover:text-foreground hover:bg-background transition-all">
          <RefreshCw size={16} />
        </button>
      </div>

      {/* Yeni Mesaj */}
      <form onSubmit={handleSend} className="mb-8 p-5 rounded-xl border border-border bg-background flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-foreground">Yeni Mesaj Gönder</h2>
        <select required value={toUserId} onChange={(e) => setToUserId(e.target.value)}
          className="px-3 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:border-brand/60 transition-colors">
          <option value="">Müşteri seçin...</option>
          {clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <div className="flex gap-3">
          <input value={content} onChange={(e) => setContent(e.target.value)}
            placeholder="Mesajınızı yazın..." required
            className="flex-1 px-3 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:border-brand/60 transition-colors" />
          <button type="submit" disabled={sending}
            className="px-4 py-2.5 rounded-lg bg-brand text-[#0b1a12] text-sm hover:bg-brand/90 disabled:opacity-50 transition-colors">
            <Send size={16} />
          </button>
        </div>
      </form>

      {/* Mesaj Listesi */}
      <div className="flex flex-col gap-3">
        {messages.length === 0 ? (
          <p className="text-foreground/30 text-sm text-center py-10">Henüz mesaj yok.</p>
        ) : messages.map((msg) => (
          <div key={msg.id} className={`p-4 rounded-xl border ${!msg.isRead && msg.to.role !== "ADMIN" ? "border-brand/30 bg-brand/5" : "border-border bg-background"}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-foreground">{msg.from.name}</span>
                  <span className="text-foreground/30 text-xs">→</span>
                  <span className="text-xs text-foreground/60">{msg.to.name}</span>
                  {!msg.isRead && <span className="w-1.5 h-1.5 rounded-full bg-brand" />}
                </div>
                <p className="text-sm text-foreground/80">{msg.content}</p>
              </div>
              <span className="text-xs text-foreground/30 shrink-0">
                {new Date(msg.createdAt).toLocaleDateString("tr-TR")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
