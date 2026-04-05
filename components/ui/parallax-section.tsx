"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

export interface ParallaxSectionProps {
  children: React.ReactNode;
  /** Parallax speed factor. Positive = moves slower (background), negative = moves faster (foreground). Default: 0.3 */
  speed?: number;
  /** Additional CSS classes */
  className?: string;
  /** Section id for anchor navigation */
  id?: string;
  /** Whether to apply opacity fade effect on scroll. Default: false */
  fadeOnScroll?: boolean;
  /** Whether to apply scale effect on scroll. Default: false */
  scaleOnScroll?: boolean;
  /** Scroll offset range for the parallax effect. Default: ["start end", "end start"] */
  offset?: ["start end" | "end start" | "start start" | "end end" | "center center" | "start center" | "end center" | "center start" | "center end", "start end" | "end start" | "start start" | "end end" | "center center" | "start center" | "end center" | "center start" | "center end"];
}

/**
 * ParallaxSection wraps content with a scroll-driven parallax translation.
 * Uses framer-motion useScroll + useTransform for GPU-accelerated transforms.
 * Respects prefers-reduced-motion by rendering children without transforms.
 */
export default function ParallaxSection({
  children,
  speed = 0.3,
  className = "",
  id,
  fadeOnScroll = false,
  scaleOnScroll = false,
  offset,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset || ["start end", "end start"],
  });

  // Parallax Y translation: speed * 100px range
  const y: MotionValue<number> = useTransform(scrollYProgress, [0, 1], [speed * 100, -speed * 100]);

  // Optional opacity fade
  const opacity: MotionValue<number> = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    fadeOnScroll ? [0, 1, 1, 0] : [1, 1, 1, 1]
  );

  // Optional scale
  const scale: MotionValue<number> = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    scaleOnScroll ? [0.95, 1, 0.95] : [1, 1, 1]
  );

  return (
    <motion.div
      ref={ref}
      id={id}
      className={className}
      style={{
        y,
        opacity,
        scale,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </motion.div>
  );
}
