const officialUrlFallbacks: Record<string, string> = {
  "dify-self-hosted": "https://docs.dify.ai/zh/self-host/deploy/overview",
  whee: "https://www.whee.com/",
  "yinxiang-ai": "https://stage-www.yinxiang.com/",
  "coze-space": "https://www.coze.cn/",
};

export function resolveOfficialUrl(slug: string, officialUrl?: string | null) {
  return officialUrl || officialUrlFallbacks[slug];
}
