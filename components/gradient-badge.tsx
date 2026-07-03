import { cn } from "@/lib/utils";

export function GradientBadge({ children, muted = false, className }: { children: React.ReactNode; muted?: boolean; className?: string }) {
  return <span className={cn("inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold", muted ? "border-slate-200 bg-slate-100 text-slate-500" : "border-indigo-200/70 bg-gradient-to-r from-indigo-50 to-violet-50 text-indigo-700", className)}>{children}</span>;
}
