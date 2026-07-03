import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
type Context = { params: Promise<{ entity: string; id: string }> };
const allowed = new Set(["tools", "agents", "rankings", "comparisons", "use-cases", "news"]);

export async function PUT(request: NextRequest, { params }: Context) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { entity, id } = await params; if (!allowed.has(entity)) return NextResponse.json({ error: "Not found" }, { status: 404 }); const body = await request.json();
  try {
    let row: unknown;
    switch (entity) {
      case "tools": case "agents": row = await prisma.aiTool.update({ where: { id }, data: pickToolUpdate(body) }); break;
      case "rankings": row = await prisma.ranking.update({ where: { id }, data: pick(body,["title","description","category"]) }); break;
      case "comparisons": row = await prisma.comparison.update({ where: { id }, data: pick(body,["title","scenario","summary","conclusion","content"]) }); break;
      case "use-cases": row = await prisma.useCaseGuide.update({ where: { id }, data: pick(body,["title","scenario","description","freeSolution","domesticSolution","strongestSolution","lowCostSolution","governmentEducationSolution"]) }); break;
      default: row = await prisma.aiNews.update({ where: { id }, data: pick(body,["title","source","sourceUrl","summary","category","importanceScore","isPinned"]) });
    }
    return NextResponse.json(row);
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "更新失败" }, { status: 400 }); }
}

export async function DELETE(_: NextRequest, { params }: Context) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { entity, id } = await params; if (!allowed.has(entity) || entity === "agents") return NextResponse.json({ error: "Unsupported" }, { status: 400 });
  try { switch(entity){case"tools":await prisma.aiTool.delete({where:{id}});break;case"rankings":await prisma.ranking.delete({where:{id}});break;case"comparisons":await prisma.comparison.delete({where:{id}});break;case"use-cases":await prisma.useCaseGuide.delete({where:{id}});break;default:await prisma.aiNews.delete({where:{id}});} return NextResponse.json({ok:true}); }
  catch(error){return NextResponse.json({error:error instanceof Error?error.message:"删除失败"},{status:400});}
}
function pick(body:Record<string,unknown>,keys:string[]){return Object.fromEntries(keys.filter((key)=>body[key]!==undefined).map((key)=>[key,body[key]]));}
function pickToolUpdate(body:Record<string,unknown>){const data=pick(body,["name","company","officialUrl","category","shortDescription","domesticAccessibility","pricingModel","recommendationLevel","rating","isFeatured","supportsAgent","agentType","supportsApi","supportsKnowledgeBase","supportsWorkflow","supportsMcp","supportsPrivateDeployment"]);if(data.recommendationLevel!==undefined)data.recommendationLevel=Number(data.recommendationLevel);if(data.rating!==undefined)data.rating=Number(data.rating);return data;}
