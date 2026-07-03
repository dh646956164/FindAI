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

const taskLinks = [
  ["写材料", "/use-cases/guide-1", FileText], ["做 PPT", "/use-cases/guide-3", Presentation],
  ["数据分析", "/use-cases/guide-4", BarChart3], ["写代码", "/use-cases/guide-5", Braces],
  ["AI 搜索", "/tools?category=AI%20%E6%90%9C%E7%B4%A2", Search], ["论文阅读", "/use-cases/guide-9", BookOpenCheck],
  ["论文 AI 评阅", "/tools?q=%E8%AE%BA%E6%96%87%20AI%20%E8%AF%84%E9%98%85", FileCheck2], ["智能体搭建", "/use-cases/guide-7", Bot],
  ["图片生成", "/use-cases/guide-11", ImageIcon], ["视频生成", "/use-cases/guide-12", Video],
  ["会议纪要", "/use-cases/guide-14", Mic2], ["高校办公", "/use-cases/guide-15", University],
  ["知识库问答", "/use-cases/guide-8", Sparkles],
] as const;

export default async function HomePage() {
  const [tools, news] = await Promise.all([getFeaturedTools(8), getNews(6)]);
  return <>
    <section className="relative overflow-hidden border-b bg-slate-950 text-white">
      <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url('${assetPath("/brand/gsou-city-banner.jpg")}')` }} />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-indigo-950/85 to-slate-950" />
      <div className="absolute left-1/2 top-[-240px] h-[560px] w-[760px] -translate-x-1/2 rounded-full bg-indigo-500/25 blur-3xl" />
      <div className="container relative py-14 text-center md:py-20">
        <AnimatedSection delay={.02} className="mx-auto mb-7 flex w-fit items-center gap-3 rounded-full border border-white/15 bg-white/8 px-4 py-2 backdrop-blur">
          <img src={assetPath("/brand/gsou-emblem.png")} alt="甘肃开放大学校徽" className="size-8 rounded-full object-contain" />
          <span className="text-xs font-semibold tracking-wide text-indigo-100">甘肃开放大学 · AI 信息综合汇聚平台</span>
        </AnimatedSection>
        <AnimatedSection delay={.08}><h1 className="text-balance mx-auto max-w-4xl text-4xl font-black leading-[1.12] tracking-[-0.04em] md:text-6xl">AI 大模型与智能体<br /><span className="bg-gradient-to-r from-cyan-300 via-indigo-300 to-violet-300 bg-clip-text text-transparent">综合平台</span></h1></AnimatedSection>
        <AnimatedSection delay={.16}><p className="text-balance mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">帮你快速判断每个 AI 工具是否值得用、适合什么场景、有没有免费版和替代方案。</p></AnimatedSection>
        <AnimatedSection delay={.24}><SearchForm large className="mx-auto mt-8 max-w-3xl border-white/10 text-foreground transition-shadow duration-300 hover:shadow-[0_16px_55px_rgba(99,102,241,.28)] focus-within:shadow-[0_16px_60px_rgba(99,102,241,.4)]" /></AnimatedSection>
        <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs text-slate-400"><span>热门：</span>{["DeepSeek", "Kimi", "Dify", "论文评阅", "知识库"].map((item) => <Link key={item} href={`/tools?q=${encodeURIComponent(item)}`} className="hover:text-white">{item}</Link>)}</div>

        <div className="mx-auto mt-10 max-w-5xl rounded-3xl border border-white/10 bg-white/[.06] p-5 text-left shadow-2xl backdrop-blur-md md:p-7">
          <div className="flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.22em] text-indigo-300">快速入口</p><h2 className="mt-2 text-xl font-black md:text-2xl">从你的任务出发，找到合适的 AI。</h2></div><span className="hidden text-xs text-slate-400 md:block">选择任务，直接查看推荐方案</span></div>
          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">{taskLinks.map(([label, href, Icon],index) => <AnimatedCard key={label} delay={index*.025}><Link href={href} className="group flex h-full items-center gap-2.5 rounded-xl border border-white/10 bg-white/[.05] px-3 py-3 text-sm font-semibold text-slate-200 transition duration-300 hover:border-indigo-300/40 hover:bg-white/10 hover:text-white"><Icon className="size-4 text-indigo-300" />{label}</Link></AnimatedCard>)}</div>
        </div>
      </div>
    </section>

    <section className="border-b bg-white py-16"><div className="container">
      <SectionHeading eyebrow="特色应用" title="高校 AI 应用与热门工具" description="汇聚教学、科研、办公、智能体和内容创作工具，帮助用户更快完成真实任务。" action={<Button variant="outline" asChild><Link href="/tools">浏览全部工具 <ArrowRight className="size-4" /></Link></Button>} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{tools.map((tool,index) => <ToolCard key={tool.slug} tool={tool} compact delay={index*.035} />)}</div>
    </div></section>

    <section className="container py-16">
      <SectionHeading eyebrow="最新动态" title="AI 信息速递" description="关注工具更新、模型能力、API 价格和高校 AI 应用进展。" action={<Button variant="ghost" asChild><Link href="/news">查看全部 <ArrowRight className="size-4" /></Link></Button>} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{news.map((item) => <Link href="/news" key={item.id} className="rounded-2xl border bg-white p-5 transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-soft"><div className="flex items-center justify-between gap-3"><Badge variant={item.isPinned ? "default" : "outline"}>{item.category}</Badge><span className="text-xs text-muted-foreground">{formatDate(item.publishedAt)}</span></div><p className="mt-4 font-bold leading-6">{item.title}</p><p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{item.summary}</p></Link>)}</div>
    </section>
  </>;
}
