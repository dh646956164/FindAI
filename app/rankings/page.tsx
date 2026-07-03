import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BarChart3, Crown, Medal, Star, Trophy } from "lucide-react";
import { ToolAvatar } from "@/components/tool-avatar";
import { AnimatedCard } from "@/components/animated-card";
import { RatingBar } from "@/components/rating-bar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRankings } from "@/lib/data";

export const metadata: Metadata = { title: "AI 模型榜单", description: "面向中文用户真实任务的 AI 工具与模型实用榜单。" };
export default async function RankingsPage() {
  const rankings = await getRankings();
  return <>
    <section className="overflow-hidden border-b bg-slate-950 text-white"><div className="container relative py-16"><div className="absolute right-0 top-0 size-72 rounded-full bg-indigo-500/20 blur-3xl" /><Badge className="bg-white/10 text-indigo-200"><Trophy className="mr-1.5 size-3.5" />人工维护 · 持续更新</Badge><h1 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">面向中文用户的<br /><span className="text-indigo-300">AI 实用榜单</span></h1><p className="mt-5 max-w-2xl leading-7 text-slate-400">不只看 benchmark。我们同时评估中文任务、免费额度、上手成本和组织使用风险。</p><div className="mt-8 flex flex-wrap gap-2">{rankings.map((item) => <a href={`#${item.slug}`} key={item.slug} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 hover:bg-white/10">{item.title}</a>)}</div></div></section>
    <div className="container py-12"><div className="grid gap-7 lg:grid-cols-2">{rankings.map((ranking,rankingIndex) => <AnimatedCard key={ranking.id} delay={rankingIndex*.035}><Card id={ranking.slug} className="scroll-mt-24 overflow-hidden transition-colors duration-300 hover:border-primary/30"><CardHeader className="border-b bg-muted/30"><div className="flex items-start justify-between"><div><Badge variant="outline">{ranking.category}</Badge><CardTitle className="mt-3 text-xl">{ranking.title}</CardTitle><p className="mt-2 text-sm text-muted-foreground">{ranking.description}</p></div><BarChart3 className="size-7 text-primary/40" /></div></CardHeader><CardContent className="p-0"><div className="divide-y">{ranking.items.map((item) => { const entity = item.tool || item.model; if (!entity) return null; const isTool = Boolean(item.tool); return <div key={item.id} className={`grid grid-cols-[40px_1fr_92px] items-center gap-3 p-4 transition-colors duration-300 ${item.rank === 1 ? "border-l-4 border-amber-400 bg-gradient-to-r from-amber-50 to-white" : item.rank === 2 ? "bg-slate-50/80" : item.rank === 3 ? "bg-orange-50/50" : "hover:bg-muted/30"}`}><span className={`grid place-items-center rounded-xl text-sm font-black ${item.rank === 1 ? "size-10 bg-gradient-to-br from-amber-300 to-amber-500 text-white shadow-md" : item.rank === 2 ? "size-8 bg-slate-200 text-slate-600" : item.rank === 3 ? "size-8 bg-orange-100 text-orange-700" : "size-8 text-muted-foreground"}`}>{item.rank}</span><div className="flex min-w-0 items-center gap-3">{isTool && <ToolAvatar name={entity.name} className="size-9 rounded-xl text-xs" />}<div className="min-w-0"><Link href={isTool ? `/tools/${item.tool!.slug}` : "#"} className="truncate text-sm font-bold hover:text-primary">{entity.name}</Link><p className="mt-1 truncate text-xs text-muted-foreground">{item.reason}</p></div></div><div className="text-right"><p className="mb-1 flex items-center justify-end gap-1 text-sm font-black text-primary"><Star className="size-3 fill-current" />{item.score.toFixed(1)}</p><RatingBar value={item.score} showValue={false}/></div></div>; })}</div></CardContent></Card></AnimatedCard>)}</div>
      <div className="mt-10 rounded-2xl border border-dashed p-6 text-center text-sm text-muted-foreground">榜单为编辑部人工评分，适合缩小候选范围，不等同于标准化评测。正式选型请使用真实业务样例验证。</div>
    </div>
  </>;
}
