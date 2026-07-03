import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, GitCompareArrows, Scale, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getComparisons } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "AI 工具对比", description: "热门 AI 工具横向对比和选型结论。" };
export default async function ComparisonsPage() { const items = await getComparisons(); return <>
  <section className="border-b bg-white"><div className="container py-14"><Badge><GitCompareArrows className="mr-1.5 size-3.5" />横向选型</Badge><h1 className="mt-5 text-4xl font-black tracking-tight">AI 工具对比</h1><p className="mt-4 max-w-2xl leading-7 text-muted-foreground">同样的任务、同样的评价维度，帮你看清能力边界、使用成本和真正适合的人群。</p></div></section>
  <div className="container py-12"><div className="grid gap-5 md:grid-cols-2">{items.map((item, index) => <Card key={item.id} className="group overflow-hidden hover:border-primary/30 hover:shadow-soft"><CardContent className="p-0"><div className={`h-1.5 ${index % 3 === 0 ? "bg-indigo-500" : index % 3 === 1 ? "bg-cyan-500" : "bg-violet-500"}`} /><div className="p-6"><div className="flex items-center justify-between"><Badge variant="outline">{item.scenario}</Badge><span className="text-xs text-muted-foreground">{formatDate(item.updatedAt)}</span></div><h2 className="mt-5 text-xl font-black leading-8 group-hover:text-primary">{item.title}</h2><div className="mt-4 flex flex-wrap gap-2">{item.toolsCompared.map((tool) => <Badge key={tool}>{tool}</Badge>)}</div><p className="mt-5 line-clamp-2 text-sm leading-6 text-muted-foreground">{item.summary}</p><Button className="mt-5 px-0" variant="ghost" asChild><Link href={`/comparisons/${item.slug}`}>阅读完整对比 <ArrowRight className="size-4" /></Link></Button></div></CardContent></Card>)}</div></div>
  </>; }
