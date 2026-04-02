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

export default function DashboardMesajlarPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);
  const [adminId, setAdminId] = useState<string | null>(null);

  const fetchMessages = async () => {
    const res = await fetch("/api/mesajlar");
    if (res.ok) {
      const data: Message[] = await res.json();
      setMessages(data);
      // Admin ID'yi mesajlardan çek
      const adminMsg = data.find((m) => m.from.role === "ADMIN" || m.to.role === "ADMIN");
      if (adminMsg) {
        setAdminId(adminMsg.from.role === "ADMIN" ? adminMsg.from.id : adminMsg.to.id);
      }
    }
  };

  useEffect(() => { fetchMessages(); }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminId || !content.trim()) return;
    setSending(true);
    await fetch("/api/mesajlar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ toUserId: adminId, content }),
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

      <div className="flex flex-col gap-3 mb-8">
        {messages.length === 0 ? (
          <p className="text-foreground/30 text-sm text-center py-10">Henüz mesaj yok.</p>
        ) : messages.map((msg) => {
          const isFromMe = msg.from.role !== "ADMIN";
          return (
            <div key={msg.id} className={`flex ${isFromMe ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-md p-4 rounded-xl text-sm ${
                isFromMe
                  ? "bg-brand text-[#0b1a12]"
                  : "bg-background border border-border text-foreground"
              }`}>
                <p>{msg.content}</p>
                <p className={`text-xs mt-1.5 ${isFromMe ? "text-white/60" : "text-foreground/30"}`}>
                  {new Date(msg.createdAt).toLocaleDateString("tr-TR")}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <form onSubmit={handleSend} className="flex gap-3">
        <input value={content} onChange={(e) => setContent(e.target.value)}
          placeholder="Ajansınıza mesaj gönderin..." required
          className="flex-1 px-4 py-3 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:border-brand/60 transition-colors" />
        <button type="submit" disabled={sending || !adminId}
          className="px-5 py-3 rounded-xl bg-brand text-[#0b1a12] hover:bg-brand/90 disabled:opacity-50 transition-colors">
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
