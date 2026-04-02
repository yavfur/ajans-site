"use client";

import { Toaster as HotToaster } from "react-hot-toast";

export default function Toaster() {
  return (
    <HotToaster
      position="bottom-right"
      toastOptions={{
        duration: 3500,
        style: {
          background: "var(--muted)",
          color: "var(--foreground)",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          fontSize: "13px",
          padding: "12px 16px",
        },
        success: {
          iconTheme: { primary: "#10b981", secondary: "white" },
        },
        error: {
          iconTheme: { primary: "#f87171", secondary: "white" },
        },
      }}
    />
  );
}
