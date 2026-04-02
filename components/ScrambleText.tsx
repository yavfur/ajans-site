"use client";

import React, { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&!?";

interface ScrambleTextProps {
  text: string;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  delay?: number;       // ms before animation starts
  duration?: number;    // total ms for full reveal
  trigger?: boolean;    // external trigger (defaults to inView)
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
  const ref = useRef<HTMLElement>(null);
  const frameRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // IntersectionObserver — fires once when element enters viewport
  useEffect(() => {
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

  const shouldPlay = trigger !== undefined ? trigger : inView;

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
      // How many chars are "locked" (revealed in order left→right)
      const locked = Math.floor(progress * len);

      const result = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < locked) return char;
          // still scrambling
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplayed(result);

      if (now < endAt) {
        frameRef.current = setTimeout(tick, 28);
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
