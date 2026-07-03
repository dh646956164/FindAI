import Link from "next/link";
import { Logo } from "@/components/logo";

export function SiteFooter() {
  const staticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";
  return <footer className="mt-20 border-t bg-slate-950 text-slate-300">
    <div className="container grid gap-10 py-12 md:grid-cols-[1.5fr_1fr_1fr]">
      <div><Logo inverse /><p className="mt-4 max-w-md text-sm leading-7 text-slate-400">由甘肃开放大学建设维护，围绕真实任务提供大模型、智能体与 AI 工具的精选参考。</p></div>
      <div><p className="font-semibold text-white">快速入口</p><div className="mt-4 grid gap-2 text-sm"><Link href="/tools">AI 工具库</Link><Link href="/rankings">模型榜单</Link><Link href="/agents">Agent 专区</Link></div></div>
      <div><p className="font-semibold text-white">站点信息</p><div className="mt-4 grid gap-2 text-sm"><Link href="/about">关于本站</Link><Link href="/news">AI 情报</Link>{!staticExport && <Link href="/admin">内容管理</Link>}</div></div>
    </div>
    <div className="border-t border-white/10 py-5 text-center text-xs text-slate-500">© 2026 甘肃开放大学 · AI 大模型与智能体综合平台</div>
  </footer>;
}
