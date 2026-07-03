import type { Metadata } from "next";
import { BadgeDollarSign, BellRing, Bot, CalendarDays, ExternalLink, Flame, Newspaper, RefreshCw, Rocket } from "lucide-react";
import { AnimatedCard } from "@/components/animated-card";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getNews } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "AI 情报", description: "AI 工具、模型、Agent、API 价格和功能变化。" };
export default async function NewsPage() {
  const news = await getNews();
  return <>
    <PageHeader eyebrow="AI 信息时间线" title="AI 情报" description="追踪新产品、模型更新、API 价格、免费额度和功能变化。" />
    <div className="container grid gap-8 py-12 lg:grid-cols-[1fr_280px]">
      <div className="relative space-y-5 before:absolute before:bottom-5 before:left-[18px] before:top-5 before:w-px before:bg-gradient-to-b before:from-indigo-400 before:via-violet-200 before:to-transparent">
        {news.map((item,index) => { const Icon = newsIcon(item.category); return <div key={item.id} className="relative pl-12"><span className={`absolute left-0 top-5 z-10 grid size-9 place-items-center rounded-full border-4 border-background ${item.isPinned ? "bg-gradient-to-br from-amber-400 to-orange-500 text-white" : "bg-indigo-100 text-indigo-700"}`}><Icon className="size-4"/></span><AnimatedCard delay={index*.04}><article className={`rounded-2xl border bg-white p-6 transition-[border-color,box-shadow] duration-300 hover:border-primary/40 hover:shadow-[0_18px_50px_rgba(79,70,229,.12)] ${item.isPinned ? "border-amber-200 bg-gradient-to-br from-amber-50/80 to-white shadow-sm" : ""}`}><div className="flex flex-wrap items-center gap-2">{item.isPinned&&<Badge className="bg-amber-100 text-amber-800"><Flame className="mr-1 size-3"/>置顶</Badge>}<Badge variant="outline">{item.category}</Badge><span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground"><CalendarDays className="size-3"/>{formatDate(item.publishedAt)}</span></div><h2 className="mt-4 text-xl font-black leading-8">{item.title}</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{item.summary}</p><div className="mt-4 flex flex-wrap items-center gap-2"><span className="text-xs text-muted-foreground">关联：</span>{item.relatedTools.map((tool)=><Badge variant="secondary" key={tool}>{tool}</Badge>)}<span className="ml-auto text-xs text-muted-foreground">来源：{item.source}</span></div>{item.sourceUrl&&<Button variant="ghost" size="sm" className="mt-3" asChild><a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">查看来源<ExternalLink className="size-3.5"/></a></Button>}</article></AnimatedCard></div>; })}
      </div>
      <aside><div className="sticky top-24 rounded-2xl bg-slate-950 p-6 text-white shadow-xl"><Newspaper className="size-7 text-indigo-300"/><h2 className="mt-4 text-lg font-black">情报收录范围</h2><ul className="mt-4 space-y-3 text-sm text-slate-400">{["AI 工具新上线","模型版本更新","Agent 新产品","API 价格与额度","重要功能变化","行业与高校应用"].map((item)=><li key={item}>· {item}</li>)}</ul><p className="mt-6 border-t border-white/10 pt-5 text-xs leading-6 text-slate-500">第一版由编辑部手动录入，数据模型已预留 RSS、爬虫和 AI 自动总结扩展能力。</p></div></aside>
    </div>
  </>;
}

function newsIcon(category: string) {
  if (category.includes("Agent")) return Bot;
  if (category.includes("价格")) return BadgeDollarSign;
  if (category.includes("更新")) return RefreshCw;
  if (category.includes("上线") || category.includes("产品")) return Rocket;
  return BellRing;
}
