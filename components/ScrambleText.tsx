"use client";

import React, { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&!?";

interface ScrambleTextProps {
  text: string;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  delay?: number;
  duration?: number;
  trigger?: boolean;
}

export default function ScrambleText({
  text,
  className,
  as: Tag = "span",
  delay = 0,
  duration = 800,
  trigger,
}: ScrambleTextProps) {
  const [displayed, setDisplayed] = useState(text);
  const [inView, setInView] = useState(false);
  const [isMobile, setIsMobile] = useState(true); // default true → no animation until checked
  const ref = useRef<HTMLElement>(null);
  const frameRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Skip animation on touch/mobile devices — too many state updates hurt perf
    const mobile =
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(max-width: 768px)").matches;
    setIsMobile(mobile);
    if (mobile) return;

    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const shouldPlay = !isMobile && (trigger !== undefined ? trigger : inView);

  useEffect(() => {
    if (!shouldPlay) return;

    const startAt = Date.now() + delay;
    const endAt = startAt + duration;
    const len = text.length;

    function tick() {
      const now = Date.now();
      if (now < startAt) {
        frameRef.current = setTimeout(tick, 16);
        return;
      }
      const progress = Math.min((now - startAt) / duration, 1);
      const locked = Math.floor(progress * len);
      const result = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < locked) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");
      setDisplayed(result);
      if (now < endAt) {
        frameRef.current = setTimeout(tick, 32); // 30fps max
      } else {
        setDisplayed(text);
      }
    }

    frameRef.current = setTimeout(tick, 16);
    return () => {
      if (frameRef.current) clearTimeout(frameRef.current);
    };
  }, [shouldPlay, text, delay, duration]);

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={className}>
      {displayed}
    </Tag>
  );
}
