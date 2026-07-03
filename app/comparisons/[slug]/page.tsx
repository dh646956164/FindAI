import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, Scale } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getComparison } from "@/lib/data";
import { comparisonsSeed } from "@/lib/catalog";
import { formatDate } from "@/lib/utils";
type Params = Promise<{ slug: string }>;
export function generateStaticParams(){return comparisonsSeed.map(([,slug])=>({slug}));}
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> { const item = await getComparison((await params).slug); return { title: item?.title || "对比文章" }; }
export default async function ComparisonPage({ params }: { params: Params }) { const item = await getComparison((await params).slug); if (!item) notFound(); return <div className="container max-w-4xl py-10"><Link href="/comparisons" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"><ArrowLeft className="size-4" />返回工具对比</Link><article className="mt-8"><Badge>{item.scenario}</Badge><h1 className="mt-5 text-balance text-3xl font-black leading-tight md:text-5xl">{item.title}</h1><p className="mt-4 text-sm text-muted-foreground">最后更新：{formatDate(item.updatedAt)}</p><div className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl border bg-white p-5"><span className="mr-2 text-sm font-semibold">对比对象</span>{item.toolsCompared.map((tool, index) => <div key={tool} className="flex items-center gap-3"><Badge variant="outline">{tool}</Badge>{index < item.toolsCompared.length - 1 && <span className="text-xs text-muted-foreground">VS</span>}</div>)}</div><Card className="mt-6 border-primary/20 bg-primary/5"><CardHeader><CardTitle className="flex items-center gap-2"><Scale className="size-5 text-primary" />结论摘要</CardTitle></CardHeader><CardContent><p className="leading-8">{item.conclusion}</p></CardContent></Card><div className="mt-8 rounded-2xl bg-white p-7 shadow-sm"><h2 className="text-xl font-black">详细分析</h2><p className="mt-5 whitespace-pre-line leading-8 text-muted-foreground">{item.content.replaceAll("## ", "")}</p></div><div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-6"><p className="flex items-center gap-2 font-bold text-emerald-900"><CheckCircle2 className="size-5" />选型建议</p><p className="mt-3 text-sm leading-7 text-emerald-950/70">{item.summary}</p></div></article></div>; }
