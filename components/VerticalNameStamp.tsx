"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function VerticalNameStamp() {
  const ref = useRef(null);
  const { scrollY } = useScroll();

  // Animation should complete when About section header is in middle of screen
  // Hero is roughly 100vh, so About header is around 100vh + some padding
  // Let's say animation completes at around 1200px scroll
  const y = useTransform(scrollY, [0, 1200], [100, 0]);
  const opacity = useTransform(scrollY, [0, 600, 1200], [0, 0, 1]);
  const rotate = useTransform(scrollY, [0, 1200], [0, 90]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, rotate }}
      className="fixed bottom-8 left-8 z-50 origin-bottom-left"
    >
      <div className="flex items-center gap-3">
        {/* Small line graphic */}
        <div className="w-8 h-[2px] bg-neon-cyan" />

        {/* Vertical name */}
        <p className="text-slate-50 font-black text-sm uppercase tracking-[0.3em] whitespace-nowrap">
          CHRISTOPHER KEARL
        </p>
      </div>
    </motion.div>
  );
}
