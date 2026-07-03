import Link from "next/link";
import { ArrowUpRight, Check, ExternalLink, Sparkles, Star } from "lucide-react";
import { AnimatedCard } from "@/components/animated-card";
import { GradientBadge } from "@/components/gradient-badge";
import { RatingBar } from "@/components/rating-bar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ToolAvatar } from "@/components/tool-avatar";
import { pricingLabels } from "@/lib/constants";
import type { ToolView } from "@/lib/data";
import { resolveOfficialUrl } from "@/lib/tool-links";

export function ToolCard({ tool, compact = false, sourceQuery = "", animated = true, delay = 0 }: { tool: ToolView; compact?: boolean; sourceQuery?: string; animated?: boolean; delay?: number }) {
  const detailHref = sourceQuery ? `/tools/${tool.slug}?from=${encodeURIComponent(`/tools?${sourceQuery}`)}` : `/tools/${tool.slug}`;
  const officialUrl = resolveOfficialUrl(tool.slug, tool.officialUrl);
  return <AnimatedCard enabled={animated} delay={delay}><Card className="group relative flex h-full flex-col overflow-hidden transition-[border-color,box-shadow] duration-300 hover:border-primary/40 hover:shadow-[0_18px_50px_rgba(79,70,229,.14)]">
    <CardContent className={compact ? "p-5" : "p-6"}>
      <div className="flex items-start gap-3.5">
        <ToolAvatar name={tool.name} />
        <div className="min-w-0 flex-1"><Link href={detailHref} className="line-clamp-1 font-bold hover:text-primary">{tool.name}</Link><p className="mt-1 truncate text-xs text-muted-foreground">{tool.company}</p></div>
        <span className="flex items-center gap-1 text-xs font-bold text-amber-600"><Star className="size-3.5 fill-current" />{tool.rating.toFixed(1)}</span>
      </div>
      <p className="mt-4 line-clamp-2 min-h-10 text-sm leading-6 text-muted-foreground">{tool.shortDescription}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        <GradientBadge>{tool.category}</GradientBadge>
        <Badge variant="outline">{pricingLabels[tool.pricingModel]}</Badge>
        {tool.supportsApi && <GradientBadge>API</GradientBadge>}{tool.supportsAgent && <GradientBadge>Agent</GradientBadge>}
      </div>
      {!compact && <div className="mt-5 grid grid-cols-3 border-y py-3 text-center text-[11px] text-muted-foreground">
        <span className="flex items-center justify-center gap-1"><Check className="size-3 text-emerald-500" />中文</span>
        <span className="flex items-center justify-center gap-1">{tool.supportsApi ? <Check className="size-3 text-emerald-500" /> : <span>—</span>} API</span>
        <span className="flex items-center justify-center gap-1">{tool.supportsAgent ? <Sparkles className="size-3 text-violet-500" /> : <span>—</span>} Agent</span>
      </div>}
      <div className="mt-4">
        <RatingBar value={tool.recommendationLevel} />
        <div className="mt-2 flex items-center justify-end">{officialUrl && <Button variant="ghost" size="sm" asChild><a href={officialUrl} target="_blank" rel="noopener noreferrer">立即使用 <ExternalLink className="size-3.5" /></a></Button>}<Button variant="ghost" size="sm" className="-mr-2 text-primary" asChild><Link href={detailHref}>详情 <ArrowUpRight className="size-3.5" /></Link></Button></div>
      </div>
    </CardContent>
  </Card></AnimatedCard>;
}
