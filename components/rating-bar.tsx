"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export function RatingBar({ value, className, showValue = true }: { value: number; className?: string; showValue?: boolean }) {
  const reducedMotion = useReducedMotion();
  const safeValue = Math.max(0, Math.min(100, value));
  return <div className={cn("w-full", className)}>
    {showValue && <div className="mb-1.5 flex items-center justify-between text-[11px] text-muted-foreground"><span>推荐指数</span><b className="text-foreground">{safeValue}</b></div>}
    <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
      <motion.div className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400" initial={reducedMotion ? false : { width: 0 }} animate={{ width: `${safeValue}%` }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} />
    </div>
  </div>;
}
