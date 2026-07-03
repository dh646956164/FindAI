import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowRight, CalendarCheck, Check, CheckCircle2, CircleDollarSign, ExternalLink, Info, Lightbulb, ShieldCheck, Sparkles, Star, X } from "lucide-react";
import { ToolAvatar } from "@/components/tool-avatar";
import { AnimatedSection } from "@/components/animated-section";
import { BackToToolsLink } from "@/components/back-to-tools-link";
import { GradientBadge } from "@/components/gradient-badge";
import { RatingBar } from "@/components/rating-bar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { pricingLabels } from "@/lib/constants";
import { getTool } from "@/lib/data";
import { catalogTools } from "@/lib/catalog";
import { resolveOfficialUrl } from "@/lib/tool-links";
import { formatDate } from "@/lib/utils";

type Params = Promise<{ slug: string }>;
const ouchnLoginUrl = "https://passport-ai.ouchn.edu.cn/Account/Login?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3Daimanage%26redirect_uri%3Dhttps%253A%252F%252Fai.ouchn.edu.cn%252Fauthentication%252Flogin-callback%26response_type%3Dcode%26scope%3Dopenid%2520profile%2520openid%2520profile%2520manageapi%2520offline_access%26state%3De4941f3366384eafb29e4bfa174f201b%26code_challenge%3DS5dthRUlvi8iDeSpwkFe3d_JDIqVoV5df6aD3-X9dBc%26code_challenge_method%3DS256%26response_mode%3Dquery";

export function generateStaticParams() { return catalogTools.map((tool) => ({ slug: tool.slug })); }

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> { const { slug } = await params; const tool = await getTool(slug); return tool ? { title: tool.name, description: tool.shortDescription } : { title: "工具未找到" }; }

export default async function ToolDetailPage({ params }: { params: Params }) {
  const { slug } = await params; const tool = await getTool(slug); if (!tool) notFound();
  const officialUrl = resolveOfficialUrl(tool.slug, tool.officialUrl);
  const capabilityGroups = [
    ["内容与理解", [["文件上传",tool.supportsFileUpload],["联网搜索",tool.supportsWebSearch],["图片理解",tool.supportsImageUnderstanding],["图片生成",tool.supportsImageGeneration],["视频生成",tool.supportsVideoGeneration]]],
    ["语音与接口", [["语音输入",tool.supportsVoiceInput],["语音合成",tool.supportsTextToSpeech],["API",tool.supportsApi],["插件",tool.supportsPlugins],["MCP",tool.supportsMcp]]],
    ["Agent 与部署", [["Agent",tool.supportsAgent],["知识库",tool.supportsKnowledgeBase],["工作流",tool.supportsWorkflow],["私有化部署",tool.supportsPrivateDeployment],["本地部署",tool.supportsLocalDeployment]]],
  ] as const;
  return <>
    <section className="border-b bg-white"><div className="container py-5"><Suspense fallback={<Link href="/tools" className="text-sm text-muted-foreground">返回工具库</Link>}><BackToToolsLink /></Suspense></div></section>
    <section className="relative overflow-hidden border-b bg-gradient-to-br from-indigo-50 via-white to-violet-50"><div className="absolute inset-0 dot-grid opacity-30"/><div className="container relative py-12">
      <AnimatedSection><div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-start"><div className="flex gap-5"><ToolAvatar name={tool.name} className="size-20 rounded-3xl text-xl shadow-lg shadow-indigo-200" /><div><div className="flex flex-wrap items-center gap-2"><h1 className="text-3xl font-black tracking-tight md:text-5xl">{tool.name}</h1>{tool.isFeatured && <Badge><Sparkles className="mr-1 size-3" />编辑推荐</Badge>}</div><p className="mt-2 text-muted-foreground">{tool.company} · {tool.country}</p><p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">{tool.shortDescription}</p><div className="mt-5 flex flex-wrap gap-2"><GradientBadge>{tool.category}</GradientBadge>{tool.subCategories.map((item) => <GradientBadge muted key={item}>{item}</GradientBadge>)}</div></div></div>
        <div className="flex flex-col items-stretch gap-3 sm:flex-row lg:w-56 lg:flex-col"><div className="rounded-2xl border border-indigo-100 bg-white/90 px-5 py-4 shadow-sm"><RatingBar value={tool.recommendationLevel}/></div>{officialUrl && <Button size="lg" className="shadow-lg shadow-primary/20" asChild><a href={officialUrl} target="_blank" rel="noopener noreferrer">立即使用 <ExternalLink className="size-4" /></a></Button>}{tool.slug === "ouchn-ai-base" && <Button variant="outline" asChild><a href={ouchnLoginUrl} target="_blank" rel="noopener noreferrer">统一身份认证登录 <ExternalLink className="size-4" /></a></Button>}</div>
      </div>
      </AnimatedSection>
      <div className="mt-8 grid gap-3 sm:grid-cols-3"><StatusItem icon={CircleDollarSign} label="价格模式" value={pricingLabels[tool.pricingModel]} good={tool.freePlan} /><StatusItem icon={CheckCircle2} label="中文支持" value={tool.chineseInputOutput ? "完整支持" : "有限支持"} good={tool.chineseInputOutput} /><StatusItem icon={CalendarCheck} label="最近核验" value={formatDate(tool.lastCheckedAt)} good /></div>
    </div></section>
    <div className="container grid gap-6 py-10 lg:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        <Card><CardHeader><CardTitle className="flex items-center gap-2"><Info className="size-5 text-primary" />产品介绍</CardTitle></CardHeader><CardContent><p className="leading-8 text-muted-foreground">{tool.longDescription}</p></CardContent></Card>
        <Card><CardHeader><CardTitle>账号与付费信息</CardTitle></CardHeader><CardContent className="grid gap-x-10 gap-y-4 sm:grid-cols-2"><InfoRow label="需要登录" value={tool.requiresLogin} /><InfoRow label="需要手机号" value={tool.requiresPhone} /><InfoRow label="中文界面" value={tool.chineseInterface} /><InfoRow label="提供免费版" value={tool.freePlan} /><InfoRow label="微信支付" value={tool.supportsWechatPay} /><InfoRow label="支付宝" value={tool.supportsAlipay} /><div className="sm:col-span-2 rounded-xl bg-muted p-4"><p className="text-xs font-semibold text-muted-foreground">免费额度说明</p><p className="mt-2 text-sm leading-6">{tool.freeQuota}</p></div></CardContent></Card>
        <Card><CardHeader><CardTitle>能力矩阵</CardTitle></CardHeader><CardContent className="grid gap-4 md:grid-cols-3">{capabilityGroups.map(([title, items]) => <div key={title} className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4"><p className="mb-3 text-sm font-bold">{title}</p><div className="flex flex-wrap gap-2">{items.map(([label,supported]) => <GradientBadge key={label} muted={!supported} className={supported ? "border-transparent bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-sm" : ""}>{supported ? <Check className="mr-1 size-3"/> : <X className="mr-1 size-3"/>}{label}</GradientBadge>)}</div></div>)}</CardContent></Card>
        <div className="grid gap-6 md:grid-cols-2"><ListCard title="核心优点" icon={CheckCircle2} items={tool.strengths} tone="good" /><ListCard title="需要注意" icon={AlertTriangle} items={tool.weaknesses} tone="warn" /></div>
        <Card><CardHeader><CardTitle className="flex items-center gap-2"><Lightbulb className="size-5 text-amber-500" />场景与使用建议</CardTitle></CardHeader><CardContent className="grid gap-6 md:grid-cols-2"><TagSection title="适合场景" items={tool.useCases} /><TagSection title="适合用户" items={tool.targetUsers} /><ListSection title="最适合" items={tool.bestFor} /><ListSection title="不太适合" items={tool.notFor} /></CardContent></Card>
        <Card className="border-amber-200 bg-amber-50/50"><CardHeader><CardTitle className="flex items-center gap-2"><ShieldCheck className="size-5 text-amber-700" />高校 / 政务 / 企业合规提示</CardTitle></CardHeader><CardContent><p className="text-sm leading-7 text-amber-950/75">{tool.complianceNotes}</p></CardContent></Card>
      </div>
      <aside className="space-y-6"><Card><CardHeader><CardTitle className="text-base">快速判断</CardTitle></CardHeader><CardContent className="space-y-4"><Quick label="提供免费版" value={tool.freePlan} /><Quick label="支持 API" value={tool.supportsApi} /><Quick label="支持 Agent" value={tool.supportsAgent} /><Quick label="可私有化" value={tool.supportsPrivateDeployment} /></CardContent></Card>
        <Card><CardHeader><CardTitle className="text-base">同类替代</CardTitle></CardHeader><CardContent className="space-y-2">{tool.domesticAlternatives.map((item) => <Link key={item} href={`/tools?q=${encodeURIComponent(item)}`} className="flex items-center justify-between rounded-xl bg-muted px-3 py-2.5 text-sm hover:text-primary">{item}<ArrowRight className="size-3.5" /></Link>)}</CardContent></Card>
        <Card><CardHeader><CardTitle className="text-base">国际竞品</CardTitle></CardHeader><CardContent className="flex flex-wrap gap-2">{tool.internationalAlternatives.map((item) => <Badge variant="outline" key={item}>{item}</Badge>)}</CardContent></Card>
      </aside>
    </div>
  </>;
}

function StatusItem({ icon: Icon, label, value, good }: { icon: typeof CircleDollarSign; label: string; value: string; good: boolean }) { return <div className="flex items-center gap-3 rounded-2xl border bg-white p-4"><span className={`grid size-10 place-items-center rounded-xl ${good ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}><Icon className="size-5" /></span><div><p className="text-xs text-muted-foreground">{label}</p><p className="mt-1 text-sm font-bold">{value}</p></div></div>; }
function InfoRow({ label, value }: { label: string; value: boolean }) { return <div className="flex items-center justify-between border-b pb-3 text-sm"><span className="text-muted-foreground">{label}</span><span className={value ? "text-emerald-600" : "text-slate-400"}>{value ? "支持" : "不支持 / 未确认"}</span></div>; }
function Quick({ label, value }: { label: string; value: boolean }) { return <div className="flex items-center justify-between text-sm"><span className="text-muted-foreground">{label}</span>{value ? <Badge variant="success">是</Badge> : <Badge variant="outline">否 / 未确认</Badge>}</div>; }
function ListCard({ title, icon: Icon, items, tone }: { title: string; icon: typeof CheckCircle2; items: string[]; tone: "good" | "warn" }) { return <Card><CardHeader><CardTitle className="flex items-center gap-2"><Icon className={`size-5 ${tone === "good" ? "text-emerald-600" : "text-amber-600"}`} />{title}</CardTitle></CardHeader><CardContent><ul className="space-y-3">{items.map((item) => <li key={item} className="flex gap-2 text-sm leading-6 text-muted-foreground"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />{item}</li>)}</ul></CardContent></Card>; }
function TagSection({ title, items }: { title: string; items: string[] }) { return <div><p className="mb-3 text-sm font-bold">{title}</p><div className="flex flex-wrap gap-2">{items.map((item) => <Badge variant="outline" key={item}>{item}</Badge>)}</div></div>; }
function ListSection({ title, items }: { title: string; items: string[] }) { return <div><p className="mb-3 text-sm font-bold">{title}</p>{items.map((item) => <p key={item} className="mb-2 text-sm leading-6 text-muted-foreground">· {item}</p>)}</div>; }
