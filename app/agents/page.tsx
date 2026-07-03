import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Boxes,
  BrainCircuit,
  Database,
  Download,
  ExternalLink,
  Flame,
  GitBranch,
  Network,
  ServerCog,
  ShieldAlert,
  University,
  Workflow,
} from "lucide-react";
import { AnimatedCard } from "@/components/animated-card";
import { AnimatedSection } from "@/components/animated-section";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { agentPlatformDirectory, hotAgentProducts } from "@/lib/curated";

export const metadata: Metadata = {
  title: "AI Agent 专区",
  description: "发现可以直接执行任务的热门 Agent，以及主流智能体开发平台。",
};

const types = [
  [Bot, "零代码智能体", "通过可视化配置快速创建智能体"],
  [Workflow, "工作流 Agent", "按业务步骤编排模型与工具"],
  [Database, "企业知识库", "连接组织资料并提供可信问答"],
  [Network, "多智能体协作", "多个角色协同完成复杂任务"],
  [BrainCircuit, "编程 Agent", "理解项目并执行开发任务"],
  [Boxes, "办公 Agent", "处理文档、表格与日常协作"],
  [GitBranch, "开源框架", "面向开发者的可扩展底座"],
  [ServerCog, "私有化平台", "强调数据控制与企业部署"],
] as const;

const agentFlow = ["模型", "工具", "知识库", "工作流", "自动执行"];

export default function AgentsPage() {
  return <>
    <PageHeader
      eyebrow="Agent 能力辨别指南"
      title="从理解任务，到自主执行"
      description="先选可以直接完成工作的执行型 Agent；需要建设专属应用时，再进入智能体开发平台。"
    >
      <AnimatedSection delay={.12} className="mx-auto mt-8 max-w-5xl rounded-3xl border border-white/10 bg-white/[.05] p-3 shadow-2xl backdrop-blur md:p-5">
        <div className="flex items-stretch overflow-x-auto px-1 py-2 md:overflow-visible md:px-2 md:py-3">
          {agentFlow.map((node, index) => <div key={node} className="flex min-w-0 flex-1 items-center">
            <div className="group min-w-[108px] flex-1 rounded-2xl border border-white/10 bg-slate-950/30 px-3 py-4 transition duration-300 hover:-translate-y-1 hover:border-indigo-300/60 hover:bg-indigo-500/20 hover:shadow-[0_14px_35px_rgba(99,102,241,.22)]">
              <span className="mx-auto grid size-8 place-items-center rounded-full bg-indigo-400/15 text-xs font-black text-indigo-200 transition duration-300 group-hover:bg-indigo-300 group-hover:text-slate-950">{index + 1}</span>
              <p className="mt-2 text-xs font-bold text-white">{node}</p>
            </div>
            {index < agentFlow.length - 1 && <div className="h-px min-w-5 flex-1 bg-gradient-to-r from-indigo-400/70 to-violet-400/30" />}
          </div>)}
        </div>
      </AnimatedSection>
    </PageHeader>

    <section className="container py-12">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {types.map(([Icon, label, description]) => <div key={label} className="group rounded-2xl border bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-soft">
          <Icon className="size-6 text-primary transition-transform duration-300 group-hover:scale-110" />
          <p className="mt-4 text-sm font-bold">{label}</p>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">{description}</p>
        </div>)}
      </div>
    </section>

    <section className="border-y bg-slate-950 py-14 text-white">
      <div className="container">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <Badge className="border-orange-300/20 bg-orange-400/10 text-orange-200"><Flame className="mr-1.5 size-3.5" />近期热门</Badge>
            <h2 className="mt-4 text-balance text-3xl font-black">直接帮你完成任务的 Agent</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">按照公开热度、产品活跃度与实际任务覆盖排序；点击即可进入官网或下载页面。</p>
          </div>
          <span className="text-xs text-slate-500">持续核验产品入口与能力变化</span>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {hotAgentProducts.map((agent, index) => <AnimatedCard key={agent.name} delay={index * .04}>
            <article className={`group flex h-full flex-col rounded-2xl border p-5 transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_55px_rgba(79,70,229,.22)] ${index === 0 ? "border-indigo-300/50 bg-gradient-to-b from-indigo-500/25 to-white/[.06]" : "border-white/10 bg-white/[.05] hover:border-indigo-300/40"}`}>
              <div className="flex items-center justify-between gap-3">
                <span className={`grid size-9 place-items-center rounded-xl text-sm font-black ${index === 0 ? "bg-indigo-300 text-slate-950" : "bg-white/10 text-indigo-200"}`}>0{agent.rank}</span>
                <Badge variant="outline" className="border-white/15 text-slate-300">{agent.company}</Badge>
              </div>
              <a href={agent.officialUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-1.5 text-lg font-black hover:text-indigo-300">{agent.name}<ExternalLink className="size-4" /></a>
              <p className="mt-3 flex-1 text-sm leading-6 text-slate-400">{agent.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">{agent.tags.map((tag) => <span key={tag} className="rounded-full bg-white/[.07] px-2.5 py-1 text-[11px] text-slate-300">{tag}</span>)}</div>
              {agent.warning && <p className="mt-4 flex gap-2 rounded-xl border border-amber-300/15 bg-amber-400/10 p-3 text-xs leading-5 text-amber-100"><ShieldAlert className="mt-0.5 size-4 shrink-0" />{agent.warning}</p>}
              <Button className="mt-5 w-full" variant={index === 0 ? "default" : "secondary"} asChild>
                <a href={agent.officialUrl} target="_blank" rel="noopener noreferrer">{agent.actionLabel}{agent.actionLabel.includes("下载") && <Download className="size-4" />}{!agent.actionLabel.includes("下载") && <ArrowRight className="size-4" />}</a>
              </Button>
            </article>
          </AnimatedCard>)}
        </div>
      </div>
    </section>

    <section className="container py-14">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <Badge variant="outline">开发平台 Top 10</Badge>
          <h2 className="mt-4 text-balance text-3xl font-black">头部厂商智能体开发平台</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">综合公开用户规模、厂商覆盖、生态活跃度和产品成熟度排序；因各平台未公布统一口径数据，本榜不等同于官方市场份额。</p>
        </div>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {agentPlatformDirectory.map((platform, index) => <AnimatedCard key={platform.name} delay={Math.min(index, 8) * .025}>
          <article className={`group h-full rounded-2xl border bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-soft ${platform.rank <= 3 ? "border-indigo-200 bg-gradient-to-br from-indigo-50/80 to-white" : ""}`}>
            <div className="flex items-start gap-4">
              <span className={`grid size-10 shrink-0 place-items-center rounded-xl text-sm font-black ${platform.rank === 1 ? "bg-indigo-600 text-white" : platform.rank <= 3 ? "bg-indigo-100 text-indigo-700" : "bg-slate-100 text-slate-500"}`}>{platform.rank}</span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <a href={platform.officialUrl} target="_blank" rel="noopener noreferrer" className="font-black hover:text-primary">{platform.name}</a>
                  <Badge variant="outline">{platform.company}</Badge>
                </div>
                <p className="mt-1 text-xs font-semibold text-primary">{platform.platformType}</p>
              </div>
              <Button size="sm" variant="ghost" asChild>
                <a href={platform.officialUrl} target="_blank" rel="noopener noreferrer" aria-label={`访问 ${platform.name}`}>访问 <ExternalLink className="size-3.5" /></a>
              </Button>
            </div>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">{platform.description}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">{platform.tags.map((tag) => <Badge key={tag} variant="secondary">{tag}</Badge>)}</div>
            <p className="mt-4 border-t pt-3 text-xs text-muted-foreground">排序参考：{platform.usageBasis}</p>
          </article>
        </AnimatedCard>)}
      </div>
    </section>

    <section className="container pb-14">
      <div className="grid gap-5 rounded-3xl bg-indigo-50 p-7 md:grid-cols-[1fr_auto] md:items-center md:p-10">
        <div>
          <Badge><University className="mr-1.5 size-3.5" />高校特色应用</Badge>
          <h2 className="mt-4 text-xl font-black">国家开放大学 AI 基座平台</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">面向开放大学体系的 AI 基座与智能体应用平台，可用于智能体创建、知识库和 AI 应用管理。</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" asChild><Link href="/tools/ouchn-ai-base">查看能力 <ArrowRight className="size-4" /></Link></Button>
          <Button asChild><a href="https://ai.ouchn.edu.cn/agentcenter" target="_blank" rel="noopener noreferrer">进入平台 <ExternalLink className="size-4" /></a></Button>
        </div>
      </div>
    </section>
  </>;
}
