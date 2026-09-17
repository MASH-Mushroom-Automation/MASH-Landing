"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * ScrollReveal wraps children with scroll-triggered entrance animations.
 * Elements fade in and slide up as they enter the viewport.
 */
export interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Animation direction: "up" | "down" | "left" | "right". Default: "up" */
  direction?: "up" | "down" | "left" | "right";
  /** Delay in seconds before animation starts. Default: 0 */
  delay?: number;
  /** Duration in seconds. Default: 0.6 */
  duration?: number;
}

export default function ScrollReveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 0.6,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const directionOffsets: Record<string, { x: [number, number]; y: [number, number] }> = {
    up: { x: [0, 0], y: [40, 0] },
    down: { x: [0, 0], y: [-40, 0] },
    left: { x: [40, 0], y: [0, 0] },
    right: { x: [-40, 0], y: [0, 0] },
  };

  const { x: xRange, y: yRange } = directionOffsets[direction] || directionOffsets.up;

  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const x = useTransform(scrollYProgress, [0, 0.3], xRange);
  const y = useTransform(scrollYProgress, [0, 0.3], yRange);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ opacity, x, y }}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  );
}
