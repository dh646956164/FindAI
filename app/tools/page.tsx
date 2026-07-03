import type { Metadata } from "next";
import { Suspense } from "react";
import { ToolsClient } from "@/components/tools-client";
import { getTools } from "@/lib/data";

export const metadata: Metadata = { title: "AI 工具库", description: "按分类、价格、能力和适用人群筛选 AI 工具。" };

export default async function ToolsPage() {
  const tools = await getTools();
  return <Suspense fallback={<div className="container py-20 text-center text-muted-foreground">正在加载工具库...</div>}><ToolsClient tools={tools} /></Suspense>;
}
