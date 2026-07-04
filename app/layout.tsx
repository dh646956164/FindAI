import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "甘肃开放大学｜AI 大模型与智能体综合平台", template: "%s｜AI 大模型与智能体综合平台" },
  description: "由甘肃开放大学建设维护的 AI 信息综合汇聚平台，按任务精选大模型、智能体与专业 AI 工具。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body><SiteHeader /><main className="min-h-[70vh]">{children}</main><SiteFooter /></body></html>;
}
