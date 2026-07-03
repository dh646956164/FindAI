import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type Context = { params: Promise<{ entity: string }> };
const allowed = new Set(["tools", "agents", "rankings", "comparisons", "use-cases", "news"]);

export async function GET(request: NextRequest, { params }: Context) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { entity } = await params; if (!allowed.has(entity)) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const q = request.nextUrl.searchParams.get("q") || "";
  try {
    let rows: unknown;
    switch (entity) {
      case "tools": rows = await prisma.aiTool.findMany({ where: q ? { OR: [{ name: { contains: q, mode: "insensitive" } }, { company: { contains: q, mode: "insensitive" } }] } : {}, orderBy: { updatedAt: "desc" }, take: 100 }); break;
      case "agents": rows = await prisma.aiTool.findMany({ where: { OR: [{ supportsAgent: true }, { agentType: { not: null } }] }, orderBy: { recommendationLevel: "desc" } }); break;
      case "rankings": rows = await prisma.ranking.findMany({ include: { _count: { select: { items: true } } }, orderBy: { updatedAt: "desc" } }); break;
      case "comparisons": rows = await prisma.comparison.findMany({ orderBy: { updatedAt: "desc" } }); break;
      case "use-cases": rows = await prisma.useCaseGuide.findMany({ orderBy: { updatedAt: "desc" } }); break;
      default: rows = await prisma.aiNews.findMany({ orderBy: [{ isPinned: "desc" }, { publishedAt: "desc" }] });
    }
    return NextResponse.json(rows);
  } catch (error) { return NextResponse.json({ error: "数据库不可用，请先配置 DATABASE_URL 并执行初始化。", detail: error instanceof Error ? error.message : "" }, { status: 503 }); }
}

export async function POST(request: NextRequest, { params }: Context) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { entity } = await params; if (!allowed.has(entity) || entity === "agents") return NextResponse.json({ error: "Unsupported" }, { status: 400 });
  const body = await request.json();
  try {
    let row: unknown;
    switch (entity) {
      case "tools": row = await prisma.aiTool.create({ data: toolCreateData(body) }); break;
      case "rankings": row = await prisma.ranking.create({ data: { title: required(body.title,"标题"), slug: required(body.slug,"slug"), description: body.description || "人工维护的实用榜单", category: body.category || "综合" } }); break;
      case "comparisons": row = await prisma.comparison.create({ data: { title: required(body.title,"标题"), slug: required(body.slug,"slug"), toolsCompared: array(body.toolsCompared), scenario: body.scenario || "综合选型", summary: body.summary || "待补充摘要", conclusion: body.conclusion || "待补充结论", content: body.content || "待补充详细内容" } }); break;
      case "use-cases": row = await prisma.useCaseGuide.create({ data: { title: required(body.title,"标题"), slug: required(body.slug,"slug"), scenario: body.scenario || body.title, description: body.description || "待补充", recommendedTools: array(body.recommendedTools), freeSolution: "待补充", domesticSolution: "待补充", strongestSolution: "待补充", lowCostSolution: "待补充", governmentEducationSolution: "待补充", steps: ["明确需求", "测试工具", "人工复核"], cautions: ["注意数据安全"] } }); break;
      default: row = await prisma.aiNews.create({ data: { title: required(body.title,"标题"), slug: required(body.slug,"slug"), source: body.source || "编辑部", sourceUrl: body.sourceUrl || null, summary: body.summary || "待补充摘要", category: body.category || "产品动态", importanceScore: Number(body.importanceScore || 3), relatedTools: array(body.relatedTools), publishedAt: body.publishedAt ? new Date(body.publishedAt) : new Date(), isPinned: Boolean(body.isPinned) } });
    }
    return NextResponse.json(row, { status: 201 });
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "创建失败" }, { status: 400 }); }
}

function required(value: unknown, field: string) { const result = String(value || "").trim(); if (!result) throw new Error(`${field}不能为空`); return result; }
function array(value: unknown): string[] { if (Array.isArray(value)) return value.map(String).filter(Boolean); return String(value || "").split(/[,，]/).map((item) => item.trim()).filter(Boolean); }
function toolCreateData(body: Record<string, unknown>) {
  return {
    name: required(body.name,"名称"), slug: required(body.slug,"slug"), company: required(body.company,"公司"), country: String(body.country || "中国"), officialUrl: body.officialUrl ? String(body.officialUrl) : null,
    category: String(body.category || "大模型助手"), subCategories: array(body.subCategories), shortDescription: String(body.shortDescription || "待补充工具简介"), longDescription: String(body.longDescription || body.shortDescription || "待补充详细介绍"),
    domesticAccessibility: (body.domesticAccessibility || "UNKNOWN") as never, pricingModel: (body.pricingModel || "FREEMIUM") as never, freePlan: body.freePlan !== false, freeQuota: String(body.freeQuota || "待核验"),
    chineseInterface: true, chineseInputOutput: true, useCases: array(body.useCases), targetUsers: array(body.targetUsers), strengths: array(body.strengths), weaknesses: array(body.weaknesses), bestFor: array(body.bestFor), notFor: array(body.notFor),
    complianceNotes: String(body.complianceNotes || "正式使用前请完成数据安全和服务条款审查。"), domesticAlternatives: array(body.domesticAlternatives), internationalAlternatives: array(body.internationalAlternatives), rating: Number(body.rating || 4), recommendationLevel: Number(body.recommendationLevel || 80), isFeatured: Boolean(body.isFeatured),
    supportsApi: Boolean(body.supportsApi), supportsAgent: Boolean(body.supportsAgent), supportsKnowledgeBase: Boolean(body.supportsKnowledgeBase), supportsWorkflow: Boolean(body.supportsWorkflow), supportsMcp: Boolean(body.supportsMcp), supportsPrivateDeployment: Boolean(body.supportsPrivateDeployment), supportsLocalDeployment: Boolean(body.supportsLocalDeployment), agentType: body.agentType ? String(body.agentType) : null,
  };
}
