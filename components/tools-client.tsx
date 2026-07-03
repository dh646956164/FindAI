"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Filter, Grid2X2, List, RotateCcw, Search, SlidersHorizontal } from "lucide-react";
import { ToolCard } from "@/components/tool-card";
import { ToolRow } from "@/components/tool-row";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories, pricingLabels } from "@/lib/constants";
import type { ToolView } from "@/lib/data";
import { cn } from "@/lib/utils";

const capabilities: Array<[string, string]> = [["supportsFileUpload","文件上传"],["supportsWebSearch","联网搜索"],["supportsImageUnderstanding","图片理解"],["supportsVideoGeneration","视频生成"],["supportsVoiceInput","语音能力"],["supportsApi","API"],["supportsAgent","Agent"],["supportsKnowledgeBase","知识库"],["supportsWorkflow","工作流"],["supportsMcp","MCP"],["supportsPrivateDeployment","私有化部署"]];
const audiences = ["学生", "教师", "行政办公", "开发者", "企业", "政务/高校", "自媒体", "设计师", "研究人员"];

export function ToolsClient({ tools: allTools }: { tools: ToolView[] }) {
  const params = useSearchParams();
  const filters = { q: params.get("q") || "", category: params.get("category") || "", pricing: params.get("pricing") || "", capability: params.get("capability") || "", audience: params.get("audience") || "", sort: params.get("sort") || "" };
  const view = params.get("view") || "grid";
  const term = filters.q.toLowerCase();
  const tools = allTools.filter((tool) => {
    const searchable = [tool.name, tool.company, tool.shortDescription, tool.longDescription, ...tool.useCases, ...tool.subCategories, ...tool.targetUsers].join(" ").toLowerCase();
    return (!term || searchable.includes(term)) && (!filters.category || tool.category === filters.category)
      && (!filters.pricing || tool.pricingModel === filters.pricing)
      && (!filters.capability || Boolean((tool as unknown as Record<string, unknown>)[filters.capability]))
      && (!filters.audience || tool.targetUsers.includes(filters.audience));
  }).sort((a, b) => filters.sort === "name" ? a.name.localeCompare(b.name, "zh-CN") : filters.sort === "updated" ? +new Date(b.updatedAt) - +new Date(a.updatedAt) : b.recommendationLevel - a.recommendationLevel);
  const queryForView = new URLSearchParams(Object.entries(filters).filter(([,value]) => value));
  const sourceParams = new URLSearchParams(queryForView); sourceParams.set("view", view); const sourceQuery = sourceParams.toString();
  const stateKey = params.toString();

  return <>
    <section className="border-b bg-white"><div className="container py-10"><Badge className="mb-3"><SlidersHorizontal className="mr-1.5 size-3" />智能筛选</Badge><h1 className="text-3xl font-black tracking-tight md:text-4xl">AI 工具库</h1><p className="mt-3 text-muted-foreground">不是链接清单，是可检索、可比较、持续核验的工具档案。</p>
      <form key={`search-${stateKey}`} className="relative mt-7 max-w-3xl">{Object.entries(filters).filter(([key,value]) => key !== "q" && value).map(([key,value]) => <input key={key} type="hidden" name={key} value={value} />)}<input type="hidden" name="view" value={view} /><Search className="absolute left-4 top-3.5 size-5 text-muted-foreground" /><Input name="q" defaultValue={filters.q} className="h-12 bg-background pl-12 pr-24" placeholder="搜索工具名称、公司、场景或能力" /><Button className="absolute right-1.5 top-1.5">搜索</Button></form>
    </div></section>
    <div className="container py-8">
      <form key={`filters-${stateKey}`} className="grid gap-3 rounded-2xl border bg-white p-4 sm:grid-cols-2 lg:grid-cols-5">
        {filters.q && <input type="hidden" name="q" value={filters.q} />}{filters.sort && <input type="hidden" name="sort" value={filters.sort} />}<input type="hidden" name="view" value={view} />
        <FilterSelect name="category" label="全部分类" value={filters.category} options={categories.map((item) => [item,item])} />
        <FilterSelect name="pricing" label="价格模式" value={filters.pricing} options={Object.entries(pricingLabels)} />
        <FilterSelect name="capability" label="能力" value={filters.capability} options={capabilities} />
        <FilterSelect name="audience" label="适用人群" value={filters.audience} options={audiences.map((item) => [item,item])} />
        <Button type="submit"><Filter className="size-4" />应用筛选</Button>
      </form>
      <div className="mt-7 flex flex-wrap items-center justify-between gap-4"><div><p className="font-semibold">找到 <span className="text-primary">{tools.length}</span> 个工具</p><div className="mt-2 flex flex-wrap gap-2">{Object.entries(filters).filter(([key,value]) => value && key !== "sort").map(([key,value]) => <Badge variant="outline" key={key}>{value}</Badge>)}{Object.values(filters).some(Boolean) && <Link href="/tools" className="inline-flex items-center text-xs text-muted-foreground hover:text-primary"><RotateCcw className="mr-1 size-3" />重置</Link>}</div></div>
        <div className="flex items-center gap-2"><form key={`sort-${stateKey}`}>{Object.entries(filters).filter(([key,value]) => value && key !== "sort").map(([key,value]) => <input key={key} type="hidden" name={key} value={value} />)}<input type="hidden" name="view" value={view} /><select name="sort" defaultValue={filters.sort} className="h-9 rounded-lg border bg-white px-3 text-xs" aria-label="排序"><option value="recommendation">推荐优先</option><option value="updated">最近更新</option><option value="name">名称排序</option></select><Button variant="ghost" size="sm">排序</Button></form><div className="flex rounded-lg border bg-white p-1"><Link className={cn("rounded-md p-1.5", view === "grid" && "bg-muted text-primary")} href={`/tools?${queryForView.toString()}&view=grid`} aria-label="卡片视图"><Grid2X2 className="size-4" /></Link><Link className={cn("rounded-md p-1.5", view === "list" && "bg-muted text-primary")} href={`/tools?${queryForView.toString()}&view=list`} aria-label="列表视图"><List className="size-4" /></Link></div></div>
      </div>
      {tools.length ? view === "list" ? <div className="mt-6 grid gap-3">{tools.map((tool) => <ToolRow key={tool.slug} tool={tool} sourceQuery={sourceQuery} />)}</div> : <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{tools.map((tool,index) => <ToolCard key={tool.slug} tool={tool} sourceQuery={sourceQuery} animated={index < 18} delay={index * .025} />)}</div> : <div className="mt-12 rounded-3xl border border-dashed bg-white p-14 text-center"><Search className="mx-auto size-10 text-muted-foreground" /><h2 className="mt-4 text-lg font-bold">没有找到匹配工具</h2><p className="mt-2 text-sm text-muted-foreground">尝试减少筛选条件或使用更短的关键词。</p><Button className="mt-5" variant="outline" asChild><Link href="/tools">清除筛选</Link></Button></div>}
    </div>
  </>;
}

function FilterSelect({ name, label, value, options }: { name: string; label: string; value: string; options: readonly (readonly [string,string])[] }) {
  return <select name={name} defaultValue={value} aria-label={label} className="h-10 rounded-xl border bg-background px-3 text-sm outline-none focus:border-primary"><option value="">{label}</option>{options.map(([optionValue, optionLabel]) => <option key={optionValue} value={optionValue}>{optionLabel}</option>)}</select>;
}
