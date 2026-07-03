import { PrismaClient, DomesticAccessibility, PricingModel } from "@prisma/client";
import bcrypt from "bcryptjs";
import { catalogTools, comparisonsSeed, modelSeeds, newsSeed, rankingSeeds, useCasesSeed } from "../lib/catalog";
import { taskRecommendations } from "../lib/curated";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "change-this-password";
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { passwordHash: await bcrypt.hash(adminPassword, 12) },
    create: { email: adminEmail, passwordHash: await bcrypt.hash(adminPassword, 12), role: "ADMIN" },
  });

  for (const tool of catalogTools) {
    const data = {
      ...tool,
      domesticAccessibility: DomesticAccessibility[tool.domesticAccessibility],
      pricingModel: PricingModel[tool.pricingModel],
      requiresLogin: true,
      requiresPhone: false,
      supportsChinaPhone: true,
      supportsWechatPay: false,
      supportsAlipay: true,
      paidPlanDescription: "具体套餐与价格以产品官网最新公示为准。",
      lastCheckedAt: new Date(),
    };
    await prisma.aiTool.upsert({ where: { slug: tool.slug }, update: data, create: data });
  }

  for (const model of modelSeeds) {
    await prisma.aiModel.upsert({
      where: { name_provider: { name: model.name, provider: model.provider } },
      update: model,
      create: { ...model, domesticAccessibility: "DIRECT" },
    });
  }

  for (const [title, slug, description] of rankingSeeds) {
    const ranking = await prisma.ranking.upsert({
      where: { slug }, update: { title, description, category: title.replace("榜", "") },
      create: { title, slug, description, category: title.replace("榜", "") },
    });
    await prisma.rankingItem.deleteMany({ where: { rankingId: ranking.id } });
    const candidates = pickRankingTools(slug);
    for (const [index, candidate] of candidates.entries()) {
      const tool = await prisma.aiTool.findUnique({ where: { slug: candidate } });
      if (tool) {
        await prisma.rankingItem.create({
          data: { rankingId: ranking.id, toolId: tool.id, rank: index + 1, score: 96 - index * 2.3, reason: rankingReason(slug, tool.name) },
        });
      }
    }
  }

  for (const [title, slug, toolsCompared, scenario] of comparisonsSeed) {
    await prisma.comparison.upsert({
      where: { slug },
      update: { title, toolsCompared: [...toolsCompared], scenario },
      create: {
        title, slug, toolsCompared: [...toolsCompared], scenario,
        summary: `从核心能力、价格、中文体验、学习成本与适用人群五个维度比较 ${toolsCompared.join("、")}。`,
        conclusion: `没有绝对最强的工具。个人用户可优先考虑中文体验和免费额度，开发团队还需评估 API、数据条款与可迁移性。`,
        content: `## 选型方法\n\n先明确任务、数据敏感度和预算，再用同一组真实材料完成小样测试。重点记录结果质量、完成时间、人工修订成本和失败边界。\n\n## 编辑部建议\n\n免费版适合体验，正式业务应确认服务协议、数据处理范围、并发限制与价格上限。`,
      },
    });
  }

  for (const guide of useCasesSeed) {
    await prisma.useCaseGuide.upsert({ where: { slug: guide.slug }, update: guide, create: guide });
  }

  for (const item of newsSeed) {
    await prisma.aiNews.upsert({ where: { slug: item.slug }, update: item, create: item });
  }

  const tags = ["支持中文", "使用便捷", "免费额度", "API", "Agent", "知识库", "工作流", "MCP", "私有化部署", "高校办公"];
  for (const [index, name] of tags.entries()) {
    await prisma.tag.upsert({ where: { slug: `tag-${index + 1}` }, update: { name }, create: { name, slug: `tag-${index + 1}`, type: "capability" } });
  }

  console.log(`Seed 完成：${catalogTools.length} 个工具、${rankingSeeds.length} 个榜单、${useCasesSeed.length} 个场景。`);
}

function pickRankingTools(slug: string): string[] {
  return taskRecommendations.find((task) => task.slug === slug)?.tools.map((tool) => tool.slug) || [];
}

function rankingReason(slug: string, name: string) {
  const focus: Record<string, string> = {
    coding: "代码理解与开发效率", "ai-search": "来源组织与研究体验", "ai-agent": "工作流、知识库和扩展能力",
    image: "中文提示词与出图质量", video: "运动表现与生成可控性", "developer-api": "成本、稳定性与接入体验",
  };
  return `${name} 在${focus[slug] || "中文体验、可用性和综合效果"}方面表现突出。`;
}

main()
  .catch((error) => { console.error(error); process.exit(1); })
  .finally(async () => prisma.$disconnect());
