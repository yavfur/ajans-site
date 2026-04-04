"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * SceneSection — wraps any section with scroll-driven enter/exit:
 *   Enter: translateY(50px→0) + opacity(0→1) as section scrolls into view
 *   Exit:  translateY(0→-50px) + opacity(1→0) as section scrolls out of view
 *
 * Only transform + opacity are animated (GPU-accelerated, no layout).
 */
export default function SceneSection({
  children,
  exitDisabled = false,
}: {
  children: React.ReactNode;
  exitDisabled?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    exitDisabled ? [0, 0.18] : [0, 0.18, 0.82, 1],
    exitDisabled ? ["50px", "0px"] : ["50px", "0px", "0px", "-50px"]
  );
  const opacity = useTransform(
    scrollYProgress,
    exitDisabled ? [0, 0.14] : [0, 0.14, 0.86, 1],
    exitDisabled ? [0, 1] : [0, 1, 1, 0]
  );

  return (
    <div ref={ref}>
      <motion.div
        className="scene-enter-exit"
        style={{ y, opacity }}
      >
        {children}
      </motion.div>
    </div>
  );
}
