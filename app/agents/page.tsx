import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bot, Boxes, BrainCircuit, Database, GitBranch, Network, ServerCog, Workflow } from "lucide-react";
import { ToolAvatar } from "@/components/tool-avatar";
import { AnimatedCard } from "@/components/animated-card";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getTools } from "@/lib/data";

export const metadata: Metadata = { title: "AI Agent 专区", description: "区分智能体、工作流、知识库、自动化平台和开源 Agent 框架。" };
const types = [[Bot,"零代码智能体","通过可视化配置快速创建智能体"],[Workflow,"工作流 Agent","按业务步骤编排模型与工具"],[Database,"企业知识库","连接组织资料并提供可信问答"],[Network,"多智能体协作","多个角色协同完成复杂任务"],[BrainCircuit,"编程 Agent","理解项目并执行开发任务"],[Boxes,"办公 Agent","处理文档、表格与日常协作"],[GitBranch,"开源框架","面向开发者的可扩展底座"],[ServerCog,"私有化平台","强调数据控制与企业部署"]] as const;
const agentFlow = ["模型", "工具", "知识库", "工作流", "自动执行"];

export default async function AgentsPage() {
  const all = await getTools(); const agents = all.filter((tool) => tool.supportsAgent || tool.agentType);
  return <>
    <PageHeader eyebrow="Agent 能力辨别指南" title="从模型能力到自动执行" description="看清它究竟是能自主执行的 Agent、固定工作流、知识库问答，还是换了名字的聊天机器人。"><div className="mx-auto mt-9 flex max-w-4xl items-center overflow-x-auto pb-2">{agentFlow.map((node,index)=><div key={node} className="flex min-w-0 flex-1 items-center"><div className="group min-w-[104px] rounded-2xl border border-white/10 bg-white/[.06] px-3 py-4 transition duration-300 hover:-translate-y-1 hover:border-indigo-300/50 hover:bg-indigo-500/20"><span className="mx-auto grid size-8 place-items-center rounded-full bg-indigo-400/15 text-xs font-black text-indigo-200">{index+1}</span><p className="mt-2 text-xs font-bold text-white">{node}</p></div>{index<agentFlow.length-1&&<div className="h-px min-w-5 flex-1 bg-gradient-to-r from-indigo-400/60 to-violet-400/30"/>}</div>)}</div></PageHeader>
    <section className="container py-12"><div className="grid grid-cols-2 gap-3 md:grid-cols-4">{types.map(([Icon,label,description]) => <div key={label} className="group rounded-2xl border bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-soft"><Icon className="size-6 text-primary transition-transform duration-300 group-hover:scale-110" /><p className="mt-4 text-sm font-bold">{label}</p><p className="mt-2 text-xs leading-5 text-muted-foreground">{description}</p></div>)}</div>
      <div className="mt-12 flex items-end justify-between"><div><Badge variant="outline">重点收录</Badge><h2 className="mt-3 text-2xl font-black">AI Agent 与高校智能体平台</h2></div><p className="hidden text-sm text-muted-foreground sm:block">共 {agents.length} 个候选</p></div>
      <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{agents.map((tool,index) => <AnimatedCard key={tool.slug} delay={index*.025}><Card className="group h-full transition-colors duration-300 hover:border-primary/40 hover:shadow-[0_18px_50px_rgba(79,70,229,.12)]"><CardContent className="p-5"><div className="flex items-start gap-3"><ToolAvatar name={tool.name} /><div className="min-w-0"><Link href={`/tools/${tool.slug}`} className="font-bold hover:text-primary">{tool.name}</Link><p className="mt-1 text-xs text-muted-foreground">{tool.company}</p></div><div className="ml-auto flex shrink-0 flex-col items-end gap-1"><Badge variant="outline">{tool.agentType || "Agent 平台"}</Badge><Badge>{tool.supportsWorkflow && tool.supportsAgent ? "真 Agent" : tool.supportsKnowledgeBase ? "知识库问答" : "半 Agent"}</Badge></div></div><p className="mt-4 line-clamp-2 min-h-12 text-sm leading-6 text-muted-foreground">{tool.shortDescription}</p><div className="mt-4 flex flex-wrap gap-1.5">{tool.supportsWorkflow && <Badge>工作流平台</Badge>}{tool.supportsKnowledgeBase && <Badge>知识库</Badge>}{tool.supportsMcp && <Badge>MCP</Badge>}{tool.supportsPrivateDeployment && <Badge>企业自动化</Badge>}</div><div className="mt-5 flex items-center justify-between border-t pt-4"><span className="text-xs text-muted-foreground">推荐指数 <b className="text-foreground">{tool.recommendationLevel}</b></span><Button variant="ghost" size="sm" asChild><Link href={`/tools/${tool.slug}`}>能力详情 <ArrowRight className="size-3.5" /></Link></Button></div></CardContent></Card></AnimatedCard>)}</div>
    </section>
    <section className="container pb-8"><div className="rounded-3xl bg-indigo-50 p-7 md:p-10"><h2 className="text-xl font-black">我们如何判断“真 Agent”？</h2><div className="mt-6 grid gap-5 md:grid-cols-3">{[["目标驱动","接受目标而不只是单轮指令"],["工具调用","能选择并调用外部工具或数据"],["状态与反馈","能保留执行状态，并根据结果调整下一步"]].map(([title,text],i) => <div key={title}><span className="text-sm font-black text-primary">0{i+1}</span><p className="mt-2 font-bold">{title}</p><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p></div>)}</div></div></section>
  </>;
}
