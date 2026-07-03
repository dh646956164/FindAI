import Link from "next/link";
import { ArrowRight, CheckCircle2, ExternalLink, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ToolAvatar } from "@/components/tool-avatar";
import { pricingLabels } from "@/lib/constants";
import type { ToolView } from "@/lib/data";
import { resolveOfficialUrl } from "@/lib/tool-links";

export function ToolRow({ tool, sourceQuery = "" }: { tool: ToolView; sourceQuery?: string }) {
  const detailHref = sourceQuery ? `/tools/${tool.slug}?from=${encodeURIComponent(`/tools?${sourceQuery}`)}` : `/tools/${tool.slug}`;
  const officialUrl = resolveOfficialUrl(tool.slug, tool.officialUrl);
  return <div className="grid gap-4 rounded-2xl border bg-white p-5 transition-shadow hover:shadow-soft md:grid-cols-[1.4fr_1fr_auto] md:items-center">
    <div className="flex min-w-0 gap-4"><ToolAvatar name={tool.name} /><div className="min-w-0"><div className="flex items-center gap-2"><Link href={detailHref} className="truncate font-bold hover:text-primary">{tool.name}</Link><span className="flex items-center gap-1 text-xs font-bold text-amber-600"><Star className="size-3 fill-current" />{tool.rating.toFixed(1)}</span></div><p className="mt-1 text-xs text-muted-foreground">{tool.company} · {tool.category}</p><p className="mt-2 line-clamp-1 text-sm text-muted-foreground">{tool.shortDescription}</p></div></div>
    <div className="flex flex-wrap gap-2"><Badge variant="outline">{pricingLabels[tool.pricingModel]}</Badge>{tool.supportsApi && <Badge variant="outline"><CheckCircle2 className="mr-1 size-3" />API</Badge>}{tool.supportsAgent && <Badge variant="outline">Agent</Badge>}</div>
    <div className="flex justify-end gap-1">{officialUrl && <Button variant="ghost" size="sm" asChild><a href={officialUrl} target="_blank" rel="noopener noreferrer">立即使用 <ExternalLink className="size-3.5" /></a></Button>}<Button variant="ghost" size="sm" asChild><Link href={detailHref}>详情 <ArrowRight className="size-4" /></Link></Button></div>
  </div>;
}
