export const categories = [
  "大模型助手", "AI Agent", "AI 搜索", "AI 办公", "AI 编程", "AI 图像", "AI 视频", "AI 音频", "AI 学术", "API / MaaS", "开源 / 自部署",
] as const;

export const categoryMeta: Record<string, { icon: string; color: string; description: string }> = {
  "大模型助手": { icon: "✦", color: "indigo", description: "对话、写作与通用推理" },
  "AI Agent": { icon: "⌘", color: "violet", description: "智能体、工作流与自动化" },
  "AI 搜索": { icon: "⌕", color: "sky", description: "搜索、研究与信息整合" },
  "AI 办公": { icon: "▦", color: "emerald", description: "文档、PPT 与会议效率" },
  "AI 编程": { icon: "</>", color: "cyan", description: "编码助手与开发平台" },
  "AI 图像": { icon: "◈", color: "pink", description: "图片生成、编辑与设计" },
  "AI 视频": { icon: "▶", color: "orange", description: "视频生成与智能剪辑" },
  "AI 音频": { icon: "◉", color: "amber", description: "语音、转写与音乐" },
  "AI 学术": { icon: "▤", color: "blue", description: "论文阅读与科研辅助" },
  "API / MaaS": { icon: "◇", color: "slate", description: "模型 API 与开发服务" },
  "开源 / 自部署": { icon: "◎", color: "teal", description: "可控、私有化与本地部署" },
};

export const accessibilityLabels: Record<string, string> = {
  DIRECT: "国内直连", SPECIAL_NETWORK: "需特殊网络", UNSTABLE: "访问不稳定", NOT_RECOMMENDED: "不建议国内使用", UNKNOWN: "待核验",
};

export const pricingLabels: Record<string, string> = {
  FREE: "免费", FREEMIUM: "免费增值", PAID: "付费", OPEN_SOURCE: "开源免费", ENTERPRISE: "企业报价",
};

export const navItems = [
  ["首页", "/"], ["工具库", "/tools"], ["模型榜单", "/rankings"], ["Agent 专区", "/agents"], ["场景推荐", "/use-cases"], ["工具对比", "/comparisons"], ["AI 情报", "/news"], ["关于", "/about"],
] as const;
