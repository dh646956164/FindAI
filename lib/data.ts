import { prisma } from "@/lib/prisma";
import { catalogTools, comparisonsSeed, newsSeed, rankingSeeds, useCasesSeed, type CatalogTool } from "@/lib/catalog";

export type ToolView = CatalogTool & {
  id: string;
  logoUrl: string | null;
  requiresLogin: boolean;
  requiresPhone: boolean;
  supportsChinaPhone: boolean;
  supportsWechatPay: boolean;
  supportsAlipay: boolean;
  paidPlanDescription: string | null;
  lastCheckedAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

const fallbackTools: ToolView[] = catalogTools.map((tool, index) => ({
  ...tool, id: `fallback-${index + 1}`, logoUrl: null, requiresLogin: true, requiresPhone: false,
  supportsChinaPhone: true, supportsWechatPay: false, supportsAlipay: true,
  paidPlanDescription: "具体套餐与价格以官网最新公示为准。",
  lastCheckedAt: new Date(Date.now() - (index % 20) * 86400000), createdAt: new Date(), updatedAt: new Date(),
}));
const staticExport = process.env.STATIC_EXPORT === "true";

type ToolFilters = { q?: string; category?: string; access?: string; pricing?: string; capability?: string; audience?: string; sort?: string };

export async function getTools(filters: ToolFilters = {}): Promise<ToolView[]> {
  const { q, category, access, pricing, capability, audience, sort } = filters;
  if (staticExport) return filterFallbackTools(filters);
  try {
    const capabilityWhere: Record<string, boolean> = {};
    if (capability) capabilityWhere[capability] = true;
    const tools = await prisma.aiTool.findMany({
      where: {
        ...(q ? { OR: [
          { name: { contains: q, mode: "insensitive" as const } }, { company: { contains: q, mode: "insensitive" as const } },
          { shortDescription: { contains: q, mode: "insensitive" as const } }, { longDescription: { contains: q, mode: "insensitive" as const } },
          { useCases: { has: q } }, { subCategories: { has: q } },
        ] } : {}),
        ...(category ? { category } : {}), ...(access ? { domesticAccessibility: access as never } : {}),
        ...(pricing ? { pricingModel: pricing as never } : {}), ...(audience ? { targetUsers: { has: audience } } : {}), ...capabilityWhere,
      },
      orderBy: sort === "name" ? { name: "asc" } : sort === "updated" ? { updatedAt: "desc" } : { recommendationLevel: "desc" },
    });
    return tools as unknown as ToolView[];
  } catch {
    return filterFallbackTools(filters);
  }
}

export async function getTool(slug: string): Promise<ToolView | null> {
  if (staticExport) return fallbackTools.find((tool) => tool.slug === slug) || null;
  try {
    return await prisma.aiTool.findUnique({ where: { slug } }) as unknown as ToolView | null;
  } catch {
    return fallbackTools.find((tool) => tool.slug === slug) || null;
  }
}

export async function getFeaturedTools(limit = 8) {
  const tools = await getTools();
  return tools.filter((tool) => tool.isFeatured).slice(0, limit);
}

export async function getRankings() {
  if (!staticExport) {
  try {
    const results = await prisma.ranking.findMany({ include: { items: { include: { tool: true, model: true }, orderBy: { rank: "asc" } } }, orderBy: { createdAt: "asc" } });
    if (results.length) return results;
  } catch { /* fallback below */ }
  }
  const picks: Record<string, string[]> = {
    "chinese-writing": ["kimi", "tongyi-qianwen", "doubao", "deepseek", "chatglm"], "official-writing": ["tongyi-qianwen", "deepseek", "wps-ai", "iflytek-spark", "doubao"],
    coding: ["trae", "tongyi-lingma", "deepseek-coder-api", "codegeex", "codebuddy"], "ai-search": ["metaso", "kimi-deep-research", "nami-search", "tiangong-search", "baidu-ai-search"],
    "ai-agent": ["ouchn-ai-base", "dify", "coze", "fastgpt", "tencent-yuanqi"], image: ["jimeng-ai", "tongyi-wanxiang", "liblibai", "yige", "gaoding-ai"],
    video: ["kling-ai", "hailuo-video", "jimeng-ai", "capcut-ai-cn", "muse-steamer"], free: ["deepseek", "doubao", "tongyi-qianwen", "kimi", "metaso"],
    domestic: ["deepseek", "tongyi-qianwen", "doubao", "kimi", "iflytek-spark"], "education-office": ["gsou-thesis-review", "ouchn-ai-base", "wps-ai", "kimi", "tongyi-qianwen"],
    "developer-api": ["siliconflow", "volcengine-ark", "aliyun-bailian", "deepseek-coder-api", "bigmodel"],
  };
  return rankingSeeds.map(([title, slug, description], rankingIndex) => ({
    id: `ranking-${rankingIndex}`, title, slug, description, category: title.replace("榜", ""), createdAt: new Date(), updatedAt: new Date(),
    items: (picks[slug] || []).map((toolSlug, index) => ({ id: `${slug}-${index}`, rank: index + 1, score: 96 - index * 2.3, reason: "中文体验、任务完成质量和使用成本表现突出。", tool: fallbackTools.find((tool) => tool.slug === toolSlug) || null, model: null })),
  }));
}

export async function getComparisons() {
  if (!staticExport) { try { const rows = await prisma.comparison.findMany({ orderBy: { updatedAt: "desc" } }); if (rows.length) return rows; } catch { /* fallback */ } }
  return comparisonsSeed.map(([title, slug, toolsCompared, scenario], index) => ({ id: `comparison-${index}`, title, slug, toolsCompared: [...toolsCompared], scenario, summary: `从效果、成本和中文体验比较 ${toolsCompared.join("、")}。`, conclusion: "先按真实任务完成小样测试，再根据数据合规、预算和协作要求做最终选择。", content: "先明确任务、材料和交付标准。使用同一输入测试候选工具，记录质量、速度、稳定性和人工修订成本。", createdAt: new Date(), updatedAt: new Date() }));
}

export async function getComparison(slug: string) { return (await getComparisons()).find((item) => item.slug === slug) || null; }

export async function getUseCases() {
  if (!staticExport) { try { const rows = await prisma.useCaseGuide.findMany({ orderBy: { createdAt: "asc" } }); if (rows.length) return rows; } catch { /* fallback */ } }
  return useCasesSeed.map((item, index) => ({ ...item, id: `guide-${index}`, createdAt: new Date(), updatedAt: new Date() }));
}

export async function getUseCase(slug: string) { return (await getUseCases()).find((item) => item.slug === slug) || null; }

export async function getNews(limit?: number) {
  if (!staticExport) { try { const rows = await prisma.aiNews.findMany({ orderBy: [{ isPinned: "desc" }, { publishedAt: "desc" }], ...(limit ? { take: limit } : {}) }); if (rows.length) return rows; } catch { /* fallback */ } }
  return newsSeed.slice(0, limit).map((item, index) => ({ ...item, id: `news-${index}`, sourceUrl: null, createdAt: new Date(), updatedAt: new Date() }));
}

export function getFallbackStats() { return { tools: fallbackTools.length, categories: new Set(fallbackTools.map((tool) => tool.category)).size }; }

function filterFallbackTools({ q, category, access, pricing, capability, audience, sort }: ToolFilters) {
  const term = q?.toLowerCase();
  return fallbackTools.filter((tool) => {
    const searchable = [tool.name, tool.company, tool.shortDescription, tool.longDescription, ...tool.useCases, ...tool.subCategories, ...tool.targetUsers].join(" ").toLowerCase();
    return (!term || searchable.includes(term)) && (!category || tool.category === category) && (!access || tool.domesticAccessibility === access)
      && (!pricing || tool.pricingModel === pricing) && (!capability || Boolean((tool as unknown as Record<string, unknown>)[capability]))
      && (!audience || tool.targetUsers.includes(audience));
  }).sort((a, b) => sort === "name" ? a.name.localeCompare(b.name, "zh-CN") : sort === "updated" ? +b.updatedAt - +a.updatedAt : b.recommendationLevel - a.recommendationLevel);
}
