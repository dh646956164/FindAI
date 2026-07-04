import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Database, Eye, ShieldCheck, Target, University } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { assetPath } from "@/lib/base-path";

export const metadata: Metadata = { title: "关于平台" };

export default function AboutPage() {
  return <div className="container max-w-5xl py-16">
    <Badge>关于综合平台</Badge>
    <h1 className="mt-6 max-w-4xl text-balance text-4xl font-black leading-[1.18] md:text-6xl">让 AI 工具选型<span className="text-primary">少一点噪音，多一点证据</span></h1>
    <p className="mt-7 max-w-3xl text-lg leading-9 text-muted-foreground">平台面向高校师生，从真实任务出发，汇聚大模型、智能体与各类 AI 应用的能力、价格、适用边界和使用入口。</p>

    <div className="relative mt-12 overflow-hidden rounded-3xl bg-slate-950 p-8 text-white md:p-10">
      <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url('${assetPath("/brand/gsou-city-banner.jpg")}')` }} />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-indigo-950/60" />
      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center"><img src={assetPath("/brand/gsou-emblem.png")} alt="甘肃开放大学校徽" className="size-24 shrink-0 rounded-full object-contain" /><div><p className="text-sm font-semibold text-indigo-300">甘肃开放大学 · AI 信息综合汇聚平台</p><h2 className="text-balance mt-2 text-2xl font-black">甘肃开放大学建设维护</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">聚焦教学、科研、管理和学习场景，持续精选实用 AI 工具与学校相关 AI 应用探索成果。</p></div></div>
    </div>

    <div className="mt-12 grid gap-5 md:grid-cols-3">{[[Target,"任务导向","从写材料、做课件、论文评阅和搭建智能体等真实任务出发。"],[Eye,"透明判断","同时呈现优点、缺点、适用边界和替代方案。"],[ShieldCheck,"高校视角","关注教学科研、行政办公、数据安全与部署要求。"]].map(([Icon,title,text])=>{const I=Icon as typeof Target;return <div key={title as string} className="rounded-2xl border bg-white p-6"><I className="size-6 text-primary"/><h2 className="mt-4 font-black">{title as string}</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{text as string}</p></div>})}</div>
    <div className="mt-12 rounded-3xl bg-slate-950 p-8 text-white md:p-12"><Database className="size-7 text-indigo-300"/><h2 className="mt-5 text-2xl font-black">数据与免责声明</h2><p className="mt-4 max-w-3xl text-sm leading-8 text-slate-400">产品能力、价格和访问状态变化很快。平台通过“最近核验时间”标注信息时效，但所有内容仅供选型参考，不构成采购、合规或安全结论。正式使用前请以产品官网和合同条款为准，并使用真实业务样例完成验证。</p><Button className="mt-7" asChild><Link href="/tools">开始浏览工具库 <ArrowRight className="size-4"/></Link></Button></div>
  </div>;
}
