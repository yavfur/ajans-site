"use client";

import { useRef, MouseEvent, ReactNode } from "react";
import Link from "next/link";

interface RippleButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "outline" | "ghost" | "white";
  size?: "sm" | "md" | "lg";
  fullWidthMobile?: boolean;
}

// Size map: matches JSON spec — desktop 20px/48px, mobile 16px/32px
const sizeMap = {
  sm:  "px-8 py-4 text-sm",
  md:  "px-12 py-5 text-sm",   // 48px/20px — spec desktop CTA
  lg:  "px-14 py-6 text-base", // 56px/24px — spec large CTA section
};

const variantMap = {
  primary: "bg-brand text-white shadow-md hover:shadow-xl hover:shadow-brand/25",
  outline: "border border-border text-foreground hover:border-brand hover:text-brand bg-white",
  ghost:   "border border-white/25 text-white hover:bg-white/10",
  white:   "bg-white text-brand shadow-lg hover:bg-white/95",
};

export default function RippleButton({
  href,
  onClick,
  children,
  className = "",
  variant = "primary",
  size = "md",
  fullWidthMobile = false,
}: RippleButtonProps) {
  const btnRef = useRef<HTMLElement>(null);

  function createRipple(e: MouseEvent, v: string) {
    const el = btnRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const diameter = Math.max(rect.width, rect.height) * 2;
    const rippleColor = v === "white" ? "rgba(10,37,64,0.12)" : "rgba(255,255,255,0.3)";

    const ripple = document.createElement("span");
    ripple.style.cssText = `
      position: absolute;
      width: ${diameter}px;
      height: ${diameter}px;
      left: ${x - diameter / 2}px;
      top: ${y - diameter / 2}px;
      border-radius: 50%;
      background: ${rippleColor};
      transform: scale(0);
      animation: ripple-anim 0.55s ease-out forwards;
      pointer-events: none;
    `;
    el.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
  }

  const base = `
    relative overflow-hidden inline-flex items-center justify-center gap-2
    rounded-xl font-semibold tracking-tight
    transition-all duration-200 cursor-pointer
    hover:scale-[1.03] active:scale-[0.98]
    ${sizeMap[size]}
    ${variantMap[variant]}
    ${fullWidthMobile ? "w-full sm:w-auto" : ""}
    ${className}
  `.replace(/\s+/g, " ").trim();

  if (href) {
    return (
      <Link
        href={href}
        className={base}
        ref={btnRef as React.Ref<HTMLAnchorElement>}
        onMouseDown={(e) => createRipple(e, variant)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={base}
      ref={btnRef as React.Ref<HTMLButtonElement>}
      onMouseDown={(e) => createRipple(e, variant)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
