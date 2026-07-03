import Link from "next/link";
import { cn } from "@/lib/utils";
import { assetPath } from "@/lib/base-path";

export function Logo({ inverse = false }: { inverse?: boolean }) {
  return <Link href="/" className="group flex items-center gap-2.5" aria-label="AI 大模型与智能体综合平台首页">
    <img src={assetPath("/brand/gsou-emblem.png")} alt="甘肃开放大学校徽" className="size-10 rounded-full object-contain shadow-md transition-transform group-hover:scale-105" />
    <span className="min-w-0 leading-tight"><span className={cn("block whitespace-nowrap text-sm font-extrabold tracking-tight sm:text-base", inverse ? "text-white" : "text-foreground")}>AI 大模型与智能体综合平台</span><span className="block whitespace-nowrap text-[10px] font-semibold tracking-[.12em] text-primary">甘肃开放大学信息中心</span></span>
  </Link>;
}
