import Link from "next/link";
import { ArrowRight, BarChart3, BellRing, BookOpenCheck, Bot, Braces, FileCheck2, FileText, Image as ImageIcon, Mic2, Presentation, Search, Sparkles, University, Video } from "lucide-react";
import { AnimatedCard } from "@/components/animated-card";
import { AnimatedSection } from "@/components/animated-section";
import { SearchForm } from "@/components/search-form";
import { SectionHeading } from "@/components/section-heading";
import { ToolCard } from "@/components/tool-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getFeaturedTools, getNews } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { assetPath } from "@/lib/base-path";
import { catalogTools } from "@/lib/catalog";
import { taskRecommendations } from "@/lib/curated";

const taskIcons: Record<string, typeof FileText> = {
  writing: FileText, ppt: Presentation, "data-analysis": BarChart3, coding: Braces, "ai-search": Search,
  "paper-reading": BookOpenCheck, "thesis-review": FileCheck2, "agent-building": Bot, "image-generation": ImageIcon,
  "video-generation": Video, "meeting-notes": Mic2, "education-office": University, "knowledge-base": Sparkles,
};
const toolNames = new Map(catalogTools.map((tool) => [tool.slug, tool.name]));

export default async function HomePage() {
  const [tools, news] = await Promise.all([getFeaturedTools(8), getNews(6)]);
  return <>
    <section className="relative overflow-hidden border-b bg-slate-950 text-white">
      <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url('${assetPath("/brand/gsou-city-banner.jpg")}')` }} />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-indigo-950/85 to-slate-950" />
      <div className="absolute left-1/2 top-[-240px] h-[560px] w-[760px] -translate-x-1/2 rounded-full bg-indigo-500/25 blur-3xl" />
      <img src={assetPath("/brand/gsou-emblem.png")} alt="" aria-hidden="true" className="pointer-events-none absolute -right-20 top-20 hidden size-[28rem] opacity-[.07] lg:block" />
      <div className="container relative py-14 text-center md:py-20">
        <AnimatedSection delay={.02} className="mx-auto mb-7 flex w-fit items-center gap-3 rounded-full border border-white/15 bg-white/8 px-4 py-2 backdrop-blur">
          <img src={assetPath("/brand/gsou-emblem.png")} alt="甘肃开放大学校徽" className="size-9 rounded-full object-contain" />
          <span className="text-xs font-semibold tracking-wide text-indigo-100">甘肃开放大学信息中心 · AI 信息综合汇聚平台</span>
        </AnimatedSection>
        <AnimatedSection delay={.08}><h1 className="mx-auto max-w-5xl text-[2rem] font-black leading-[1.15] tracking-[-0.035em] sm:text-4xl md:text-6xl"><span className="block whitespace-nowrap">AI 大模型与智能体</span><span className="block bg-gradient-to-r from-cyan-300 via-indigo-300 to-violet-300 bg-clip-text text-transparent">综合平台</span></h1></AnimatedSection>
        <AnimatedSection delay={.16}><p className="text-balance mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">帮你快速判断每个 AI 工具是否值得用、适合什么场景、有没有免费版和替代方案。</p></AnimatedSection>
        <AnimatedSection delay={.24}><SearchForm large className="mx-auto mt-8 max-w-3xl border-white/10 text-foreground transition-shadow duration-300 hover:shadow-[0_16px_55px_rgba(99,102,241,.28)] focus-within:shadow-[0_16px_60px_rgba(99,102,241,.4)]" /></AnimatedSection>
        <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs text-slate-400"><span>热门：</span>{["DeepSeek", "Kimi", "Dify", "论文评阅", "知识库"].map((item) => <Link key={item} href={`/tools?q=${encodeURIComponent(item)}`} className="hover:text-white">{item}</Link>)}</div>

        <div className="mx-auto mt-10 max-w-5xl rounded-3xl border border-white/10 bg-white/[.06] p-5 text-left shadow-2xl backdrop-blur-md md:p-7">
          <div className="flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.22em] text-indigo-300">任务精选</p><h2 className="mt-2 text-balance text-xl font-black md:text-2xl">从你的任务出发，直接选择 1–3 个强工具。</h2></div><span className="hidden text-xs text-slate-400 md:block">少而精 · 每日核验</span></div>
          <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">{taskRecommendations.map((task,index) => { const Icon = taskIcons[task.slug] || Sparkles; return <AnimatedCard key={task.slug} delay={index*.025}><Link href={`/use-cases/${task.slug}`} className="group flex h-full min-h-24 flex-col rounded-xl border border-white/10 bg-white/[.05] px-4 py-3.5 transition duration-300 hover:border-indigo-300/40 hover:bg-white/10"><span className="flex items-center gap-2.5 text-sm font-bold text-white"><Icon className="size-4 text-indigo-300" />{task.label}</span><span className="mt-2 line-clamp-2 text-left text-xs leading-5 text-slate-400 group-hover:text-slate-300">{task.tools.map((tool) => toolNames.get(tool.slug)).filter(Boolean).join(" · ")}</span></Link></AnimatedCard>; })}</div>
        </div>
      </div>
    </section>

    <section className="border-b bg-white py-16"><div className="container">
      <SectionHeading eyebrow="精选工具" title="每个任务，只保留 1–3 个优先选择" description="工具库由 102 个候选收缩为 24 个任务型强工具，并保留国开 AI 基座与甘肃开放大学论文 AI 评阅平台。" action={<Button variant="outline" asChild><Link href="/tools">浏览精选工具 <ArrowRight className="size-4" /></Link></Button>} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{tools.map((tool,index) => <ToolCard key={tool.slug} tool={tool} compact delay={index*.035} />)}</div>
    </div></section>

    <section className="container py-16">
      <SectionHeading eyebrow="最新动态" title="AI 信息速递" description="关注工具更新、模型能力、API 价格和高校 AI 应用进展。" action={<Button variant="ghost" asChild><Link href="/news">查看全部 <ArrowRight className="size-4" /></Link></Button>} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{news.map((item) => <Link href="/news" key={item.id} className="rounded-2xl border bg-white p-5 transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-soft"><div className="flex items-center justify-between gap-3"><Badge variant={item.isPinned ? "default" : "outline"}>{item.category}</Badge><span className="text-xs text-muted-foreground">{formatDate(item.publishedAt)}</span></div><p className="mt-4 font-bold leading-6">{item.title}</p><p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{item.summary}</p></Link>)}</div>
    </section>
  </>;
}
