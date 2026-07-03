import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "AI 大模型与智能体综合平台｜甘肃开放大学", template: "%s｜AI 大模型与智能体综合平台" },
  description: "甘肃开放大学 AI 信息综合汇聚平台，收录大模型、智能体、AI 搜索、办公、编程与图像视频工具，提供价格、能力和场景选型参考。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body><SiteHeader /><main className="min-h-[70vh]">{children}</main><SiteFooter /></body></html>;
}
