"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export function AnimatedCard({ children, className, delay = 0, enabled = true }: { children: React.ReactNode; className?: string; delay?: number; enabled?: boolean }) {
  const reducedMotion = useReducedMotion();
  const animate = enabled && !reducedMotion;
  return <motion.div
    className={cn("h-full", className)}
    initial={animate ? { opacity: 0, y: 16 } : false}
    whileInView={animate ? { opacity: 1, y: 0 } : undefined}
    whileHover={animate ? { y: -6, scale: 1.01 } : undefined}
    viewport={{ once: true, amount: 0.08 }}
    transition={{ duration: 0.35, delay: Math.min(delay, 0.28), ease: [0.22, 1, 0.36, 1] }}
  >{children}</motion.div>;
}
